import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/db/prisma';

// GET /api/clients - List all clients
export async function GET(request: NextRequest) {
  try {
    // const clients = await prisma.client.findMany({
    //   orderBy: { createdAt: 'desc' },
    // });
    
    // Mock data for now
    const clients = [
      { id: '1', name: 'Acme Corp', subdomain: 'acme', status: 'active' },
      { id: '2', name: 'TechStart', subdomain: 'techstart', status: 'active' },
    ];
    
    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json(
      { error: 'Failed to fetch clients' },
      { status: 500 }
    );
  }
}

// POST /api/clients - Create a new client
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, subdomain, domain } = body;
    
    // Validation
    if (!name || !subdomain) {
      return NextResponse.json(
        { error: 'Name and subdomain are required' },
        { status: 400 }
      );
    }
    
    // const client = await prisma.client.create({
    //   data: {
    //     name,
    //     subdomain,
    //     domain,
    //     status: 'active',
    //   },
    // });
    
    // Mock response for now
    const client = {
      id: '3',
      name,
      subdomain,
      domain,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    
    return NextResponse.json({ client }, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json(
      { error: 'Failed to create client' },
      { status: 500 }
    );
  }
}

