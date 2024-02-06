import React from "react";
import { UserProvider } from "./UserContext";
import { CartProvider } from "./CartContext";
import { ConfirmationModalProvider } from "./AppModalManagerContext";
import { OrderProvider } from "./OrderContext";

export default function ContextProvider({ children }) {
  return (
    <ConfirmationModalProvider>
      <UserProvider>
        <CartProvider>
          <OrderProvider>{children}</OrderProvider>
        </CartProvider>
      </UserProvider>
    </ConfirmationModalProvider>
  );
}
