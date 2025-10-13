//file updated Oct 12//
"use client";
<<<<<<< HEAD

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
=======
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2>Your cart is empty 😢</h2>
        <Link href="/products" className="text-blue-600 underline">
          View products
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)
        </Link>
      </div>
    );
  }

  return (
<<<<<<< HEAD
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
=======
    <div className="p-6">
      <h1 className="text-2xl mb-4">Shopping Cart 🛒</h1>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between items-center border p-3 rounded-lg">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3">
        <h2 className="text-lg font-bold">Total: ${total.toFixed(2)}</h2>

        {/* Botão Finalize Purchase igual ao Confirm Order */}
        <Link href="/checkout">
          <button className="w-full sm:w-auto px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition">
            Finalize Purchase
          </button>
        </Link>

        <button
          onClick={clearCart}
          className="w-full sm:w-auto px-3 py-2 bg-gray-400 text-white rounded-lg transition"
        >
          Clean cart
        </button>
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)
