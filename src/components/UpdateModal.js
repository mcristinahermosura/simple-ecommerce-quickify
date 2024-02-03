import React, { useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../context/UserContext";
import { RESPONSE_STATUS } from "../utils/Contants";

export default function UpdateModal(props) {
  const { user } = useContext(UserContext);

  const [name, setName] = useState(props.product.name);
  const [description, setDescription] = useState(props.product.description);
  const [price, setPrice] = useState(props.product.price);
  const [stock, setStock] = useState(props.product.stock);

  const updateProduct = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:4000/products/update/${props.product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user}`,
          },
          body: JSON.stringify({
            name: name,
            description: description,
            price: price,
            stock: stock,
          }),
        }
      );

      const data = await response.json();

      if (data.status === RESPONSE_STATUS.SUCCESS) {
        Swal.fire({
          title: "Product Updated!",
          icon: "success",
          text: "Product has been updated",
        });
        props.toggleUpdateModal();
        props.refetchProducts();
      } else {
        Swal.fire({
          title: "Product Update Failed!",
          icon: "error",
          text: "Product has not been updated",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Can't connect to server, please try again later!",
        icon: "info",
      });
    }
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
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product stock"
                value={stock}
                onChange={(event) => setStock(event.target.value)}
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
                stock === ""
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
