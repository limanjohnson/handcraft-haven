//file updated Oct 12//
"use client";
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
        </Link>
      </div>
    );
  }

  return (
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
      </div>
    </div>
  );
}

