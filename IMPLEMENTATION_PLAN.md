# Implementation Plan for Remaining Features

## ⚠️ Important: Hosting Decision

You mentioned **Hostinger API** in your requirements, but the current setup uses **Vercel**.

**Current Platform:** Vercel (Next.js, API-first, modern)
**Requirement:** Hostinger (Traditional hosting, file-based)

### Your Options:

**Option A: Stick with Vercel** ✅ **RECOMMENDED**
- ✅ Subdomain API already implemented (`lib/vercel/domains-api.ts`)
- ✅ Automatic SSL certificates
- ✅ Better for Next.js applications
- ✅ Existing code works with Vercel

**Option B: Switch to Hostinger**
- ⚠️ Need to rebuild the deployment system
- ⚠️ Manually configure subdomains
- ⚠️ Manual SSL certificate setup
- ⚠️ File-based approach (less modern)

**Recommendation:** Adapt requirements to work with Vercel (what's already built)

---

## Feature Implementation Status

### ✅ Already Implemented

1. **Automatic Subdomain Creation** (via Vercel API)
   - File: `lib/vercel/domains-api.ts`
   - Endpoint: `app/api/clients/route.ts`
   - When a client is created, it automatically adds the subdomain
   - **Note:** Works with custom domain (stronaodnowa.pl), not Hostinger

2. **Client Creation API**
   - File: `app/api/clients/route.ts`
   - Creates client in database
   - Calls Vercel API to add subdomain
   - Creates default homepage

3. **Admin Dashboard**
   - File: `app/(dashboard)/dashboard/clients/page.tsx`
   - Form to create new client websites

### ❌ Needs Implementation

4. **Stripe Payment Integration**
5. **Countdown Banner Component**
6. **Payment Webhook Handler**

---

## Feature 1: Stripe Payment Integration

### Status: ❌ Not Implemented

### Implementation Steps:

**1. Create Stripe Account**
```
1. Go to: https://stripe.com
2. Sign up for account
3. Complete KYC verification
4. Get API keys from dashboard
```

**2. Create Stripe Products**
```bash
# You'll need to create these in Stripe Dashboard or via API
- Basic Package: 399 PLN
- Pro Package: 599 PLN
```

**3. Install Stripe SDK**
```bash
npm install stripe @stripe/stripe-js
npm install @stripe/react-stripe-js
```

**4. Create Payment Pages**
- Checkout page
- Payment success page
- Payment failure page

**5. Create API Routes**
- `/api/stripe/create-checkout`
- `/api/stripe/webhook` (for payment confirmations)

---

## Feature 2: Countdown Banner Component

### Status: ❌ Not Implemented

### Requirements:
- 48-hour countdown timer
- Stripe payment button
- Responsive design (Tailwind CSS)
- Dismissible/close button

### Implementation Plan:

**Component Structure:**
```
components/tenant/PaymentBanner.tsx
  ├── CountdownTimer (48 hours)
  ├── Stripe Checkout Button
  ├── Pricing Display
  └── Close Button
```

**Logic:**
- Show banner for 48 hours after website creation
- Hide after payment or time expires
- Store state in database or localStorage

---

## Feature 3: Automated Domain Creation

### Status: ⚠️ Partial (Works with Vercel API only)

**Current Implementation:**
```typescript
// File: lib/vercel/domains-api.ts
export class VercelDomainsAPI {
  async addDomain(subdomain: string) {
    // Automatically adds subdomain to Vercel
    const domain = `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    await fetch(`/domains`, { method: 'POST', body: JSON.stringify({ name: domain }) });
  }
}
```

**Usage:**
```typescript
// File: app/api/clients/route.ts
const domainsAPI = new VercelDomainsAPI();
await domainsAPI.addDomain(subdomain); // Called automatically when creating client
```

**What Works:**
✅ Automatic subdomain creation when client is created
✅ DNS records configured automatically (by Vercel)
✅ SSL certificate provisioned automatically

**What's Missing:**
❌ Hostinger API integration (not needed if using Vercel)

---

## Implementation Priority

### Phase 1: Core Features (NOW)
1. ✅ Platform is deployed and working
2. ❌ Connect custom domain (stronaodnowa.pl) - **30 min**
3. ❌ Set up database - **10 min**
4. ✅ Test subdomain routing

### Phase 2: Payment System (NEXT)
1. ❌ Stripe account setup
2. ❌ Install Stripe SDK
3. ❌ Create checkout page
4. ❌ Payment webhook handler
5. ❌ Update client creation flow to trigger payment

### Phase 3: Countdown Banner (AFTER PAYMENT)
1. ❌ Create banner component
2. ❌ Add to client sites
3. ❌ Integrate with Stripe
4. ❌ Test banner display logic

---

## Quick Start Implementation

### Step 1: Complete Current Setup (30 minutes)

**A. Connect Domain:**
```bash
# 1. Go to: https://vercel.com/dashboard
# 2. Click on your project
# 3. Settings → Domains
# 4. Add: stronaodnowa.pl
# 5. Add: *.stronaodnowa.pl (wildcard)
```

**B. Set Up Database:**
```bash
# Via Vercel Dashboard:
# → Storage → Create Postgres

