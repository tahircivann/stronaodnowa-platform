# How Website Creation Works

## 🔄 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    WEBSITE CREATION PROCESS                     │
└─────────────────────────────────────────────────────────────────┘

1. ADMIN ENTERS CLIENT INFO
   └─> User fills form at /dashboard/clients
       ├─ Client Name: "Acme Corporation"
       ├─ Subdomain: "acme"
       ├─ Email: "contact@acme.com"
       ├─ Phone: "+48 123 456 789"
       └─ Color: "#FF5733"

2. FORM DATA SENT TO API
   └─> POST request to /api/clients
       ├─ Headers: { 'Content-Type': 'application/json' }
       └─ Body: { name, subdomain, email, phone, primaryColor }

3. SERVER VALIDATION
   └─> app/api/clients/route.ts (POST handler)
       ├─ Check if required fields present
       ├─ Validate subdomain format (a-z, 0-9, -)
       ├─ Check if subdomain already exists in database
       └─ Return error if validation fails

4. SAVE TO DATABASE
   └─> Prisma creates Client record
       ├─ id: auto-generated (unique)
       ├─ name: "Acme Corporation"
       ├─ subdomain: "acme"
       ├─ email: "contact@acme.com"
       ├─ phone: "+48 123 456 789"
       ├─ primaryColor: "#FF5733"
       ├─ status: "PENDING" (will change to "ACTIVE")
       ├─ createdAt: now()
       └─ updatedAt: now()

5. CREATE DEFAULT HOMEPAGE
   └─> Prisma creates Page record
       ├─ id: auto-generated
       ├─ clientId: [linked to client above]
       ├─ slug: "home"
       ├─ title: "Welcome to Acme Corporation"
       ├─ content: "<p>This is the homepage...</p>"
       ├─ published: true
       └─ Now client has content to display

6. ADD SUBDOMAIN TO VERCEL
   └─> VercelDomainsAPI.addDomain("acme")
       ├─ Calls: POST https://api.vercel.com/v10/projects/.../domains
       ├─ Body: { name: "acme.stronaodnowa.pl" }
       └─ Vercel automatically:
           ├─ Configures DNS record
           ├─ Provisions SSL certificate
           └─ Makes subdomain live

7. UPDATE CLIENT STATUS
   └─> Change status from "PENDING" to "ACTIVE"
       └─ Client site is now ready to visit

8. RESPONSE TO ADMIN
   └─> Return success message
       ├─ URL: "https://acme.stronaodnowa.pl"
       └─ Status: "Client created successfully!"

9. WEBSITE IS LIVE!
   └─> Visit: https://acme.stronaodnowa.pl
       ├─ Middleware detects subdomain "acme"
       ├─ Routes to /[subdomain]/page.tsx
       ├─ Fetches client data from database
       ├─ Displays custom content
       └─ Shows homepage with client branding
```

---

## 📝 Step-by-Step Code Breakdown

### Step 1: Admin Fills Form (`app/(dashboard)/dashboard/clients/page.tsx`)

```typescript
// User enters data in the form
const formData = {
  name: 'Acme Corporation',
  subdomain: 'acme',
  email: 'contact@acme.com',
  phone: '+48 123 456 789',
  primaryColor: '#FF5733'
};

