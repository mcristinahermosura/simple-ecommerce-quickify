import React, { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { OrderContext } from "../../context/OrderContext";
import Swal from "sweetalert2";

export default function OrdersTable() {
  const { orders, updateStatus } = useContext(OrderContext);

  const handleUpdateOrderStatus = async (orderId, prevStatus) => {
    if (prevStatus === "Cancelled") {
      Swal.fire({
        title: "Order is already cancelled",
        text: `You can't update the status of a ${prevStatus.toLowerCase()} order`,
        icon: "warning",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    if (prevStatus === "Completed") {
      Swal.fire({
        title: "Order is already completed",
        text: `You can't update the status of a ${prevStatus.toLowerCase()} order`,
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
        options.Shipped = "Shipped - In Transit";
        break;
      case "Shipped - In Transit":
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
        {orders.length > 0 ? (
          orders
            .sort(
              (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt) &&
                new Date(b.updatedAt) - new Date(a.updatedAt)
            )
            .map((order, index) => (
              <tr key={index}>
                <td style={{ verticalAlign: "middle" }}>{order.email}</td>
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
                    variant="primary"
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
