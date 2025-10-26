export default async function ClientSitePage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center text-white p-8">
        <h1 className="text-6xl font-bold mb-4">
          ✅ It Works!
        </h1>
        <p className="text-2xl mb-2">
          Subdomain: <strong>{subdomain}</strong>
        </p>
        <p className="text-lg opacity-80">
          You're viewing: {subdomain}.{process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'stronaodnowa.pl'}
        </p>
        <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur">
          <p className="text-sm">
            Middleware detected subdomain correctly ✓<br/>
            Dynamic routing working ✓<br/>
            Deployment successful ✓
          </p>
        </div>
      </div>
    </div>
  );
}

// Generate static params (empty for now - will be populated later)
export async function generateStaticParams() {
  return [];
}
