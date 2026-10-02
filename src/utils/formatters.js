/**
 * Formatting utilities for price, text, and categories
 */

export function formatPrice(amount) {
  const num = Number(amount) || 0;
  return `$${num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

export function formatCategoryName(category = "") {
  return category.replace(/-/g, " ");
}

export function calculateOriginalPrice(price, discountPercentage = 0) {
  if (!discountPercentage) return price;
  return Math.round(price / (1 - discountPercentage / 100));
}
