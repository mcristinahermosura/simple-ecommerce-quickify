import React, { useContext, useEffect, useState } from "react";

import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../api";
import Swal from "sweetalert2";
import { RESPONSE_STATUS } from "../utils/constant";
import { CartContext } from "./CartContext";

export const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const { clearCart } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const id = JSON.parse(localStorage.getItem("id"));
  const token = JSON.parse(localStorage.getItem("token"));

  const getOrders = async () =>
    !isAdmin ? await getUserOrders(id, token) : await getAllOrders(token);

  const fetchOrders = async () => {
    try {
      const result = await getOrders();
      if (result.status === RESPONSE_STATUS.FAILED)
        Swal.fire({
          title: "Failed to retrieve orders",
          icon: "error",
          text: result.message,
          timer: 3000,
          showConfirmButton: false,
        });
      else setOrders(result.data);
    } catch (error) {
      Swal.fire({
        title: "Failed to retrieve orders",
        icon: "error",
        text: error.message ?? error,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const updateOrderCancel = async (orderId) => {
    try {
      const res = await cancelOrder(orderId, token);
      if (res.status === RESPONSE_STATUS.SUCCESS) {
        Swal.fire({
          title: "Order cancelled successfully",
          icon: RESPONSE_STATUS.SUCCESS,
          timer: 3000,
          showConfirmButton: false,
        });
        fetchOrders();
      } else {
        Swal.fire({
          title: "Failed to cancel order",
          icon: "error",
          text: res.message,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal({
        title: "Failed to cancel order",
        icon: "error",
        text: error.message ?? error,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const res = await updateOrderStatus(orderId, status, token);

      if (res.status === RESPONSE_STATUS.SUCCESS) {
        Swal.fire({
          title: "Order status updated successfully",
          icon: RESPONSE_STATUS.SUCCESS,
          timer: 3000,
          showConfirmButton: false,
        });
        fetchOrders();
      } else {
        Swal.fire({
          title: `Failed to update order ${orderId} with  status to ${status}`,
          icon: "error",
          text: res.message,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal({
        title: "Failed to update order status",
        icon: "error",
        text: error.message ?? error,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const checkout = async (order, navigate) => {
    try {
      const res = await createOrder(order, token);
      if (res.status === RESPONSE_STATUS.SUCCESS) {
        Swal.fire({
          title: "Order placed successfully",
          icon: RESPONSE_STATUS.SUCCESS,
          timer: 1500,
          showConfirmButton: false,
        }).then((result) => {
          if (result.isDismissed) {
            Swal.fire({
              title: "You are being redirected to your orders",
              icon: "info",
              timer: 1500,
              showConfirmButton: false,
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isDismissed) {
                clearCart();
                fetchOrders();
                navigate("/orders");
              }
            });
          }
        });
      } else {
        Swal.fire({
          title: "Failed to place order",
          icon: "error",
          text: res.message,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed to place order",
        icon: "error",
        text: error.message ?? error,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        checkout,
        updateOrderCancel,
        updateStatus,
        fetchOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
