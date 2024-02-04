import { Button, Container, Table } from "react-bootstrap";
import useRetrieveProducts from "../hooks/useRetrieveProducts";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UpdateModal from "../components/UpdateModal";
import ConfirmationModal from "../components/ConfirmationModal";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import { updateProductStatus } from "../api";
import { RESPONSE_STATUS } from "../utils/Contants";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { isAdmin, user } = useContext(UserContext);

  const { products, refetchProducts } = useRetrieveProducts();

  const [updateModal, setUpdateModal] = useState(false);
  const [showDisableModal, setShowDisableModal] = useState(false);
  const [productStatusFlag, setProductStatusFlag] = useState(false);
  const [product, setProduct] = useState({});

  const toggleDisableModal = () => {
    setShowDisableModal(!showDisableModal);
  };

  const toggleUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  const updateProductAvailability = async () => {
    try {
      const res = await updateProductStatus(product, user);

      if (res.status !== RESPONSE_STATUS.SUCCESS) {
        Swal.fire({
          title: "Failed to update product availability",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Product availability updated",
          icon: "success",
        });
        refetchProducts();
      }
    } catch (error) {
      Swal.fire({
        title: "Can't connect to server, please try again later!",
        icon: "info",
      });
    }
  };

  return isAdmin ? (
    <Container className="flex justify-content-center align-items-center">
      <h1 className=" p-5 text-center">Admin Dashboard</h1>
      <div className="d-grid gap-2 d-flex justify-content-center pb-4">
        <Button
          onClick={() => navigate("/add-product")}
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
            return (
              <tr key={index} className="text-center">
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>₱{product.price.toFixed(2)}</td>
                <td>{product.stock}</td>
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
                  <Button
                    variant={product.isActive ? "danger" : "success"}
                    onClick={() => {
                      toggleDisableModal();
                      setProductStatusFlag(product.isActive);
                      setProduct(product);
                    }}
                  >
                    {product.isActive ? "Disable" : "Enable"}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {updateModal && (
        <UpdateModal
          product={product}
          toggleUpdateModal={toggleUpdateModal}
          updateCallback={updateProductAvailability}
          refetchProducts={refetchProducts}
        />
      )}
      {showDisableModal && (
        <ConfirmationModal
          modalConfirmationQuestion={`Are you sure you want to ${
            productStatusFlag ? "disable" : "enable"
          } this product? `}
          modalTitle={""}
          toggleConfirmationModal={toggleDisableModal}
          confirmationCallback={updateProductAvailability}
        />
      )}
    </Container>
  ) : (
    <></>
  );
}
