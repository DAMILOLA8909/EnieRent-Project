'use client'

import React, { useState } from 'react'
import { MapPin, Filter, Search, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import PropertyMap from '@/components/map/PropertyMap'
import { usePropertyStore } from '@/lib/store'
import Link from 'next/link'

export default function MapPage() {
  const { filteredProperties, searchQuery, setSearchQuery } = usePropertyStore()
  const [selectedType, setSelectedType] = useState<string>('all')

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'apartment', label: 'Apartments' },
    { value: 'self_contain', label: 'Self Contains' },
    { value: 'duplex', label: 'Duplexes' },
    { value: 'short_let', label: 'Short Lets' },
    { value: 'bungalow', label: 'Bungalows' },
  ]

  const filteredByType = selectedType === 'all' 
    ? filteredProperties 
    : filteredProperties.filter(prop => prop.type === selectedType)

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Property Map</h1>
            <p className="text-muted-foreground">
              Browse properties on an interactive map
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/properties">
              <Button variant="outline" className="gap-2">
                <Home className="size-4" />
                List View
              </Button>
            </Link>
            <Button className="gap-2">
              <MapPin className="size-4" />
              Map View
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-card border rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              className="h-10 px-3 py-2 border rounded-md bg-background"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <select className="h-10 px-3 py-2 border rounded-md bg-background">
              <option value="">Any Price</option>
              <option value="0-500000">Under ₦500,000</option>
              <option value="500000-1000000">₦500,000 - ₦1M</option>
              <option value="1000000-5000000">₦1M - ₦5M</option>
              <option value="5000000+">Over ₦5M</option>
            </select>

            <Button className="gap-2">
              <Filter className="size-4" />
              More Filters
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{filteredByType.length}</div>
              <div className="text-sm text-muted-foreground">Properties</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">
                {filteredByType.filter(p => p.availability === 'available').length}
              </div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">
                {filteredByType.filter(p => p.isVerified).length}
              </div>
              <div className="text-sm text-muted-foreground">Verified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">
                {filteredByType.filter(p => p.featured).length}
              </div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mb-8">
          <PropertyMap 
            properties={filteredByType}
            showFindNearMe={true}
          />
        </div>

        {/* Property List (Collapsible) */}
        <div className="border rounded-xl overflow-hidden">
          <div className="bg-secondary/20 p-4 border-b">
            <h3 className="font-semibold">
              Properties on Map ({filteredByType.length})
            </h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {filteredByType.length === 0 ? (
              <div className="p-8 text-center">
                <MapPin className="size-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="text-lg font-medium mb-2">No properties found</h4>
                <p className="text-muted-foreground">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredByType.slice(0, 10).map((property) => (
                  <Link 
                    key={property.id}
                    href={`/properties/${property.id}`}
                    className="block p-4 hover:bg-secondary/20 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 flex-shrink-0 relative rounded-lg overflow-hidden">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm line-clamp-1">
                          {property.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {property.location.address}
                        </p>
                        <div className="flex items-center gap-3 mt-1 text-xs">
                          <span>${property.price.toLocaleString()}/year</span>
                          <span>•</span>
                          <span>{property.bedrooms} bed</span>
                          <span>•</span>
                          <span>{property.bathrooms} bath</span>
                          <span className={`px-2 py-0.5 rounded ${
                            property.availability === 'available'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {property.availability}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="size-3 rounded-full"
                          style={{
                            backgroundColor: property.availability === 'available' 
                              ? '#3b82f6' 
                              : property.availability === 'reserved'
                              ? '#f59e0b'
                              : '#ef4444'
                          }}
                        />
                        <span className="text-xs text-muted-foreground">
                          {Math.floor(
                            Math.random() * 5 + 1
                          )}km
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}