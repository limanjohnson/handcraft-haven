//file updated Oct 12//
"use client";

import { useCart } from "@/context/CartContext";
import { useState } from "react";
<<<<<<< HEAD
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const router = useRouter();

  // Form data state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-gray-600 mb-6">Your cart is empty. Add some items before checking out.</p>
        <Link
          href="/products"
          className="inline-block bg-[#8B6F47] text-white px-6 py-3 rounded-md hover:bg-[#7a603e] transition-colors"
        >
          Browse Products
        </Link>
=======
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
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)
      </div>
    );
  }

<<<<<<< HEAD
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.zipCode) {
      alert("Please fill in all required fields!");
      return;
    }

    // Simulate order processing
    setIsProcessing(true);

    setTimeout(() => {
      // Create order data to pass to confirmation
      const orderData = {
        items: cartItems,
        total: getTotalPrice(),
        customer: formData,
        orderNumber: Math.floor(100000 + Math.random() * 900000).toString(),
        date: new Date().toLocaleDateString(),
      };

      // Store order in localStorage for confirmation page
      localStorage.setItem("lastOrder", JSON.stringify(orderData));

      // Clear cart
      clearCart();

      // Redirect to confirmation
      router.push("/checkout/confirmation");
    }, 1500);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Checkout Form */}
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
                  required
                />
              </div>

              {/* City and Zip Code */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Zip Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
                    required
                  />
                </div>
              </div>

              {/* Card Number (mock - not real payment) */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Card Number (Demo - any number works)
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B6F47]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#8B6F47] hover:bg-[#7a603e] text-white px-6 py-3 rounded-md font-semibold transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isProcessing ? "Processing Order..." : "Place Order"}
              </button>

              <Link
                href="/cart"
                className="block text-center text-[#8B6F47] hover:underline mt-2"
              >
                Back to Cart
              </Link>
            </form>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 pb-3 border-b">
                  <div className="w-16 h-16 flex-shrink-0">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 rounded"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm">{item.title}</h3>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-sm font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping:</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t">
                <span>Total:</span>
                <span className="text-[#8B6F47]">${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
=======
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
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)
    </div>
  );
}
