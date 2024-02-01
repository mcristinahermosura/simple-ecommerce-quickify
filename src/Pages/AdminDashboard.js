import { Button, Container, Table } from "react-bootstrap";
import useRetrieveProducts from "../hooks/useRetrieveProducts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../components/UpdateModal";
import ConfirmationModal from "../components/ConfirmationModal";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { products } = useRetrieveProducts();

  const [updateModal, setUpdateModal] = useState(false);

  const [archive, setArchive] = useState(false);

  const [disableModal, setDisableModal] = useState(false);

  const [product, setProduct] = useState({});

  const toggleDisableModal = () => {
    setDisableModal(!disableModal);
  };

  const toggleUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  return (
    <Container className="flex justify-content-center align-items-center">
      <h1 className=" p-5 text-center">Admin Dashboard</h1>
      <div className="d-grid gap-2 d-flex justify-content-center pb-4">
        <Button
          onClick={() => navigate("/addProduct")}
          variant="primary"
          size="sm"
        >
          Add New Product
        </Button>
        <Button variant="success" size="sm">
          Show User Order
        </Button>
      </div>
      <Table striped bordered hover responsive variant="secondary">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Availability</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            console.log(product);
            return (
              <tr key={index} className="text-center">
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>₱{product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>{product.isActive ? "Available" : "Unavailable"}</td>

                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      toggleUpdateModal();
                      setProduct(product);
                    }}
                  >
                    Update
                  </Button>
                  <Button variant="danger" onClick={toggleDisableModal}>
                    {archive ? "Enable" : "Disable"}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {updateModal && (
        <UpdateModal product={product} toggleUpdateModal={toggleUpdateModal} />
      )}
      {disableModal && (
        <ConfirmationModal
          modalConfirmationQuestion={`Are you sure you want to ${
            archive ? "enable" : "disable"
          } this product? `}
          modalTitle={""}
          toggleConfirmationModal={toggleDisableModal}
        />
      )}
    </Container>
  );
}
