import { createContext } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const getStoredCart = () => JSON.parse(localStorage.getItem("cart"));
  let storedCart = getStoredCart();

  const addItem = (item) => {
    const cart = storedCart ? JSON.parse(storedCart) : [];
    const updatedCart = [...cart, item];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    storedCart = getStoredCart();
  };

  const removeItem = (item) => {
    const cart = storedCart ? storedCart : [];
    const updatedCart = cart.filter((cartItem) => cartItem.id !== item.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    storedCart = getStoredCart();
  };

  const increase = (item) => {
    const cart = JSON.parse(getStoredCart());
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, order: cartItem.order + 1 };
      }
      return cartItem;
    });

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    storedCart = JSON.parse(getStoredCart());
  };

  const decrease = (item) => {
    const cart = storedCart ? JSON.parse(storedCart) : [];
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        return { ...cartItem, quantity: cartItem.quantity - 1 };
      }
      return cartItem;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    storedCart = JSON.parse(getStoredCart());
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    storedCart = [];
  };

  return (
    <CartContext.Provider
      value={{
        storedCart,
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
