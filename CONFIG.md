# Configuration Guide

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/stronaodnowa?schema=public"

# Vercel API
VERCEL_API_TOKEN="your_vercel_api_token_here"
VERCEL_TEAM_ID="your_team_id_here"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_ROOT_DOMAIN="stronaodnowa.com"

# Authentication (optional - add when implementing auth)
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"

# Environment
NODE_ENV="development"
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy the environment variables above into `.env.local`
   - Update with your actual values

3. **Set up the database:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **View Prisma Studio (optional):**
   ```bash
   npm run db:studio
   ```

## Project Structure

- `app/(marketing)/` - Public marketing pages
- `app/(dashboard)/` - Admin dashboard pages
- `app/[subdomain]/` - Client-facing tenant sites
- `app/api/` - API routes
- `lib/tenant/` - Tenant management utilities
- `lib/vercel/` - Vercel API integration
- `components/tenant/` - Client-facing components
- `components/dashboard/` - Admin components
- `prisma/` - Database schema and migrations

## Testing Tenant Sites Locally

Since subdomain routing doesn't work on localhost, use query parameters:

- Marketing site: `http://localhost:3000`
- Client site: `http://localhost:3000?tenant=acme` or `http://localhost:3000?tenant=techstart`

## Deployment

Deploy to Vercel:

1. Connect your GitHub repository
2. Add environment variables in Vercel dashboard
3. Configure domain routing in `vercel.json`

## Architecture

- **Multi-tenant SaaS**: Each client gets their own subdomain
- **Dynamic routing**: Subdomain detection via middleware
- **Database**: PostgreSQL with Prisma ORM
- **Infrastructure**: Vercel for hosting and domain management

