'use client'

import React, { useEffect } from 'react'
import { Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PropertyCard from '@/components/properties/PropertyCard'
import FilterSidebar from '@/components/properties/FilterSidebar'
import SortDropdown from '@/components/properties/SortDropdown'
import { usePropertyStore } from '@/lib/store'

export default function PropertiesPage() {
  const {
    filteredProperties,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    applyFilters
  } = usePropertyStore()

  const [showFilters, setShowFilters] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  // Calculate pagination
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProperties = filteredProperties.slice(startIndex, endIndex)

  useEffect(() => {
    applyFilters()
  }, [])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const loadMore = () => {
    if (currentPage < totalPages) {
      setIsLoading(true)
      setTimeout(() => {
        setCurrentPage(currentPage + 1)
        setIsLoading(false)
      }, 1000)
    }
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold mb-6">No Properties Found</h1>
            <p className="text-muted-foreground mb-8">
              Try adjusting your filters or search criteria
            </p>
            <Button onClick={() => window.location.reload()}>
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Browse Properties
          </h1>
          <p className="text-muted-foreground">
            Found {filteredProperties.length} properties matching your criteria
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <FilterSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                className="w-full justify-center gap-2"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="size-4" />
                Filters & Sorting
              </Button>
            </div>

            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredProperties.length)} of {filteredProperties.length} properties
              </div>
              <div className="flex items-center gap-4">
                <SortDropdown />
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Pagination / Load More */}
            <div className="mt-12">
              {currentPage < totalPages ? (
                <div className="text-center">
                  <Button
                    variant="outline"
                    onClick={loadMore}
                    disabled={isLoading}
                    className="px-8"
                  >
                    {isLoading ? 'Loading...' : 'Load More Properties'}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-4">
                    Showing {currentProperties.length * currentPage} of {filteredProperties.length} properties
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 border-t">
                  <p className="text-muted-foreground">
                    You've seen all {filteredProperties.length} properties
                  </p>
                </div>
              )}

              {/* Page Numbers */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(page)}
                      className="size-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(false)}
              >
                ✕
              </Button>
            </div>
            <FilterSidebar />
            <div className="mt-8 pt-6 border-t">
              <Button
                className="w-full"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}