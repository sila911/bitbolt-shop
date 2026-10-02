import { API_BASE_URL } from "../utils/constants";

/**
 * Fetch all products
 */
export async function fetchAllProducts(limit = 30, skip = 0, signal) {
  try {
    const res = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`, { signal });
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.products;
  } catch (error) {
    if (error.name === "AbortError") return null;
    console.error("[API] fetchAllProducts error:", error);
    throw error;
  }
}

/**
 * Fetch all categories
 */
export async function fetchCategories(signal) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`, { signal });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return await res.json();
  } catch (error) {
    if (error.name === "AbortError") return null;
    console.error("[API] fetchCategories error:", error);
    throw error;
  }
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(categorySlug, signal) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/category/${categorySlug}`, { signal });
    if (!res.ok) throw new Error(`Failed to fetch products for ${categorySlug}`);
    const data = await res.json();
    return data.products;
  } catch (error) {
    if (error.name === "AbortError") return null;
    console.error("[API] fetchProductsByCategory error:", error);
    throw error;
  }
}

/**
 * Search products
 */
export async function searchProducts(query, signal) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`, { signal });
    if (!res.ok) throw new Error("Search failed");
    const data = await res.json();
    return data.products;
  } catch (error) {
    if (error.name === "AbortError") return null;
    console.error("[API] searchProducts error:", error);
    throw error;
  }
}

/**
 * Fetch a single product by ID
 */
export async function fetchProductById(id, signal) {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, { signal });
    if (!res.ok) throw new Error(`Failed to fetch product #${id}`);
    return await res.json();
  } catch (error) {
    if (error.name === "AbortError") return null;
    console.error("[API] fetchProductById error:", error);
    throw error;
  }
}
