'use client'

import React from 'react'
import Image from 'next/image'
import { MapPin, Bed, Bath, Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockProperties } from '@/data/mockData'
import { formatPrice } from '@/lib/utils'

export default function FeaturedProperties() {
  const featuredProperties = mockProperties.filter(prop => prop.featured)

  return (
    <section className="py-12 md:py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-primary">Featured</span> Properties
            </h2>
            <p className="text-muted-foreground">
              Handpicked properties with exceptional quality and location
            </p>
          </div>
          <Button variant="outline">View All Properties</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProperties.map((property) => (
            <Card key={property.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  {property.isVerified && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="absolute top-3 right-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/90 hover:bg-white"
                  >
                    <Heart className="size-5" />
                  </Button>
                </div>
                <div className="absolute bottom-3 right-3">
                  <Badge variant="secondary" className="font-semibold">
                    {property.type.replace('_', ' ')}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
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
                  <span className="text-sm">{property.location.city}, {property.location.state}</span>
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

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-primary">
                      {formatPrice(property.price)}
                    </div>
                    <div className="text-sm text-muted-foreground">per year</div>
                  </div>
                  <Button size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}