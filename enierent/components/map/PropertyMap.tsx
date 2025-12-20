'use client'

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Property } from '@/types'
import toast from 'react-hot-toast'

// Dynamically import ALL Leaflet components with SSR disabled
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { 
    ssr: false,
    loading: () => (
      <div className="h-96 w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <div className="text-center">
          <MapPin className="size-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Loading map...</p>
        </div>
      </div>
    )
  }
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

interface PropertyMapProps {
  properties: Property[]
  center?: [number, number]
  zoom?: number
  showFindNearMe?: boolean
  className?: string
}

export default function PropertyMap({ 
  properties, 
  center = [6.5244, 3.3792],
  zoom = 12,
  showFindNearMe = true,
  className = ''
}: PropertyMapProps) {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [L, setL] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsClient(true)
    
    // Dynamically import Leaflet only on client side
    if (typeof window !== 'undefined') {
      import('leaflet').then((leaflet) => {
        // Fix default marker icons
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })
        setL(leaflet.default || leaflet)
        setIsLoading(false)
      }).catch((error) => {
        console.error('Failed to load Leaflet:', error)
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }
  }, [])

  const handleFindNearMe = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser')
      return
    }

    const toastId = toast.loading('Finding your location...')
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation([latitude, longitude])
        toast.dismiss(toastId)
        toast.success('Location found!')
      },
      (error) => {
        toast.dismiss(toastId)
        toast.error('Unable to retrieve your location')
        console.error('Geolocation error:', error)
      },
      { timeout: 10000 }
    )
  }

  const getMarkerColor = (property: Property): string => {
    switch (property.availability) {
      case 'available': return '#3b82f6'
      case 'reserved': return '#f59e0b'
      case 'rented': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const createCustomIcon = (color: string) => {
    if (!L || typeof window === 'undefined') return null
    
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
      className: '',
      iconSize: [24, 24] as [number, number],
      iconAnchor: [12, 24] as [number, number]
    })
  }

  const createUserIcon = () => {
    if (!L || typeof window === 'undefined') return null
    
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
      `,
      className: '',
      iconSize: [32, 32] as [number, number],
      iconAnchor: [16, 32] as [number, number]
    })
  }

  // Don't render anything on server - return consistent placeholder
  if (!isClient || isLoading) {
    return (
      <div className={`h-96 rounded-lg overflow-hidden border ${className}`}>
        <div className="h-full bg-secondary/20 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="size-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      </div>
    )
  }

  const validProperties = properties.filter(property => 
    property.location?.coordinates && 
    Array.isArray(property.location.coordinates) && 
    property.location.coordinates.length === 2
  )

  return (
    <div className={`relative ${className}`}>
      {showFindNearMe && (
        <div className="absolute top-4 right-4 z-[1000]">
          <Button
            onClick={handleFindNearMe}
            size="sm"
            className="gap-2 shadow-lg bg-white hover:bg-gray-50 text-gray-900"
            variant="outline"
          >
            <Navigation className="size-4" />
            Find Near Me
          </Button>
        </div>
      )}

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
            maxZoom={19}
          />
          
          <AttributionControl position="bottomright" />
          
          {userLocation && createUserIcon() && (
            <Marker position={userLocation} icon={createUserIcon()!}>
              <Popup>
                <div className="p-2">
                  <strong>Your Location</strong>
                  <p className="text-sm text-muted-foreground">
                    {userLocation[0].toFixed(6)}, {userLocation[1].toFixed(6)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Zoom in to see nearby properties
                  </p>
                </div>
              </Popup>
            </Marker>
          )}

          {validProperties.map((property) => {
            const coords = property.location.coordinates as [number, number]
            const icon = createCustomIcon(getMarkerColor(property))
            
            if (!icon) return null
            
            return (
              <Marker key={property.id} position={coords} icon={icon}>
                <Popup>
                  <div className="w-64">
                    {property.images?.[0] && (
                      <img
                        src={property.images[0]}
                        alt={property.title}
                        className="w-full h-32 object-cover rounded-lg mb-2"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    )}
                    <h4 className="font-semibold text-sm line-clamp-1">{property.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                      {property.location.address || 'Address not available'}, {property.location.city || 'City not available'}
                    </p>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold">
                        ₦{property.price?.toLocaleString('en-NG') || '0'}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded capitalize ${
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
                      <span>{property.size ? `${property.size.toLocaleString()} sq ft` : 'Size N/A'}</span>
                    </div>
                    <a
                      href={`/properties/${property.id}`}
                      className="block mt-3 text-center text-sm bg-primary text-primary-foreground py-1.5 px-3 rounded hover:bg-primary/90 transition-colors"
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
            <div className="relative size-4">
              <div className="absolute inset-0 rounded-full bg-[#10b981] border-2 border-white shadow"></div>
            </div>
            <span className="text-sm">Your Location</span>
          </div>
        )}
      </div>
    </div>
  )
}