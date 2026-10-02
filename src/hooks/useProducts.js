import { useEffect, useState } from "react";
import { fetchAllProducts, fetchCategories, fetchProductsByCategory, searchProducts } from "../api";

export function useProducts(selectedCategory = "All", searchTerm = "") {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load categories once
  useEffect(() => {
    let isMounted = true;
    fetchCategories()
      .then((data) => {
        if (isMounted && data) setCategories(data);
      })
      .catch((err) => {
        console.error("Failed to load categories:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch products with debounce for search
  useEffect(() => {
    const controller = new AbortController();

    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let data;
        if (searchTerm.trim()) {
          data = await searchProducts(searchTerm, controller.signal);
        } else if (selectedCategory !== "All") {
          data = await fetchProductsByCategory(selectedCategory, controller.signal);
        } else {
          data = await fetchAllProducts(30, 0, controller.signal);
        }

        if (data !== null) {
          setProducts(data);
          setIsLoading(false);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load products");
          setIsLoading(false);
        }
      }
    };

    const timer = setTimeout(
      () => {
        loadData();
      },
      searchTerm.trim() ? 400 : 0
    );

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchTerm, selectedCategory]);

  return {
    products,
    categories,
    isLoading,
    error,
  };
}
