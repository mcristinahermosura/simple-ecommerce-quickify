import { createContext, useContext, useState } from "react";
import React from "react";
import { ConfirmationModalContext } from "./AppModalManagerContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { openModal } = useContext(ConfirmationModalContext);
  const getStoredCart = () => JSON.parse(localStorage.getItem("cart") ?? "[]");

  const [cart, setCart] = useState(getStoredCart());

  const updateCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const addItem = (item) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);

    if (existingItem) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem._id === item._id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });

      updateCart(updatedCart);
    } else {
      const updatedCart = [...cart, { ...item, quantity: 1 }];
      updateCart(updatedCart);
    }
  };

  const removeItem = (item) => {
    const updatedCart = cart.filter((cartItem) => cartItem._id !== item._id);
    updateCart(updatedCart);
  };

  const increase = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      return cartItem;
    });

    updateCart(updatedCart);
  };

  const decrease = (item) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem._id === item._id && cartItem.quantity > 1) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      if (cartItem._id === item._id && cartItem.quantity === 1) {
        openModal({
          message: "Are you sure you want to remove this item?",
          onConfirm: () => removeItem(item),
          onCancel: () => {},
        });
      }

      return cartItem;
    });
    const filteredCart = updatedCart.filter((cartItem) => cartItem !== null);
    updateCart(filteredCart);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        increase,
        decrease,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
