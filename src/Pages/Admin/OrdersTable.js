import React from "react";
import { Button, Table } from "react-bootstrap";
import { useOrderContext } from "../../context/OrderContext";
import Swal from "sweetalert2";
import { useUserContext } from "../../context/UserContext";

export default function OrdersTable() {
  const { users } = useUserContext();
  const { orders, updateStatus } = useOrderContext();

  const handleUpdateOrderStatus = async (orderId, prevStatus) => {
    if (["Cancelled", "Delivered", "Completed"].includes(prevStatus)) {
      Swal.fire({
        title: `You can't update the status of a ${prevStatus.toLowerCase()} order`,

        icon: "warning",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    const options = {};

    switch (prevStatus) {
      case "Pending":
        options.Cancelled = "Cancelled";
        options.Processing = "Processing";
        break;
      case "Processing":
        options.Shipped = "Shipped";
        break;
      case "Shipped":
        options.Delivered = "Delivered";
        break;
      default:
        break;
    }

    const { value: status } = await Swal.fire({
      title: "Update Order Status",
      text: `Current Status: ${prevStatus}`,
      input: "select",
      inputOptions: options,
      inputPlaceholder: "Select a status",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a status!";
        }
      },
    });
    if (status) {
      updateStatus(orderId, status);
    }
  };

  const getUserNameOrEmail = (userId) => {
    const foundUser = users.find((user) => user._id === userId);
    return foundUser && foundUser.name
      ? foundUser.name
      : foundUser.email
      ? foundUser.email
      : "User name";
  };

  return (
    <Table striped bordered hover responsive variant="secondary">
      <thead>
        <tr>
          <th className="text-center">User</th>
          <th className="text-center">Products</th>
          <th className="text-center">Total Amount</th>
          <th className="text-center">Payment Method</th>
          <th className="text-center">Shipping Address</th>
          <th className="text-center">Status</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders !== undefined && orders.length > 0 ? (
          orders
            .sort(
              (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt) &&
                new Date(b.updatedAt) - new Date(a.updatedAt)
            )
            .map((order, index) => (
              <tr key={index}>
                <td style={{ verticalAlign: "middle" }}>
                  {getUserNameOrEmail(order.userId)}
                </td>
                <td>
                  <ul>
                    {order.orders.map((product, productIndex) => (
                      <li key={productIndex}>
                        {product.productName} (Qty: {product.quantity})
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={{ verticalAlign: "middle" }} className="text-center">
                  ₱{order.totalAmount.toFixed(2)}
                </td>
                <td style={{ verticalAlign: "middle" }} className="text-center">
                  {order.paymentMethod}
                </td>
                <td style={{ verticalAlign: "middle" }} className="text-center">
                  {order.shippingAddress}
                </td>
                <td style={{ verticalAlign: "middle" }}>{order.orderStatus}</td>
                <td style={{ verticalAlign: "middle", textAlign: "center" }}>
                  <Button
                    variant={
                      ["Cancelled", "Delivered", "Completed"].includes(
                        order.orderStatus
                      )
                        ? "secondary"
                        : "primary"
                    }
                    onClick={() =>
                      handleUpdateOrderStatus(order._id, order.orderStatus)
                    }
                    className="mb-2"
                  >
                    Update Status
                  </Button>
                </td>
              </tr>
            ))
        ) : (
          <tr>
            <td colSpan="7" className="text-center">
              No orders found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
