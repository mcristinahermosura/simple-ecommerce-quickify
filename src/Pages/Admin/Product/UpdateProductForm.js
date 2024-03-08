import Swal from "sweetalert2";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";
import { Form, FormGroup, Image } from "react-bootstrap";
import { BODY_SHOP_LOGO } from "../../../utils/constant";

const UpdateProductForm = forwardRef(({ product }, ref) => {
  const productImageRef = useRef(null);
  const [productData, setProductData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    image: product.image.url,
  });
  const [updateResult, setUpdateResult] = useState(null);
  const [displayImage, setDisplayImage] = useState(product.image.url);

  const { name, description, price, stock, image } = productData;

  const handleInputChange = (e) => {
    if (e.target.name === "image") {
      setProductData({
        ...productData,
        image: e.target.files[0],
      });
      setDisplayImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setProductData({
        ...productData,
        [e.target.name]: e.target.value,
      });
    }
    if (updateResult) setUpdateResult(null);
  };

  const handleUpdate = async () => {
    const errors = [];

    if (!name) {
      errors.push("Name is required!");
    }

    if (!description) {
      errors.push("Description is required!");
    }

    if (isNaN(stock) || !stock || stock < 0) {
      errors.push("Stock is required! Please enter a valid number!");
    }

    if (isNaN(price) || !price || price <= 0) {
      errors.push("Price is required! Please enter a valid number!");
    }

    if (
      name === product.name &&
      description === product.description &&
      price === product.price &&
      stock === product.stock &&
      image === product.image.url
    ) {
      setUpdateResult({
        type: "warning",
        message: "There's nothing to update. Please change the values.",
      });
      return;
    }

    if (errors.length > 0) {
      const errorList = errors.join("\n");
      console.log(errorList);
      setUpdateResult({
        type: "error",
        message: errorList,
      });
      return;
    }

    const isConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to update the product details.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        return true;
      }
    });

    if (isConfirmed) {
      const formData = new FormData();

      for (const key in productData) {
        formData.append(key, productData[key]);
      }

      return { data: formData, id: product._id };
    }
    // return productData;
  };

  const renderUpdateResult = () => {
    if (updateResult) {
      const { type, message } = updateResult;
      if (type === "warning") {
        return (
          <div className="alert alert-warning mt-3" role="alert">
            {message}
          </div>
        );
      } else {
        return (
          <div className="alert alert-danger mt-3" role="alert">
            {message.split("\n").map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  useImperativeHandle(ref, () => ({
    handleUpdate,
  }));

  return (
    <Form id="updateProductForm" className="p-3">
      <FormGroup>
        <Form.Label htmlFor="productName">Name:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Form.Label htmlFor="productDescription">Description:</Form.Label>
        <Form.Control
          type="text"
          name="description"
          value={description}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Form.Label htmlFor="productPrice">Price:</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={price}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Form.Label htmlFor="productStock">Stock:</Form.Label>
        <Form.Control
          type="number"
          name="stock"
          value={stock}
          onChange={handleInputChange}
          required
        />
      </FormGroup>
      <Image
        alt="Product Image"
        id="image-preview"
        src={displayImage ?? BODY_SHOP_LOGO}
        fluid
        className="mt-2"
      />
      <FormGroup>
        <Form.Label htmlFor="productImage">Image:</Form.Label>
        <Form.Control
          type={"file"}
          name="image"
          accept="image/*"
          ref={productImageRef}
          onChange={handleInputChange}
        />
      </FormGroup>
      {renderUpdateResult()}
    </Form>
  );
});

export default UpdateProductForm;
