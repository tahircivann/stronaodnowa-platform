import Link from 'next/link';

interface ClientHeaderProps {
  logo?: string | null;
  name: string;
  primaryColor: string;
}

export default function ClientHeader({ logo, name, primaryColor }: ClientHeaderProps) {
  return (
    <header className="shadow-md" style={{ borderBottom: `3px solid ${primaryColor}` }}>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            {logo ? (
              <img src={logo} alt={name} className="h-10 w-auto" />
            ) : (
              <Link href="/" className="text-2xl font-bold" style={{ color: primaryColor }}>
                {name}
              </Link>
            )}
          </div>
          
          <nav className="flex space-x-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

