import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function UpdateModal(props) {
  const navigate = useNavigate();

  const [name, setName] = useState(props.product.name);
  const [description, setDescription] = useState(props.product.description);
  const [price, setPrice] = useState(props.product.price);
  const [quantity, setQuantity] = useState(props.product.quantity);

  const updateProduct = (event) => {
    event.preventDefault();

    fetch(`http://localhost:4000/products/${props.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        quantity: quantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          Swal.fire({
            title: "Product Updated!",
            icon: "success",
            text: "Product has been updated",
          });
          navigate("/adminDashboard");
        } else {
          Swal.fire({
            title: "Product Update Failed!",
            icon: "error",
            text: "Product has not been updated",
          });
        }
      })
      .catch(() =>
        Swal.fire({
          title: "Can't connect to server, please try again later!",
          icon: "info",
        })
      );
  };

  return (
    <>
      <Modal show={true} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={updateProduct}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product quantity"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                required
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
              id="submitBtn"
              disabled={
                name === "" ||
                description === "" ||
                price === "" ||
                quantity === ""
              }
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.toggleUpdateModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
