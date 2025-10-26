# Architecture & How It Works

## 🏗️ Overall Architecture

This is a **multi-tenant platform** - one codebase that serves hundreds of unique client websites, each with their own subdomain.

### Core Concept

```
One Application
    ↓
Multiple Subdomains
    ↓
Different Content Per Subdomain
```

**Example:**
- `acme.stronaodnowa.pl` → Shows Acme Corporation's website
- `techstart.stronaodnowa.pl` → Shows TechStart's website
- `restaurant.stronaodnowa.pl` → Shows Restaurant's website
- ALL from the SAME codebase deployed once!

---

## 🔄 Complete Request Flow

### Step-by-Step: What Happens When Someone Visits

**Scenario:** Visitor goes to `https://acme.stronaodnowa.pl`

```
┌────────────────────────────────────────────────────────┐
│ STEP 1: DNS Resolution                                 │
│ Browser asks: "Where is acme.stronaodnowa.pl?"        │
│ DNS Server: "Points to Vercel Edge Network"             │
│ Time: ~100ms                                            │
└────────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────────┐
│ STEP 2: SSL/TLS Handshake                              │
│ Browser: "Is this secure?"                             │
│ Vercel: "Yes! Here's wildcard SSL for *.stronaodnowa"  │
│ Browser: "✅ Connection secured"                        │
│ Time: ~200ms                                            │
└────────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────────┐
│ STEP 3: Request Reaches Middleware                     │
│ File: middleware.ts                                     │
│                                                          │
│ What it does:                                           │
│ 1. Reads the hostname: "acme.stronaodnowa.pl"          │
│ 2. Extracts subdomain: "acme"                           │
│ 3. Checks if it's the main domain (it's not)           │
│ 4. Rewrites URL internally to: "/acme"                 │
│ 5. Browser STILL shows: "acme.stronaodnowa.pl" ✓      │
│ Time: <1ms                                              │
└────────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────────┐
│ STEP 4: Next.js Dynamic Route Activated                │
│ File: app/[subdomain]/page.tsx                         │
│                                                          │
│ This is the MAGIC route pattern:                       │
│ - [subdomain] means "match any value"                  │
│ - Value gets passed as parameter: { subdomain: "acme" }│
│                                                          │
│ Code receives:                                          │
│ params = { subdomain: "acme" }                          │
└────────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────────┐
│ STEP 5: Query Database                                 │
│ File: lib/db/prisma.ts                                  │
│                                                          │
│ Database query:                                         │
│ "SELECT * FROM clients WHERE subdomain = 'acme'"        │
│                                                          │
│ Returns:                                                 │
│ {                                                       │
│   name: "Acme Corporation",                            │
│   email: "contact@acme.com",                          │
│   primaryColor: "#FF5733",                            │
│   logoUrl: "https://...",                             │
│   status: "ACTIVE"                                     │
│ }                                                       │
│ Time: ~100-500ms (depending on DB location)           │
└────────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────────┐
│ STEP 6: Fetch Page Content                             │
│ Database query:                                         │
│ "SELECT * FROM pages WHERE clientId = 'acme-id'"       │
│                                                          │
│ Returns:                                                │
│ [{                                                    │
│   slug: "home",                                        │
│   title: "Welcome to Acme",                           │
│   content: "<h1>Hello World</h1>"                     │
│ }]                                                     │
└────────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────────┐
│ STEP 7: Render HTML                                    │
│ React renders the page with:                           │
│ - Client's branding (colors, logo)                     │
│ - Client's content                                     │
│ - Client's contact info                                │
│                                                          │
│ HTML Output:                                           │
│ <html>                                                │
│   <header style="primary-color: #FF5733">...</header>  │
│   <main><h1>Welcome to Acme</h1>...</main>           │
│   <footer>...</footer>                                │
│ </html>                                                │
└────────────────────────────────────────────────────────┘
                       ↓
┌────────────────────────────────────────────────────────┐
│ STEP 8: Cache & Respond                                │
│ Vercel caches the page for 1 hour                     │
│ Sends HTML to browser                                   │
│ Total time: ~1 second                                   │
│                                                          │
│ Next 1000 visitors: Get from cache (~50ms)             │
└────────────────────────────────────────────────────────┘
```

---

## 🔑 Key Files Explained

### 1. middleware.ts - The Traffic Director

**Location:** Root directory

**Purpose:** Intercepts EVERY request before it reaches your pages

**How it works:**

```typescript
export default function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  // Example: "acme.stronaodnowa.pl"
  
  // Extract subdomain
  const currentHost = hostname.replace(`.stronaodnowa.pl`, '');
  // Result: "acme"
  
  // Is this the main domain?
  if (hostname === 'stronaodnowa.pl') {
    // Yes - show main marketing site
    return NextResponse.next();
  }
  
  // No - it's a subdomain
  // Rewrite URL internally
  url.pathname = `/${currentHost}${url.pathname}`;
  // Example: "/acme/about" for "acme.stronaodnowa.pl/about"
  
  return NextResponse.rewrite(url);
}
```

