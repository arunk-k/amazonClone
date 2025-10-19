import React from "react";

export default function OrderConfirmation({ orders }) {
  const latestOrder = orders[orders.length - 1];

  if (!latestOrder)
    return (
      <p className="p-4 text-center text-gray-600">
        No orders yet. Please place an order first.
      </p>
    );

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-2 text-green-600">
        🎉 Congratulations!
      </h1>
      <p className="mb-4 text-gray-700">
        Your order has been placed successfully.
      </p>

      <div className="mt-4 text-left max-w-md mx-auto border p-4 rounded shadow">
        <h2 className="font-bold mb-2 text-lg">Order Summary</h2>
        {latestOrder.items.map((item) => (
          <div key={item.id} className="flex justify-between mb-1">
            <span>
              {item.name} × {item.qty}
            </span>
            <span>₹{item.price * item.qty}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{latestOrder.total}</span>
        </div>
      </div>

      <button
        onClick={() => (window.location = "/orders")}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Your Orders
      </button>
    </div>
  );
}
