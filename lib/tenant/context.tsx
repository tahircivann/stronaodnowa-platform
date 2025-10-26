'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tenant } from './types';

interface TenantContextType {
  tenant: Tenant | null;
  loading: boolean;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  loading: true,
});

export function TenantProvider({ children, tenant: initialTenant }: { children: React.ReactNode; tenant: Tenant | null }) {
  const [tenant, setTenant] = useState<Tenant | null>(initialTenant);
  const [loading, setLoading] = useState(false);

  return (
    <TenantContext.Provider value={{ tenant, loading }}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
}

