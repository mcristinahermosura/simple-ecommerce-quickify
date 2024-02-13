import React from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import useRetrieveProducts from "../../hooks/useRetrieveProducts";
import { updateProductStatus, updateProductDetails } from "../../api";
import { RESPONSE_STATUS } from "../../utils/constant";
import { UpdateProductForm, ProductStatusButton } from "./Product";
import withReactContent from "sweetalert2-react-content";

export default function ProductTable() {
  const { products, refetchProducts } = useRetrieveProducts();
  const token = JSON.parse(localStorage.getItem("token"));

  const updateProductAvailability = async (product) => {
    try {
      const res = await updateProductStatus(product, token);

      if (res.status !== RESPONSE_STATUS.SUCCESS) {
        Swal.fire({
          title: "Failed to update product availability",
          icon: "error",
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          title: "Product availability updated",
          icon: "success",
          timer: 3000,
          showConfirmButton: false,
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

  const updateProduct = async (product, id) => {
    try {
      const data = await updateProductDetails(product, token, id);
      if (data.status === RESPONSE_STATUS.SUCCESS) {
        Swal.fire({
          title: "Product Updated!",
          icon: "success",
          text: "Product has been updated",
          timer: 2500,
          showConfirmButton: false,
        });
        refetchProducts();
      } else {
        Swal.fire({
          title: "Product Update Failed!",
          icon: "error",
          text: "Product has not been updated",
          timer: 4000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Can't connect to server, please try again later!",
        icon: "info",
      });
    }
  };
  const handleUpdate = async (product) => {
    try {
      if (product) {
        await withReactContent(Swal)
          .fire({
            ...UpdateProductForm({ product }),
          })
          .then((result) => {
            if (result.isConfirmed) {
              updateProduct(result.value.data, result.value.id);
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Table striped bordered hover responsive variant="secondary">
      <thead>
        <tr>
          <th>Name and Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Availability</th>
          <th colSpan={2} className="text-center">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {products.length > 0 ? (
          products?.map((product, index) => {
            return (
              <tr key={index} className="text-center ">
                <td style={{ verticalAlign: "middle" }}>
                  <h4 className="fw-bold">{product.name}</h4>
                  <p>{product.description}</p>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  ₱{product.price.toFixed(2)}
                </td>
                <td style={{ verticalAlign: "middle" }}>{product.stock}</td>
                <td style={{ verticalAlign: "middle" }}>
                  {product.isActive ? "Available" : "Unavailable"}
                </td>

                <td style={{ verticalAlign: "middle" }}>
                  <Button
                    variant="primary"
                    onClick={async () => await handleUpdate(product)}
                    className="mb-2"
                  >
                    Update
                  </Button>
                  <ProductStatusButton
                    product={product}
                    onUpdateAvailability={updateProductAvailability}
                  />
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5} className="text-center">
              No products found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
