import Image from 'next/image';

export default function MarketingHomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-5xl font-bold">
              Strona Odnowa Platform
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              Multi-tenant platform for managing client websites
            </p>
            <div className="flex gap-4">
              <a
                href="/pricing"
                className="rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              >
                View Pricing
              </a>
              <a
                href="/contact"
                className="rounded border border-gray-300 px-6 py-3 hover:bg-gray-100"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

