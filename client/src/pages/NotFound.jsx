// client/src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-2xl font-medium text-gray-700">Page Not Found</h2>
        <p className="mt-2 text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
        <Link 
          to="/" 
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;