import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Alert, Button, Container, Form, Image, Table } from "react-bootstrap";
import { Plus, Dash } from "react-bootstrap-icons";

import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import { OrderContext } from "../context/OrderContext";
import emptyCart from "../assets/images/empty-cart.png";

export default function Cart() {
  const { cart, removeItem, increase, decrease, clearCart } =
    useContext(CartContext);
  const id = JSON.parse(localStorage.getItem("id"));
  const token = JSON.parse(localStorage.getItem("token"));
  const { checkout } = useContext(OrderContext);
  const [shippingAddress, setShippingAddress] = useState("");
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    if (!token) {
      Swal.fire({
        title: "Please login to checkout",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

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

    console.log("here");
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
    <Container className="pb-4">
      <h1 className=" titlefont text-center pt-5">Cart</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr className="text-center font-all">
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
            <tr style={{}}>
              <td colSpan="5" className="text-center font-all">
                <Alert variant="warning">
                  <Alert.Heading>Your cart is empty!</Alert.Heading>
                  <p>
                    You have not added any items to your cart yet. Please browse
                    our products and add some to your cart today.
                  </p>
                  <Image
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      margin: "auto",
                      display: "block",
                    }}
                    src={emptyCart}
                  />
                </Alert>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="d-flex flex-column justify-content-between font-all">
        <div className="card p-4 mb-3">
          <h4 className="mb-3">Shipping Details</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Shipping Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={1}
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
          <Button className="btn btn-all font-all px-4" onClick={handleCheckout}>
            Checkout
          </Button>
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
