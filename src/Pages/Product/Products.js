import React from "react";
import { Card, Container, Row, Col, Button, Badge } from "react-bootstrap";
import useRetrieveProducts from "../../hooks/useRetrieveProducts";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
              sm={8}
              md={6}
              lg={4}
              className="mb-5"
            >
              <motion.div
                as={Card}
                className="card"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, smooth: "easeInOut" }}
                style={{
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  height: "100%",
                }}
                onClick={(e) => viewProduct(e, product._id)}
              >
               
                <motion.div
                  className="card-body"
                  style={{ height: "50%" }}
                  whileHover={{ filter: "brightness(0.8)" }}
                >
                  <h5 className="card-title text-truncate fw-bold">
                    {product.name}
                  </h5>
                  <p className="card-text text-truncate">
                    {product.description}
                  </p>
                  <p className="card-text">₱ {product.price.toFixed(2)}</p>

                  <Badge bg={product.stock > 0 ? "success" : "danger"}>
                    <p className="card-text">
                      {`Stock${product.stock > 1 ? "s" : ""}: ${
                        product.stock
                      } `}
                    </p>
                  </Badge>
                </motion.div>
                <motion.div
                  className="card-footer d-grid"
                  whileHover={{ filter: "brightness(0.8)" }}
                >
                  <Button
                    className="btn btn-all"
                    onClick={(e) => viewProduct(e, product._id)}
                  >
                    Details
                  </Button>
                </motion.div>
              </motion.div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
