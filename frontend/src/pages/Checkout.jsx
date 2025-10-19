import React, { useState } from "react";

export default function Checkout({ cartItems, confirmOrder }) {
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handlePayment = () => {
    alert(`Payment of ₹${total} Successful!`);
    confirmOrder(cartItems);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Checkout</h1>
      <h2 className="mb-2">Select Payment Method:</h2>
      <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="border p-1 mb-4">
        <option>Credit Card</option>
        <option>UPI</option>
        <option>Debit Card</option>
        <option>Dummy</option>
      </select>
      <h2 className="mb-4">Total: ₹{total}</h2>
      <button onClick={handlePayment} className="bg-green-500 text-white px-4 py-1 rounded">Pay Now</button>
    </div>
  );
}
