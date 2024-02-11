import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";
import { registerUser } from "../api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const handleRegisterUser = async (event) => {
    event.preventDefault();

    if (password !== verifyPassword) {
      Swal.fire({
        title: "Passwords do not match! Please try again!",
        icon: "error",
        timer: 2000,
      });
      return;
    }

    try {
      const data = await registerUser({
        email: email,
        password: password,
      });
      if (data.status === "success") {
        console.log(data);
        Swal.fire({
          title: "Thank you for registering",
          icon: "success",
          text: data.message
        });

        setEmail("");
        setPassword("");
        setVerifyPassword("");
      }
      else {
        Swal.fire({
          title: "Registration Failed",
          icon: "error",
          text: data.message
        })
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Can't connect to server, please try again later!",
        icon: "info",
      });
    }
  };

  return (
    <Container className="">
      <Row>
        <h1 className=" titlefont pt-5 mb-3 text-center">Register</h1>
        <Col className="bg-col col-7 col-md-6 mx-auto shadow-lg rounded">
          <Form onSubmit={handleRegisterUser} className="p-3">
            <Form.Group controlId="email">
              <Form.Label >Email</Form.Label>
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
              <Form.Label >Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              {password !== verifyPassword && (
                <Form.Text className="text-danger">
                  Passwords do not match
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="password2">
              <Form.Label >Verify Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Verify Password"
                required
                value={verifyPassword}
                onChange={(event) => {
                  setVerifyPassword(event.target.value);
                }}
              />
              {password !== verifyPassword && (
                <Form.Text className="text-danger">
                  Passwords do not match
                </Form.Text>
              )}
            </Form.Group>

            <Button className=" btn-all" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
