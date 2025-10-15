"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
    paymentMethod: "credit", // "credit" or "paypal"
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-MW", {
      style: "currency",
      currency: "MWK",
      minimumFractionDigits: 2,
    }).format(amount);

  // Luhn Algorithm for card validation
  const luhnCheck = (cardNumber: string): boolean => {
    const digits = cardNumber.replace(/\D/g, "");
    let sum = 0;
    let double = false;

    for (let i = digits.length - 1; i >= 0; i--) {
      let d = parseInt(digits[i]);
      if (double) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
      double = !double;
    }

    return sum % 10 === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validations
    if (!form.name.trim() || !form.address.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.paymentMethod === "credit") {
      const digits = form.cardNumber.replace(/\s+/g, "");
      if (!/^\d{13,19}$/.test(digits) || !luhnCheck(digits)) {
        setError("Invalid card number. Please check again.");
        return;
      }
      if (!/^\d{3,4}$/.test(form.cvc)) {
        setError("Invalid CVC.");
        return;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2,4}$/.test(form.expiry)) {
        setError("Invalid expiry date. Use MM/YY format.");
        return;
      }
    }

    // simulate payment
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-semibold text-emerald-600 mb-4">
          🎉 Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase, {form.name}. Your handcrafted items will
          be delivered to:
        </p>
        <p className="font-medium mb-8">{form.address}</p>
        <Link
          href="/"
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Return to Home
        </Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-2xl font-semibold mb-4">
          Your cart is empty — nothing to checkout.
        </h1>
        <Link
          href="/"
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      <section className="bg-gray-50 rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
        <ul className="divide-y divide-gray-200 mb-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between py-2 text-gray-700"
            >
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>{formatCurrency(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <div className="text-right font-semibold text-lg">
          Total: {formatCurrency(totalPrice)}
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-lg p-6 space-y-4 shadow-md"
      >
        <h2 className="text-xl font-semibold">Billing Details</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <label className="font-medium mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />
          </div>
          <div className="flex flex-col sm:col-span-2">
            <label className="font-medium mb-1">Shipping Address *</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="font-medium mb-2 block">Payment Method</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="credit">Credit / Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {form.paymentMethod === "credit" && (
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col sm:col-span-2">
              <label className="font-medium mb-1">Card Number *</label>
              <input
                type="text"
                name="cardNumber"
                value={form.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">Expiry (MM/YY) *</label>
              <input
                type="text"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="09/27"
                className="border rounded px-3 py-2"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-1">CVC *</label>
              <input
                type="text"
                name="cvc"
                value={form.cvc}
                onChange={handleChange}
                placeholder="123"
                className="border rounded px-3 py-2"
                required
              />
            </div>
          </div>
        )}

        {error && (
          <div className="text-red-600 bg-red-50 border border-red-200 rounded p-2 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 font-medium mt-2"
        >
          Confirm & Pay {formatCurrency(totalPrice)}
        </button>
      </form>
    </main>
  );
}
