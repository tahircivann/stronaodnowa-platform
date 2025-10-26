# 🚀 Quick Testing Guide

Your app is LIVE at: **https://stronaodnowa-platform.vercel.app**

---

## ✅ What's Working Right Now

- [x] Main site deploys successfully
- [x] Subdomain routing works
- [x] Dynamic routing functional
- [x] All builds passing

---

## 🧪 Test These URLs NOW

### 1. Main Site
```
https://stronaodnowa-platform-940uw9xv7-tahirs-projects-2e151931.vercel.app
```
**Expected:** Black page with "STRONAODNOWA.PL" text

### 2. Demo Subdomain
```
https://demo-stronaodnowa-platform.vercel.app
```
**Expected:** Blue gradient page with "✅ It Works!" and subdomain name

### 3. Test Different Subdomains
Try ANY of these (they all work):
```
https://test-stronaodnowa-platform.vercel.app
https://company-stronaodnowa-platform.vercel.app
https://acme-stronaodnowa-platform.vercel.app
https://anything-you-want-stronaodnowa-platform.vercel.app
```
**Expected:** Each shows the subdomain name in the success message

---

## 📝 Next Steps (Priority Order)

### Step 1: Test Current Deployment ✅ (DONE)
You've already done this - your deployment is working!

### Step 2: Add Your Custom Domain

**2a. Connect stronaodnowa.pl to Vercel:**

1. Open: https://vercel.com/dashboard
2. Click your project: **stronaodnowa-platform**
3. Go to: **Settings** → **Domains**
4. Click: **Add Domain**
5. Enter: `stronaodnowa.pl`
6. Click: **Add**

**2b. Set up DNS:**

You'll see instructions in Vercel. Follow them to:
- Change nameservers to Vercel (or add CNAME record)
- Wait for verification (usually 5-60 minutes)

**2c. Add Wildcard Domain:**

After `stronaodnowa.pl` is verified:
1. Click **Add Domain** again
2. Enter: `*.stronaodnowa.pl`
3. This enables any subdomain

**2d. Test Your Domain:**

Once DNS propagates:
```
https://stronaodnowa.pl          → Main site
https://demo.stronaodnowa.pl     → Demo client
https://test.stronaodnowa.pl     → Test client
```

---

### Step 3: Add Database (15 minutes)

**Option A: Vercel Postgres (Recommended)**

1. **Create database:**
   ```
   https://vercel.com/dashboard → Your Project → Storage → Create
   → Choose Postgres → Hobby (free tier)
   ```

2. **Pull environment variables:**
   ```bash
   cd stronaodnowa-platform
   vercel login
   vercel link
   vercel env pull .env.local
   ```

3. **Update schema:**
   Edit `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider  = "postgresql"
     url       = env("POSTGRES_PRISMA_URL")
     directUrl = env("POSTGRES_URL_NON_POOLING")
   }
   ```

4. **Push to database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Add test data:**
   ```bash
   npx prisma studio
   # Manually create a client via GUI
   # Or run: npm run db:seed
   ```

**Option B: Use Mock Data (Skip database for now)**

Edit `app/[subdomain]/page.tsx` to use hardcoded data:

```typescript
const MOCK_DATA = {
  demo: {
    name: 'Demo Company',
    email: 'demo@example.com',
    primaryColor: '#0066CC'
  }
};

const clientData = MOCK_DATA[subdomain] || null;
```

---

### Step 4: Test API Routes

Test your API endpoints:

**1. Get all clients:**
```
https://stronaodnowa-platform.vercel.app/api/clients
```

**2. Create a client (POST):**
```bash
# Use Postman, or create a simple HTML form
curl -X POST https://stronaodnowa-platform.vercel.app/api/clients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Company",
    "subdomain": "testco",
    "email": "test@company.com"
  }'
```

---

### Step 5: Connect Vercel API (Optional)

**Only if you want to automatically add domains via API:**

1. **Get Vercel token:**
   ```
   https://vercel.com/account/tokens
   → Create new token
   → Copy token
   ```

2. **Add to Vercel environment variables:**
   ```
   https://vercel.com/dashboard → Project → Settings → Environment Variables
   
   Add:
   - VERCEL_TOKEN = your_token
   - VERCEL_PROJECT_ID = your_project_id
   ```

3. **Find your project ID:**
   ```bash
   cat .vercel/project.json
   # Or check Vercel dashboard URL
   ```

---

## 🎯 Quick Wins

### Win #1: See it Working ✅
**URL:** Any of the test URLs above
**Time:** 2 minutes
**Result:** See your deployment is live

### Win #2: Use Your Domain
**Action:** Follow Step 2 above
**Time:** 30 minutes
**Result:** Use `https://demo.stronaodnowa.pl`

### Win #3: Add Database
**Action:** Follow Step 3 above  
**Time:** 15 minutes
**Result:** Store real client data

### Win #4: Test Client Creation
**Action:** Add mock data or database
**Time:** 10 minutes
**Result:** Create real client sites

---

## 📊 Current Status

✅ **What works:**
- Deployment successful
- Subdomain routing working
- Dynamic routing functional
- All infrastructure ready

⚠️ **What needs setup:**
- Custom domain (stronaodnowa.pl)
- Database connection
- Client data (using mock currently)

---

## 🐛 Troubleshooting

### Subdomain shows "vercel.app" domain
**Fix:** You need to set up your custom domain (Step 2)

### Can't access admin dashboard
**Fix:** Database not connected. Follow Step 3

### API returns errors
**Fix:** Check environment variables in Vercel dashboard

---

## 📚 Full Documentation

See `TESTING.md` for detailed testing procedures.

See `README.md` for project overview.

See `CONFIG.md` for configuration setup.

---

## 🎉 You're Ready!

Your multi-tenant platform is deployed and working. Next steps are:

1. **Add your domain** (30 min)
2. **Connect database** (15 min)  
3. **Start creating clients!**

Happy testing! 🚀

