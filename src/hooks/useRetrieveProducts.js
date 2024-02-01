import { useEffect, useState } from "react";

export default function useRetrieveProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("http://localhost:4000/products/all");
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const products = await res.json();
        setProducts(products);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
}