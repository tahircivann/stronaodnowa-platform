export default function TestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600">
      <div className="text-center text-white p-8">
        <h1 className="text-6xl font-bold mb-4">✅ Test Works!</h1>
        <p className="text-2xl mb-2">Subdomain: <strong>test</strong></p>
        <p className="text-lg opacity-80">
          You're viewing the test subdomain
        </p>
        <div className="mt-8 p-4 bg-white/10 rounded-lg backdrop-blur">
          <p className="text-sm">
            Path-based testing on Vercel ✓<br/>
            Visit: /test for this page
          </p>
        </div>
      </div>
    </div>
  );
}