# Or via CLI:
vercel storage create postgres
vercel env pull .env.local
npm run db:push
```

**C. Test Subdomains:**
```bash
# Visit:
https://test.stronaodnowa.pl
https://demo.stronaodnowa.pl
```

### Step 2: Implement Stripe (1-2 hours)

**A. Create Stripe Account:**
```bash
# Go to: https://stripe.com
# Complete KYC
# Get API keys
```

**B. Add Stripe to Project:**
```bash
npm install stripe @stripe/stripe-js
```

**C. Create Environment Variables:**
```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

**D. Create API Routes:**
- `/api/stripe/checkout` - Create checkout session
- `/api/stripe/webhook` - Handle payment events

**E. Create Checkout Page:**
- `/checkout` - Payment form
- `/success` - Payment success page
- `/cancel` - Payment canceled page

### Step 3: Create Countdown Banner (30-60 min)

**A. Create Component:**
```bash
# New file: components/tenant/PaymentBanner.tsx
```

**B. Add to Client Sites:**
```typescript
// In: app/[subdomain]/layout.tsx
import PaymentBanner from '@/components/tenant/PaymentBanner';

export default function TenantLayout({ children }) {
  return (
    <div>
      <PaymentBanner />
      {children}
    </div>
  );
}
```

**C. Implement Logic:**
- Show banner for 48 hours
- Countdown timer
- Payment button
- Auto-hide after payment

---

## Estimated Timeline

| Feature | Time | Priority |
|---------|------|----------|
| Connect domain + database | 30 min | 🔴 Critical |
| Stripe integration | 1-2 hours | 🟡 High |
| Payment checkout pages | 1 hour | 🟡 High |
| Webhook handler | 30 min | 🟡 High |
| Countdown banner | 1 hour | 🟢 Medium |
| Testing & polishing | 1-2 hours | 🟢 Medium |

**Total:** 5-7 hours

---

## Next Actions

### Immediate (Today):
1. Connect stronaodnowa.pl domain to Vercel
2. Set up database
3. Test first real subdomain

### This Week:
1. Set up Stripe account
2. Implement payment system
3. Create checkout flow

### Next Week:
1. Add countdown banner
2. Test end-to-end flow
3. Launch!

---

## Files That Need to be Created

```
app/
├── api/
│   ├── stripe/
│   │   ├── checkout/
│   │   │   └── route.ts        ← Create checkout session
│   │   └── webhook/
│   │       └── route.ts        ← Handle payment events
├── (marketing)/
│   ├── checkout/
│   │   └── page.tsx            ← Payment form
│   ├── success/
│   │   └── page.tsx             ← Payment success
│   └── cancel/
│       └── page.tsx             ← Payment canceled

components/
└── tenant/
    └── PaymentBanner.tsx        ← Countdown banner component

lib/
└── stripe/
    ├── config.ts               ← Stripe initialization
    └── utils.ts                ← Payment helpers
```

---

## Resources

### Stripe Documentation:
- Get started: https://stripe.com/docs/payments/checkout
- Next.js integration: https://stripe.com/docs/payments/quickstart
- Webhooks: https://stripe.com/docs/webhooks

### Vercel + Stripe:
- Guide: https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe

### Countdown Timer:
- Libraries: `react-countdown`, `countdown.js`
- Or plain JavaScript

---

## Questions?

**Q: Can I use Hostinger instead of Vercel?**  
A: Yes, but you'd need to rebuild the subdomain API system. Vercel is already working.

**Q: How long to implement payments?**  
A: 1-2 hours once Stripe account is set up.

**Q: Is the countdown banner hard?**  
A: No, straightforward React component with basic state management.

**Q: Can I test without real payment?**  
A: Yes! Stripe has test mode with test cards.

---

## Ready to Start?

1. **Right now:** Connect domain + database (30 min) - See `HOW_TO_ENABLE_SUBDOMAINS.md`
2. **Tomorrow:** Set up Stripe + implement payments (2 hours)
3. **This week:** Add countdown banner (1 hour)

Let me know which feature you want to implement first!

