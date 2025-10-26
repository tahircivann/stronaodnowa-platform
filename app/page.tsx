import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            STRONAODNOWA.PL
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            Multi-tenant platform is live! 🚀
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Create instant, custom websites for clients in 30 seconds. 
            One codebase powers hundreds of unique branded websites.
          </p>
        </div>

        {/* Platform Explanation */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Client Calls You</h3>
              <p className="text-gray-400">You ask: "What's your company name?"</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">You Create Website</h3>
              <p className="text-gray-400">30 seconds to fill in form and create</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Client Sees Live Site</h3>
              <p className="text-gray-400">Impressed, they buy immediately!</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-3 text-blue-400">✨ The "Reverse Sales Funnel" Concept</h3>
            <p className="text-gray-300 mb-4">
              Traditional approach: Client pays → You build → Client gets website (3 weeks)
            </p>
            <p className="text-gray-300">
              <strong className="text-green-400">Our approach:</strong> Client calls → You create instantly → Client sees website → Client buys! (10 minutes)
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Platform Pages</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Test Subdomain Route */}
            <Link 
              href="/test" 
              className="group bg-gray-800/50 hover:bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🧪</span>
                <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                  Test Subdomain
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Visit: <code className="text-blue-400">/test</code>
              </p>
              <p className="text-sm text-gray-300">
                See how subdomain routing works. Test the path-based subdomain functionality.
              </p>
              <div className="mt-4 text-sm text-green-400">✓ Working</div>
            </Link>

            {/* Demo Subdomain Route */}
            <Link 
              href="/demo" 
              className="group bg-gray-800/50 hover:bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🎯</span>
                <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                  Demo Subdomain
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Visit: <code className="text-purple-400">/demo</code>
              </p>
              <p className="text-sm text-gray-300">
                Another example of client subdomain functionality.
              </p>
              <div className="mt-4 text-sm text-green-400">✓ Working</div>
            </Link>

            {/* Dashboard Overview */}
            <Link 
              href="/dashboard" 
              className="group bg-gray-800/50 hover:bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-500 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📊</span>
                <h3 className="text-2xl font-bold group-hover:text-green-400 transition-colors">
                  Dashboard
                </h3>
              </div>
              <p className="text-gray-400 mb-4">
                Visit: <code className="text-green-400">/dashboard</code>
              </p>
              <p className="text-sm text-gray-300">
                Admin overview showing total clients, active sites, and revenue metrics.
              </p>
              <div className="mt-4 text-sm text-yellow-400">⚠️ Mock data</div>
            </Link>

            {/* Create Client Websites */}
            <Link 
              href="/dashboard/clients" 
              className="group bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg p-6 border border-blue-500 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🚀</span>
                <h3 className="text-2xl font-bold group-hover:text-white transition-colors">
                  Create Websites
                </h3>
              </div>
              <p className="text-gray-200 mb-4">
                Visit: <code className="text-blue-200">/dashboard/clients</code>
              </p>
              <p className="text-sm text-white mb-4">
                Add new client and create their website in 30 seconds!
              </p>
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded px-3 py-2 text-sm text-yellow-200">
                ⚠️ Database required
              </div>
            </Link>
          </div>
        </div>

        {/* Architecture Info */}
        <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-lg p-8 border border-gray-700">
          <h3 className="text-2xl font-bold mb-4">🏗️ Technical Architecture</h3>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <strong>Middleware:</strong> Detects subdomain from hostname
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <strong>Dynamic Routing:</strong> Serves unique content per subdomain
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <strong>Database:</strong> Stores client information and pages
            </p>
            <p className="flex items-center gap-2">
              <span className="text-green-400">✓</span>
              <strong>Edge Network:</strong> Global CDN for ultra-fast loading
            </p>
          </div>
        </div>

        {/* Example Use Case */}
        <div className="max-w-4xl mx-auto mt-12 bg-gray-800/30 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">💡 Example:</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <code className="text-blue-400">acme.stronaodnowa.pl</code>
              <p className="text-gray-400 mt-1">→ Acme Corporation</p>
            </div>
            <div>
              <code className="text-purple-400">techstart.stronaodnowa.pl</code>
              <p className="text-gray-400 mt-1">→ TechStart Inc</p>
            </div>
            <div>
              <code className="text-pink-400">restaurant.stronaodnowa.pl</code>
              <p className="text-gray-400 mt-1">→ Restaurant's website</p>
            </div>
          </div>
          <p className="text-gray-300 mt-4 text-sm">
            All from ONE codebase deployed once, yet each client gets their own branded experience!
          </p>
        </div>

        {/* Next Steps */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <h3 className="text-2xl font-bold mb-4">📚 Documentation</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://github.com/tahircivann/stronaodnowa-platform/blob/master/README.md" 
              target="_blank"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              📖 README
            </a>
            <a 
              href="https://github.com/tahircivann/stronaodnowa-platform/blob/master/ARCHITECTURE.md" 
              target="_blank"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              🏗️ Architecture
            </a>
            <a 
              href="https://github.com/tahircivann/stronaodnowa-platform/blob/master/HOW_TO_CREATE_WEBSITES.md" 
              target="_blank"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              🚀 Create Websites
            </a>
            <a 
              href="https://github.com/tahircivann/stronaodnowa-platform/blob/master/NEXT_STEPS.md" 
              target="_blank"
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
            >
              ✅ Next Steps
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
          <p className="mt-2 text-sm">Deployed on Vercel • Global Edge Network • Auto SSL</p>
        </div>
      </footer>
    </div>
  );
}
