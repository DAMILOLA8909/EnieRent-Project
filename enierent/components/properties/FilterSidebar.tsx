'use client'

import React from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { amenitiesList, propertyTypes } from '@/data/mockData'
import { usePropertyStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'

export default function FilterSidebar() {
  const { filters, setFilters, resetFilters, applyFilters } = usePropertyStore()
  const [priceRange, setPriceRange] = React.useState([filters.minPrice, filters.maxPrice])
  const [selectedAmenities, setSelectedAmenities] = React.useState<string[]>(filters.amenities)
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>(filters.propertyTypes)
  
  // FIX: Handle null case for bedrooms
  const [bedrooms, setBedrooms] = React.useState(
    filters.bedrooms === null ? '' : filters.bedrooms.toString()
  )
  const [location, setLocation] = React.useState(filters.location)

  const handleApplyFilters = () => {
    setFilters({
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      location,
      propertyTypes: selectedTypes,
      // FIX: Convert empty string to null
      bedrooms: bedrooms === '' ? null : parseInt(bedrooms),
      amenities: selectedAmenities
    })
    applyFilters()
  }

  const handleReset = () => {
    setPriceRange([0, 5000000])
    setSelectedAmenities([])
    setSelectedTypes([])
    setBedrooms('')
    setLocation('')
    resetFilters()
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-primary hover:text-primary/80"
        >
          Reset All
        </Button>
      </div>

      {/* Location Search */}
      <div>
        <label className="block text-sm font-medium mb-2">Location</label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search city or area"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Property Type */}
      <div>
        <label className="block text-sm font-medium mb-3">Property Type</label>
        <div className="flex flex-wrap gap-2">
          {propertyTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => toggleType(type.value)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedTypes.includes(type.value)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
        </label>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="10000000"
            step="100000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="10000000"
            step="100000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₦0</span>
            <span>₦10M</span>
          </div>
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <label className="block text-sm font-medium mb-3">Bedrooms</label>
        <div className="flex flex-wrap gap-2">
          {['Any', '1', '2', '3', '4+'].map((num) => (
            <button
              key={num}
              onClick={() => setBedrooms(num === 'Any' ? '' : num === '4+' ? '4' : num)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                (num === 'Any' && bedrooms === '') ||
                (num === '4+' && bedrooms === '4') ||
                bedrooms === num
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary hover:bg-secondary/80'
              }`}
            >
              {num === '4+' ? '4+' : num}
            </button>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <label className="block text-sm font-medium">Amenities</label>
          {selectedAmenities.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedAmenities([])}
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {amenitiesList.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center gap-3 p-2 rounded hover:bg-secondary/50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="size-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-sm">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Selected Filters */}
      {(selectedTypes.length > 0 || selectedAmenities.length > 0 || bedrooms || location) && (
        <div>
          <h4 className="text-sm font-medium mb-2">Selected Filters</h4>
          <div className="flex flex-wrap gap-2">
            {selectedTypes.map((type) => (
              <span
                key={type}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-xs rounded"
              >
                {propertyTypes.find(t => t.value === type)?.label}
                <button
                  onClick={() => toggleType(type)}
                  className="hover:text-primary/80"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
            {selectedAmenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-xs rounded"
              >
                {amenity}
                <button
                  onClick={() => toggleAmenity(amenity)}
                  className="hover:text-foreground/80"
                >
                  <X className="size-3" />
                </button>
              </span>
            ))}
            {selectedAmenities.length > 3 && (
              <span className="px-2 py-1 bg-secondary text-xs rounded">
                +{selectedAmenities.length - 3} more
              </span>
            )}
            {bedrooms && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-xs rounded">
                {bedrooms === '4' ? '4+' : bedrooms} bedrooms
                <button
                  onClick={() => setBedrooms('')}
                  className="hover:text-foreground/80"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-xs rounded">
                {location}
                <button
                  onClick={() => setLocation('')}
                  className="hover:text-foreground/80"
                >
                  <X className="size-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Apply Button */}
      <Button
        onClick={handleApplyFilters}
        className="w-full"
      >
        Apply Filters
      </Button>
    </div>
  )
}