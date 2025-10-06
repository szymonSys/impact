import { CartActionType, type CartAction, type CartState } from "./types";

export const initialCartState: CartState = {
  cart: { items: [] },
  isInitialized: false,
};

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case CartActionType.INITIALIZE: {
      return {
        ...state,
        cart: action.payload,
        isInitialized: true,
      };
    }

    case CartActionType.ADD_ITEM: {
      const product = action.payload;
      const existingItemIndex = state.cart.items.findIndex((item) => item.product.id === product.id);

      if (existingItemIndex >= 0) {
        const newItems = [...state.cart.items];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + 1,
        };
        return {
          ...state,
          cart: { items: newItems },
        };
      }

      return {
        ...state,
        cart: {
          items: [...state.cart.items, { product, quantity: 1 }],
        },
      };
    }

    case CartActionType.REMOVE_ITEM: {
      const productId = action.payload;
      return {
        ...state,
        cart: {
          items: state.cart.items.filter((item) => item.product.id !== productId),
        },
      };
    }

    case CartActionType.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;

      if (quantity < 1) {
        return state;
      }

      const itemIndex = state.cart.items.findIndex((item) => item.product.id === productId);

      if (itemIndex === -1) {
        return state;
      }

      const newItems = [...state.cart.items];
      newItems[itemIndex] = {
        ...newItems[itemIndex],
        quantity,
      };

      return {
        ...state,
        cart: { items: newItems },
      };
    }

    case CartActionType.CLEAR_CART: {
      return {
        ...state,
        cart: { items: [] },
      };
    }

    default:
      return state;
  }
}