**Analogy:** Like a hotel receptionist who checks which guest (subdomain) is arriving and directs them to the right floor.

---

### 2. app/[subdomain]/page.tsx - The Dynamic Handler

**Location:** `app/[subdomain]/page.tsx`

**Purpose:** Receives the subdomain parameter and fetches client data

**How it works:**

```typescript
// The [subdomain] syntax means "dynamic segment"
export default async function ClientSitePage({ params }) {
  // params contains: { subdomain: "acme" }
  const { subdomain } = await params;
  
  // Query database
  const client = await prisma.client.findUnique({
    where: { subdomain: "acme" }
  });
  
  // Render with client's data
  return (
    <div>
      <h1 style={{ color: client.primaryColor }}>
        {client.name}
      </h1>
    </div>
  );
}
```

**Analogy:** Like a waiter who receives a table number (subdomain) and brings that table's specific order (client data).

---

### 3. Database Schema (Prisma)

**Location:** `prisma/schema.prisma`

**Purpose:** Defines the structure of your data

**Key Models:**

```prisma
model Client {
  id          String   @id @default(cuid())
  name        String           // "Acme Corporation"
  subdomain   String   @unique // "acme"
  email       String           // "contact@acme.com"
  primaryColor String         // "#FF5733"
  status      ClientStatus     // ACTIVE, PENDING, SUSPENDED
  
  pages      Page[]            // Pages for this client
}
```

**Analogy:** Like a blueprint for a building - defines what data you can store.

---

### 4. API Routes - Client Management

**Location:** `app/api/clients/route.ts`

**Purpose:** Create, read, update, delete clients

**Example POST request:**

```typescript
// When admin creates a new client
POST /api/clients
Body: {
  name: "Acme Corp",
  subdomain: "acme",
  email: "contact@acme.com"
}

// Process:
1. Validate input
2. Create client in database
3. Create default homepage
4. Add subdomain to Vercel (if configured)
5. Return success + URL

// Result:
Response: {
  success: true,
  url: "https://acme.stronaodnowa.pl"
}
```

---

## 🎯 The Magic: How One Codebase Serves Multiple Clients

### Traditional Approach ❌

```
Client 1 → Separate deployment on Server 1
Client 2 → Separate deployment on Server 2
Client 3 → Separate deployment on Server 3

Problems:
- 100 clients = 100 deployments to maintain
- Update needs 100 deployments
- Expensive infrastructure
```

### Our Approach ✅

```
All clients → ONE deployment on Vercel

Middleware routes to dynamic route:
client1.stronaodnowa.pl → /client1 (fetches client1 data)
client2.stronaodnowa.pl → /client2 (fetches client2 data)
client3.stronaodnowa.pl → /client3 (fetches client3 data)

Benefits:
- 100 clients = 1 deployment
- Update once, all clients get it
- Shared infrastructure
- Wildcard SSL covers all
```

---

## 🌐 Domain & DNS Architecture

### How Subdomains Work

**DNS Configuration:**

```
Domain: stronaodnowa.pl
├─ Root domain → Points to Vercel
│  └─ Main site: stronaodnowa.pl
│
└─ Wildcard subdomain → Points to Vercel
   ├─ ANY subdomain works instantly
   ├─ demo.stronaodnowa.pl ✓
   ├─ test.stronaodnowa.pl ✓
   ├─ acme.stronaodnowa.pl ✓
   └─ ANYTHING.stronaodnowa.pl ✓
```

**DNS Records:**

```
Type: A Record
Name: stronaodnowa.pl
Value: Vercel's IP address

Type: A Record (Wildcard)
Name: *.stronaodnowa.pl
Value: Vercel's IP address
```

**What this means:**
- You configure DNS ONCE
- You get SSL certificate ONCE (wildcard)
- ANY new subdomain works immediately
- No additional DNS/SSL setup needed

---

## 💾 Database Architecture

### Data Flow for Client Sites

**When visitor requests `acme.stronaodnowa.pl`:**

```sql
-- Step 1: Find the client
SELECT * FROM clients 
WHERE subdomain = 'acme' 
AND status = 'ACTIVE';

-- Returns:
┌─────┬──────────────────┬───────────┬──────────────────┬────────┐
│ id  │ name             │ subdomain │ primaryColor     │ status │
├─────┼──────────────────┼───────────┼──────────────────┼────────┤
│ abc │ Acme Corporation │ acme      │ #FF5733          │ ACTIVE │
└─────┴──────────────────┴───────────┴──────────────────┴────────┘

-- Step 2: Get client's pages
SELECT * FROM pages 
WHERE clientId = 'abc' 
AND published = true;

-- Returns:
┌─────┬──────┬──────────────────────┬──────────────────┐
│ id  │ slug │ title                │ content          │
├─────┼──────┼──────────────────────┼──────────────────┤
│ xyz │ home │ Welcome to Acme      │ <h1>Hello</h1>   │
└─────┴──────┴──────────────────────┴──────────────────┘
```

### Tenant Isolation

**Important:** Each client's data is completely isolated

