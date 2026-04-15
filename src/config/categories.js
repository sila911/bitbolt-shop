/**
 * Category mapping configuration
 * Maps FakeStore API categories to your app's category schema
 * and provides category metadata for filtering
 */

export const CATEGORY_MAPPINGS = {
  'electronics': 'Electronics',
  'laptops': 'Laptop',
  'laptop': 'Laptop',
  'phones': 'Phone',
  'phone': 'Phone',
  'mobiles': 'Phone',
  'mobile': 'Phone',
  'tablets': 'Tablet',
  'tablet': 'Tablet',
  'audio': 'Audio',
  'speakers': 'Audio',
  'headphones': 'Audio',
  'headset': 'Audio',
}

// Only expose these categories in the app UI
export const APP_CATEGORIES = [
  { name: 'All', displayName: 'All', color: 'bg-gray-100 dark:bg-gray-800' },
  { name: 'Laptop', displayName: 'Laptops', color: 'bg-purple-100 dark:bg-purple-900' },
  { name: 'Phone', displayName: 'Phones', color: 'bg-green-100 dark:bg-green-900' },
  { name: 'Tablet', displayName: 'Tablets', color: 'bg-orange-100 dark:bg-orange-900' },
  { name: 'Audio', displayName: 'Headphones', color: 'bg-pink-100 dark:bg-pink-900' },
]
/**
 * Normalize category name from API to app schema
 * @param {string} apiCategory - Category name from API
 * @returns {string} Normalized category name
 */
export function normalizeCategoryName(apiCategory) {
  if (!apiCategory) return 'Electronics'
  
  const lowerCategory = apiCategory.toLowerCase().trim()
  
  // Direct mapping
  if (CATEGORY_MAPPINGS[lowerCategory]) {
    return CATEGORY_MAPPINGS[lowerCategory]
  }
  
  // Partial matching (if category contains key)
  for (const [key, value] of Object.entries(CATEGORY_MAPPINGS)) {
    if (lowerCategory.includes(key) || key.includes(lowerCategory)) {
      return value
    }
  }
  
  return 'Electronics' // Fallback
}

/**
 * Get category color for UI
 * @param {string} categoryName - Category name
 * @returns {string} Tailwind color class
 */
export function getCategoryColor(categoryName) {
  const category = APP_CATEGORIES.find(c => c.name === categoryName)
  return category?.color || 'bg-gray-100 dark:bg-gray-800'
}
