import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import useRetrieveProducts from "../../hooks/useRetrieveProducts";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const navigate = useNavigate();
  const { products } = useRetrieveProducts();

  
  const viewProduct = (e, id) => {
    e.preventDefault();

    navigate(`/product/${id}`);
  };

  return (
    <Container>
      <Row>
        <h1 className="titlefont pt-5 mb-3 text-center "> Our Product </h1>
        {products.map((product) => {
          return (
            <Col
              key={product._id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-5"
            >
              <Card className="bg-card h-100 shadow-lg rounded border-3" >
                {/* <Card.Img variant="top" src={product.image} /> */}
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="text-truncate">
                    {product.description}
                  </Card.Text>
                  <Card.Text>₱ {product.price.toFixed(2)}</Card.Text>
                  <Card.Text>
                    {`Stock${product.stock > 1 ? "s" : ""}: ${product.stock} `}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-grid">
                  <Button
                  
                    onClick={(e) => viewProduct(e, product._id)}
                  >
                    Details
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
