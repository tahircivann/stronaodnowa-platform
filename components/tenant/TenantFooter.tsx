'use client';

import { useTenant } from '@/lib/tenant/context';

export function TenantFooter() {
  const { tenant } = useTenant();
  
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} {tenant?.name || 'Company'}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

