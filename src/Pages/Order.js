import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Table,
  Alert,
  Image,
} from "react-bootstrap";

import { OrderContext } from "../context/OrderContext";
import { format } from "date-fns";
import Swal from "sweetalert2";
import NoOrder from "../assets/no-orders.png";

export default function OrderHistory() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));

  const { orders, updateOrderCancel } = useContext(OrderContext);

  const handleCancelOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrderCancel(id);
      }
    });
  };

  return (
    <Container className="mt-5">
      <Row>
        {orders !== undefined ? (
          orders.map((order) => (
            <Col key={order?._id} xs={12} md={8} lg={6} xl={4} className="mb-4">
              <Card>
                <Card.Header className="bg-light">
                  <Card.Title className="text-muted">
                    Order ID: {order?._id}
                  </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Table striped bordered hover size="sm">
                    <tbody>
                      <tr>
                        <th>Status</th>
                        <td>
                          <Badge
                            bg={
                              order?.orderStatus === "Pending"
                                ? "warning"
                                : "success"
                            }
                          >
                            {order?.orderStatus}
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td>
                          {format(order?.createdAt, "MM/dd/yyyy hh:mm:ss a")}
                        </td>
                      </tr>
                      <tr>
                        <th>Total</th>
                        <td>₱{order?.totalAmount.toFixed(2)}</td>
                      </tr>

                      <tr>
                        <th colSpan="2">Products</th>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          <ul className="mb-0 pl-3">
                            {order?.orders.map((item) => (
                              <li key={item._id}>
                                <p className="mb-1">
                                  <strong>{item.productName}</strong> - ₱
                                  {item.price.toFixed(2)} each
                                </p>
                                <p className="mb-1">
                                  {" "}
                                  Quantity: {item.quantity}
                                </p>
                                <p className="mb-2">
                                  Total: ₱ {item.total.toFixed(2)}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  {!isAdmin && order?.orderStatus === "Pending" && (
                    <Button
                      variant="danger"
                      onClick={() => handleCancelOrder(order?._id)}
                    >
                      Cancel Order
                    </Button>
                  )}
                  {!isAdmin && order?.orderStatus === "Delivered" && (
                    <Button
                      variant="info"
                      onClick={() => handleCancelOrder(order?.id)}
                    >
                      Received
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Container className="mt-5">
            <Row>
              <Col>
                <Alert variant="warning">
                  <Alert.Heading>No Orders Found!</Alert.Heading>
                  <p>
                    You have not placed any orders yet. Please browse our
                    products and place an order today.
                  </p>
                  <Image
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      margin: "auto",
                      display: "block",
                    }}
                    src={NoOrder}
                    fluid
                  />
                </Alert>
              </Col>
            </Row>
          </Container>
        )}
      </Row>
    </Container>
  );
}
