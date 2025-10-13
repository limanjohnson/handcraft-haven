"use client";
<<<<<<< HEAD
<<<<<<< HEAD

import { createContext, useContext, useState, ReactNode } from "react";

// Define what a cart item looks like
type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image_url?: string | null;
};

// Define what the cart context provides
type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: { id: number; title: string; price: number; image_url?: string | null }) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
};

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component that wraps your app
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add item to cart
  const addToCart = (product: { id: number; title: string; price: number; image_url?: string | null }) => {
    setCartItems((currentItems) => {
      // Check if item already exists in cart
      const existingItem = currentItems.find((item) => item.id === product.id);
      
      if (existingItem) {
        // If it exists, increase quantity by 1
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it doesn't exist, add it with quantity 1
        return [...currentItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Remove item from cart completely
  const removeFromCart = (id: number) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  // Update quantity of an item
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      // If quantity is 0 or less, remove the item
      removeFromCart(id);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate total number of items
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
=======
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
=======
import { createContext, useContext, useState, ReactNode, useMemo } from "react";
>>>>>>> 1243583 (checkout form, cart details and number of items in the cart)

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
<<<<<<< HEAD
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalItems }}>
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)
      {children}
    </CartContext.Provider>
  );
}

<<<<<<< HEAD
// Custom hook to use the cart
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
=======
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
>>>>>>> d080a4f (Checkout form, Cart Details and Number of Items on cart)
}
=======
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
>>>>>>> 1243583 (checkout form, cart details and number of items in the cart)
