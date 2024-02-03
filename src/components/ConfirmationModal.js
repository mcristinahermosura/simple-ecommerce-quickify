import React from "react";
import { Button, Modal } from "react-bootstrap";

const ConfirmationModal = React.memo(
  ({
    toggleConfirmationModal,
    modalTitle,
    modalConfirmationQuestion,
    confirmationCallback,
  }) => {
    const handleClose = () => {
      toggleConfirmationModal();
    };

    const handleConfirmation = () => {
      handleClose();

      confirmationCallback();
    };

    return (
      <div>
        <Modal show={true} onHide={handleClose}>
          {modalTitle && (
            <Modal.Header closeButton>
              <Modal.Title>{modalTitle}</Modal.Title>
            </Modal.Header>
          )}
          <Modal.Body>{modalConfirmationQuestion}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={handleConfirmation}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
);

export default ConfirmationModal;
