import React, { useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { OrderContext } from "../../context/OrderContext";
import Swal from "sweetalert2";

export default function OrdersTable() {
  const { orders, updateStatus } = useContext(OrderContext);

  const handleUpdateOrderStatus = async (orderId, prevStatus) => {
    if (prevStatus === "Completed" ) {
      Swal.fire({
        title: "Order is already completed",
        text: `You can't update the status of a ${prevStatus.toLowerCase()} order`,
        icon: "warning",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    const { value: status } = await Swal.fire({
      title: "Update Order Status",
      input: "select",
      inputOptions: {
        ToShip: "To Ship",
        Shipped: "Shipped",
        InTransit: "In Transit",
        Delivered: "Delivered",
        Completed: "Completed",
      },
      inputPlaceholder: "Select a status",
      showCancelButton: true,
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
          orders?.map((order, index) => (
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
                  onClick={() => handleUpdateOrderStatus(order._id)}
                  className="mb-2"
                >
                  Update Status
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <></>
        )}
      </tbody>
    </Table>
  );
}
