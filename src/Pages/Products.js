import React, { useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  Badge,
  Dropdown,
  Spinner,
  DropdownButton,
} from "react-bootstrap";
import useRetrieveProducts from "../hooks/useRetrieveProducts";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDownUp } from "react-bootstrap-icons";
import useFilterArray from "../hooks/useFilterArray";
import { BODY_SHOP_LOGO } from "../utils/constant";

export default function Products() {
  const navigate = useNavigate();
  const { products, isLoading } = useRetrieveProducts();
  const { array, reverseFilter, filterArray } = useFilterArray(products);
  const [filter, setFilter] = useState("");

  const handleFilter = (filter) => {
    setFilter(filter);
    filterArray(filter);
  };

  const viewProduct = (e, id) => {
    e.preventDefault();
    navigate(`/product/${id}`);
  };

  return (
    <Container>
      <h1 className="titlefont pt-5 mb-3 text-center animate ">Our Product</h1>
      <Row>
        <Dropdown className="d-flex align-items-center justify-content-end gap-4 mb-5">
          <DropdownButton
            id="dropdown-basic-button"
            title={
              filter.length > 0
                ? filter[0].toUpperCase() + filter.slice(1)
                : "Filter by"
            }
            variant="secondary"
          >
            <Dropdown.Item
              onClick={() => handleFilter("stock")}
              className="btn btn-secondary"
            >
              Stock
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleFilter("price")}
              className="btn btn-secondary"
            >
              Price
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => handleFilter("latest")}
              className="btn btn-secondary"
            >
              Latest
            </Dropdown.Item>
          </DropdownButton>
          <Button variant="secondary" onClick={() => reverseFilter(filter)}>
            <ArrowDownUp className="icon-link-hover " />
          </Button>
        </Dropdown>
      </Row>
      {isLoading ? (
        <Row className="d-flex justify-content-center align-items-end ">
          <Spinner
            animation="border"
            role="status"
            style={{
              width: "7.5rem",
              height: "7.5rem",
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Row>
      ) : (
        <Row>
          {array?.map((product) => {
            return (
              <Col
                key={product._id}
                xs={12}
                sm={8}
                md={6}
                lg={4}
                xl={3}
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
                    height: array.some((p) => p.image.url) ? "500px" : "none",
                  }}
                  onClick={(e) => viewProduct(e, product._id)}
                >
                  <motion.div
                    className="card-img-top"
                    style={{ maxHeight: "50%", height: "100%" }}
                  >
                    <Card.Img
                      variant="top"
                      src={
                        product.image.url ? product.image.url : BODY_SHOP_LOGO
                      }
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </motion.div>
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
      )}
    </Container>
  );
}
