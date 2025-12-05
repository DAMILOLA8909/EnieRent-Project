'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, User, Heart, Bell, Menu, X, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchQuery)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Home className="size-6 text-primary" />
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
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
            <Heart className="size-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex relative">
            <Bell className="size-5" />
            <span className="absolute -top-1 -right-1 size-2 bg-red-500 rounded-full"></span>
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
            <User className="size-4" />
            Sign In
          </Button>
          <Button className="hidden sm:flex">List Property</Button>
          
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
              <Home className="size-4" />
              Home
            </Link>
            <Link
              href="/properties"
              className="block p-2 rounded-lg hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            <Link
              href="/about"
              className="block p-2 rounded-lg hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block p-2 rounded-lg hover:bg-accent"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 border-t">
              <Button variant="outline" className="w-full justify-start gap-2 mb-2">
                <User className="size-4" />
                Sign In
              </Button>
              <Button className="w-full">List Property</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}