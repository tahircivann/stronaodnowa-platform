export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  domain?: string;
  description?: string;
  status: 'active' | 'inactive' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantConfig {
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    logo?: string;
  };
  features?: string[];
}

