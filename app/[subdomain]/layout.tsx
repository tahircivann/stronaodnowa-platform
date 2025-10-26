import { getTenant } from '@/lib/tenant/getTenant';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    subdomain: string;
  };
}

export default async function TenantLayout({ children, params }: LayoutProps) {
  const tenant = await getTenant(params.subdomain);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {tenant ? (
        <>{children}</>
      ) : (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Site not found</h1>
            <p className="mt-4 text-gray-600">This tenant does not exist.</p>
          </div>
        </div>
      )}
    </div>
  );
}

