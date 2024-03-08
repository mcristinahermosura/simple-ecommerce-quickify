import {
  Form,
  Button,
  Container,
  Col,
  Row,
  Accordion,
  Card,
  Collapse,
} from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import { useUserContext } from "../context/UserContext.js";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/index.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientOpen, setClientOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useUserContext();

  const authenticate = async (event) => {
    event.preventDefault();

    try {
      const data = await loginUser({
        email: email,
        password: password,
      });

      if (data.accessToken) {
        updateUser(data);
        navigate("/");
        Swal.fire({
          title: "Login Succesful!",
          icon: "success",
          text: "Welcome to Quickify!",
        });
        setEmail("");
        setPassword("");
      } else {
        Swal.fire({
          title: "Authentication Failed",
          icon: "error",
          text: "Check your credentials",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Can't connect to server, please try again later!",
        icon: "info",
      });
    }
  };

  const handleAdminToggle = () => {
    setAdminOpen(!adminOpen);
  };

  const handleClientToggle = () => {
    setClientOpen(!clientOpen);
  };

  return (
    <Container>
      <Row>
        <h1 className="titlefont pt-5 mb-3 text-center">Login</h1>
        <Col className="bg-col col-10 col-md-6 mx-auto shadow-lg rounded">
          <Form onSubmit={(event) => authenticate(event)} className="p-3">
            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                autoComplete="off"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={password}
                autoComplete="off"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Button
              variant={email !== "" && password !== "" ? "success" : "dark"}
              type="submit"
              id="submitBtn"
              className="w-100"
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="mt-3 d-flex justify-content-center align-items-center">
        <Col className="text-center col-10 col-md-4">
          <Accordion defaultActiveKey="0">
            <Card>
              <Card.Header className="accordion-header bg-light shadow-sm">
                <Button
                  className="accordion-button collapsed"
                  type="button"
                  onClick={handleAdminToggle}
                  aria-expanded={adminOpen}
                  aria-controls="admin"
                  variant="light"
                >
                  Admin credentials
                </Button>
              </Card.Header>
              <Collapse in={adminOpen}>
                <Card.Body className="accordion-body bg-white rounded">
                  <p className="mb-0">Email: admin@admin.com</p>
                  <p>Password: admin</p>
                </Card.Body>
              </Collapse>
            </Card>
            <Card>
              <Card.Header className="accordion-header  bg-light shadow-sm">
                <Button
                  variant="light"
                  className="accordion-button collapsed "
                  type="button"
                  onClick={handleClientToggle}
                  aria-expanded={clientOpen}
                  aria-controls="client"
                >
                  Client credentials
                </Button>
              </Card.Header>
              <Collapse in={clientOpen}>
                <Card.Body className="accordion-body bg-white rounded">
                  <p className="mb-0">Email: client@client.com</p>
                  <p>Password: client</p>
                </Card.Body>
              </Collapse>
            </Card>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}
