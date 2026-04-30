"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export type StoreContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  
  wishlist: string[]; // array of product IDs
  toggleWishlist: (id: string) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("sk_cosmo_cart");
      const savedWishlist = localStorage.getItem("sk_cosmo_wishlist");
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error("Failed to load store state", e);
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem("sk_cosmo_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("sk_cosmo_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      if (prev.includes(id)) return prev.filter((w) => w !== id);
      return [...prev, id];
    });
  };

  return (
    <StoreContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal,
      wishlist, toggleWishlist
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
