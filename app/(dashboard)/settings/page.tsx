export default function SettingsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="mb-8 text-4xl font-bold">Settings</h1>
        
        <div className="space-y-6">
          <section className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">General Settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  className="mt-1 block w-full rounded-md border-gray-300"
                  defaultValue="Strona Odnowa Platform"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300"
                  defaultValue="admin@stronaodnowa.com"
                />
              </div>
            </div>
          </section>
          
          <section className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-semibold">Integration Settings</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="vercelToken" className="block text-sm font-medium text-gray-700">
                  Vercel API Token
                </label>
                <input
                  type="password"
                  id="vercelToken"
                  className="mt-1 block w-full rounded-md border-gray-300"
                  placeholder="Enter your Vercel API token"
                />
              </div>
            </div>
          </section>
          
          <div className="flex gap-4">
            <button className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700">
              Save Changes
            </button>
            <button className="rounded border border-gray-300 px-6 py-2 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

