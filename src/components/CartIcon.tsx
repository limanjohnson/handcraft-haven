// src/components/CartIcon.tsx
'use client';

import { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';

export function CartIcon() {
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
        </span>
      )}
    </Link>
  );
}