interface ClientCardProps {
  id: string;
  name: string;
  subdomain: string;
  domain?: string;
  status: 'active' | 'inactive' | 'suspended';
}

export function ClientCard({ name, subdomain, domain, status }: ClientCardProps) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            status === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {status}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-medium">Subdomain:</span> {subdomain}
        </p>
        {domain && (
          <p>
            <span className="font-medium">Domain:</span> {domain}
          </p>
        )}
      </div>
      
      <div className="mt-4 flex gap-2">
        <button className="flex-1 rounded bg-blue-600 py-2 text-sm text-white hover:bg-blue-700">
          View Site
        </button>
        <button className="flex-1 rounded border border-gray-300 py-2 text-sm hover:bg-gray-50">
          Edit
        </button>
      </div>
    </div>
  );
}

