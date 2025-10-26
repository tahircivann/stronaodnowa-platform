export default function PricingPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto max-w-7xl px-4">
        <h1 className="mb-12 text-4xl font-bold">Pricing</h1>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-2xl font-bold">Basic</h3>
            <p className="mb-4 text-gray-600">Perfect for small businesses</p>
            <p className="mb-4 text-4xl font-bold">$29<span className="text-lg">/mo</span></p>
            <ul className="mb-6 space-y-2">
              <li>✓ Custom subdomain</li>
              <li>✓ Basic customization</li>
              <li>✓ Email support</li>
            </ul>
            <button className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
              Get Started
            </button>
          </div>
          
          <div className="rounded-lg border-2 border-blue-600 p-6">
            <h3 className="mb-4 text-2xl font-bold">Professional</h3>
            <p className="mb-4 text-gray-600">For growing businesses</p>
            <p className="mb-4 text-4xl font-bold">$79<span className="text-lg">/mo</span></p>
            <ul className="mb-6 space-y-2">
              <li>✓ Custom domain</li>
              <li>✓ Advanced customization</li>
              <li>✓ Priority support</li>
              <li>✓ Analytics</li>
            </ul>
            <button className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
              Get Started
            </button>
          </div>
          
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-2xl font-bold">Enterprise</h3>
            <p className="mb-4 text-gray-600">For large organizations</p>
            <p className="mb-4 text-4xl font-bold">$199<span className="text-lg">/mo</span></p>
            <ul className="mb-6 space-y-2">
              <li>✓ Multiple domains</li>
              <li>✓ Full customization</li>
              <li>✓ Dedicated support</li>
              <li>✓ SLA guarantee</li>
            </ul>
            <button className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

