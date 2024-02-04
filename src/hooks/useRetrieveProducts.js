import { useContext, useEffect, useState } from "react";
import { getAllActiveProducts, getAllProducts } from "../api";
import { RESPONSE_STATUS } from "../utils/Contants";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

export default function useRetrieveProducts() {
  const { isAdmin } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetches products based on the isAdmin flag / persmission.
   * If isAdmin is true, it fetches all products.
   * If isAdmin is false, it fetches only active products.
   * @returns {Promise<Array>} The fetched products.
   */
  const getProductsBasedOnPermissions = isAdmin
    ? getAllProducts
    : getAllActiveProducts;

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await getProductsBasedOnPermissions();
      if (res.status !== RESPONSE_STATUS.SUCCESS) {
        Swal.fire({
          title: "Failed to retrieve products",
          icon: "error",
          text: res.message,
        });
      }

      setProducts(res.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const refetchProducts = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { products, isLoading, error, refetchProducts };
}
