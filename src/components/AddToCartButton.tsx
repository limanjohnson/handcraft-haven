// AddToCartButton.tsx
"use client";
import { useCart } from "@/context/CartContext";

type AddToCartButtonProps = {
  id: number;
  title: string;
  price: number;
};

export default function AddToCartButton({ id, title, price }: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ id, title, price })} 
      className="mt-3 px-4 py-2 border-2 border-[#8B6F47] rounded-lg text-[#8B6F47] font-semibold transition hover:bg-[#8B6F47] hover:text-white"
    >
      Add to Cart
    </button>
  );
}
