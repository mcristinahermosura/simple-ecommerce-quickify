import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Table,
  Alert,
  Image,
  Nav,
} from "react-bootstrap";

import { useOrderContext } from "../../context/OrderContext";
import { format } from "date-fns";
import Swal from "sweetalert2";
import NoOrder from "../../assets/images/no-orders.png";
import { updateOrderStatus } from "../../api";
import { BODY_SHOP_LOGO, ORDER_STATUS } from "../../utils/constant";
import { useUserContext } from "../../context/UserContext";

export default function OrderHistory() {
  const { orders, updateOrderCancel } = useOrderContext();
  const { token } = useUserContext();
  const [selectedStatus, setSelectedStatus] = useState(null);

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

  const handleReceivedOrder = (id) => {
    Swal.fire({
      title: "By clicking yes, you confirm that you have received the order.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, received it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrderStatus(id, "Completed", token).then((res) => {
          if (res.status === 200) {
            Swal.fire(
              "Completed!",
              "Your order has been received.",
              "success",
              { timer: 2000 }
            );
          }
        });
      }
    });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Nav variant="tabs" className="d-flex justify-content-center mb-3">
          <Nav.Item key="all-orders">
            <Nav.Link
              active={selectedStatus === null}
              onClick={() => setSelectedStatus(null)}
              className="px-3 py-2"
            >
              All Orders
            </Nav.Link>
          </Nav.Item>

          {/* Other status buttons */}
          {Object.values(ORDER_STATUS).map((status) => (
            <Nav.Item key={status}>
              <Nav.Link
                active={selectedStatus === status}
                onClick={() => setSelectedStatus(status)}
                className="px-3 py-2"
              >
                {status}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
        {orders !== undefined || orders.length > 0 ? (
          orders
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .filter((order) => {
              if (selectedStatus === null) return true;
              return order.orderStatus === selectedStatus;
            })
            .map((order, index) => (
              <React.Fragment key={index}>
                <Col
                  key={order._id}
                  xs={12}
                  style={{
                    padding: "2rem 1rem",
                  }}
                >
                  <div className="order-card">
                    <div className="order-header">
                      <img
                        src={BODY_SHOP_LOGO}
                        alt="Brand Logo"
                        width={"25%"}
                      />
                      <div>
                        <h4>Order ID: {order._id}</h4>
                        <p>
                          Date:{" "}
                          {format(order.createdAt, "MM/dd/yyyy hh:mm:ss a")}
                        </p>
                      </div>
                    </div>
                    <div className="order-details">
                      <Table striped bordered hover size="sm">
                        <tbody>
                          <tr>
                            <th className="text-center">Status</th>
                            <td className="text-center">
                              <Badge
                                bg={
                                  order.orderStatus === "Pending"
                                    ? "warning"
                                    : "success"
                                }
                              >
                                {order.orderStatus}
                              </Badge>
                            </td>
                          </tr>
                          <tr>
                            <th>Total</th>
                            <td className="text-center">
                              ₱{order.totalAmount.toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <th colSpan="2">Products</th>
                          </tr>
                          {order.orders.map((item, index) => (
                            <tr key={index}>
                              <td width={"80%"}>
                                <img
                                  src={item.image?.url ?? BODY_SHOP_LOGO}
                                  alt={item.productName}
                                  width="20%"
                                />
                                <strong>{item.productName}</strong>
                              </td>
                              <td className="text-center">
                                <div>
                                  <strong>{item.name}</strong>
                                  <p>Quantity: {item.quantity}</p>
                                  <p>₱{item.total.toFixed(2)}</p>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>

                      <div className="order-actions text-end">
                        {order.orderStatus === "Pending" && (
                          <Button
                            variant="danger"
                            onClick={() => handleCancelOrder(order._id)}
                            className=""
                          >
                            Cancel Order
                          </Button>
                        )}
                        {order.orderStatus === "Delivered" && (
                          <Button
                            variant="info"
                            onClick={() => handleReceivedOrder(order._id)}
                          >
                            Received
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
                {index !== orders.length - 1 && <hr />}
              </React.Fragment>
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
