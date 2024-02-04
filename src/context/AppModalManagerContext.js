import React, { createContext, useState } from "react";
import ConfirmationModalContent from "../components/ConfirmationModal";

const initialState = {
  show: false,
  message: "",
  onConfirm: () => {},
  onCancel: () => {},
};

export const ConfirmationModalContext = createContext(initialState);

export const ConfirmationModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(initialState);

  const openModal = ({ message, onConfirm, onCancel }) => {
    setModalData({
      show: true,
      message: message,
      onConfirm: onConfirm,
      onCancel: onCancel,
    });
  };

  const closeModal = () => {
    setModalData(initialState);
  };

  const handleConfirm = () => {
    modalData.onConfirm();
    closeModal();
  };

  const handleCancel = () => {
    modalData.onCancel();
    closeModal();
  };

  return (
    <ConfirmationModalContext.Provider value={{ openModal, closeModal }}>
      {modalData.show && (
        <ConfirmationModalContent
          show={modalData.show}
          message={modalData.message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
      {children}
    </ConfirmationModalContext.Provider>
  );
};
