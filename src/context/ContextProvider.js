import React from "react";
import { UserProvider } from "./UserContext";
import { CartProvider } from "./CartContext";
import { ConfirmationModalProvider } from "./AppModalManagerContext";

export default function ContextProvider({ children }) {
  return (
    <ConfirmationModalProvider>
      <UserProvider>
        <CartProvider>{children}</CartProvider>
      </UserProvider>{" "}
    </ConfirmationModalProvider>
  );
}
