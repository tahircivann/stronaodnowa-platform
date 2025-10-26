import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl.clone();
  
  // Split hostname (e.g., "client1.example.com" or "localhost:3000")
  const parts = hostname.split('.');
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/public')
  ) {
    return NextResponse.next();
  }
  
  // In production on Vercel, detect subdomain
  // In localhost, we'll use a query parameter for testing
  const isLocalhost = hostname.includes('localhost');
  
  if (isLocalhost) {
    // Local development: check for ?tenant= query param
    const tenantParam = url.searchParams.get('tenant');
    if (tenantParam && pathname !== `/${tenantParam}`) {
      // Rewrite to tenant route
      url.pathname = `/${tenantParam}${pathname}`;
      url.searchParams.delete('tenant');
      return NextResponse.rewrite(url);
    }
  } else {
    // Production: detect subdomain from hostname
    // Assuming structure: subdomain.domain.com
    if (parts.length > 2 || (parts.length === 2 && parts[0] !== 'www')) {
      const subdomain = parts[0];
      
      // Rewrite to tenant route
      if (pathname.startsWith(`/${subdomain}`)) {
        return NextResponse.next();
      }
      
      url.pathname = `/${subdomain}${pathname}`;
      return NextResponse.rewrite(url);
    }
  }
  
  // Default: continue to regular pages
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

