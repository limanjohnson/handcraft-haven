"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { CreditCard, Play, Smartphone } from "lucide-react"; 

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl text-green-600 font-bold">
          Purchase completed successfully! 🎉
        </h2>
        <p>Thank you for shopping with us!</p>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center mb-4">🛍️ Checkout</h1>

      {/* Order Summary */}
      <div className="border rounded-2xl shadow-sm p-5 bg-white">
        <h2 className="text-lg font-semibold mb-3 border-b pb-2">Order Summary</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between text-sm text-gray-700">
                <span>
                  {item.title} <span className="text-gray-500">x{item.quantity}</span>
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-3 flex justify-between font-bold text-gray-800 border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 border rounded-2xl shadow-sm p-6 bg-white"
      >
        {/* Personal Information */}
        <div>
          <h2 className="text-lg font-semibold mb-3 border-b pb-2">Customer Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Payment */}
        <div>
          <h2 className="text-lg font-semibold mb-3 border-b pb-2">Payment Method</h2>

          {/* Selection Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button
              type="button"
              onClick={() => setPaymentMethod("credit")}
              className={`flex-1 border rounded-lg p-3 flex flex-col items-center justify-center transition ${
                paymentMethod === "credit"
                  ? "border-green-600 bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <CreditCard className="w-6 h-6 mb-1 text-green-600" />
              <span className="text-sm font-medium">Credit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("paypal")}
              className={`flex-1 border rounded-lg p-3 flex flex-col items-center justify-center transition ${
                paymentMethod === "paypal"
                  ? "border-green-600 bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <Play className="w-6 h-6 mb-1 text-green-600" />
              <span className="text-sm font-medium">PayPal</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("applepay")}
              className={`flex-1 border rounded-lg p-3 flex flex-col items-center justify-center transition ${
                paymentMethod === "applepay"
                  ? "border-green-600 bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <Smartphone className="w-6 h-6 mb-1 text-green-600" />
              <span className="text-sm font-medium">Apple/Google Pay</span>
            </button>
          </div>

          
          {paymentMethod === "credit" && (
            <div className="space-y-3">
              <div>
                <label className="block mb-1 font-medium">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                  placeholder="1234567812345678"
                  required
                  maxLength={16}
                  pattern="\d{16}"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-3 flex-col sm:flex-row">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    required
                    maxLength={5}
                    pattern="(0[1-9]|1[0-2])\/\d{2}"
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">CVC</label>
                  <input
                    type="text"
                    value={cardCVC}
                    onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, ""))}
                    placeholder="123"
                    required
                    maxLength={3}
                    pattern="\d{3}"
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <p className="text-blue-700 font-medium mb-2">
                You will be redirected to PayPal to complete your payment.
              </p>
              <button
                type="button"
                onClick={() => alert("Payment simulated via PayPal ✅")}
                className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
              >
                Simulate PayPal Payment
              </button>
            </div>
          )}

          {paymentMethod === "applepay" && (
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <p className="text-gray-800 font-medium mb-2">
                Apple Pay / Google Pay will be used for payment.
              </p>
              <button
                type="button"
                onClick={() => alert("Payment simulated via Apple/Google Pay ✅")}
                className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
              >
                Simulate Apple/Google Pay
              </button>
            </div>
          )}
        </div>

        {/* Confirm Order Button fully responsive */}
        <button
          type="submit"
          className="w-full sm:w-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition"
        >
          Confirm Order
        </button>
      </form>
    </div>
  );
}
