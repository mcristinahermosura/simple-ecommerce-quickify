import { Button, ButtonGroup, Container, ToggleButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ADMIN_TABLES } from "../../utils/constant";
import ProductTable from "./Product/ProductTable";
import UsersTable from "./UsersTable";
import OrdersTable from "./OrdersTable";
import "../Layout.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const [radioValue, setRadioValue] = useState("products");

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
          onClick={() => navigate("/add-product")}
          variant="outline-primary"
          size="sm"
        >
          Add New Product
        </Button>

        <Button
          onClick={() => navigate("/add-product")}
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
