import Swal from "sweetalert2";
import { Form, FormGroup, Image } from "react-bootstrap";
import { BODY_SHOP_LOGO } from "../../../utils/constant";

export default function UpdateProductForm({ product }) {
  const reader = new FileReader();
  const productName =
    document.getElementById("productName")?.value.trim() ?? product?.name;
  const productDescription =
    document.getElementById("productDescription")?.value.trim() ??
    product?.description;
  const productPrice = parseFloat(
    document.getElementById("productPrice")?.value ?? product?.price ?? null
  );
  const productStock = parseInt(
    document.getElementById("productStock")?.value ?? product?.stock ?? null
  );

  let productImage = document.getElementById("productImage")?.files[0];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      reader.onload = function (e) {
        const imagePreview = document.getElementById("image-preview");
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    productImage = file;
  };

  const handleUpdate = () => {
    const formData = new FormData();
    const errors = [];

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

    if (
      productName === product?.name &&
      productDescription === product?.description &&
      productPrice === product?.price &&
      productStock === product?.stock &&
      !productImage
    ) {
      return Swal.showValidationMessage(
        "There's nothing to update. Please change the values."
      );
    }

    if (errors.length > 0) {
      const errorList = errors.join("<br>");
      return Swal.showValidationMessage(errorList);
    }

    for (const [key, value] of Object.entries(product)) {
      if (!["name", "description", "price", "stock", "image"].includes(key))
        formData.append(key, value);
    }

    formData.append("name", productName);
    formData.append("description", productDescription);
    formData.append("price", productPrice);
    formData.append("stock", productStock);
    formData.append("image", productImage);

    return { data: formData, id: product._id };
  };

  return {
    html: (
      <Form id="updateProductForm" className="p-3">
        <FormGroup>
          <Form.Label htmlFor="productName">Name:</Form.Label>
          <Form.Control
            type="text"
            id="productName"
            defaultValue={product.name}
            required
          />
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="productDescription">Description:</Form.Label>
          <Form.Control
            type="text"
            id="productDescription"
            defaultValue={product.description}
            required
          />
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="productPrice">Price:</Form.Label>
          <Form.Control
            type="number"
            id="productPrice"
            defaultValue={product.price}
            required
          />
        </FormGroup>
        <FormGroup>
          <Form.Label htmlFor="productStock">Stock:</Form.Label>
          <Form.Control
            type="number"
            id="productStock"
            defaultValue={product.stock}
            required
          />
        </FormGroup>
        <Image
          alt="Product Image"
          id="image-preview"
          src={
            product.image.url.length > 0 ? product.image.url : BODY_SHOP_LOGO
          }
          fluid
          className="mt-2"
        />
        <FormGroup>
          <Form.Label htmlFor="productImage">Image:</Form.Label>
          <Form.Control
            type={"file"}
            id="productImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </FormGroup>
      </Form>
    ),
    title: "Update Product Details",
    preConfirm: handleUpdate,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: "Update",
    denyButtonText: "Close",
    allowOutsideClick: false,
  };
}
