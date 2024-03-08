import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import { useCartContext } from "../context/CartContext";
import { useUserContext } from "../context/UserContext";
export default function AppNavBar() {
  const { cart } = useCartContext();
  const navigate = useNavigate();
  const { token, removeUser, isAdmin } = useUserContext();

  return (
    <Navbar expand="lg" className="bg-body-secondary">
      <Container>
        <Navbar.Brand as={Link} to={"/"} className="logo fw-bold">
          Quickify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>

            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>

            {!isAdmin && (
              <>
                <Nav.Link
                  as={NavLink}
                  to="/cart"
                  className="position-relative font-all"
                >
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
                <Nav.Link as={NavLink} to="/orders" className="font-all">
                  Orders
                </Nav.Link>
              </>
            )}
            {isAdmin && (
              <Nav.Link as={NavLink} to="/dashboard">
                Admin Dashboard
              </Nav.Link>
            )}

            {token !== null ? (
              <>
                <Nav.Link
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
                        Swal.fire("Logged out successfully!", "", "success", {
                          timer: 2500,
                          showConfirmButton: false,
                          allowOutsideClick: false,
                        });
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
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/signUp">
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
