import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - api routes
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     */
    '/((?!api/|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};

export default function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const hostname = request.headers.get('host') || '';
  
  // For testing on vercel.app, use query parameter for subdomain
  const subdomainParam = url.searchParams.get('subdomain');
  if (subdomainParam) {
    url.pathname = `/${subdomainParam}${url.pathname}`;
    url.searchParams.delete('subdomain');
    return NextResponse.rewrite(url);
  }
  
  // Check if we're on a custom domain (production)
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  
  // If root domain is set, use subdomain detection
  if (rootDomain && hostname.endsWith(rootDomain)) {
    const currentHost = hostname.replace(`.${rootDomain}`, '').replace(`.${rootDomain}`, '');
    
    // List of reserved subdomains (won't be treated as client sites)
    const RESERVED_SUBDOMAINS = ['www', 'app', 'admin', 'api', 'dashboard'];
    
    // Check if this is the main domain or a reserved subdomain
    if (
      hostname === rootDomain ||
      hostname === `www.${rootDomain}` ||
      RESERVED_SUBDOMAINS.includes(currentHost) ||
      !currentHost ||
      currentHost === hostname
    ) {
      // Main site or dashboard - no rewriting needed
      return NextResponse.next();
    }
    
    // This is a client subdomain - rewrite to dynamic route
    // Example: client1.stronaodnowa.pl → /client1
    url.pathname = `/${currentHost}${url.pathname}`;
    
    return NextResponse.rewrite(url);
  }
  
  // For Vercel's default domain (stronaodnowa-platform.vercel.app)
  // We need a different approach - use path-based routing for testing
  // Main site handling
  return NextResponse.next();
}
