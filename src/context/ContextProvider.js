import React from "react";
import { UserProvider } from "./UserContext";
import { CartProvider } from "./CartContext";

export default function ContextProvider({ children }) {
  return (
    <UserProvider>
      <CartProvider>{children}</CartProvider>
    </UserProvider>
  );
}
