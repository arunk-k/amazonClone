import React from "react";

export default function YourOrders({ orders }) {
  if (orders.length === 0)
    return (
      <p className="p-4 text-center text-gray-600">
        You have no orders yet. Go back to the home page and start shopping!
      </p>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="border p-4 mb-4 rounded shadow-sm bg-white max-w-xl mx-auto"
        >
          <h2 className="font-bold mb-2 text-gray-700">
            🛍️ Order ID: {order.id}
          </h2>

          <div className="mb-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between mb-1 text-sm">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <hr className="my-2" />

          <div className="flex justify-between font-bold text-gray-800">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Ordered on: {new Date(order.id).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
