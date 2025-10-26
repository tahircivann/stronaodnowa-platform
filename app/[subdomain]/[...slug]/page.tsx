import { getTenant } from '@/lib/tenant/getTenant';

interface PageProps {
  params: Promise<{
    subdomain: string;
    slug: string[];
  }>;
}

export default async function TenantSlugPage({ params }: PageProps) {
  const { subdomain, slug: slugArray } = await params;
  const tenant = await getTenant(subdomain);
  const slug = slugArray.join('/');
  
  if (!tenant) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Tenant not found</h1>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-6 text-4xl font-bold">{tenant.name}</h1>
        <div className="rounded-lg border bg-white p-8 shadow">
          <p className="mb-4 text-lg text-gray-600">Page: /{slug}</p>
          <p className="text-gray-500">This is a dynamic page under the tenant site.</p>
        </div>
      </div>
    </div>
  );
}

