<<<<<<< HEAD
//file updated Oct 12//
"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function CartIcon() {
=======
// src/components/CartIcon.tsx
'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';

export function CartIcon() {
>>>>>>> 0ab31d013cb3aa3c6242908d08dff0de4b0861da
  const { totalItems } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  // This ensures the component only renders the badge after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Link href="/cart" className="relative inline-flex items-center">
      <ShoppingCart size={26} />
      {isMounted && totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full text-xs px-1.5">
          {totalItems}
<<<<<<< HEAD
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)
=======
>>>>>>> 0ab31d013cb3aa3c6242908d08dff0de4b0861da
        </span>
      )}
    </Link>
  );
}