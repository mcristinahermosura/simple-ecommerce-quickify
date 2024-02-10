import Swal from "sweetalert2";

export default function UpdateProductForm({ product }) {
  const handleUpdate = () => {
    const errors = [];
    const productName = document.getElementById("productName").value.trim();
    const productDescription = document
      .getElementById("productDescription")
      .value.trim();
    const productPrice = parseFloat(
      document.getElementById("productPrice").value
    );
    const productStock = parseInt(
      document.getElementById("productStock").value
    );

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

    return {
      name: productName,
      description: productDescription,
      price: productPrice,
      stock: productStock,
      ...product,
    };
  };

  return {
    html: `
    <form id="updateProductForm">
    <div class="form-group">
    <label for="productName">Name:</label>
    <input type="text" id="productName" class="form-control" value="${product.name}" required>
    </div>
    <div class="form-group">
    <label for="productDescription">Description:</label>
    <textarea id="productDescription" class="form-control" rows="4">${product.description}</textarea>
    </div>
    <div class="form-group">
    <label for="productPrice">Price:</label>
    <input type="number" id="productPrice" class="form-control" value="${product.price}" required>
    </div>
    <div class="form-group">
    <label for="productStock">Stock:</label>
    <input type="number" id="productStock" class="form-control" value="${product.stock}" required>
    </div>
    </form>
  `,
    preConfirm: handleUpdate,
  };
}
