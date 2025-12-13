'use client'

import { useState, useEffect } from 'react'

export function useLeaflet() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        // Only import Leaflet on the client side
        if (typeof window !== 'undefined') {
          await import('leaflet')
          setIsLoaded(true)
        }
      } catch (err) {
        console.error('Failed to load Leaflet:', err)
        setError(err as Error)
      }
    }

    loadLeaflet()
  }, [])

  return { isLoaded, error }
}