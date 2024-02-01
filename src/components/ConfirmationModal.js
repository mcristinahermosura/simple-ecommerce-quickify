import React, { useState, useEffect, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function ConfirmationModal({
  toggleConfirmationModal,
  modalTitle,
  modalConfirmationQuestion,
}) {
  const { removeUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    toggleConfirmationModal();
  };

  const handleShow = () => setShow(true);

  useEffect(() => {
    handleShow();
  }, []);

  const handleLogout = () => {
    removeUser();
    handleClose();
    navigate("/login");
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalConfirmationQuestion}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
