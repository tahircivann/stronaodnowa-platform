import { NextRequest, NextResponse } from 'next/server';
// import { verifyDomain } from '@/lib/vercel/domains-api';

// GET /api/domains/verify?domain=example.com - Verify domain
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');
    
    if (!domain) {
      return NextResponse.json(
        { error: 'Domain parameter is required' },
        { status: 400 }
      );
    }
    
    // Verify domain via Vercel API
    // const verification = await verifyDomain(domain);
    
    // Mock response for now
    const verification = {
      domain,
      verified: true,
      records: [
        {
          type: 'CNAME',
          name: 'www',
          value: 'cname.vercel-dns.com.',
        },
      ],
    };
    
    return NextResponse.json(verification);
  } catch (error) {
    console.error('Error verifying domain:', error);
    return NextResponse.json(
      { error: 'Failed to verify domain' },
      { status: 500 }
    );
  }
}

