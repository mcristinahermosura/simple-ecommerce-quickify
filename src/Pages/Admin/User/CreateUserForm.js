import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";

const CreateUserForm = forwardRef(({ props }, ref) => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const { name, email, password, isAdmin } = state;

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.checked,
    });
  };

  const handleUserCreation = () => {
    const errors = [];

    if (!name) {
      errors.push("Name is required!");
    }
    if (!email) {
      errors.push("Email is required!");
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.push("Invalid email format!");
    }
    if (!password) {
      errors.push("Password is required!");
    }

    if (errors.length > 0) {
      const errorList = errors.join("<br>");
      return Swal.showValidationMessage(errorList);
    }

    return { data: { name, email, password, isAdmin } };
  };

  useImperativeHandle(ref, () => ({
    handleUserCreation,
  }));

  return (
    <Form className="p-3">
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          required
          value={name}
          autoComplete="off"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email Address"
          required
          value={email}
          autoComplete="off"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          required
          value={password}
          autoComplete="off"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="isAdmin">
        <Form.Check
          type="checkbox"
          label="Admin"
          className="my-2"
          checked={isAdmin}
          onChange={handleCheckboxChange}
        />
      </Form.Group>
    </Form>
  );
});

export default CreateUserForm;
