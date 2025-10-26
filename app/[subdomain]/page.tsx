import { getTenant } from '@/lib/tenant/getTenant';

interface PageProps {
  params: {
    subdomain: string;
  };
}

export default async function TenantHomePage({ params }: PageProps) {
  const tenant = await getTenant(params.subdomain);
  
  if (!tenant) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Tenant not found</h1>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">{tenant.name}</h1>
        </div>
      </header>
      
      <main className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8">
            <p className="text-lg text-gray-600">{tenant.description || 'Welcome to our website'}</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Add tenant-specific content here */}
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">Feature One</h3>
              <p className="text-gray-600">Description of feature one</p>
            </div>
            
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">Feature Two</h3>
              <p className="text-gray-600">Description of feature two</p>
            </div>
            
            <div className="rounded-lg border p-6">
              <h3 className="mb-2 text-xl font-semibold">Feature Three</h3>
              <p className="text-gray-600">Description of feature three</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="mt-20 border-t bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4">
          <p className="text-center text-gray-600">© {new Date().getFullYear()} {tenant.name}</p>
        </div>
      </footer>
    </div>
  );
}

