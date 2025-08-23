// client/src/pages/admin/Dashboard.jsx
import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600">Total Sales</h3>
          <p className="text-3xl font-bold">$0.00</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600">Orders</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500">This month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-600">Products</h3>
          <p className="text-3xl font-bold">0</p>
          <p className="text-sm text-gray-500">In stock</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;