import React, { useEffect, useState } from "react";

import {
  cancelOrder,
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
} from "../api";
import Swal from "sweetalert2";
import { RESPONSE_STATUS } from "../utils/Contants";

export const OrderContext = React.createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const id = JSON.parse(localStorage.getItem("id"));
  const token = JSON.parse(localStorage.getItem("token"));

  const fetchOrders = async () => {
    try {
      const result = isAdmin
        ? await getAllOrders(token)
        : await getUserOrders(id, token);

      setOrders(result.data);
    } catch (error) {
      Swal.fire({
        title: "Failed to retrieve orders",
        icon: "error",
        text: error.message ?? error,
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
        });
        fetchOrders();
      } else {
        Swal.fire({
          title: "Failed to cancel order",
          icon: "error",
          text: res.message,
        });
      }
    } catch (error) {
      Swal({
        title: "Failed to cancel order",
        icon: "error",
        text: error.message ?? error,
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
        });
        fetchOrders();
      } else {
        Swal.fire({
          title: "Failed to update order status",
          icon: "error",
          text: res.message,
        });
      }
    } catch (error) {
      Swal({
        title: "Failed to update order status",
        icon: "error",
        text: error.message ?? error,
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
            }).then((result) => {
              if (result.isDismissed) {
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
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed to place order",
        icon: "error",
        text: error.message ?? error,
      });
    }
  };

  useEffect(() => {
    fetchOrders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
