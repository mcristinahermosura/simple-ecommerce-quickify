import { useEffect, useState } from "react";
import { getAllActiveProducts, getAllProducts } from "../api";
import { RESPONSE_STATUS } from "../utils/constant";
import Swal from "sweetalert2";

export default function useRetrieveProducts() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = isAdmin
        ? await getAllProducts()
        : await getAllActiveProducts();
      if (res.status !== RESPONSE_STATUS.SUCCESS) {
        Swal.fire({
          title: "Failed to retrieve products",
          icon: "error",
          text:
            res.message.length > 0
              ? res.message
              : "Something went wrong! Please try again later.",
        });
      }

      setProducts(res.data);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  const refetchProducts = () => {
    fetchProducts();
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchProducts();

    return () => controller.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, error, refetchProducts, products };
}
