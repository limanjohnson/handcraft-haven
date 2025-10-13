"use client";
<<<<<<< HEAD

=======
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function CartIcon() {
<<<<<<< HEAD
  const { getTotalItems } = useCart();
  const itemCount = getTotalItems();

  return (
    <Link href="/cart" className="relative inline-block">
      <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-gray-900" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#8B6F47] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
=======
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative inline-block">
      <ShoppingCart size={26} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1.5">
          {totalItems}
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)
        </span>
      )}
    </Link>
  );
}
