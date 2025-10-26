import { NextRequest, NextResponse } from 'next/server';
// import { addDomain } from '@/lib/vercel/domains-api';

// POST /api/domains/add - Add a domain via Vercel API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, clientId } = body;
    
    if (!domain || !clientId) {
      return NextResponse.json(
        { error: 'Domain and clientId are required' },
        { status: 400 }
      );
    }
    
    // Add domain via Vercel API
    // const result = await addDomain(domain);
    
    // Mock response for now
    const result = {
      domain,
      clientId,
      status: 'pending',
      message: 'Domain added successfully',
    };
    
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error adding domain:', error);
    return NextResponse.json(
      { error: 'Failed to add domain' },
      { status: 500 }
    );
  }
}

