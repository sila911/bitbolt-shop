/**
 * Product API Service
 * Fetches products from FakeStore API and maps them to local schema
 * With fallback support for local data if API fails
 */

import { normalizeCategoryName } from '../config/categories'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.escuelajs.co/api/v1'
const ENABLE_FALLBACK = import.meta.env.VITE_ENABLE_FALLBACK !== 'false'

let localProductsCache = null // Cache for fallback data

/**
 * Load fallback data from local products.js if available
 * Used when API fails or is disabled
 */
async function loadFallbackData() {
  if (localProductsCache) return localProductsCache
  
  try {
    const { productsData } = await import('../date/products')
    localProductsCache = productsData
    return productsData
  } catch (err) {
    console.warn('Fallback data not available:', err)
    return []
  }
}

/**
 * Map FakeStore API product to local schema
 * FakeStore fields: id, title, price, description, images, category, rating
 * Local schema: id, name, category, price, rating, img, sold, description
 */
function mapApiProductToLocal(apiProduct) {
  // Generate fake "sold" count (50-500) since FakeStore doesn't provide this
  const sold = Math.floor(Math.random() * 451) + 50

  // Extract image URL - FakeStore provides images as array
  const imageUrl =
    apiProduct.images?.[0] ||
    apiProduct.image ||
    'https://picsum.photos/id/' + (Math.floor(Math.random() * 100)) + '/800/600'

  // Get category name from API (structure may vary)
  const apiCategory = apiProduct.category?.name || apiProduct.category || 'Electronics'
  
  // Use centralized category mapping
  const normalizedCategory = normalizeCategoryName(apiCategory)

  return {
    id: apiProduct.id,
    name: apiProduct.title || apiProduct.name,
    category: normalizedCategory,
    price: Math.round(apiProduct.price) || 0,
    rating: Math.min(5, Math.max(0, apiProduct.rating || 4.5)), // Clamp 0-5
    img: imageUrl,
    sold: sold,
    description: apiProduct.description || 'No description available',
  }
}

/**
 * Fetch all products from API with fallback to local data
 * Returns array of products in local schema format
 */
export async function fetchAllProducts() {
  try {
    // Log API attempt
    console.info(`[ProductAPI] Fetching from ${API_BASE_URL}/products`)
    
    // Fetch from FakeStore API
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000, // 10 second timeout
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }

    const apiProducts = await response.json()

    if (!Array.isArray(apiProducts) || apiProducts.length === 0) {
      throw new Error('API returned invalid or empty product list')
    }

    // Map all products to local schema
      const mapped = apiProducts.map(mapApiProductToLocal)

      // Only keep the categories we care about and try to infer ambiguous items
      const ALLOWED = new Set(['Laptop', 'Phone', 'Tablet', 'Audio'])

      function detectCategoryFromText(name = '', description = '') {
        const text = (name + ' ' + description).toLowerCase()
        const laptopKeywords = ['laptop', 'macbook', 'dell', 'xps', 'notebook', 'intel', 'ryzen']
        const phoneKeywords = ['phone', 'iphone', 'samsung', 'galaxy', 'pixel', 'oneplus', 'mobile']
        const tabletKeywords = ['ipad', 'tablet', 'surface', 'tab', 'ipadpro']
        const audioKeywords = ['headphone', 'headphones', 'airpods', 'wh-1000xm', 'speaker', 'earbuds', 'earphone']

        if (laptopKeywords.some(k => text.includes(k))) return 'Laptop'
        if (phoneKeywords.some(k => text.includes(k))) return 'Phone'
        if (tabletKeywords.some(k => text.includes(k))) return 'Tablet'
        if (audioKeywords.some(k => text.includes(k))) return 'Audio'
        return null
      }

      const products = mapped.reduce((acc, p) => {
        if (ALLOWED.has(p.category)) {
          acc.push(p)
          return acc
        }

        // Try to infer category from title/description
        const inferred = detectCategoryFromText(p.name, p.description)
        if (inferred && ALLOWED.has(inferred)) {
          acc.push({ ...p, category: inferred })
        }
        return acc
      }, [])

      console.info(`[ProductAPI] Loaded ${products.length} allowed products from API`)

      return products
  } catch (error) {
    console.warn(`[ProductAPI] API fetch failed: ${error.message}`)

    // Fallback to local data if enabled
    if (ENABLE_FALLBACK) {
      console.info('[ProductAPI] Falling back to local product data...')
      try {
        const fallbackData = await loadFallbackData()
        if (fallbackData && fallbackData.length > 0) {
          console.info(`[ProductAPI] Using ${fallbackData.length} products from fallback`)
          return fallbackData
        }
      } catch (fallbackError) {
        console.error('[ProductAPI] Fallback also failed:', fallbackError)
      }
    }

    // If all fails, throw error
    throw new Error(`Failed to fetch products. ${error.message}`)
  }
}

/**
 * Fetch products by category from API (filters client-side)
 */
export async function fetchProductsByCategory(categoryName) {
  try {
    const allProducts = await fetchAllProducts()
    return allProducts.filter(p => p.category === categoryName)
  } catch (error) {
    console.error(`[ProductAPI] Failed to fetch products for category ${categoryName}:`, error)
    throw error
  }
}

/**
 * Search products (useful for future server-side search)
 * Currently filters client-side
 */
export async function searchProducts(query) {
  try {
    const allProducts = await fetchAllProducts()
    const lowerQuery = query.toLowerCase().trim()
    
    return allProducts.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
    )
  } catch (error) {
    console.error('[ProductAPI] Search failed:', error)
    throw error
  }
}
