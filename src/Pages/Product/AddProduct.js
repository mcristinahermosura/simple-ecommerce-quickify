import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import swal from "sweetalert2";
import { UserContext } from "../../context/UserContext";
import { createProduct } from "../../api";

const ProductCreation = () => {
  const { user } = useContext(UserContext);
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  const handleProductCreation = async () => {
    try {
      const productData = {
        name: productName,
        description: productDescription,
        price: productPrice,
        quantity: productQuantity,
      };

      const data = await createProduct(productData, user);

      if (data?.error && data.error.length > 0) {
        swal.fire("Error", data.error, "error");
      } else {
        swal.fire("Success", "Product created successfully", "success");
      }
    } catch (error) {
      swal.fire("Error", "Failed to create product", "error");
    }
  };

  return (
    <Container className="pt-5">
      <Row>
        <Col className="col-9 p-3 mx-auto shadow-lg rounded">
          <h3 className="mb-3">Add Product</h3>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="productDescription">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter product description"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="productPrice">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product price"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="productQuantity" className="mb-3">
              <Form.Label>Product Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter product quantity"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
              />
            </Form.Group>

            <Button className="btn btn-all" onClick={handleProductCreation}>
              Create Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductCreation;
