export default function ClientsPage() {
  // This would fetch from API in a real implementation
  const clients = [
    { id: '1', name: 'Acme Corp', subdomain: 'acme', status: 'active', domain: 'acme.example.com' },
    { id: '2', name: 'TechStart', subdomain: 'techstart', status: 'active', domain: 'techstart.example.com' },
  ];
  
  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Clients</h1>
          <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Add New Client
          </button>
        </div>
        
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Subdomain</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Domain</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{client.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{client.subdomain}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{client.domain}</td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:underline">Edit</button>
                    <button className="ml-4 text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

