import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.payload.id && item.quantityType === action.payload.quantityType);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id && item.quantityType === action.payload.quantityType
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        return [...state, { ...action.payload }];
      }
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);
    case 'CLEAR_CART':
      return [];
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id && item.quantityType === action.payload.quantityType
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItemToCart = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItemFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const updateQuantity = (id, quantity, quantityType) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity, quantityType } });
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart, removeItemFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);