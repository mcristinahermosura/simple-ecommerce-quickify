import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Container, Form, Table } from "react-bootstrap";
import { Plus, Dash } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { OrderContext } from "../context/OrderContext";

export default function Cart() {
  const { cart, removeItem, increase, decrease, clearCart } =
    useContext(CartContext);
  const id = JSON.parse(localStorage.getItem("id"));
  const { checkout } = useContext(OrderContext);
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    const order = {
      userId: id,
      orders: cart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      totalAmount: cart
        .reduce((acc, item) => acc + item.price * item.quantity, 0)
        .toFixed(2),
      shippingAddress: shippingAddress,
      paymentMethod: "Cash On Delivery",
    };

    Swal.fire({
      title: "Are you sure you want to checkout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        checkout(order, navigate);
        clearCart();
      }
    });
  };

  return (
    <Container>
      <h1 className="text-center">Cart</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.name}</td>
                <td>₱{item.price.toFixed(2)}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center ">
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        if (item.quantity === "1") {
                          Swal.fire({
                            title: "Are you sure you want to remove this item?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Yes",
                            cancelButtonText: "No",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              removeItem(item);
                            }
                          });
                        } else {
                          decrease(item);
                        }
                      }}
                    >
                      <Dash />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        increase(item);
                      }}
                    >
                      <Plus />
                    </Button>
                  </div>
                </td>
                <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() =>
                      Swal.fire({
                        title: "Are you sure you want to remove this item?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Yes",
                        cancelButtonText: "No",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          removeItem(item);
                        }
                      })
                    }
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                cart is empty
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="d-flex flex-column justify-content-between">
        <div className="card p-4 mb-3">
          <h4 className="mb-3">Shipping Details</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setShippingAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Control disabled value="Cash On Delivery" />
            </Form.Group>
          </Form>
        </div>
        <div className="d-flex justify-content-end gap-5">
          <Link to="/order">
            <Button variant="primary" onClick={handleCheckout}>
              Checkout
            </Button>
          </Link>
          <h3>
            Total: ₱
            {cart && cart.length > 0
              ? cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)
              : 0}
          </h3>
        </div>
      </div>
    </Container>
  );
}
