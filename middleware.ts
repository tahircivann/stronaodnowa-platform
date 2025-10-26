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
  
  // Get the subdomain from hostname
  const currentHost = hostname.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, '');
  
  // List of reserved subdomains (won't be treated as client sites)
  const RESERVED_SUBDOMAINS = ['www', 'app', 'admin', 'api', 'dashboard'];
  
  // Check if this is the main domain or a reserved subdomain
  if (
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN ||
    hostname === `www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}` ||
    RESERVED_SUBDOMAINS.includes(currentHost)
  ) {
    // Main site or dashboard - no rewriting needed
    return NextResponse.next();
  }
  
  // This is a client subdomain - rewrite to dynamic route
  // Example: client1.stronaodnowa.pl → /client1
  url.pathname = `/${currentHost}${url.pathname}`;
  
  return NextResponse.rewrite(url);
}