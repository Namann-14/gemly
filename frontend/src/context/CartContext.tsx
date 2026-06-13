"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string; // GemName-Ratti
  name: string;
  ratti: number;
  quantity: number;
  pricePerRatti: number;
  totalPrice: number;
  image: string;
  planet: string;
  color: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "totalPrice">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("gemly_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Error loading cart from localStorage", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("gemly_cart", JSON.stringify(items));
      } catch (e) {
        console.error("Error saving cart to localStorage", e);
      }
    }
  }, [items, isLoaded]);

  const addItem = (newItem: Omit<CartItem, "totalPrice">) => {
    setItems((prevItems) => {
      const existingIdx = prevItems.findIndex((item) => item.id === newItem.id);
      if (existingIdx > -1) {
        const updatedItems = [...prevItems];
        const updatedItem = { ...updatedItems[existingIdx] };
        updatedItem.quantity += newItem.quantity;
        updatedItem.totalPrice = updatedItem.quantity * updatedItem.pricePerRatti * updatedItem.ratti;
        updatedItems[existingIdx] = updatedItem;
        return updatedItems;
      } else {
        const itemWithTotal: CartItem = {
          ...newItem,
          totalPrice: newItem.quantity * newItem.pricePerRatti * newItem.ratti,
        };
        return [...prevItems, itemWithTotal];
      }
    });
    setIsCartOpen(true); // Automatically open cart drawer when an item is added
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
              totalPrice: quantity * item.pricePerRatti * item.ratti,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = items.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
