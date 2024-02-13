import { useEffect, useRef, useState } from "react";
import { getAllActiveProducts, getAllProducts } from "../api";
import { RESPONSE_STATUS } from "../utils/constant";
import Swal from "sweetalert2";

export default function useRetrieveProducts() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const isMounted = useRef(true); 

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
          text: res.message,
        });
      }

      if (isMounted.current) {
        setProducts(res.data);
      }
    } catch (error) {
      setError(error);
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  };

  const refetchProducts = () => {
    fetchProducts();
  };

  useEffect(() => {
    isMounted.current = true;

    if (isMounted.current) {
      fetchProducts();
    }

    return () => {
      isMounted.current = false;
      setProducts([]);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products, isLoading, error, refetchProducts };
}
