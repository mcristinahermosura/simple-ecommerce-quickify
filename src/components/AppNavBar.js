import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {  useContext } from "react";

import { UserContext } from "../context/UserContext.js";
import { Badge } from "react-bootstrap";
import { CartContext } from "../context/CartContext.js";
import Swal from "sweetalert2";
export default function AppNavBar() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const { user, removeUser, isAdmin } = useContext(UserContext);

  return (
    <Navbar expand="lg" className="bg-body-secondary " >
      <Container>
        <Navbar.Brand as={Link} to={"/"} className="logo fw-bold">
          Quickify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" className="font-all">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/products" className="font-all">
              Products
            </Nav.Link>

            <Nav.Link as={NavLink} to="/cart" className="position-relative font-all">
              Cart{" "}
              {cart?.length > 0 && (
                <Badge
                  bg="dark"
                  className="position-absolute top-20 right-20 translate-middle rounded-circle"
                >
                  {cart?.length}
                </Badge>
              )}
            </Nav.Link>
            {isAdmin && (
              <Nav.Link as={NavLink} to="/dashboard" className="font-all">
                Admin Dashboard
              </Nav.Link>
            )}

            {user !== null ? (
              <>
                <Nav.Link
                 className="font-all"
                  as={NavLink}
                  onClick={() =>
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You will be logged out",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, logout",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        removeUser();
                        navigate("/");
                      }
                    })
                  }
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login"  className="font-all">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signUp" className="font-all">
                  Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
