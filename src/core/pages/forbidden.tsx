import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Forbidden() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <ShieldAlert className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h1>

        <p className="text-gray-600 mb-6">
          You don’t have permission to access this page or resource.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 transition"
        >
          <ArrowLeft size={18} />
          Go back
        </Link>

        <p className="text-sm text-gray-500 mt-6">
          If you believe this is a mistake, please contact support.
        </p>
      </div>
    </div>
  );
}
