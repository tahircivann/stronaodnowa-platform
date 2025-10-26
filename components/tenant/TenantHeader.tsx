'use client';

import Link from 'next/link';
import { useTenant } from '@/lib/tenant/context';

export function TenantHeader() {
  const { tenant } = useTenant();
  
  if (!tenant) return null;
  
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              {tenant.name}
            </Link>
          </div>
          
          <nav className="flex space-x-4">
            <Link href="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

