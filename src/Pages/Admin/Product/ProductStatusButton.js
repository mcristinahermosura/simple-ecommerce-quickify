import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ProductStatusButton({ product, onUpdateAvailability }) {
  const handleClick = () => {
    const confirmationMessage = `Are you sure you want to ${
      product.isActive ? "disable" : "enable"
    } this product?`;

    Swal.fire({
      title: confirmationMessage,
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        onUpdateAvailability(product);
      }
    });
  };

  return (
    <Button
      variant={product.isActive ? "danger" : "success"}
      onClick={handleClick}
    >
      {product.isActive ? "Disable" : "Enable"}
    </Button>
  );
}
