'use client'

import React, { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Property } from '@/types'
import toast from 'react-hot-toast'
import 'leaflet/dist/leaflet.css'

// Dynamically import Leaflet to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

const AttributionControl = dynamic(
  () => import('react-leaflet').then((mod) => mod.AttributionControl),
  { ssr: false }
)

// Import Leaflet types
import L from 'leaflet'

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
  iconUrl: '/leaflet/images/marker-icon.png',
  shadowUrl: '/leaflet/images/marker-shadow.png',
})

interface PropertyMapProps {
  properties: Property[]
  center?: [number, number]
  zoom?: number
  showFindNearMe?: boolean
}

export default function PropertyMap({ 
  properties, 
  center = [6.5244, 3.3792], // Default to Lagos
  zoom = 12,
  showFindNearMe = true 
}: PropertyMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLeafletLoaded, setIsLeafletLoaded] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      try {
        // Import Leaflet
        await import('leaflet')
        setIsLeafletLoaded(true)
      } catch (error) {
        console.error('Failed to load Leaflet:', error)
      }
    }

    loadLeaflet()
  }, [])

  const handleFindNearMe = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser')
      return
    }

    toast.loading('Finding your location...')
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation([latitude, longitude])
        toast.dismiss()
        toast.success('Location found!')
      },
      (error) => {
        toast.dismiss()
        toast.error('Unable to retrieve your location')
        console.error('Geolocation error:', error)
      },
      { timeout: 10000 }
    )
  }

  const getMarkerColor = (property: Property): string => {
    switch (property.availability) {
      case 'available': return '#3b82f6' // Blue
      case 'reserved': return '#f59e0b' // Amber
      case 'rented': return '#ef4444' // Red
      default: return '#6b7280' // Gray
    }
  }

  const createCustomIcon = (color: string) => {
    if (!isLeafletLoaded || typeof window === 'undefined') {
      return L.divIcon({ html: '' })
    }
    
    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <svg style="width: 12px; height: 12px; fill: white;" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 24]
    })
  }

  const createUserIcon = () => {
    if (!isLeafletLoaded || typeof window === 'undefined') {
      return L.divIcon({ html: '' })
    }
    
    return L.divIcon({
      html: `
        <div style="
          background-color: #10b981;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            width: 16px;
            height: 16px;
            background-color: white;
            border-radius: 50%;
          "></div>
        </div>
        <style>
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.1); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
          .pulse-animation {
            animation: pulse 2s infinite;
          }
        </style>
      `,
      className: 'user-marker pulse-animation',
      iconSize: [32, 32],
      iconAnchor: [16, 32]
    })
  }

  // Don't render on server
  if (!isClient || !isLeafletLoaded) {
    return (
      <div className="h-96 bg-secondary/20 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="size-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Find Near Me Button */}
      {showFindNearMe && (
        <div className="absolute top-4 right-4 z-[1000]">
          <Button
            onClick={handleFindNearMe}
            size="sm"
            className="gap-2 shadow-lg"
          >
            <Navigation className="size-4" />
            Find Near Me
          </Button>
        </div>
      )}

      {/* Map Container */}
      <div className="h-96 rounded-lg overflow-hidden border">
        <MapContainer
          center={userLocation || center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          attributionControl={false}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <AttributionControl 
            position="bottomright"
          />
          
          {/* User Location Marker */}
          {userLocation && (
            <Marker
              position={userLocation}
              icon={createUserIcon()}
            >
              <Popup>
                <div className="p-2">
                  <strong>Your Location</strong>
                  <p className="text-sm text-muted-foreground">
                    {userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}
                  </p>
                </div>
              </Popup>
            </Marker>
          )}

          {/* Property Markers */}
          {properties.map((property) => {
            const coords = property.location?.coordinates || center
            if (!coords || !Array.isArray(coords) || coords.length !== 2) {
              console.warn(`Invalid coordinates for property ${property.id}:`, coords)
              return null
            }
            
            return (
              <Marker
                key={property.id}
                position={coords as [number, number]}
                icon={createCustomIcon(getMarkerColor(property))}
              >
                <Popup>
                  <div className="w-64">
                    {property.images && property.images.length > 0 && (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                      />
                    )}
                    <h4 className="font-semibold text-sm">{property.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      {property.location?.address || 'Address not available'}, {property.location?.city || 'City not available'}
                    </p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold">₦{property.price?.toLocaleString() || '0'}</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        property.availability === 'available'
                          ? 'bg-green-100 text-green-800'
                          : property.availability === 'reserved'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {property.availability || 'unknown'}
                      </span>
                    </div>
                    <div className="flex text-xs text-muted-foreground gap-3">
                      <span>{property.bedrooms || 0} bed</span>
                      <span>{property.bathrooms || 0} bath</span>
                      <span>{property.size || 0} sq ft</span>
                    </div>
                    <a
                      href={`/properties/${property.id}`}
                      className="block mt-3 text-center text-sm bg-primary text-primary-foreground py-1 px-3 rounded hover:bg-primary/90"
                    >
                      View Details
                    </a>
                  </div>
                </Popup>
              </Marker>
            )
          })}
        </MapContainer>
      </div>

      {/* Map Legend */}
      <div className="flex flex-wrap gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-full bg-[#3b82f6] border-2 border-white shadow"></div>
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-full bg-[#f59e0b] border-2 border-white shadow"></div>
          <span className="text-sm">Reserved</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-full bg-[#ef4444] border-2 border-white shadow"></div>
          <span className="text-sm">Rented</span>
        </div>
        {userLocation && (
          <div className="flex items-center gap-2">
            <div className="size-4 rounded-full bg-[#10b981] border-2 border-white shadow animate-pulse"></div>
            <span className="text-sm">Your Location</span>
          </div>
        )}
      </div>
    </div>
  )
}