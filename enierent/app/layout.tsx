import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/ui/toast-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EnieRent - Find Your Perfect Home in Nigeria',
  description: 'EnieRent connects tenants with verified landlords across Nigeria. Find apartments, self-contains, duplexes, and short-lets that match your needs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}