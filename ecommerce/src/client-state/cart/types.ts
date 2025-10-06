import type { Cart, Product } from "@/types";

export interface CartState {
  cart: Cart;
  isInitialized: boolean;
}

export enum CartActionType {
  INITIALIZE = "INITIALIZE",
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  UPDATE_QUANTITY = "UPDATE_QUANTITY",
  CLEAR_CART = "CLEAR_CART",
}

export type CartAction =
  | { type: CartActionType.INITIALIZE; payload: Cart }
  | { type: CartActionType.ADD_ITEM; payload: Product }
  | { type: CartActionType.REMOVE_ITEM; payload: number }
  | { type: CartActionType.UPDATE_QUANTITY; payload: { productId: number; quantity: number } }
  | { type: CartActionType.CLEAR_CART };
