import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { VercelDomainsAPI } from '@/lib/vercel/domains-api';

const domainsAPI = new VercelDomainsAPI();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, subdomain, email, phone, primaryColor } = body;
    
    // Validation
    if (!name || !subdomain || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: name, subdomain, email' },
        { status: 400 }
      );
    }
    
    // Validate subdomain format (lowercase, alphanumeric + hyphens)
    const subdomainRegex = /^[a-z0-9-]+$/;
    if (!subdomainRegex.test(subdomain)) {
      return NextResponse.json(
        { error: 'Invalid subdomain format. Use lowercase letters, numbers, and hyphens only.' },
        { status: 400 }
      );
    }
    
    // Check if subdomain already exists
    const existingClient = await prisma.client.findUnique({
      where: { subdomain },
    });
    
    if (existingClient) {
      return NextResponse.json(
        { error: 'Subdomain already taken' },
        { status: 409 }
      );
    }
    
    // Create client in database
    const client = await prisma.client.create({
      data: {
        name,
        subdomain,
        email,
        phone,
        primaryColor: primaryColor || '#000000',
        status: 'PENDING',
      },
    });
    
    // Create default homepage
    await prisma.page.create({
      data: {
        clientId: client.id,
        slug: 'home',
        title: `Welcome to ${name}`,
        content: `<p>This is the homepage for ${name}.</p><p>You can customize this content in the admin dashboard.</p>`,
        published: true,
      },
    });
    
    // Add subdomain to Vercel via API
    try {
      await domainsAPI.addDomain(subdomain);
      
      // Update client status to ACTIVE
      await prisma.client.update({
        where: { id: client.id },
        data: { status: 'ACTIVE' },
      });
      
      return NextResponse.json({
        success: true,
        client,
        url: `https://${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        message: 'Client created successfully! Subdomain is now active.',
      });
      
    } catch (vercelError) {
      // If Vercel API fails, keep client as PENDING
      console.error('Vercel API error:', vercelError);
      
      return NextResponse.json({
        success: false,
        client,
        error: 'Client created but subdomain setup failed. Contact support.',
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get all clients
export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { pages: true },
        },
      },
    });
    
    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
