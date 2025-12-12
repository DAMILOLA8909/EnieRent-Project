'use client'

import React, { useState, useEffect } from 'react'
import { Edit, Trash2, Eye, MoreVertical, Calendar, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Property } from '@/types'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

interface PropertyManagementProps {
  userId: string
}

export default function PropertyManagement({ userId }: PropertyManagementProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProperties()
  }, [])

  const loadProperties = () => {
    setIsLoading(true)
    // Load from localStorage
    const storedProperties = JSON.parse(localStorage.getItem('enierent_properties') || '[]')
    const userProperties = storedProperties.filter((prop: Property) => prop.ownerId === userId)
    
    // Combine with mock properties for demo
    const allProperties = [...userProperties]
    setProperties(allProperties)
    setIsLoading(false)
  }

  const handleDelete = (propertyId: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      const storedProperties = JSON.parse(localStorage.getItem('enierent_properties') || '[]')
      const updatedProperties = storedProperties.filter((prop: Property) => prop.id !== propertyId)
      localStorage.setItem('enierent_properties', JSON.stringify(updatedProperties))
      
      setProperties(properties.filter(prop => prop.id !== propertyId))
      toast.success('Property deleted successfully')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'reserved': return 'bg-yellow-100 text-yellow-800'
      case 'rented': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="size-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p>Loading properties...</p>
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="size-8 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">No Properties Listed</h3>
        <p className="text-muted-foreground mb-6">
          Start by listing your first property to attract tenants
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Your Properties</h3>
          <p className="text-sm text-muted-foreground">
            {properties.length} propert{properties.length === 1 ? 'y' : 'ies'} listed
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-1">
            <div className="size-2 bg-green-500 rounded-full"></div>
            Available: {properties.filter(p => p.availability === 'available').length}
          </span>
          <span className="flex items-center gap-1">
            <div className="size-2 bg-yellow-500 rounded-full"></div>
            Reserved: {properties.filter(p => p.availability === 'reserved').length}
          </span>
          <span className="flex items-center gap-1">
            <div className="size-2 bg-red-500 rounded-full"></div>
            Rented: {properties.filter(p => p.availability === 'rented').length}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Property Image */}
              <div className="md:w-32 md:h-32 w-full h-48 relative rounded-lg overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.isVerified && (
                  <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                    Verified
                  </Badge>
                )}
              </div>

              {/* Property Details */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg">{property.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {property.location.address}, {property.location.city}
                    </p>
                  </div>
                  <Badge className={getStatusColor(property.availability)}>
                    {property.availability.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Price</div>
                    <div className="font-semibold">{formatPrice(property.price)}/year</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Type</div>
                    <div className="font-semibold capitalize">{property.type.replace('_', ' ')}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Bed/Bath</div>
                    <div className="font-semibold">{property.bedrooms} / {property.bathrooms}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Size</div>
                    <div className="font-semibold">{property.size} sq ft</div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {property.amenities.slice(0, 3).map((amenity) => (
                    <span key={amenity} className="text-xs px-2 py-1 bg-secondary rounded">
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-secondary rounded">
                      +{property.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <Eye className="size-4" />
                  View
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Edit className="size-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 text-red-500 hover:text-red-600 hover:border-red-200"
                  onClick={() => handleDelete(property.id)}
                >
                  <Trash2 className="size-4" />
                  Delete
                </Button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">12</div>
                <div className="text-xs text-muted-foreground">Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">3</div>
                <div className="text-xs text-muted-foreground">Inquiries</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1</div>
                <div className="text-xs text-muted-foreground">Visits</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}