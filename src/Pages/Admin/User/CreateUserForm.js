import React from "react";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function CreateUserForm() {
  const handleUserCreation = () => {
    const name = document.getElementById("name")?.value?.trim();
    const email = document.getElementById("email")?.value?.trim();
    const password = document.getElementById("password")?.value?.trim();
    const isAdmin = document.getElementById("isAdmin")?.checked;

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

    return {
      name,
      email,
      password,
      isAdmin,
    };
  };
  return {
    html: (
      <Form className="p-3">
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" required />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email Address" required />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" required />
        </Form.Group>
        <Form.Group controlId="isAdmin">
          <Form.Check type="checkbox" label="Admin" className="my-2" />
        </Form.Group>
      </Form>
    ),

    title: "Create User",
    allowOutsideClick: false,
    showCancelButton: true,
    confirmButtonText: "Create",
    denyButtonText: "Close",
    preConfirm: handleUserCreation,
  };
}
