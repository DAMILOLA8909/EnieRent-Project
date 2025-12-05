'use client'

import React, { useState } from 'react'
import { Search, MapPin, Home, Building, House, Hotel } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export default function HeroSection() {
  const [searchType, setSearchType] = useState('rent')
  const [location, setLocation] = useState('')
  const [propertyType, setPropertyType] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ searchType, location, propertyType })
  }

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment', icon: Building },
    { value: 'self_contain', label: 'Self Contain', icon: Home },
    { value: 'duplex', label: 'Duplex', icon: House },
    { value: 'short_let', label: 'Short Let', icon: Hotel },
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Find Your <span className="text-primary">Perfect</span> Home
            <br />
            <span className="text-secondary">in Nigeria</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover thousands of verified properties for rent. From cozy apartments to luxurious villas, we have something for everyone.
          </p>

          {/* Search Form */}
          <Card className="shadow-xl border-0 animate-fade-in">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="space-y-4">
                {/* Search Type Toggle */}
                <div className="flex justify-center">
                  <div className="inline-flex rounded-lg border p-1">
                    <Button
                      type="button"
                      variant={searchType === 'rent' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSearchType('rent')}
                      className="rounded-md"
                    >
                      For Rent
                    </Button>
                    <Button
                      type="button"
                      variant={searchType === 'short_let' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSearchType('short_let')}
                      className="rounded-md"
                    >
                      Short Let
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Location */}
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
                    <Input
                      placeholder="Where are you looking?"
                      className="pl-10"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  {/* Property Type */}
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                  >
                    <option value="">Property Type</option>
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>

                  {/* Search Button */}
                  <Button type="submit" className="gap-2">
                    <Search className="size-4" />
                    Search Properties
                  </Button>
                </div>

                {/* Quick Categories */}
                <div className="flex flex-wrap justify-center gap-2 pt-4">
                  {propertyTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <Button
                        key={type.value}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => setPropertyType(type.value)}
                      >
                        <Icon className="size-4" />
                        {type.label}
                      </Button>
                    )
                  })}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            {[
              { label: 'Properties', value: '2,500+' },
              { label: 'Happy Tenants', value: '1,200+' },
              { label: 'Cities', value: '25+' },
              { label: 'Verified Landlords', value: '850+' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}