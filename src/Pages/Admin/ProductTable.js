import React, { useRef } from "react";
import { Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import useRetrieveProducts from "../../hooks/useRetrieveProducts";
import {
  updateProductStatus,
  updateProductDetails,
  deleteProduct,
} from "../../api";
import { RESPONSE_STATUS } from "../../utils/constant";
import { UpdateProductForm, ProductStatusButton } from "./Product";
import withReactContent from "sweetalert2-react-content";

export default function ProductTable() {
  const { products, refetchProducts } = useRetrieveProducts();
  const token = JSON.parse(localStorage.getItem("token"));
  const updateRef = useRef(null);

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

  const updateProduct = async (product) => {
    try {
      const data = await updateProductDetails(product, token);
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

  const handleRefUpdate = async () => {
    const res = await updateRef.current.handleUpdate();

    if (res) {
      updateProduct(res);
    }
  };

  const handleUpdate = async (product) => {
    try {
      if (product) {
        const MySwal = withReactContent(Swal);
        MySwal.fire({
          title: "Update Product",
          html: (
            <div>
              <UpdateProductForm product={product} ref={updateRef} />

              <div className="d-flex  gap-3 justify-content-center align-items-center mt-5">
                <Button variant="primary" onClick={handleRefUpdate}>
                  Update
                </Button>
                <Button variant="secondary" onClick={() => MySwal.close()}>
                  Cancel
                </Button>
              </div>
            </div>
          ),
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteProduct = (id, name) => {
    try {
      Swal.fire({
        title: `Are you sure you want to delete ${name}?`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteProduct(id, token);

          if (res.status === RESPONSE_STATUS.SUCCESS) {
            refetchProducts();
            Swal.fire({
              title: "Product deleted successfully!",
              icon: "success",
              timer: 3000,
              showConfirmButton: false,
            });
          } else {
            Swal.fire({
              title: "Failed to delete product",
              icon: "error",
              timer: 3000,
              showConfirmButton: false,
            });
          }
        }
      });
    } catch (error) {
      Swal.fire({
        title: "Failed to delete product",
        icon: "error",
        text: error.message.length > 0 ? error.message : error,
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const sortedProducts = products.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

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
        {sortedProducts.length > 0 ? (
          sortedProducts?.map((product, index) => {
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
                  <Button
                    variant="dark"
                    className="my-2"
                    onClick={() =>
                      handleDeleteProduct(product._id, product.name)
                    }
                  >
                    Delete
                  </Button>
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
