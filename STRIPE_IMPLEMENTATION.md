# Stripe Payment Integration Guide

## Overview

This guide will help you implement Stripe payment processing for your website platform, with support for 399 PLN and 599 PLN packages.

## Table of Contents

1. [Stripe Account Setup](#1-stripe-account-setup)
2. [Install Dependencies](#2-install-dependencies)
3. [Environment Variables](#3-environment-variables)
4. [Create Products](#4-create-products)
5. [Create API Routes](#5-create-api-routes)
6. [Create Checkout Pages](#6-create-checkout-pages)
7. [Webhook Setup](#7-webhook-setup)
8. [Testing](#8-testing)

---

## 1. Stripe Account Setup

### Step 1: Create Stripe Account
```bash
1. Go to: https://stripe.com
2. Click "Start Now" or "Sign Up"
3. Choose: "I'm building a platform/marketplace"
4. Complete registration with your email
```

### Step 2: Complete KYC Verification
```bash
1. Go to: Dashboard → Settings → Business settings
2. Complete required information:
   - Business name: Strona Od Nowa
   - Country: Poland
   - Business type: Select appropriate option
3. Upload required documents (if needed)
4. Wait for approval (usually instant for most countries)
```

### Step 3: Get API Keys
```bash
1. Go to: Dashboard → Developers → API keys
2. You'll see two keys:
   - Publishable key: pk_test_... (public, safe in frontend)
   - Secret key: sk_test_... (keep secret!)
3. Copy both keys
```

**Security Note:** Never commit secret keys to GitHub!

---

## 2. Install Dependencies

```bash
# Navigate to project directory
cd C:\Users\civan\Documents\GitHub\stronaodnowa-platform

# Install Stripe dependencies
npm install stripe @stripe/stripe-js
npm install @stripe/react-stripe-js

# TypeScript types (if using TypeScript)
npm install -D @types/node
```

---

## 3. Environment Variables

### Add to `.env.local` (Local Development)
```env
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_51AbCdEfGhIjKlMn...
STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEfGhIjKlMn...

# For client-side Stripe.js
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51AbCdEfGhIjKlMn...

# Webhook secret (after setting up webhook)
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Add to Vercel Dashboard (Production)
```bash
1. Go to: https://vercel.com/dashboard
2. Click on your project
3. Settings → Environment Variables
4. Add each variable:
   - STRIPE_SECRET_KEY (Production)
   - STRIPE_PUBLISHABLE_KEY (Production)
   - STRIPE_WEBHOOK_SECRET (Production)
5. Click "Save"
```

**For all environments:** Development, Preview, Production

---

## 4. Create Products

### Option A: Via Stripe Dashboard (Easiest)

```bash
1. Go to: https://dashboard.stripe.com/test/products
2. Click "Add Product"
3. Fill in details:
   
   Product 1: Basic Package
   - Name: Basic Website Package
   - Description: Professional website with basic features
   - Price: 399.00
   - Currency: PLN
   - Recurring: None (one-time payment)
   - Click "Save product"
   
   Product 2: Pro Package
   - Name: Pro Website Package
   - Description: Advanced website with premium features
   - Price: 599.00
   - Currency: PLN
   - Recurring: None (one-time payment)
   - Click "Save product"
```

### Option B: Via API (Automated)

Create `scripts/create-stripe-products.ts`:
```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

async function createProducts() {
  const basicProduct = await stripe.products.create({
    name: 'Basic Website Package',
    description: 'Professional website with basic features',
  });

  await stripe.prices.create({
    product: basicProduct.id,
    unit_amount: 39900, // 399 PLN in grosze
    currency: 'pln',
  });

  const proProduct = await stripe.products.create({
    name: 'Pro Website Package',
    description: 'Advanced website with premium features',
  });

  await stripe.prices.create({
    product: proProduct.id,
    unit_amount: 59900, // 599 PLN in grosze
    currency: 'pln',
  });

  console.log('✅ Products created!');
}

createProducts();
```

Run:
```bash
npm run create-products  # (need to add script to package.json)
```

---

## 5. Create API Routes

### File: `lib/stripe/config.ts`

```typescript
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

export const getStripeInstance = () => {
  return stripe;
};
```

### File: `app/api/stripe/checkout/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId, clientId, subdomain } = body;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cancel`,
      metadata: {
        clientId,
        subdomain,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
```

### File: `app/api/stripe/webhook/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/config';
import { prisma } from '@/lib/db/prisma';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle different event types
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      const metadata = session.metadata;

      // Update client status to ACTIVE
      await prisma.client.update({
        where: { id: metadata?.clientId },
        data: {
          status: 'ACTIVE',
          // Add payment info
        },
      });

      console.log('✅ Payment successful for:', metadata?.subdomain);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

---

## 6. Create Checkout Pages

### File: `app/(marketing)/checkout/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, clientId: 'xxx', subdomain: 'xxx' }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      await stripe?.redirectToCheckout({ sessionId });
    } catch (err) {
      setError('Failed to start checkout');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Choose Your Package</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Basic Package */}
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Basic Package</h2>
            <p className="text-4xl font-bold mb-4">399 PLN</p>
            <ul className="space-y-2 mb-6">
              <li>✓ Professional website</li>
              <li>✓ Mobile responsive</li>
              <li>✓ Contact form</li>
            </ul>
            <button
              onClick={() => handleCheckout('price_xxx')} // Replace with actual price ID
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              {loading ? 'Loading...' : 'Buy Now'}
            </button>
          </div>

          {/* Pro Package */}
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Pro Package</h2>
            <p className="text-4xl font-bold mb-4">599 PLN</p>
            <ul className="space-y-2 mb-6">
              <li>✓ All Basic features</li>
              <li>✓ SEO optimization</li>
              <li>✓ Premium support</li>
              <li>✓ Analytics setup</li>
            </ul>
            <button
              onClick={() => handleCheckout('price_xxx')} // Replace with actual price ID
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg"
            >
              {loading ? 'Loading...' : 'Buy Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 7. Webhook Setup

### Step 1: Install Stripe CLI (for local testing)

```bash
# Windows (using Scoop)
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe

# Or download from:
https://stripe.com/docs/stripe-cli
```

### Step 2: Forward Webhook to Local Dev

```bash
# In project directory
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Copy the webhook signing secret
# Add to .env.local as STRIPE_WEBHOOK_SECRET
```

### Step 3: Set Up Production Webhook

```bash
1. Go to: https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Endpoint URL: https://stronaodnowa.pl/api/stripe/webhook
4. Events to send:
   - checkout.session.completed
   - payment_intent.succeeded
   - charge.succeeded
5. Click "Add endpoint"
6. Copy webhook signing secret
7. Add to Vercel environment variables
```

---

## 8. Testing

### Test Cards

```bash
# Successful payment
4242 4242 4242 4242
Any future expiry date
Any CVC
Any ZIP code

# Requires authentication
4000 0027 6000 3184
Future expiry date
Any CVC

# Declined card
4000 0000 0000 0002
```

### Test Webhook Locally

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Forward webhooks
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Terminal 3: Trigger test event
stripe trigger checkout.session.completed
```

---

## Next Steps

1. ✅ Complete Stripe account setup
2. ✅ Get API keys
3. ✅ Create products
4. ✅ Add environment variables
5. ✅ Test checkout flow
6. ✅ Set up webhook
7. ✅ Integrate into client creation flow

---

## Resources

- Stripe Docs: https://stripe.com/docs
- Next.js Guide: https://vercel.com/guides/nextjs-typescript-stripe
- Test Mode: https://stripe.com/docs/testing
- Webhook Guide: https://stripe.com/docs/webhooks

---

## Support

If you encounter issues:

1. Check Stripe Dashboard → Events for errors
2. Check server logs for webhook errors
3. Use Stripe CLI for local testing
4. Verify environment variables are set
5. Check webhook endpoint is reachable

Need help? Let me know which step you're stuck on!

