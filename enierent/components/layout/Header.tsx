'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Search, User, Heart, Bell, Menu, X, Home, 
  LogOut, Settings, Home as HomeIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/lib/auth-store'
import toast from 'react-hot-toast'
import NotificationCenter from '@/components/notifications/NotificationCenter'

export default function Header() {
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  useEffect(() => {
    // Check auth on mount
    useAuthStore.getState().checkAuth()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/properties?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    setIsUserMenuOpen(false)
    router.push('/')
  }

  const navigateToDashboard = () => {
    if (user?.role === 'landlord') {
      router.push('/dashboard/add-property')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <HomeIcon className="size-6 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EnieRent
            </span>
          </Link>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Beta
          </Badge>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/properties" className="text-sm font-medium hover:text-primary transition-colors">
            Properties
          </Link>
          <Link href="/properties/map" className="text-sm font-medium hover:text-primary transition-colors">
            Map View
          </Link>
          <Link href="/search" className="text-sm font-medium hover:text-primary transition-colors">
            Smart Search
          </Link>
          {isAuthenticated && user?.role === 'landlord' && (
            <Link href="/dashboard/add-property" className="text-sm font-medium hover:text-primary transition-colors">
              Add Property
            </Link>
          )}
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              type="search"
              placeholder="Search properties by location, type, or price..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          <NotificationCenter />
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
                <Heart className="size-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex relative">
                <Bell className="size-5" />
                <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full"></span>
              </Button>
              
              {/* User Menu */}
              <div className="relative">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <User className="size-4" />
                  {user?.name?.split(' ')[0] || 'Account'}
                </Button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-background border rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b">
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                        <div className="text-xs text-primary mt-1 capitalize">
                          {user?.role}
                        </div>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => {
                            router.push('/dashboard')
                            setIsUserMenuOpen(false)
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-secondary rounded-md transition-colors"
                        >
                          Dashboard
                        </button>
                        <button
                          onClick={() => {
                            router.push('/dashboard/settings')
                            setIsUserMenuOpen(false)
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-secondary rounded-md transition-colors"
                        >
                          Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-secondary rounded-md transition-colors text-red-500"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex gap-2"
                onClick={() => router.push('/login')}
              >
                <User className="size-4" />
                Sign In
              </Button>
              <Button 
                className="hidden sm:flex"
                onClick={() => router.push('/register')}
              >
                Sign Up
              </Button>
            </>
          )}
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t px-4 py-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
              <Input
                type="search"
                placeholder="Search properties..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="sm">
              Search
            </Button>
          </form>
          
          <nav className="mt-4 space-y-2">
            <Link
              href="/"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              <HomeIcon className="size-4" />
              Home
            </Link>
            <Link
              href="/properties"
              className="block p-2 rounded-lg hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="block p-2 rounded-lg hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/saved"
                  className="block p-2 rounded-lg hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Saved Properties
                </Link>
                {user?.role === 'landlord' && (
                  <Link
                    href="/dashboard/add-property"
                    className="block p-2 rounded-lg hover:bg-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Property
                  </Link>
                )}
                <div className="pt-2 border-t">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-2 rounded-lg hover:bg-accent text-red-500"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-2 border-t">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 mb-2"
                  onClick={() => {
                    setIsMenuOpen(false)
                    router.push('/login')
                  }}
                >
                  <User className="size-4" />
                  Sign In
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => {
                    setIsMenuOpen(false)
                    router.push('/register')
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}