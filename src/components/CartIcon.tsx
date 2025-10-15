//file updated Oct 12//
"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function CartIcon() {
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
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)
        </span>
      )}
    </Link>
  );
}