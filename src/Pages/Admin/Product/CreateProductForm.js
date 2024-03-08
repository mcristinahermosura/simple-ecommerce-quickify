import { forwardRef, useImperativeHandle, useState } from "react";
import { Form, FormGroup, Image } from "react-bootstrap";

const CreateProductForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    image: null,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (error) {
      setError(null);
    }
    const { name, value } = e.target;

    if (name === "image") {
      setFormData((prevState) => ({
        ...prevState,
        image: e.target.files[0],
      }));
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = () => {
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

    if (errors.length > 0) {
      const errorList = errors.join("\n");
      setError({ type: "danger", message: errorList });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("image", image);

    return { data: formData };
  };

  const handleImageChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      image: e.target.files[0],
    }));
  };

  useImperativeHandle(ref, () => ({
    handleCreate,
  }));

  const renderError = () => {
    if (error) {
      return (
        <div className={`alert alert-${error.type} mt-3`} role="alert">
          {error.message.split("\n").map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      );
    }
  };

  const { name, description, price, stock, image } = formData;

  return (
    <Form id="createProductForm" className="p-3">
      <FormGroup>
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Description:</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="description"
          value={description}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Price:</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={price}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Form.Label>Stock:</Form.Label>
        <Form.Control
          type="number"
          name="stock"
          value={stock}
          onChange={handleChange}
          required
        />
      </FormGroup>
      {image && (
        <Image
          alt="Product Image"
          id="image-preview"
          src={image ? URL.createObjectURL(image) : ""}
          fluid
          className="mt-2"
        />
      )}
      <FormGroup>
        <Form.Label>Image:</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} required />
      </FormGroup>
      {renderError()}
    </Form>
  );
});

export default CreateProductForm;
