'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Search, Sparkles, Clock, MapPin, TrendingUp, X, Heart, Home } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Fuse from 'fuse.js'
import { mockProperties } from '@/data/mockData'
import { usePropertyStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { Property } from '@/types'

interface SearchSuggestion {
  type: 'property' | 'location' | 'suggestion'
  title: string
  subtitle?: string
  icon: React.ReactNode
  action: () => void
}

export default function AISearch() {
  const router = useRouter()
  const { setSearchQuery } = usePropertyStore()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const searchRef = useRef<HTMLDivElement>(null)

  // Initialize Fuse.js with memoization
  const fuse = useMemo(() => new Fuse(mockProperties, {
    keys: [
      { name: 'title', weight: 0.6 },
      { name: 'description', weight: 0.3 },
      { name: 'location.city', weight: 0.4 },
      { name: 'location.address', weight: 0.3 },
      { name: 'type', weight: 0.3 }
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
  }), [])

  // Load search history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('enierent_search_history')
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch (error) {
        console.error('Failed to parse search history:', error)
      }
    }
  }, [])

  // Save search to history
  const saveToHistory = useCallback((searchTerm: string) => {
    const updatedHistory = [
      searchTerm,
      ...searchHistory.filter(term => 
        term.toLowerCase() !== searchTerm.toLowerCase()
      )
    ].slice(0, 5)
    
    setSearchHistory(updatedHistory)
    localStorage.setItem('enierent_search_history', JSON.stringify(updatedHistory))
  }, [searchHistory])

  // Generate AI suggestions
  const generateSuggestions = useCallback((searchTerm: string): SearchSuggestion[] => {
    const results: SearchSuggestion[] = []

    // Property matches
    const propertyResults = fuse.search(searchTerm)
    propertyResults.slice(0, 3).forEach((result) => {
      const property = result.item as Property
      results.push({
        type: 'property',
        title: property.title,
        subtitle: `${property.location.city} • ${property.type.replace('_', ' ')}`,
        icon: property.featured ? 
          <Sparkles className="size-4 text-yellow-500" /> : 
          <Home className="size-4 text-blue-500" />,
        action: () => {
          router.push(`/properties/${property.id}`)
          setShowSuggestions(false)
        }
      })
    })

    // Location suggestions
    const cities = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano']
    const locationMatches = cities.filter(city => 
      city.toLowerCase().includes(searchTerm.toLowerCase())
    )
    locationMatches.slice(0, 2).forEach((city) => {
      results.push({
        type: 'location',
        title: `Properties in ${city}`,
        subtitle: `Browse properties in ${city}`,
        icon: <MapPin className="size-4 text-red-500" />,
        action: () => {
          setSearchQuery(city)
          saveToHistory(city)
          router.push('/properties')
          setShowSuggestions(false)
        }
      })
    })

    // AI-powered suggestions
    if (searchTerm.length > 2) {
      const suggestionsMap: Record<string, string[]> = {
        'ikeja': ['Ogba', 'Maryland', 'Ilupeju'],
        'lekki': ['Victoria Island', 'Ajah', 'Chevron'],
        'apartment': ['Self Contain', 'Duplex', 'Studio'],
        'cheap': ['Budget-friendly', 'Affordable', 'Economical'],
        'luxury': ['Premium', 'High-end', 'Exclusive'],
        'house': ['Duplex', 'Bungalow', 'Townhouse'],
        'studio': ['Self Contain', 'Mini-flat', 'One-bedroom'],
      }

      Object.entries(suggestionsMap).forEach(([key, values]) => {
        if (searchTerm.toLowerCase().includes(key)) {
          values.forEach((value) => {
            results.push({
              type: 'suggestion',
              title: `Try searching: "${value}"`,
              subtitle: `Similar to ${searchTerm}`,
              icon: <TrendingUp className="size-4 text-green-500" />,
              action: () => {
                setQuery(value)
                handleSearch(value)
              }
            })
          })
        }
      })
    }

    // Search history
    if (searchTerm === '' && searchHistory.length > 0) {
      searchHistory.slice(0, 3).forEach((term) => {
        results.push({
          type: 'suggestion',
          title: term,
          subtitle: 'Recent search',
          icon: <Clock className="size-4 text-gray-500" />,
          action: () => {
            setQuery(term)
            handleSearch(term)
          }
        })
      })
    }

    // Popular searches (fallback)
    if (results.length === 0 && searchTerm === '') {
      const popularSearches = [
        'Apartment in Lagos',
        'Self Contain Ikeja',
        'Duplex Lekki',
        'Short Let Abuja',
        'Bungalow Surulere',
      ]
      
      popularSearches.forEach((term) => {
        results.push({
          type: 'suggestion',
          title: term,
          subtitle: 'Popular search',
          icon: <TrendingUp className="size-4 text-purple-500" />,
          action: () => {
            setQuery(term)
            handleSearch(term)
          }
        })
      })
    }

    return results.slice(0, 8)
  }, [fuse, router, setSearchQuery, saveToHistory, searchHistory])

  const handleSearch = useCallback((searchTerm?: string) => {
    const term = searchTerm || query
    if (term.trim()) {
      setSearchQuery(term)
      saveToHistory(term)
      router.push('/properties')
      setShowSuggestions(false)
    }
  }, [query, setSearchQuery, saveToHistory, router])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    if (value.length > 0) {
      setSuggestions(generateSuggestions(value))
      setShowSuggestions(true)
    } else {
      setSuggestions(generateSuggestions(''))
      setShowSuggestions(true)
    }
  }, [generateSuggestions])

  const clearHistory = useCallback(() => {
    setSearchHistory([])
    localStorage.removeItem('enierent_search_history')
  }, [])

  const clearSearch = useCallback(() => {
    setQuery('')
    setShowSuggestions(false)
  }, [])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Generate "Did you mean?" suggestions
  const didYouMeanSuggestions = useMemo(() => {
    if (query.length < 2) return []
    
    const suggestions: string[] = []
    if (query.toLowerCase().includes('apart')) {
      suggestions.push('Apartments', 'Studio Apartments', 'Serviced Apartments')
    }
    if (query.toLowerCase().includes('ikeja')) {
      suggestions.push('Ogba', 'Maryland', 'Ilupeju')
    }
    if (query.toLowerCase().includes('lekki')) {
      suggestions.push('Victoria Island', 'Ajah', 'Chevron')
    }
    if (query.toLowerCase().includes('cheap') || query.toLowerCase().includes('afford')) {
      suggestions.push('Budget-friendly', 'Economical', 'Low-cost')
    }
    if (query.toLowerCase().includes('luxury')) {
      suggestions.push('Premium', 'High-end', 'Exclusive')
    }
    
    return suggestions.slice(0, 4)
  }, [query])

  const propertyMatches = useMemo(() => 
    suggestions.filter(s => s.type === 'property').length, 
    [suggestions]
  )

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search properties, locations, or ask AI..."
          className="pl-10 pr-10"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            type="button"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* AI Badge */}
      <div className="absolute -top-2 -right-2">
        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
          <Sparkles className="size-3 mr-1" />
          AI
        </Badge>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-background border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={suggestion.action}
                className="w-full text-left p-3 hover:bg-secondary rounded-lg transition-colors flex items-start gap-3"
                type="button"
              >
                <div className="mt-0.5">{suggestion.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{suggestion.title}</div>
                  {suggestion.subtitle && (
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {suggestion.subtitle}
                    </div>
                  )}
                </div>
                {suggestion.type === 'property' && (
                  <Badge variant="outline" className="text-xs">
                    View
                  </Badge>
                )}
              </button>
            ))}

            {/* Search History Section */}
            {searchHistory.length > 0 && query === '' && (
              <>
                <div className="flex justify-between items-center p-3 border-t">
                  <div className="text-xs font-medium text-muted-foreground">
                    Recent Searches
                  </div>
                  <button
                    onClick={clearHistory}
                    className="text-xs text-red-500 hover:text-red-600"
                    type="button"
                  >
                    Clear All
                  </button>
                </div>
              </>
            )}

            {/* "Did you mean?" Suggestions */}
            {didYouMeanSuggestions.length > 0 && (
              <div className="p-3 border-t bg-secondary/20">
                <div className="text-xs font-medium text-muted-foreground mb-2">
                  <Sparkles className="inline size-3 mr-1" />
                  AI Suggestions
                </div>
                <div className="flex flex-wrap gap-2">
                  {didYouMeanSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(suggestion)
                        handleSearch(suggestion)
                      }}
                      className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
                      type="button"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search Button */}
            <div className="p-3 border-t">
              <Button
                onClick={() => handleSearch()}
                className="w-full gap-2"
                disabled={!query.trim()}
                type="button"
              >
                <Search className="size-4" />
                Search Properties
                {query.trim() && propertyMatches > 0 && (
                  <Badge variant="secondary" className="ml-auto">
                    {propertyMatches} found
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}