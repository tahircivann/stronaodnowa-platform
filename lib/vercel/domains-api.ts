interface AddDomainResponse {
  name: string;
  verified: boolean;
  verification?: Array<{
    type: string;
    domain: string;
    value: string;
    reason: string;
  }>;
}

export class VercelDomainsAPI {
  private token: string;
  private projectId: string;
  private teamId?: string;
  
  constructor() {
    this.token = process.env.VERCEL_TOKEN!;
    this.projectId = process.env.VERCEL_PROJECT_ID!;
    this.teamId = process.env.VERCEL_TEAM_ID;
    
    if (!this.token || !this.projectId) {
      throw new Error('Missing Vercel credentials in environment variables');
    }
  }
  
  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }
  
  private getUrl(endpoint: string) {
    const baseUrl = `https://api.vercel.com/v10/projects/${this.projectId}${endpoint}`;
    return this.teamId ? `${baseUrl}?teamId=${this.teamId}` : baseUrl;
  }
  
  /**
   * Add a subdomain to the Vercel project
   */
  async addDomain(subdomain: string): Promise<AddDomainResponse> {
    const domain = `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    
    const response = await fetch(this.getUrl('/domains'), {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ name: domain }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Failed to add domain: ${error.error?.message || 'Unknown error'}`);
    }
    
    return response.json();
  }
  
  /**
   * Verify domain configuration
   */
  async verifyDomain(subdomain: string): Promise<boolean> {
    const domain = `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    
    const response = await fetch(this.getUrl(`/domains/${domain}/verify`), {
      method: 'POST',
      headers: this.getHeaders(),
    });
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    return data.verified;
  }
  
  /**
   * Get domain status
   */
  async getDomainStatus(subdomain: string) {
    const domain = `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    
    const response = await fetch(this.getUrl(`/domains/${domain}`), {
      method: 'GET',
      headers: this.getHeaders(),
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  }
  
  /**
   * Remove domain from project
   */
  async removeDomain(subdomain: string): Promise<boolean> {
    const domain = `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
    
    const response = await fetch(this.getUrl(`/domains/${domain}`), {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    
    return response.ok;
  }
}
