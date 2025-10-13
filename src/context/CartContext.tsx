"use client";
import { createContext, useContext, useState, ReactNode, useMemo } from "react";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  totalItems: number; // agora é número diretamente
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prev, item];
      }
    });
  };

  const removeItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setItems([]);

  // totalItems agora é calculado automaticamente usando useMemo
  const totalItems = useMemo(() => {
    return items.reduce((sum, i) => sum + i.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
