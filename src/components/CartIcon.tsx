"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative inline-block">
      <ShoppingCart size={26} />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1.5">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
