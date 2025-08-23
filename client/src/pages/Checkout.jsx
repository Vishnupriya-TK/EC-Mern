// client/src/pages/Checkout.jsx
import React from 'react';

const Checkout = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">State/Province</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>$0.00</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;