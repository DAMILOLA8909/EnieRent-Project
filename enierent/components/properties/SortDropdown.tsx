'use client'

import React from 'react'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePropertyStore } from '@/lib/store'

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

export default function SortDropdown() {
  const { filters, sortProperties } = usePropertyStore()
  const [isOpen, setIsOpen] = React.useState(false)

  const selectedOption = sortOptions.find(opt => opt.value === filters.sortBy)

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2"
      >
        <ArrowUpDown className="size-4" />
        Sort: {selectedOption?.label}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg z-50">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  sortProperties(option.value as any)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 hover:bg-secondary transition-colors ${
                  filters.sortBy === option.value
                    ? 'bg-secondary font-medium'
                    : ''
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}