const VERCEL_API_BASE = 'https://api.vercel.com';

export interface VercelDomain {
  name: string;
  apexName: string;
  projectId: string;
  createdAt: number;
  updatedAt: number;
  cname: string[];
  verified: boolean;
}

/**
 * Add a domain to a Vercel project
 */
export async function addDomain(domain: string, projectId?: string): Promise<VercelDomain> {
  const apiToken = process.env.VERCEL_API_TOKEN;
  
  if (!apiToken) {
    throw new Error('VERCEL_API_TOKEN is not set');
  }
  
  const response = await fetch(`${VERCEL_API_BASE}/v9/projects/${projectId || 'stronaodnowa-platform'}/domains`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: domain,
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Failed to add domain: ${error.message}`);
  }
  
  return response.json();
}

/**
 * Verify domain configuration
 */
export async function verifyDomain(domain: string): Promise<{ verified: boolean; records?: any[] }> {
  const apiToken = process.env.VERCEL_API_TOKEN;
  
  if (!apiToken) {
    throw new Error('VERCEL_API_TOKEN is not set');
  }
  
  const response = await fetch(`${VERCEL_API_BASE}/v6/domains/${domain}/config`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to verify domain');
  }
  
  const data = await response.json();
  return {
    verified: data.verified || false,
    records: data.records,
  };
}

/**
 * Remove a domain from Vercel
 */
export async function removeDomain(domain: string): Promise<void> {
  const apiToken = process.env.VERCEL_API_TOKEN;
  
  if (!apiToken) {
    throw new Error('VERCEL_API_TOKEN is not set');
  }
  
  const response = await fetch(`${VERCEL_API_BASE}/v5/domains/${domain}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to remove domain');
  }
}

