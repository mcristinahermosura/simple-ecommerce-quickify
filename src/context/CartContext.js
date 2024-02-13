import { createContext, useState } from "react";
import React from "react";
import Swal from "sweetalert2";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
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
    Swal.fire({
      title: "Item removed",
      icon: "success",
      timer: 2500,
      showConfirmButton: false,
    });
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
        Swal.fire({
          title: "Are you sure you want to remove this item from your cart?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            removeItem(item);
          }
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
