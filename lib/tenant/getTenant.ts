import { Tenant } from './types';
// import { prisma } from '@/lib/db/prisma';

export async function getTenant(subdomain: string): Promise<Tenant | null> {
  try {
    // In production, fetch from database
    // const tenant = await prisma.client.findUnique({
    //   where: { subdomain },
    // });
    
    // Mock data for now
    const tenants: Record<string, Tenant> = {
      acme: {
        id: '1',
        name: 'Acme Corporation',
        subdomain: 'acme',
        domain: 'acme.stronaodnowa.com',
        description: 'A leading corporation in innovation',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      techstart: {
        id: '2',
        name: 'TechStart Inc',
        subdomain: 'techstart',
        domain: 'techstart.stronaodnowa.com',
        description: 'Your startup technology partner',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    
    return tenants[subdomain] || null;
  } catch (error) {
    console.error('Error fetching tenant:', error);
    return null;
  }
}

