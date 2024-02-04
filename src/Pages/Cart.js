import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Container, Table } from "react-bootstrap";
import { Plus, Dash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { ACTION } from "../utils/Contants";
import { ConfirmationModalContext } from "../context/AppModalManagerContext";

export default function Cart() {
  const { cart, removeItem, increase, decrease } = useContext(CartContext);
  const { openModal } = useContext(ConfirmationModalContext);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState({});
  const [usage, setUsage] = useState(ACTION.remove);

  // This function is for the modal to show the confirmation modal
  const toggleConfirmationModal = () => {
    setShow(!show);
  };

  /**
   * Handles the confirmation action for the modal.
   * @param {string} usage - The usage of the modal (remove or checkout).
   * @returns {void}
   */
  const handleModalConfirmation = (usage) => {
    if (usage === ACTION.remove) {
      removeItem(item);
    }
    if (usage === ACTION.checkout) {
      // api call
      // go to order page
      return;
    }
    toggleConfirmationModal();
  };

  return (
    <Container>
      <h1 className="text-center">Cart</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <tr key={index} className="text-center">
                <td>{item.name}</td>
                <td>₱{item.price.toFixed(2)}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center ">
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        if (item.quantity === "1") {
                          toggleConfirmationModal();
                          setItem(item);
                        } else {
                          decrease(item);
                        }
                      }}
                    >
                      <Dash />
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button
                      variant="outline-secondary"
                      onClick={(e) => {
                        console.log(item);
                        e.preventDefault();
                        increase(item);
                      }}
                    >
                      <Plus />
                    </Button>
                  </div>
                </td>
                <td>₱{(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => toggleConfirmationModal()}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                cart is empty
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-end gap-5">
        <Link to="/order">
          <Button
            variant="primary"
            onClick={() => {
              setUsage(ACTION.checkout);
              toggleConfirmationModal();
            }}
          >
            Checkout
          </Button>
        </Link>
        <h3>
          Total: ₱
          {cart && cart.length > 0
            ? cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)
            : 0}
        </h3>
      </div>
      {show &&
        openModal({
          message:
            usage === ACTION.remove
              ? "Are you sure you want to remove this item?"
              : "Are you sure you want to checkout?",
          onConfirm: () => handleModalConfirmation(usage),
          onCancel: toggleConfirmationModal,
        })}
    </Container>
  );
}
