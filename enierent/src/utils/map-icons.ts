import type L from 'leaflet'

// Helper function to get Leaflet instance safely
let leafletInstance: typeof L | null = null

export const getLeaflet = async (): Promise<typeof L | null> => {
  if (typeof window === 'undefined') return null
  
  if (!leafletInstance) {
    try {
      leafletInstance = await import('leaflet')
    } catch (error) {
      console.error('Failed to load Leaflet:', error)
      return null
    }
  }
  
  return leafletInstance
}

export const createPropertyIcon = async (color: string = '#3b82f6'): Promise<L.DivIcon | null> => {
  const L = await getLeaflet()
  if (!L) return null
  
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
    className: 'custom-property-marker',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  })
}

export const createUserIcon = async (): Promise<L.DivIcon | null> => {
  const L = await getLeaflet()
  if (!L) return null
  
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
        position: relative;
      ">
        <div style="
          width: 16px;
          height: 16px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    className: 'user-location-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  })
}

// Fix default marker icons for React Leaflet
export const fixLeafletIcons = async () => {
  const L = await getLeaflet()
  if (!L) return
  
  delete (L.Icon.Default.prototype as any)._getIconUrl
  
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
    iconUrl: '/leaflet/images/marker-icon.png',
    shadowUrl: '/leaflet/images/marker-shadow.png',
  })
}

// Alternative: Use CDN URLs
export const useCDNIcons = async () => {
  const L = await getLeaflet()
  if (!L) return
  
  delete (L.Icon.Default.prototype as any)._getIconUrl
  
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
}