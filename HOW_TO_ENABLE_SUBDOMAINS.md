# How to Enable Real Subdomains

## Current Status
❌ **Not yet working** - You're using Vercel's default domain which doesn't support true subdomains

## What You Need

To create real subdomains like `test.stronaodnowa.pl` or `acme.stronaodnowa.pl`, you need to:

1. ✅ **Connect your custom domain to Vercel** (stronaodnowa.pl)
2. ✅ **Add wildcard DNS** (*.stronaodnowa.pl)
3. ✅ **Set up the database** (Vercel Postgres)
4. ✅ **Add environment variables**

---

## Step 1: Connect Your Custom Domain

### Go to Vercel Dashboard:
```
https://vercel.com/dashboard
→ Click on your project "stronaodnowa-platform"
→ Click "Settings" in the top menu
→ Click "Domains" in the left sidebar
```

### Add Your Domain:
1. Click **"Add Domain"** button
2. Enter: `stronaodnowa.pl`
3. Click **"Add"**
4. Vercel will show you DNS instructions

### Configure DNS:

**Option A: Use Vercel Nameservers (RECOMMENDED)**
```
Go to your domain registrar (where you bought stronaodnowa.pl)
Change nameservers to:
  - ns1.vercel-dns.com
  - ns2.vercel-dns.com

Wait 1-24 hours for DNS propagation
```

**Option B: Add CNAME Record (if you can't change nameservers)**
```
Add DNS record at your registrar:
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

---

## Step 2: Add Wildcard Domain

After your main domain is verified (green checkmark):

1. Click **"Add Domain"** again
2. Enter: `*.stronaodnowa.pl`
3. Click **"Add"**
4. Vercel automatically provisions wildcard SSL certificate (this takes 5-10 minutes)

✅ **Done!** Now ANY subdomain will automatically work:
- `test.stronaodnowa.pl` → Works automatically
- `demo.stronaodnowa.pl` → Works automatically
- `acme.stronaodnowa.pl` → Works automatically
- Any subdomain → Works automatically

---

## Step 3: Set Up Database

### Option A: Via Vercel Dashboard (Easiest)

1. **Go to your Vercel project dashboard**
2. **Click "Storage" tab** (in left sidebar)
3. **Click "Create Database"**
4. **Select "Postgres"**
5. **Select "Hobby" (free tier)**
6. **Click "Create"**

✅ Vercel automatically adds these environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Navigate to your project
cd C:\Users\civan\Documents\GitHub\stronaodnowa-platform

# Create Postgres database
vercel storage create postgres
```

---

## Step 4: Pull Environment Variables Locally

After creating the database:

```bash
# Pull environment variables from Vercel to .env.local
vercel env pull .env.local
```

This will download all your environment variables to your local `.env.local` file.

---

## Step 5: Update Database Schema

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push
```

---

## Step 6: Test It! 🚀

Once DNS propagates (check with: `nslookup stronaodnowa.pl`):

1. **Main site:** https://stronaodnowa.pl
2. **Test subdomain:** https://test.stronaodnowa.pl
3. **Demo subdomain:** https://demo.stronaodnowa.pl
4. **Any subdomain:** https://anything.stronaodnowa.pl

---

## Step 7: Create Your First Real Client Website

Go to your dashboard:
```
https://stronaodnowa.pl/dashboard/clients
```

Fill in the form:
- **Client Name:** Test Company
- **Subdomain:** testco
- **Email:** test@company.com
- **Color:** #FF5733

Click **"Create Client Site"**

Wait ~5 seconds for Vercel to configure the subdomain...

**Visit your new site:**
```
https://testco.stronaodnowa.pl
```

✅ **It's live!**

---

## Troubleshooting

### DNS Not Working?

Check if DNS propagated:
```bash
# Windows PowerShell
nslookup stronaodnowa.pl
nslookup test.stronaodnowa.pl
```

### Database Connection Error?

1. Make sure environment variables are set in Vercel dashboard
2. Pull environment variables: `vercel env pull .env.local`
3. Run migrations: `npm run db:push`

### Subdomain Shows 404?

1. Make sure wildcard domain (*.stronaodnowa.pl) is added to Vercel
2. Wait 5-10 minutes for SSL certificate to be provisioned
3. Check browser cache (Ctrl+Shift+R to hard refresh)

---

## Timeline

| Step | Time Required |
|------|---------------|
| Connect domain to Vercel | 2 minutes |
| DNS propagation | 1-24 hours (usually 5-30 minutes) |
| Wildcard SSL certificate | 5-10 minutes |
| Database setup | 5 minutes |
| Create first client website | 5 minutes |

**Total time: 10-30 minutes** (excluding DNS propagation time)

---

## Current Workarounds

Until your custom domain is connected, you can test using:

### Option 1: Query Parameters
```
https://stronaodnowa-platform.vercel.app/?subdomain=test
https://stronaodnowa-platform.vercel.app/?subdomain=demo
```

### Option 2: Path-Based Routes
```
https://stronaodnowa-platform.vercel.app/test
https://stronaodnowa-platform.vercel.app/demo
```

---

## Need Help?

See other docs:
- `README.md` - Platform overview
- `HOW_TO_CREATE_WEBSITES.md` - Detailed client creation guide
- `ARCHITECTURE.md` - Technical architecture explanation
- `TESTING.md` - Testing guide

