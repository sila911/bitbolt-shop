/**
 * Product API Service (DummyJSON Integration)
 * Fetches products, categories, and handles search via https://dummyjson.com
 */

const API_BASE_URL = 'https://dummyjson.com';

/**
 * Fetch all products (paginated by API default)
 */
export async function fetchAllProducts(limit = 30, skip = 0, signal) {
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`, { signal });
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data.products;
  } catch (error) {
    if (error.name === 'AbortError') return null;
    console.error('[ProductAPI] fetchAllProducts error:', error);
    throw error;
  }
}

/**
 * Fetch all categories from API
 */
export async function fetchCategories(signal) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`, { signal });
    if (!response.ok) throw new Error('Failed to fetch categories');
    const categories = await response.json();
    return categories;
  } catch (error) {
    if (error.name === 'AbortError') return null;
    console.error('[ProductAPI] fetchCategories error:', error);
    throw error;
  }
}

/**
 * Fetch products by category
 */
export async function fetchProductsByCategory(categorySlug, signal) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${categorySlug}`, { signal });
    if (!response.ok) throw new Error(`Failed to fetch products for ${categorySlug}`);
    const data = await response.json();
    return data.products;
  } catch (error) {
    if (error.name === 'AbortError') return null;
    console.error('[ProductAPI] fetchProductsByCategory error:', error);
    throw error;
  }
}

/**
 * Search products via API
 */
export async function searchProducts(query, signal) {
  try {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`, { signal });
    if (!response.ok) throw new Error('Search failed');
    const data = await response.json();
    return data.products;
  } catch (error) {
    if (error.name === 'AbortError') return null;
    console.error('[ProductAPI] searchProducts error:', error);
    throw error;
  }
}
