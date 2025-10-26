export default function DemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-600">
      <div className="text-center text-white p-8">
        <h1 className="text-6xl font-bold mb-4">🎯 Demo Works!</h1>
        <p className="text-2xl mb-2">Subdomain: <strong>demo</strong></p>
        <p className="text-lg opacity-80">
          You're viewing the demo subdomain
        </p>
        <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur">
          <p className="text-sm">
            Path-based testing on Vercel ✓<br/>
            Visit: /demo for this page
          </p>
        </div>
      </div>
    </div>
  );
}

