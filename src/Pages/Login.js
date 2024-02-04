import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import Swal from "sweetalert2";
import {UserContext} from "../context/UserContext.js";
import { Navigate } from "react-router-dom";
import { loginUser } from "../api/index.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, updateUser } = useContext(UserContext);

  /**
   * Flag that determines if the email and password are both non-empty.
   * We use this for disabling and enabling the button.
   *
   * @type {boolean}
   */
  const isActive = email !== "" && password !== "";

  const authenticate = async (event) => {
    event.preventDefault();

    try {
      const data = await loginUser({
        email: email,
        password: password,
      });

      if (data.accessToken) {
        // Update the user context with the new user data and set the token and isAdmin in localStorage
        updateUser(data);
        Swal.fire({
          title: "Login Succesfull",
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
              variant={isActive ? "primary" : "dark"}
              type="submit"
              id="submitBtn"
              disabled={!isActive}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
