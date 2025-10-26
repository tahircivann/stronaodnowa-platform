import { prisma } from '@/lib/db/prisma';
import { notFound } from 'next/navigation';

interface LayoutProps {
  children: React.ReactNode;
  params: {
    subdomain: string;
  };
}

export default async function TenantLayout({ children, params }: LayoutProps) {
  const client = await prisma.client.findUnique({
    where: { subdomain: params.subdomain },
  });
  
  if (!client || client.status !== 'ACTIVE') {
    notFound();
  }
  
  return <div className="min-h-screen bg-gray-50">{children}</div>;
}

