import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (
      email !== "" &&
      password !== "" &&
      verifyPassword !== "" &&
      password === verifyPassword
    ) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [email, password, verifyPassword]);

  const registerUser = async (event) => {
    event.preventDefault();

    try {
      const data = await registerUser({
        email: email,
        password: password,
      });

      if (data) {
        Swal.fire({
          title: "Thank you for registering",
          icon: "success",
        });

        setEmail("");
        setPassword("");
        setVerifyPassword("");
      } else {
        Swal.fire({
          title: "Already registered. Please use another email!",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Can't connect to server, please try again later!",
        icon: "info",
      });
    }
  };

  return (
    <Container>
      <Row>
        <h3 className="pt-5 mb-3 text-center">Register</h3>
        <Col className="col-4 mx-auto shadow-lg rounded">
          <Form onSubmit={(event) => registerUser(event)} className="p-3">
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>

            <Form.Group className="mb-3" controlId="password1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Verify Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Verify Password"
                required
                value={verifyPassword}
                onChange={(event) => {
                  setVerifyPassword(event.target.value);
                }}
              />
            </Form.Group>

            <Button disabled={isActive} variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
