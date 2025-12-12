'use client'

import React, { useState, useEffect } from 'react'
import { Search, Sparkles, Filter, MapPin, TrendingUp, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import PropertyCard from '@/components/properties/PropertyCard'
import AISearch from '@/components/search/AISearch'
import { usePropertyStore } from '@/lib/store'
import { mockProperties } from '@/data/mockData'
import Fuse from 'fuse.js'
import toast from 'react-hot-toast'

export default function SearchPage() {
  const { filteredProperties, searchQuery, setSearchQuery } = usePropertyStore()
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Initialize Fuse.js for advanced search
  const fuse = new Fuse(mockProperties, {
    keys: [
      { name: 'title', weight: 0.6 },
      { name: 'description', weight: 0.3 },
      { name: 'location.city', weight: 0.4 },
      { name: 'location.address', weight: 0.3 },
      { name: 'amenities', weight: 0.2 },
      { name: 'type', weight: 0.3 }
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  })

  useEffect(() => {
    // Load search history
    const savedHistory = localStorage.getItem('enierent_search_history')
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory))
    }
  }, [])

  useEffect(() => {
    if (searchQuery) {
      generateAIRecommendations(searchQuery)
    }
  }, [searchQuery])

  const generateAIRecommendations = (query: string) => {
    const recommendations: string[] = []
    
    // Smart suggestions based on query
    const suggestionMap = {
      'location': ['Try searching in different areas', 'Consider nearby neighborhoods'],
      'price': ['Adjust price range', 'Look for similar properties in different price brackets'],
      'apartment': ['Check out different apartment types', 'Consider studio apartments'],
      'house': ['Look for duplexes or bungalows', 'Consider gated communities'],
      'rent': ['Check short-term options', 'Look for flexible lease terms'],
    }

    // Check query for keywords
    Object.entries(suggestionMap).forEach(([keyword, suggestions]) => {
      if (query.toLowerCase().includes(keyword)) {
        recommendations.push(...suggestions)
      }
    })

    // If no specific matches, provide general recommendations
    if (recommendations.length === 0) {
      recommendations.push(
        'Try refining your search with specific amenities',
        'Consider properties in different price ranges',
        'Look for properties with similar features',
        'Expand your search to nearby areas'
      )
    }

    setAiRecommendations(recommendations.slice(0, 3))
  }

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term)
    toast.success(`Searching for "${term}"`)
  }

  const popularSearches = [
    { term: 'Apartment in Lagos', count: 124 },
    { term: 'Self Contain Ikeja', count: 89 },
    { term: 'Duplex Lekki', count: 67 },
    { term: 'Short Let Abuja', count: 112 },
    { term: 'Bungalow Surulere', count: 45 },
    { term: 'Studio Victoria Island', count: 78 },
  ]

  const trendingLocations = [
    { name: 'Lekki Phase 1', trend: 'up' as const },
    { name: 'Ikeja GRA', trend: 'up' as const },
    { name: 'Victoria Island', trend: 'steady' as const },
    { name: 'Abuja Central', trend: 'up' as const },
    { name: 'Port Harcourt', trend: 'steady' as const },
  ]

  return (
    <LayoutWrapper>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Smart Property <span className="text-primary">Search</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find your perfect home with AI-powered recommendations and smart filters
          </p>
        </div>

        {/* Main Search */}
        <div className="max-w-3xl mx-auto mb-12">
          <AISearch />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Search Insights */}
          <div className="lg:col-span-2">
            {/* Search Results */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Search Results</h2>
                  <p className="text-muted-foreground">
                    {searchQuery ? `Found ${filteredProperties.length} properties for "${searchQuery}"` : 'Start typing to search properties'}
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(true)}
                  className="gap-2"
                >
                  <Filter className="size-4" />
                  Filters
                </Button>
              </div>

              {searchQuery ? (
                filteredProperties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProperties.slice(0, 6).map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg">
                    <Search className="size-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No properties found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search terms or filters
                    </p>
                    <div className="flex gap-2 justify-center">
                      <Button variant="outline" onClick={() => setSearchQuery('')}>
                        Clear Search
                      </Button>
                      <Button onClick={() => handleQuickSearch('apartment')}>
                        Browse Apartments
                      </Button>
                    </div>
                  </div>
                )
              ) : (
                <div className="text-center py-12">
                  <Sparkles className="size-12 text-primary/50 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Ready to search?</h3>
                  <p className="text-muted-foreground">
                    Enter a location, property type, or feature to get started
                  </p>
                </div>
              )}
            </div>

            {/* AI Recommendations */}
            {aiRecommendations.length > 0 && (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="size-5 text-primary" />
                  <h3 className="font-semibold">AI Recommendations</h3>
                </div>
                <div className="space-y-3">
                  {aiRecommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-white rounded-lg border"
                    >
                      <div className="size-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-primary">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-sm">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Search Insights */}
          <div className="space-y-8">
            {/* Search History */}
            {searchHistory.length > 0 && (
              <div className="border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="size-5" />
                  <h3 className="font-semibold">Recent Searches</h3>
                </div>
                <div className="space-y-2">
                  {searchHistory.slice(0, 5).map((term, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickSearch(term)}
                      className="w-full text-left p-2 hover:bg-secondary rounded transition-colors flex justify-between items-center"
                    >
                      <span className="text-sm">{term}</span>
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 5) + 1}d ago
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            <div className="border rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="size-5" />
                <h3 className="font-semibold">Popular Searches</h3>
              </div>
              <div className="space-y-3">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickSearch(search.term)}
                    className="w-full text-left p-3 border rounded-lg hover:border-primary/50 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-sm">{search.term}</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {search.count}+
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="size-3" />
                      <span>Multiple locations</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Locations */}
            <div className="border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Trending Locations</h3>
              <div className="space-y-3">
                {trendingLocations.map((location, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-secondary rounded transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-muted-foreground" />
                      <span className="text-sm">{location.name}</span>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      location.trend === 'up'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {location.trend === 'up' ? '📈 Trending' : '📊 Steady'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Tips */}
            <div className="bg-secondary/20 border rounded-xl p-6">
              <h3 className="font-semibold mb-3">Search Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Use specific locations like "Ikeja GRA" or "Lekki Phase 1"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Include amenities: "with pool", "gym included"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Specify property type: "duplex", "self contain", "short let"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Use price ranges: "under 1M", "500k - 1M"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}