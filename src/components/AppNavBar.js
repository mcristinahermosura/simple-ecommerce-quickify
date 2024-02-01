import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../UserContext.js";
import ConfirmationModal from "./ConfirmationModal.js";
export default function AppNavBar() {
  const { user } = useContext(UserContext);

  console.log(user);

  const [showLogout, setShowLogout] = useState(false);

  const handleLogoutClick = () => {
    setShowLogout(true);
  };

  return (
    <Navbar expand="lg" className="bg-light">
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

            <Nav.Link as={NavLink} to="/dashboard">
              Admin Dashboard
            </Nav.Link>

            {user !== null ? (
              <>
                <Nav.Link as={NavLink} onClick={handleLogoutClick}>
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
      {showLogout && (
        <ConfirmationModal
          toggleConfirmationModal={() => setShowLogout(!showLogout)}
          modalConfirmationQuestion={"Are you sure you want to logout?"}
          modalTitle={"Logout"}
        />
      )}
    </Navbar>
  );
}
