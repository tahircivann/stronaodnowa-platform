export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          STRONAODNOWA.PL
        </h1>
        <p className="text-xl mb-8">
          Multi-tenant platform is live! 🚀
        </p>
        <p className="text-gray-400">
          Try: demo.{process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'yourdomain.com'}
        </p>
      </div>
    </div>
  );
}
