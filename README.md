# Strona Odnowa Platform

A multi-tenant SaaS platform built with Next.js, TypeScript, and Tailwind CSS. This platform allows you to manage multiple client websites, each with their own subdomain.

## Features

- 🏢 **Multi-tenant Architecture**: Each client gets their own subdomain (e.g., `client1.yourdomain.com`)
- 🎨 **Customizable Themes**: Per-client branding and customization
- 🚀 **Dynamic Routing**: Automatic subdomain routing via Next.js middleware
- 📊 **Admin Dashboard**: Manage clients, domains, and settings
- 🌐 **Vercel Integration**: Automatic domain management via Vercel API
- 💾 **Database Support**: PostgreSQL with Prisma ORM

## Project Structure

```
stronaodnowa-platform/
├── app/
│   ├── (marketing)/              # Public marketing pages
│   │   ├── page.tsx             # Homepage
│   │   ├── pricing/
│   │   └── contact/
│   ├── (dashboard)/              # Admin dashboard
│   │   ├── dashboard/
│   │   ├── clients/
│   │   └── settings/
│   ├── [subdomain]/              # Client sites (dynamic)
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── [...slug]/
│   ├── api/
│   │   ├── clients/
│   │   ├── domains/
│   │   └── webhook/
│   └── middleware.ts             # Subdomain routing
├── lib/
│   ├── tenant/                   # Tenant management
│   ├── vercel/                   # Vercel API
│   └── db/                       # Prisma client
├── components/
│   ├── tenant/                   # Client components
│   └── dashboard/                # Admin components
└── prisma/
    └── schema.prisma             # Database schema
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Vercel account (for domain management)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tahircivann/stronaodnowa-platform.git
   cd stronaodnowa-platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create `.env.local` file in the root directory (see `CONFIG.md` for details):
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/stronaodnowa"
   VERCEL_API_TOKEN="your_token_here"
   NEXT_PUBLIC_ROOT_DOMAIN="stronaodnowa.com"
   ```

4. **Initialize the database:**
   ```bash
   npm run db:generate
   npm run db:push
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

6. **Open your browser:**
   - Main site: http://localhost:3000
   - Client sites (use query params): http://localhost:3000?tenant=acme

## Usage

### Testing Locally

Since subdomain routing doesn't work on `localhost`, use query parameters:

- **Marketing site**: `http://localhost:3000`
- **Client site**: `http://localhost:3000?tenant=acme`
- **Another client**: `http://localhost:3000?tenant=techstart`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard
4. Configure your domain and DNS settings

See `CONFIG.md` for detailed configuration instructions.

## How It Works

1. **Middleware Detection**: The `middleware.ts` file intercepts requests and detects subdomains
2. **Tenant Lookup**: The system looks up the tenant data by subdomain
3. **Dynamic Routing**: Next.js rewrites the request to the appropriate tenant route
4. **Client Rendering**: Each client site is rendered with their own branding and content

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
