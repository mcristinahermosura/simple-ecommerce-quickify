import React from "react";
import { UserProvider } from "./UserContext";
import { CartProvider } from "./CartContext";
import { OrderProvider } from "./OrderContext";

export default function ContextProvider({ children }) {
  return (
    <UserProvider>
      <CartProvider>
        <OrderProvider>{children}</OrderProvider>
      </CartProvider>
    </UserProvider>
  );
}
