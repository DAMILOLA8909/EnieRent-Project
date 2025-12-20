// components/loading/PropertyCardSkeleton.tsx
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 w-full bg-gray-200 dark:bg-gray-700" />
      
      <CardContent className="p-4">
        {/* Title Skeleton */}
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
        
        {/* Location Skeleton */}
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        
        {/* Features Skeleton */}
        <div className="flex gap-4 mb-4">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        
        {/* Amenities Skeleton */}
        <div className="flex flex-wrap gap-2">
          <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {/* Price Skeleton */}
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        
        {/* Button Skeleton */}
        <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
      </CardFooter>
    </Card>
  );
}

// Also create a list skeleton if needed
export function PropertyListSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  );
}