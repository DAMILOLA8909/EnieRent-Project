// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Move viewport to separate export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'EnieRent - Find Your Perfect Rental',
  description: 'Discover amazing rental properties with virtual tours, AI recommendations, and secure booking.',
  keywords: ['rental', 'apartment', 'house', 'vacation rental', 'property', 'Nigeria'],
  authors: [{ name: 'EnieRent Team' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'EnieRent - Find Your Perfect Rental',
    description: 'Discover amazing rental properties',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EnieRent',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EnieRent - Find Your Perfect Rental',
    description: 'Discover amazing rental properties',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}