"use client";

import { createContext, useContext, useEffect, useReducer, useCallback, useRef, type ReactNode } from "react";
import type { Cart, CartContextType, Product } from "@/types";
import { cartReducer, initialCartState } from "@/client-state/cart/reducer";
import * as cartActions from "@/client-state/cart/actions";

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "fakestore-cart";

function loadCartFromStorage(): Cart {
  if (typeof window === "undefined") {
    return { items: [] };
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Failed to load cart from localStorage:", errorMessage);
  }

  return { items: [] };
}

function saveCartToStorage(cart: Cart): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      console.error("localStorage quota exceeded. Unable to save cart.");
    } else {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Failed to save cart to localStorage:", errorMessage);
    }
  }
}

export interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const isFirstMount = useRef(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadedCart = loadCartFromStorage();
    dispatch(cartActions.initializeCart(loadedCart));
  }, []);

  // Save cart to localStorage on changes (but skip initial load)
  useEffect(() => {
    if (state.isInitialized && !isFirstMount.current) {
      saveCartToStorage(state.cart);
    }
    if (state.isInitialized) {
      isFirstMount.current = false;
    }
  }, [state.cart, state.isInitialized]);

  const addToCart = useCallback((product: Product) => {
    dispatch(cartActions.addItem(product));
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    dispatch(cartActions.removeItem(productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch(cartActions.updateQuantity(productId, quantity));
  }, []);

  const clearCart = useCallback(() => {
    dispatch(cartActions.clearCart());
  }, []);

  const getTotalPrice = useCallback(() => {
    const total = state.cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return Math.round(total * 100) / 100;
  }, [state.cart.items]);

  const getTotalItems = useCallback(() => {
    return state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [state.cart.items]);

  const value: CartContextType = {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
