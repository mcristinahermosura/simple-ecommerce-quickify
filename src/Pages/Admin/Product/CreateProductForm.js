import Swal from "sweetalert2";
import { Form } from "react-bootstrap";

export default function CreateProductForm() {
  const handleCreate = () => {
    const errors = [];
    const formData = new FormData();

    const productName = document.getElementById("productName")?.value.trim();
    const productDescription = document
      .getElementById("productDescription")
      ?.value.trim();
    const productPrice = parseFloat(
      document.getElementById("productPrice")?.value
    );
    const productStock = parseInt(
      document.getElementById("productStock")?.value
    );
    const productImage = document.getElementById("productImage")?.files[0];

    if (!productName) {
      errors.push("Name is required!");
    }

    if (!productDescription) {
      errors.push("Description is required!");
    }

    if (isNaN(productPrice) || !productPrice) {
      errors.push("Price is required!");
    }

    if (isNaN(productStock) || productStock < 0) {
      errors.push("Stock is required!");
    }

    if (errors.length > 0) {
      const errorList = errors.join("<br>");
      return Swal.showValidationMessage(errorList);
    }

    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("stock", productStock);
    formData.append("image", productImage);

    return { data: formData };
  };

  return {
    html: (
      <Form id="createProductForm" className="p-3">
        <Form.Group controlId="productName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" required />
        </Form.Group>
        <Form.Group controlId="productDescription">
          <Form.Label>Description:</Form.Label>
          <Form.Control as="textarea" rows={4} />
        </Form.Group>
        <Form.Group controlId="productPrice">
          <Form.Label>Price:</Form.Label>
          <Form.Control type="number" required />
        </Form.Group>
        <Form.Group controlId="productStock">
          <Form.Label>Stock:</Form.Label>
          <Form.Control type="number" required />
        </Form.Group>
        <Form.Group controlId="productImage">
          <Form.Label>Image:</Form.Label>
          <Form.Control type="file" required />
        </Form.Group>
      </Form>
    ),

    title: "Create Product",
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Create",
    denyButtonText: "Close",
    allowOutsideClick: false,
    preConfirm: handleCreate,
  };
}