// Form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Send data to API
  const response = await fetch('/api/clients', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  
  const data = await response.json();
  // Shows success message with URL
};
```

### Step 2: Server Receives Request (`app/api/clients/route.ts`)

```typescript
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, subdomain, email, phone, primaryColor } = body;
  
  // Validate inputs
  if (!name || !subdomain || !email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  
  // Check subdomain format
  const subdomainRegex = /^[a-z0-9-]+$/;
  if (!subdomainRegex.test(subdomain)) {
    return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
  }
  
  // Check if subdomain already exists
  const existing = await prisma.client.findUnique({ where: { subdomain } });
  if (existing) {
    return NextResponse.json({ error: 'Already taken' }, { status: 409 });
  }
```

### Step 3: Save to Database

```typescript
// Create client record
const client = await prisma.client.create({
  data: {
    name,
    subdomain,
    email,
    phone,
    primaryColor,
    status: 'PENDING',  // Initial status
  }
});

// Create default homepage
await prisma.page.create({
  data: {
    clientId: client.id,
    slug: 'home',
    title: `Welcome to ${name}`,
    content: `<p>This is the homepage for ${name}</p>`,
    published: true,
  }
});
```

### Step 4: Add Subdomain to Vercel (`lib/vercel/domains-api.ts`)

```typescript
class VercelDomainsAPI {
  async addDomain(subdomain: string) {
    const domain = `${subdomain}.stronaodnowa.pl`;
    
    // Call Vercel API
    const response = await fetch(
      `https://api.vercel.com/v10/projects/${PROJECT_ID}/domains`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: domain }),
      }
    );
    
    // Vercel automatically:
    // - Sets up DNS record
    // - Provisions SSL certificate
    // - Makes subdomain accessible
  }
}
```

### Step 5: Update Client Status

```typescript
// After Vercel subdomain is configured
await prisma.client.update({
  where: { id: client.id },
  data: { status: 'ACTIVE' }  // Now active!
});

return NextResponse.json({
  success: true,
  client,
  url: `https://${subdomain}.stronaodnowa.pl`,
  message: 'Client created successfully!'
});
```

---

## 🌐 How Subdomain Routing Works

### Request Flow:

```
1. Browser: https://acme.stronaodnowa.pl
   │
2. DNS resolves to Vercel IP
   │
3. Vercel routes to your Next.js app
   │
4. Middleware runs (middleware.ts)
   ├─ Detects subdomain: "acme"
   └─ Rewrites URL: /acme
   │
5. Next.js serves: app/[subdomain]/page.tsx
   │
6. Page component fetches data
   ├─ Query database: WHERE subdomain = "acme"
   └─ Get client info + pages
   │
7. Render custom website
   └─ Shows client branding, content, contact info
```

### Middleware Logic (`middleware.ts`):

```typescript
export default function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  // hostname = "acme.stronaodnowa.pl"
  
  // Extract subdomain
  const subdomain = hostname.replace('.stronaodnowa.pl', '');
  // subdomain = "acme"
  
  // Reserved subdomains (not client sites)
  const RESERVED = ['www', 'app', 'admin', 'dashboard'];
  
  if (RESERVED.includes(subdomain)) {
    return NextResponse.next(); // No rewriting
  }
  
  // Rewrite to dynamic route
  // acme.stronaodnowa.pl → /acme
  url.pathname = `/${subdomain}${url.pathname}`;
  
  return NextResponse.rewrite(url);
}
```

### Dynamic Route (`app/[subdomain]/page.tsx`):

```typescript
export default async function ClientSitePage({ params }) {
  const { subdomain } = await params;
  // subdomain = "acme"
  
  // Fetch from database
  const client = await prisma.client.findUnique({
    where: { subdomain, status: 'ACTIVE' },
    include: { pages: { where: { published: true } } }
  });
  
  if (!client) {
    notFound(); // Show 404
  }
  
  // Render custom website
  return (
    <div>
      <h1>{client.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: client.pages[0].content }} />
    </div>
  );
}
```

---

## 🗄️ Database Schema

### Client Table:

```sql
CREATE TABLE Client (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  subdomain   TEXT UNIQUE NOT NULL,  ← Used for routing
  email       TEXT NOT NULL,
  phone       TEXT,
  primaryColor TEXT DEFAULT '#000000',
  status      TEXT DEFAULT 'PENDING', ← PENDING → ACTIVE
  createdAt   TIMESTAMP,
  updatedAt   TIMESTAMP
);
```

### Page Table:

```sql
CREATE TABLE Page (
  id        TEXT PRIMARY KEY,
  clientId  TEXT NOT NULL,  ← Links to Client
  slug      TEXT NOT NULL,   ← 'home', 'about', etc.
  title     TEXT NOT NULL,
  content   TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  
  FOREIGN KEY (clientId) REFERENCES Client(id)
  UNIQUE (clientId, slug)  ← One page per slug per client
);
```

---

## 🔄 Complete Example Flow

### Creating "Acme Corporation" Website:

```bash
# 1. Admin fills form
Name: Acme Corporation
Subdomain: acme
Email: contact@acme.com

