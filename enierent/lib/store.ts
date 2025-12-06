import { create } from 'zustand'
import { Property, FilterOptions } from '@/types'
import { mockProperties } from '@/data/mockData'

interface PropertyStore {
  properties: Property[]
  filteredProperties: Property[]
  filters: FilterOptions
  searchQuery: string
  currentPage: number
  itemsPerPage: number
  
  // Actions
  setProperties: (properties: Property[]) => void
  setFilters: (filters: Partial<FilterOptions>) => void
  setSearchQuery: (query: string) => void
  setCurrentPage: (page: number) => void
  
  // Filter logic
  applyFilters: () => void
  resetFilters: () => void
  
  // Sorting
  sortProperties: (sortBy: FilterOptions['sortBy']) => void
}

const initialFilters: FilterOptions = {
  minPrice: 0,
  maxPrice: 5000000,
  location: '',
  propertyTypes: [],
  bedrooms: null,
  amenities: [],
  sortBy: 'newest'
}

export const usePropertyStore = create<PropertyStore>((set, get) => ({
  properties: mockProperties,
  filteredProperties: mockProperties,
  filters: initialFilters,
  searchQuery: '',
  currentPage: 1,
  itemsPerPage: 9,
  
  setProperties: (properties) => set({ properties }),
  
  setFilters: (newFilters) => 
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    })),
    
  setSearchQuery: (query) => {
    set({ searchQuery: query })
    get().applyFilters()
  },
  
  setCurrentPage: (page) => set({ currentPage: page }),
  
  applyFilters: () => {
    const { properties, filters, searchQuery } = get()
    
    let filtered = [...properties]
    
    // Search by query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query) ||
        property.location.city.toLowerCase().includes(query) ||
        property.location.address.toLowerCase().includes(query)
      )
    }
    
    // Filter by price
    filtered = filtered.filter(property =>
      property.price >= filters.minPrice &&
      property.price <= filters.maxPrice
    )
    
    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.location.city.toLowerCase().includes(filters.location.toLowerCase()) ||
        property.location.state.toLowerCase().includes(filters.location.toLowerCase())
      )
    }
    
    // Filter by property types
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property =>
        filters.propertyTypes.includes(property.type)
      )
    }
    
    // Filter by bedrooms - FIX: Check for null
   if (filters.bedrooms != null) { // Note: != null checks for both null and undefined
        filtered = filtered.filter(property =>
            property.bedrooms >= filters.bedrooms!
        )
        }
    
    // Filter by amenities
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(property =>
        filters.amenities.every(amenity =>
          property.amenities.includes(amenity)
        )
      )
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
    }
    
    set({ filteredProperties: filtered, currentPage: 1 })
  },
  
  resetFilters: () => {
    set({ filters: initialFilters, searchQuery: '', currentPage: 1 })
    get().applyFilters()
  },
  
  sortProperties: (sortBy) => {
    set((state) => ({ 
      filters: { ...state.filters, sortBy },
      currentPage: 1 
    }))
    get().applyFilters()
  }
}))