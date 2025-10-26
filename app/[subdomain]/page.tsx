import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import ClientHeader from '@/components/tenant/ClientHeader';
import ClientFooter from '@/components/tenant/ClientFooter';

// Generate static params for all clients (ISR)
export async function generateStaticParams() {
  const clients = await prisma.client.findMany({
    where: { status: 'ACTIVE' },
    select: { subdomain: true },
  });
  
  return clients.map((client: { subdomain: string }) => ({
    subdomain: client.subdomain,
  }));
}

// Revalidate every hour (Incremental Static Regeneration)
export const revalidate = 3600;

export default async function ClientSitePage({
  params,
}: {
  params: { subdomain: string };
}) {
  const { subdomain } = params;
  
  // Fetch client data from database
  const client = await prisma.client.findUnique({
    where: { 
      subdomain,
    },
    include: {
      pages: {
        where: { published: true },
      },
    },
  });
  
  // If client not found or not active, show 404
  if (!client || client.status !== 'ACTIVE') {
    notFound();
  }
  
  // Fetch homepage content
  const homepage = (client.pages as any[]).find((page: any) => page.slug === 'home');
  
  return (
    <div className="min-h-screen flex flex-col">
      <ClientHeader 
        logo={client.logoUrl}
        name={client.name}
        primaryColor={client.primaryColor}
      />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-6">
            {homepage?.title || `Welcome to ${client.name}`}
          </h1>
          
          <div 
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: homepage?.content || '' }}
          />
          
          {/* Contact information */}
          <div className="mt-12 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>Email: {client.email}</p>
            {client.phone && <p>Phone: {client.phone}</p>}
          </div>
        </div>
      </main>
      
      <ClientFooter client={client} />
    </div>
  );
}