# 2. API call
POST /api/clients
Body: { name: "Acme Corporation", subdomain: "acme", ... }

# 3. Database creates record
INSERT INTO Client (name, subdomain, ...) VALUES (...)
INSERT INTO Page (clientId, slug, title, ...) VALUES (...)

# 4. Vercel API call
POST https://api.vercel.com/v10/projects/.../domains
Body: { name: "acme.stronaodnowa.pl" }

# 5. Vercel configures:
- DNS: acme.stronaodnowa.pl → your-app.vercel.app
- SSL: Certificate for *.stronaodnowa.pl
- Ready in ~5 seconds

# 6. Response to admin
{
  success: true,
  url: "https://acme.stronaodnowa.pl",
  message: "Client created successfully!"
}

# 7. Website is live!
Visit: https://acme.stronaodnowa.pl
Shows: Acme Corporation homepage with custom content
```

---

## ⚠️ Current Limitations

### What's Working:
✅ Form submission  
✅ Database storage  
✅ Validation logic  
✅ Vercel API integration (when configured)

### What's NOT Working Yet:
❌ **Database not connected** - Need to create Vercel Postgres  
❌ **Custom domain not connected** - Need to add stronaodnowa.pl to Vercel  
❌ **Subdomains don't work yet** - Need domain + database

### To Make It Work:

**1. Connect Database (5 min):**
```bash
# Via Vercel Dashboard
→ Storage → Create Postgres
→ Copy connection string

# Add to .env.local
DATABASE_URL="postgresql://..."

# Run migration
npm run db:push
```

**2. Connect Domain (10 min):**
```bash
# Via Vercel Dashboard
→ Settings → Domains
→ Add: stronaodnowa.pl
→ Add: *.stronaodnowa.pl (wildcard)

# Update DNS at registrar
# Wait for propagation
```

**3. Test:**
```bash
# Create a client
Visit: https://stronaodnowa.pl/dashboard/clients

# Fill form, submit

# Wait ~5 seconds

# Visit website
https://acme.stronaodnowa.pl
```

---

## 🚀 Future Enhancements

### Planned Features:

1. **Payment Integration (Stripe)**
   - User selects 399/599 PLN package
   - Payment processed via Stripe
   - Website created after payment confirmed
   - Add to database before payment

2. **Countdown Banner**
   - Show banner for 48 hours after creation
   - Timer counts down
   - "Upgrade Now" button links to Stripe
   - Hide after payment or time expires

3. **Custom Content Editor**
   - Admin can edit client website content
   - WYSIWYG editor
   - Upload images
   - Preview changes before publishing

4. **Email Notifications**
   - Email to client when site is ready
   - Include access details
   - Send when payment received

---

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `app/(dashboard)/dashboard/clients/page.tsx` | Form UI for creating clients |
| `app/api/clients/route.ts` | API endpoint (POST/GET) for client operations |
| `lib/vercel/domains-api.ts` | Vercel API wrapper for subdomain management |
| `middleware.ts` | Subdomain detection and URL rewriting |
| `app/[subdomain]/page.tsx` | Dynamic route that renders client websites |
| `prisma/schema.prisma` | Database schema definition |

---

## 🎯 Summary

**How It Works:**
1. Admin enters client details in form
2. Server validates and saves to database
3. Subdomain added to Vercel via API
4. Vercel configures DNS + SSL automatically
5. Client website goes live in ~5 seconds
6. Anyone can visit `subdomain.stronaodnowa.pl`

**Current Status:**
- ✅ Code is ready
- ❌ Database not connected (30 min to fix)
- ❌ Domain not connected (10 min to fix)
- ⚠️  Subdomains don't work yet until both are done

**Next Steps:**
See `HOW_TO_ENABLE_SUBDOMAINS.md` for step-by-step setup instructions.

