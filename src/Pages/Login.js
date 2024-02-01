import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import UserContext from "../UserContext.js";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  const { user, updateUser } = useContext(UserContext);

  // const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [email, password]);

  function authenticate(event) {
    event.preventDefault();

    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken) {
          updateUser(data.accessToken);
          Swal.fire({
            title: "Login Succesfull",
            icon: "success",
            text: "Welcome to Quickify!",
          });
        } else {
          Swal.fire({
            title: "Authentication Failed",
            icon: "error",
            text: "Check your credentials",
          });
        }
      })
      .catch(() =>
        Swal.fire({
          title: "Can't connect to server, please try again later!",
          icon: "info",
        })
      );

    setEmail("");
    setPassword("");
  }

  return user ? (
    <Navigate to="/" />
  ) : (
    <Container>
      <Row>
        <h3 className=" pt-5 mb-3 text-center">Login</h3>
        <Col className="col-4 mx-auto shadow-lg rounded">
          <Form onSubmit={(event) => authenticate(event)} className="p-3">
            <Form.Group className="mb-3" controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
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
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              id="submitBtn"
              disabled={isActive}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
