'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { 
  MapPin, Bed, Bath, Square, Star, Heart, Share2, 
  Wifi, Car, Snowflake, Dumbbell, Shield, Droplets,
  Calendar, Phone, MessageSquare, CheckCircle, Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ContactModal from '@/components/properties/ContactModal'
import ScheduleModal from '@/components/properties/ScheduleModal'
import { Property } from '@/types'
import { formatPrice, formatDate } from '@/lib/utils'

interface SinglePropertyPageProps {
  property: Property
}

const amenitiesIcons: Record<string, any> = {
  'WiFi': Wifi,
  'Parking': Car,
  'AC': Snowflake,
  'Gym': Dumbbell,
  '24/7 Security': Shield,
  'Water Supply': Droplets,
}

export default function SinglePropertyPage({ property }: SinglePropertyPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex(prev => 
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:text-primary">Home</a>
          {' > '}
          <a href="/properties" className="hover:text-primary">Properties</a>
          {' > '}
          <span className="font-medium">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={`${property.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
                
                {/* Navigation Buttons */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 size-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 size-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      →
                    </button>
                  </>
                )}
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.isVerified && (
                    <Badge className="bg-green-500 hover:bg-green-600 gap-1">
                      <CheckCircle className="size-3" />
                      Verified
                    </Badge>
                  )}
                  {property.featured && (
                    <Badge className="bg-primary hover:bg-primary/90">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="secondary" className="capitalize">
                    {property.type.replace('_', ' ')}
                  </Badge>
                </div>
                
                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>
              
              {/* Thumbnails */}
              {property.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative size-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-primary'
                          : 'border-transparent'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="size-4" />
                    <span>{property.location.address}, {property.location.city}, {property.location.state}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="p-2 rounded-full hover:bg-secondary transition-colors"
                  >
                    <Heart
                      className={`size-6 transition-colors ${
                        isFavorite
                          ? 'fill-red-500 text-red-500'
                          : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                  <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                    <Share2 className="size-6 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-secondary/20 rounded-xl">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-1">
                    <Bed className="size-6" />
                    {property.bedrooms}
                  </div>
                  <div className="text-sm text-muted-foreground">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-1">
                    <Bath className="size-6" />
                    {property.bathrooms}
                  </div>
                  <div className="text-sm text-muted-foreground">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-1">
                    <Square className="size-6" />
                    {property.size}
                  </div>
                  <div className="text-sm text-muted-foreground">Sq Ft</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 text-2xl font-bold text-primary mb-1">
                    <Star className="size-6 fill-yellow-400 text-yellow-400" />
                    {property.rating}
                  </div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {property.amenities.map((amenity) => {
                    const Icon = amenitiesIcons[amenity] || CheckCircle
                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg"
                      >
                        <Icon className="size-5 text-primary" />
                        <span>{amenity}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Reviews */}
              {property.reviews.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                  <div className="space-y-4">
                    {property.reviews.map((review) => (
                      <div key={review.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold">{review.userName}</div>
                            <div className="text-sm text-muted-foreground">
                              {formatDate(review.date)}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`size-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-gray-200 text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-card border rounded-xl p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary mb-2">
                  {formatPrice(property.price)}
                </div>
                <div className="text-muted-foreground">per year</div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => setShowContactModal(true)}
                  className="w-full gap-2"
                  size="lg"
                >
                  <Phone className="size-4" />
                  Contact Landlord
                </Button>
                <Button
                  onClick={() => setShowScheduleModal(true)}
                  variant="outline"
                  className="w-full gap-2"
                  size="lg"
                >
                  <Calendar className="size-4" />
                  Schedule Visit
                </Button>
              </div>

              {/* Property Info */}
              <div className="mt-8 space-y-4 pt-6 border-t">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Property ID</span>
                  <span className="font-medium">{property.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available From</span>
                  <span className="font-medium">Immediately</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge
                    variant={
                      property.availability === 'available'
                        ? 'secondary'
                        : property.availability === 'reserved'
                        ? 'default'
                        : 'destructive'
                    }
                    className="capitalize"
                  >
                    {property.availability}
                  </Badge>
                </div>
              </div>

              {/* Safety Tips */}
              <div className="mt-8 p-4 bg-secondary/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="size-5 text-primary" />
                  <span className="font-semibold">Safety Tips</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Never wire money without seeing the property</li>
                  <li>• Meet in public places for initial meetings</li>
                  <li>• Verify landlord identity and ownership</li>
                </ul>
              </div>
            </div>

            {/* Similar Properties */}
            <div className="border rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Similar Properties</h3>
              <div className="space-y-4">
                {/* You can map through similar properties here */}
                <div className="text-center py-8 text-muted-foreground">
                  Similar properties coming soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ContactModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        property={property}
      />
      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        property={property}
      />
    </div>
  )
}