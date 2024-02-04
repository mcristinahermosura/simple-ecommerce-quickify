import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import useRetrieveProducts from "../../hooks/useRetrieveProducts";

export default function Products() {
  const { products } = useRetrieveProducts();

  return (
    <Container>
      <Row>
        <h1 className=" pt-5 mb-3 text-center"> Our Product </h1>
        {products.map((product) => {
          return (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                {/* <Card.Img variant="top" src={product.image} /> */}
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>Php {product.price}</Card.Text>
                  <Card.Text>{product.quantity}</Card.Text>
                </Card.Body>
                <Card.Footer className=" d-grid">
                  <Button variant="primary">Details</Button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
