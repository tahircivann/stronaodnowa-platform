'use client';

import { useState } from 'react';

export default function ClientsPage() {
  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    email: '',
    phone: '',
    primaryColor: '#000000',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMessage(`✅ Success! Client site is live at: ${data.url}`);
        setFormData({
          name: '',
          subdomain: '',
          email: '',
          phone: '',
          primaryColor: '#000000',
        });
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6 rounded-lg border-2 border-yellow-500 bg-yellow-50 p-4">
        <h2 className="font-semibold text-yellow-900 mb-2">⚠️ Database Not Connected</h2>
        <p className="text-sm text-yellow-800 mb-3">
          To create websites, you need to connect a database first.
        </p>
        <div className="space-y-2 text-sm text-yellow-800">
          <p><strong>Quick Setup (5 min):</strong></p>
          <ol className="list-decimal list-inside space-y-1 ml-4">
            <li>Vercel Dashboard → Storage → Create Postgres</li>
            <li>Pull env vars: <code className="bg-yellow-100 px-1 rounded">vercel env pull .env.local</code></li>
            <li>Push schema: <code className="bg-yellow-100 px-1 rounded">npm run db:push</code></li>
          </ol>
          <p className="mt-2">
            📖 See <a href="/HOW_TO_CREATE_WEBSITES.md" className="underline font-semibold">HOW_TO_CREATE_WEBSITES.md</a> for detailed instructions
          </p>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">Add New Client</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Client Name *
          </label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Acme Corporation"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Subdomain *
          </label>
          <div className="flex items-center">
            <input
              type="text"
              required
              pattern="[a-z0-9-]+"
              className="flex-1 px-4 py-2 border rounded-l-lg"
              value={formData.subdomain}
              onChange={(e) => setFormData({ 
                ...formData, 
                subdomain: e.target.value.toLowerCase() 
              })}
              placeholder="acme"
            />
            <span className="px-4 py-2 bg-gray-100 border border-l-0 rounded-r-lg">
              .stronaodnowa.pl
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Lowercase letters, numbers, and hyphens only
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="contact@acme.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Phone
          </label>
          <input
            type="tel"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+48 123 456 789"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Primary Brand Color
          </label>
          <div className="flex items-center gap-4">
            <input
              type="color"
              className="h-12 w-12 border rounded"
              value={formData.primaryColor}
              onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
            />
            <input
              type="text"
              className="px-4 py-2 border rounded-lg"
              value={formData.primaryColor}
              onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Creating Client Site...' : 'Create Client Site'}
        </button>
        
        {message && (
          <div className={`p-4 rounded-lg ${
            message.startsWith('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

