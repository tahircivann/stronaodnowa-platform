export default function DashboardPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-8 text-4xl font-bold">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-lg font-semibold">Total Clients</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-lg font-semibold">Active Sites</h3>
            <p className="text-3xl font-bold">10</p>
          </div>
          
          <div className="rounded-lg border p-6">
            <h3 className="mb-2 text-lg font-semibold">Revenue</h3>
            <p className="text-3xl font-bold">$0</p>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">Recent Activity</h2>
          <div className="space-y-4">
            <div className="rounded border p-4">
              <p>New client "Acme Corp" registered</p>
              <p className="text-sm text-gray-500">2 hours ago</p>
            </div>
            <div className="rounded border p-4">
              <p>Client "TechStart" updated their settings</p>
              <p className="text-sm text-gray-500">5 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

