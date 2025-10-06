import type { Product } from "@/types";
import { CartActionType, type CartAction } from "./types";

export const initializeCart = (cart: { items: { product: Product; quantity: number }[] }): CartAction => ({
  type: CartActionType.INITIALIZE,
  payload: cart,
});

export const addItem = (product: Product): CartAction => ({
  type: CartActionType.ADD_ITEM,
  payload: product,
});

export const removeItem = (productId: number): CartAction => ({
  type: CartActionType.REMOVE_ITEM,
  payload: productId,
});

export const updateQuantity = (productId: number, quantity: number): CartAction => ({
  type: CartActionType.UPDATE_QUANTITY,
  payload: { productId, quantity },
});

export const clearCart = (): CartAction => ({
  type: CartActionType.CLEAR_CART,
});
