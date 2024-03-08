import { Button, ButtonGroup, Container, ToggleButton } from "react-bootstrap";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { ADMIN_TABLES, RESPONSE_STATUS } from "../../utils/constant";
import { CreateProductForm } from "./Product";
import ProductTable from "./ProductTable";
import UsersTable from "./UsersTable";
import OrdersTable from "./OrdersTable";
import { CreateUserForm } from "./User";
import "../Layout.css";
import { createProduct, registerUser } from "../../api";
import withReactContent from "sweetalert2-react-content";
import { useUserContext } from "../../context/UserContext";

export default function AdminDashboard() {
  const token = JSON.parse(localStorage.getItem("token"));
  const [radioValue, setRadioValue] = useState("products");
  const { fetchUsers } = useUserContext();
  const createProductRef = useRef(null);
  const handleUserRef = useRef(null);

  const handleProductCreation = async (product) => {
    try {
      const data = await createProduct(product, token);

      if (data.status === RESPONSE_STATUS.ERROR) {
        Swal.fire({
          title: "Error",
          text: data.message,
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      } else if (data.status === RESPONSE_STATUS.FAILED) {
        Swal.fire({
          title: "Error",
          text: "Failed to create product",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Success",
          text: "Product created successfully",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to create product",
        icon: "error",
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const handleUserCreation = async (user) => {
    try {
      const res = await registerUser(user);

      if (res.status === "success") {
        Swal.fire({
          title: "User created successfully",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
        });
        await fetchUsers();

        if (radioValue !== "users") {
          setRadioValue("users");
        }
      } else {
        Swal.fire({
          title: "Failed to create user",
          icon: "error",
          text: res.message,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Failed to create user",
        icon: "error",
        text: error.message.length > 0 ? error.message : error,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const handleRefCreate = async () => {
    const res = await createProductRef.current.handleCreate();

    if (res) {
      handleProductCreation(res.data);
    }
  };

  const handleCreateUserRef = async () => {
    const res = await handleUserRef.current.handleUserCreation();

    if (res) {
      handleUserCreation(res.data);
    }
  };

  const handleCreateUser = async () => {
    try {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Create User",
        html: (
          <div>
            <CreateUserForm ref={handleUserRef} />

            <div className="d-flex  gap-3 justify-content-center align-items-center mt-5">
              <Button variant="primary" onClick={handleCreateUserRef}>
                Create
              </Button>
              <Button variant="secondary" onClick={() => MySwal.close()}>
                Cancel
              </Button>
            </div>
          </div>
        ),
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const MySwal = withReactContent(Swal);
      MySwal.fire({
        title: "Add Product",
        html: (
          <div>
            <CreateProductForm ref={createProductRef} />

            <div className="d-flex  gap-3 justify-content-center align-items-center mt-5">
              <Button variant="primary" onClick={handleRefCreate}>
                Create
              </Button>
              <Button variant="secondary" onClick={() => MySwal.close()}>
                Cancel
              </Button>
            </div>
          </div>
        ),
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container>
      <h1
        className="titlefont p-5 text-center fw-bold"
        style={{ letterSpacing: "0.35em" }}
      >
        ADMIN DASHBOARD
      </h1>

      <div className="d-grid gap-2 d-flex justify-content-center pb-4">
        <Button
          onClick={handleCreateProduct}
          variant="outline-primary"
          size="sm"
        >
          Add New Product
        </Button>

        <Button onClick={handleCreateUser} variant="outline-primary" size="sm">
          Add New User
        </Button>
      </div>
      <div className="text-center">
        <ButtonGroup>
          {ADMIN_TABLES.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={"outline-success"}
              name="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <div className="mt-4 text-center">
        <h3 className="fw-bold">{radioValue.toUpperCase()}</h3>
      </div>

      {radioValue === "products" ? (
        <ProductTable />
      ) : radioValue === "users" ? (
        <UsersTable />
      ) : (
        <OrdersTable />
      )}
    </Container>
  );
}
