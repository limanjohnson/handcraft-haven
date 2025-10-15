"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();

  // If cart is empty, show a message
  if (cartItems.length === 0) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-6">Your cart is empty.</p>
        <Link
          href="/products"
          className="inline-block bg-[#8B6F47] text-white px-6 py-3 rounded-md hover:bg-[#7a603e] transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow p-4 flex gap-4">
            {/* Product Image */}
            <div className="w-24 h-24 flex-shrink-0">
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.title}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded">
                  No Image
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-gray-600 mb-2">${item.price.toFixed(2)} each</p>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Quantity:</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  -
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
            </div>

            {/* Price and Remove Button */}
            <div className="flex flex-col items-end justify-between">
              <p className="font-bold text-lg">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold text-[#8B6F47]">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={clearCart}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-md font-semibold transition-colors"
          >
            Clear Cart
          </button>
          <Link
            href="/checkout"
            className="flex-1 bg-[#8B6F47] hover:bg-[#7a603e] text-white px-6 py-3 rounded-md font-semibold transition-colors text-center"
          >
            Proceed to Checkout
          </Link>
        </div>

        <Link
          href="/products"
          className="block text-center mt-4 text-[#8B6F47] hover:underline"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
