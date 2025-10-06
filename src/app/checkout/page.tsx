"use client";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { total, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
  }

  if (submitted) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-[#003049] mb-4">
          Thank you for your purchase! 🎉
        </h1>
        <p className="text-lg text-gray-700">
          Your order has been placed successfully.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#003049]">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">
        <div>
          <label className="block text-sm font-semibold mb-1 text-[#003049]">Name</label>
          <input
            type="text"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F77f00]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-[#003049]">Email</label>
          <input
            type="email"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F77f00]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-[#003049]">Address</label>
          <input
            type="text"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F77f00]"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-[#003049]">Payment Method</label>
          <select
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F77f00]"
          >
            <option>Credit Card</option>
            <option>Pix</option>
            <option>Boleto</option>
          </select>
        </div>

        <p className="text-lg font-semibold text-[#003049]">
          Total: ${total.toFixed(2)}
        </p>

        <button
          type="submit"
          className="w-full bg-[#F77f00] hover:bg-[#Fcbf49] text-white font-bold py-3 rounded-xl"
        >
          Confirm Purchase
        </button>
      </form>
    </div>
  );
}
