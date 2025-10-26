interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}

interface ClientFooterProps {
  client: Client;
}

export default function ClientFooter({ client }: ClientFooterProps) {
  return (
    <footer className="border-t bg-gray-50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{client.name}</h3>
            <p className="text-sm text-gray-600">
              Your trusted partner for business solutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href={`mailto:${client.email}`} className="hover:text-gray-900">
                  {client.email}
                </a>
              </li>
              {client.phone && (
                <li>
                  <a href={`tel:${client.phone}`} className="hover:text-gray-900">
                    {client.phone}
                  </a>
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gray-900">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          © {new Date().getFullYear()} {client.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

