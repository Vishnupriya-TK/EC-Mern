// client/src/pages/Orders.jsx
import React from 'react';

const Orders = () => {
  // This would normally come from an API
  const orders = [];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-medium text-gray-600">You haven't placed any orders yet.</h2>
          <p className="mt-2 text-gray-500">When you place an order, it will appear here.</p>
          <a 
            href="/products" 
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Order #{order.id}</h3>
                <span className="text-sm text-gray-500">{order.date}</span>
              </div>
              <div className="text-sm text-gray-600">
                Status: <span className="font-medium">{order.status}</span>
              </div>
              <div className="mt-2">
                <button className="text-blue-600 text-sm hover:underline">
                  View Order Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;