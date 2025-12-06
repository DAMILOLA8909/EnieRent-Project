'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Bed, Bath, Star, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Property } from '@/types'
import { formatPrice } from '@/lib/utils'

interface PropertyCardProps {
  property: Property
  compact?: boolean
}

export default function PropertyCard({ property, compact = false }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
    // TODO: Add to favorites in store
  }

  if (compact) {
    return (
      <Link href={`/properties/${property.id}`}>
        <div className="group flex gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
          <div className="relative w-32 h-32 flex-shrink-0">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              className="object-cover rounded-md"
            />
            {property.isVerified && (
              <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600 text-xs">
                Verified
              </Badge>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                {property.title}
              </h3>
              <div className="flex items-center gap-1">
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{property.rating}</span>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="size-3 mr-1" />
              <span>{property.location.city}</span>
            </div>
            
            <div className="flex items-center gap-3 text-sm mb-3">
              <div className="flex items-center gap-1">
                <Bed className="size-3" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="size-3" />
                <span>{property.bathrooms}</span>
              </div>
              <div>
                <span>{property.size} sq ft</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-primary">
                {formatPrice(property.price)}
                <span className="text-sm text-muted-foreground font-normal">/year</span>
              </div>
              <Badge variant="secondary" className="capitalize">
                {property.type.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/properties/${property.id}`}>
      <div className="group overflow-hidden rounded-xl border hover:shadow-xl transition-all duration-300 cursor-pointer">
        {/* Image Carousel */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={property.images[currentImageIndex]}
            alt={`${property.title} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Image Navigation */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 size-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 size-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
              >
                <ChevronRight className="size-4" />
              </button>
            </>
          )}
          
          {/* Image Indicators */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  className={`size-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-white'
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3">
            {property.isVerified && (
              <Badge className="bg-green-500 hover:bg-green-600">
                Verified
              </Badge>
            )}
            {property.featured && (
              <Badge className="ml-2 bg-primary hover:bg-primary/90">
                Featured
              </Badge>
            )}
          </div>
          
          {/* Favorite Button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-3 right-3 size-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
          >
            <Heart
              className={`size-5 transition-colors ${
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'text-gray-600'
              }`}
            />
          </button>
          
          {/* Availability Badge */}
          <div className="absolute bottom-3 right-3">
            <Badge
              variant={
                property.availability === 'available'
                  ? 'secondary'
                  : property.availability === 'reserved'
                  ? 'default'
                  : 'destructive'
              }
              className="font-semibold capitalize"
            >
              {property.availability}
            </Badge>
          </div>
        </div>
        
        {/* Property Details */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg group-hover:text-primary transition-colors line-clamp-1">
              {property.title}
            </h3>
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{property.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="size-4 mr-1" />
            <span className="text-sm">{property.location.address}, {property.location.city}</span>
          </div>
          
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <Bed className="size-4" />
              <span>{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="size-4" />
              <span>{property.bathrooms} bath</span>
            </div>
            <div>
              <span>{property.size} sq ft</span>
            </div>
          </div>
          
          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {property.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="text-xs px-2 py-1 bg-secondary rounded"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="text-xs px-2 py-1 bg-secondary rounded">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
          
          {/* Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <div className="text-2xl font-bold text-primary">
                {formatPrice(property.price)}
              </div>
              <div className="text-sm text-muted-foreground">per year</div>
            </div>
            <Button size="sm">View Details</Button>
          </div>
        </div>
      </div>
    </Link>
  )
}