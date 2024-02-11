import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getSingleProduct } from "../../api";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";

export default function ViewSingleProduct() {
  const { addItem } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await getSingleProduct(id);
        setProduct(response.data);
      } catch (error) {
        Swal.fire({
          title: `${error.message}`,
          icon: "error",
        });
      }
    };

    getProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!product) {
    return <></>;
  }

  return (
    <Container className="d-flex align-items-center justify-content-start flex-column mt-5 font-all ">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="product-details">
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
            <p>Price: ₱{product?.price?.toFixed(2)}</p>
            <p>Stock: {product?.stock}</p>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center text-center h-100">
        <Col className="d-flex gap-5 justify-content-center ">
          <Button
            as={Link}
            to="/products"
            className="btn btn-all xs-mb-3 mr-5"
          >
            Go back to products
          </Button>
          <Button
           className="btn btn-all"
            variant={user ? "primary" : "dark"}
            onClick={() =>
              !user
                ? Swal.fire({
                    title:
                      "Oops! You need to log in before adding items to your cart.",
                    icon: "info",
                  })
                : (addItem(product),
                  Swal.fire({
                    title: "Item added to cart",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                  }))
            }
            disabled={product.stock === 0}
          >
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
