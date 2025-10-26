import { NextRequest, NextResponse } from 'next/server';

// POST /api/webhook - Handle Vercel webhooks
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, payload } = body;
    
    // Handle different webhook types
    switch (type) {
      case 'deployment.succeeded':
        console.log('Deployment succeeded:', payload);
        // Handle deployment success
        break;
        
      case 'deployment.failed':
        console.log('Deployment failed:', payload);
        // Handle deployment failure
        break;
        
      case 'domain.created':
        console.log('Domain created:', payload);
        // Handle domain creation
        break;
        
      default:
        console.log('Unknown webhook type:', type);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { error: 'Failed to handle webhook' },
      { status: 500 }
    );
  }
}

