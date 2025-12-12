'use client'

import React, { useState, useEffect } from 'react'
import { Heart, Calendar, MapPin, Bed, Bath } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockProperties } from '@/data/mockData'
import { useAuthStore } from '@/lib/auth-store'
import { formatPrice, formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Booking {
  id: string
  propertyId: string
  propertyTitle: string
  date: Date
  time: string
  status: 'confirmed' | 'pending' | 'cancelled'
  address: string
}

export default function FavoritesSection() {
  const { user, toggleSaveProperty } = useAuthStore()
  const [favorites, setFavorites] = useState<any[]>([])
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      propertyId: '1',
      propertyTitle: 'Modern 2-Bedroom Apartment in Ikeja',
      date: new Date('2024-01-25'),
      time: '14:00',
      status: 'confirmed',
      address: '123 Allen Avenue, Ikeja'
    },
    {
      id: '2',
      propertyId: '3',
      propertyTitle: '4-Bedroom Duplex in Lekki Phase 1',
      date: new Date('2024-01-28'),
      time: '11:00',
      status: 'pending',
      address: '12 Admiralty Way, Lekki'
    }
  ])

  useEffect(() => {
    if (user) {
      const savedProperties = mockProperties.filter(property => 
        user.savedProperties.includes(property.id)
      )
      setFavorites(savedProperties)
    }
  }, [user])

  const handleRemoveFavorite = (propertyId: string) => {
    toggleSaveProperty(propertyId)
    setFavorites(favorites.filter(p => p.id !== propertyId))
    toast.success('Removed from favorites')
  }

  const cancelBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'cancelled' as const }
          : booking
      ))
      toast.success('Booking cancelled')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Favorites */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Heart className="size-5 text-red-500" />
              Favorite Properties
            </h3>
            <p className="text-sm text-muted-foreground">
              {favorites.length} propert{favorites.length === 1 ? 'y' : 'ies'} saved
            </p>
          </div>
          {favorites.length > 0 && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                // Clear all favorites
                favorites.forEach(fav => toggleSaveProperty(fav.id))
                setFavorites([])
                toast.success('Cleared all favorites')
              }}
            >
              Clear All
            </Button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <Heart className="size-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">No favorites yet</h4>
            <p className="text-muted-foreground mb-4">
              Save properties you like to find them easily later
            </p>
            <Button variant="outline">Browse Properties</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((property) => (
              <div key={property.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold line-clamp-1">{property.title}</h4>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="size-3 mr-1" />
                          <span>{property.location.city}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveFavorite(property.id)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                      >
                        <Heart className="size-4 fill-red-500" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-3 text-sm">
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

                    <div className="flex justify-between items-center mt-4">
                      <div className="text-lg font-bold text-primary">
                        {formatPrice(property.price)}
                        <span className="text-sm text-muted-foreground font-normal">/year</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm">Contact</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking History */}
      <div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="size-5 text-blue-500" />
            Booking History
          </h3>
          <p className="text-sm text-muted-foreground">
            {bookings.length} scheduled visit{bookings.length === 1 ? '' : 's'}
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12 border rounded-lg">
            <Calendar className="size-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">No bookings yet</h4>
            <p className="text-muted-foreground mb-4">
              Schedule visits to properties you're interested in
            </p>
            <Button variant="outline">Schedule a Visit</Button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold line-clamp-1">{booking.propertyTitle}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="size-3 mr-1" />
                      <span>{booking.address}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Date</div>
                    <div className="font-semibold">{formatDate(booking.date)}</div>
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-lg">
                    <div className="text-sm text-muted-foreground">Time</div>
                    <div className="font-semibold">{booking.time}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    Reschedule
                  </Button>
                  {booking.status === 'pending' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 text-red-500 hover:text-red-600 hover:border-red-200"
                      onClick={() => cancelBooking(booking.id)}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button size="sm" className="flex-1">
                    View Property
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}