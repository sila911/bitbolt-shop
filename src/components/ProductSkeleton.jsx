import React from 'react'

/**
 * ProductSkeleton - Loading placeholder for product card
 * Creates animated skeleton loader while data is fetching
 */
export function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Category skeleton */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        </div>
        
        {/* Rating skeleton */}
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        
        {/* Price skeleton */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        
        {/* Buttons skeleton */}
        <div className="flex gap-2 pt-2">
          <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}

/**
 * ProductGridSkeleton - Loading state for product grid
 * Shows multiple skeleton loaders while fetching
 */
export function ProductGridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
