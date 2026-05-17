import React from 'react'

/**
 * ProductSkeleton - Loading placeholder for product card
 * Creates animated skeleton loader while data is fetching
 */
export function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 w-full rounded-3xl p-3 md:p-4 animate-pulse flex flex-col h-[420px] md:h-[450px]">
      {/* Image skeleton */}
      <div className="relative aspect-square rounded-2xl bg-neutral-100 dark:bg-neutral-800/50 flex-shrink-0"></div>
      
      {/* Content skeleton */}
      <div className="pt-4 flex flex-col flex-1 space-y-3">
        {/* Category & Rating skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full w-16"></div>
          <div className="h-3 bg-neutral-200 dark:bg-neutral-800 rounded-full w-8"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-2 h-12">
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full"></div>
          <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-2/3"></div>
        </div>
        
        {/* Price & Action skeleton */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-20"></div>
          <div className="h-10 w-10 md:h-12 md:w-12 bg-neutral-200 dark:bg-neutral-800 rounded-xl"></div>
        </div>

        {/* Stock skeleton */}
        <div className="h-4 w-24 bg-neutral-100 dark:bg-neutral-800 rounded-full"></div>
      </div>
    </div>
  )
}

/**
 * ProductGridSkeleton - Loading state for product grid
 * Shows multiple skeleton loaders while fetching
 */
export function ProductGridSkeleton({ count = 10 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  )
}
