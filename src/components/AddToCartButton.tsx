"use client";
import { useCart } from "@/context/CartContext";

export default function AddToCartButton({
  id,
  title,
  price,
}: {
  id: number;
  title: string;
  price: number;
}) {
  const { addItem } = useCart();

  return (
    <button
      onClick={() => addItem({ id, title, price, quantity: 1 })}
      className="bg-[#F77f00] hover:bg-[#Fcbf49] text-white font-semibold py-2 px-4 rounded-xl mt-2 transition"
    >
      Add to Cart
    </button>
  );
}
