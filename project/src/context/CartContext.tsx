import React, { createContext, useContext, useReducer } from 'react';
import { MenuItem } from '../api/types';

interface CartItem extends MenuItem {
  quantity: number; // Antalet av samma item
}

interface CartState {
  items: CartItem[];
}

interface CartContextValue {
  cart: CartState;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  decreaseQuantity: (id: number) => void; // Ny funktion
  clearCart: () => void;
}

// Typ för reducer-åtgärder
type CartAction =
  | { type: 'ADD_TO_CART'; payload: MenuItem }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'DECREASE_QUANTITY'; payload: number }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<CartContextValue | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find((i) => i.id === action.payload.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART': {
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case 'DECREASE_QUANTITY': {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload ? { ...i, quantity: i.quantity - 1 } : i
          ),
        };
      }
      // Om kvantiteten är 1, ta bort objektet
      return {
        items: state.items.filter((i) => i.id !== action.payload),
      };
    }

    case 'CLEAR_CART': {
      return { items: [] };
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  const addToCart = (item: MenuItem) => dispatch({ type: 'ADD_TO_CART', payload: item });
  const removeFromCart = (id: number) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const decreaseQuantity = (id: number) => dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
