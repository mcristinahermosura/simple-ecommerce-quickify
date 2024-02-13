import { Button, ButtonGroup, Container, ToggleButton } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ADMIN_TABLES } from "../../utils/constant";
import { CreateProductForm } from "./Product";
import ProductTable from "./ProductTable";
import UsersTable from "./UsersTable";
import OrdersTable from "./OrdersTable";
import { CreateUserForm } from "./User";
import "../Layout.css";
import { createProduct, registerUser } from "../../api";
import withReactContent from "sweetalert2-react-content";
import { UserContext } from "../../context/UserContext";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const token = JSON.parse(localStorage.getItem("token"));
  const [radioValue, setRadioValue] = useState("products");
  const { fetchUsers } = useContext(UserContext);

  useEffect(() => {
    if (!isAdmin) {
      Swal.fire({
        title: "You are not authorized to access this page",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      }).then((res) => {
        res.dismiss === Swal.DismissReason.timer && navigate("/");
      });
    }
  }, [isAdmin, navigate]);

  const handleProductCreation = async (product) => {
    try {
      const data = await createProduct(product, token);

      if (data?.error && data.error.length > 0) {
        Swal.fire({
          title: "Error",
          text: data.error,
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
        fetchUsers();
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
        text: error.message ?? error,
        timer: 3000,
        showConfirmButton: false,
      });
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
          onClick={async () =>
            await withReactContent(Swal)
              .fire({
                ...CreateProductForm(),
              })
              .then((result) => {
                if (result.isConfirmed) {
                  console.log(result);
                  handleProductCreation(result.value);
                }
              })
          }
          variant="outline-primary"
          size="sm"
        >
          Add New Product
        </Button>

        <Button
          onClick={async () =>
            await withReactContent(Swal)
              .fire({
                ...CreateUserForm(),
              })
              .then((result) => {
                if (result.isConfirmed) {
                  handleUserCreation(result.value);
                }
              })
          }
          variant="outline-primary"
          size="sm"
        >
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