```typescript
// Client A's request
acme.stronaodnowa.pl → Only gets Acme's data

// Client B's request  
techstart.stronaodnowa.pl → Only gets TechStart's data

// They NEVER see each other's data
// This is ensured by the database query filtering
```

---

## 🔒 Security Architecture

### Middleware Security

```typescript
// 1. Prevent access to admin routes
if (subdomain === 'admin' || subdomain === 'dashboard') {
  return NextResponse.redirect('/');
}

// 2. Only serve active clients
const client = await getClient(subdomain);
if (!client || client.status !== 'ACTIVE') {
  return NextResponse.notFound();
}

// 3. Rate limiting (prevent abuse)
// Can add rate limiting logic here
```

### Database Security

```typescript
// All queries are parameterized (Prisma does this automatically)
// Prevents SQL injection

// Example:
prisma.client.findUnique({
  where: { subdomain: userInput }  // ✅ Safe
});

// NOT:
prisma.$queryRaw(`SELECT * FROM clients WHERE subdomain = ${userInput}`)  // ❌ Dangerous
```

---

## 🚀 Performance Optimizations

### 1. Incremental Static Regeneration (ISR)

```typescript
// app/[subdomain]/page.tsx
export const revalidate = 3600; // 1 hour

// First visitor:
// - Query database
// - Generate HTML
// - Cache for 1 hour

// Next 1000 visitors (within 1 hour):
// - Serve from cache (50ms response)
// - No database query

// After 1 hour:
// - Background regeneration
// - Update cache silently
```

### 2. Edge Network

```
User in Warsaw → Vercel edge in Warsaw (10ms)
User in NYC → Vercel edge in NYC (10ms)
User in Singapore → Vercel edge in Singapore (10ms)

Same code, but served from closest location!
```

### 3. Database Query Optimization

```typescript
// Use indexes (already in schema)
@@index([subdomain])
@@index([status])

// Means fast lookups:
- Finding client by subdomain: O(1) - instant
- Filtering by status: O(1) - instant

// Without indexes:
- Would be O(n) - slow for thousands of records
```

---

## 📊 Data Model Relationships

```
Client (1) ←───→ (Many) Pages
               
    id: "abc123"
    name: "Acme Corp"
    subdomain: "acme"
    
    └─ Pages:
       ├─ id: "page1", slug: "home"
       ├─ id: "page2", slug: "about"
       └─ id: "page3", slug: "contact"
```

**Why this design:**
- One client can have multiple pages
- Pages belong to a specific client
- Deleting client deletes all their pages (CASCADE)

---

## 🎨 How Branding Works

### Client Customization

```typescript
// Each client has custom styling
{
  primaryColor: "#FF5733",     // Main brand color
  logoUrl: "https://...",      // Company logo
  description: "...",          // Meta description
}

// Applied in components
<header style={{ backgroundColor: client.primaryColor }}>
  <img src={client.logoUrl} />
</header>
```

**Result:** Each client's site looks completely unique, but uses the same code!

---

## 🔄 State Flow Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     USER CLICKS                         │
│              "Visit acme.stronaodnowa.pl"               │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                  MIDDLEWARE ACTS                        │
│  1. Extracts "acme" from hostname                       │
│  2. Checks if it's a valid subdomain                    │
│  3. Rewrites URL to "/acme" (internal)                  │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│              DYNAMIC ROUTE [subdomain]                   │
│  1. Receives { subdomain: "acme" }                      │
│  2. Calls getTenant("acme")                             │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                  DATABASE QUERY                         │
│  1. SELECT * FROM clients WHERE subdomain = 'acme'     │
│  2. SELECT * FROM pages WHERE clientId = 'abc'          │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│                  RENDER PAGE                            │
│  1. Apply client's branding (colors, logo)              │
│  2. Inject page content                                 │
│  3. Generate HTML                                         │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│               SEND TO USER                              │
│  1. Cache response (1 hour)                            │
│  2. Return HTML                                          │
│  3. Browser displays page                               │
└─────────────────────────────────────────────────────────┘
```

---

## 💡 Key Concepts Summary

### 1. **Dynamic Routing**
- `[subdomain]` = placeholder for any value
- `app/[subdomain]/page.tsx` handles ALL subdomains
- The value becomes a parameter

### 2. **URL Rewriting**
- Browser shows: `acme.stronaodnowa.pl`
- Internally: `/acme`
- User never knows the internal routing

### 3. **Tenant Isolation**
- Each subdomain gets its own data
- Database queries filter by subdomain
- Complete data separation

### 4. **Caching Strategy**
- First visit: Database query + render
- Next visits: Serve from cache
- Silent background updates

### 5. **Wildcard Everything**
- One DNS record handles all subdomains
- One SSL certificate covers all subdomains
- No per-client configuration needed

---

## 🎓 Learning Path

1. **Start with:** `middleware.ts` - How requests are routed
2. **Then:** `app/[subdomain]/page.tsx` - How data is fetched
3. **Then:** `lib/tenant/getTenant.ts` - How database queries work
4. **Finally:** `prisma/schema.prisma` - How data is structured

---

This architecture allows you to serve unlimited clients from a single deployment! 🚀

