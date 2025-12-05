import React from 'react'
import Link from 'next/link'
import { Building, Home, House, Hotel, Castle, Warehouse } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const categories = [
  {
    title: 'Apartments',
    description: 'Modern apartments with amenities',
    icon: Building,
    count: 850,
    color: 'bg-blue-100 text-blue-600',
    href: '/properties?type=apartment'
  },
  {
    title: 'Self Contains',
    description: 'Cozy single-room apartments',
    icon: Home,
    count: 620,
    color: 'bg-green-100 text-green-600',
    href: '/properties?type=self_contain'
  },
  {
    title: 'Duplexes',
    description: 'Spacious family homes',
    icon: House,
    count: 320,
    color: 'bg-purple-100 text-purple-600',
    href: '/properties?type=duplex'
  },
  {
    title: 'Short Lets',
    description: 'Fully furnished short stays',
    icon: Hotel,
    count: 480,
    color: 'bg-orange-100 text-orange-600',
    href: '/properties?type=short_let'
  },
  {
    title: 'Bungalows',
    description: 'Single-story comfortable homes',
    icon: Castle,
    count: 210,
    color: 'bg-red-100 text-red-600',
    href: '/properties?type=bungalow'
  },
  {
    title: 'Commercial',
    description: 'Office spaces & shops',
    icon: Warehouse,
    count: 150,
    color: 'bg-indigo-100 text-indigo-600',
    href: '/properties?type=commercial'
  },
]

export default function FeaturedCategories() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by <span className="text-primary">Category</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find your perfect home from our wide selection of property types
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.title} href={category.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/20 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <Icon className="size-6" />
                      </div>
                      <Badge variant="secondary">
                        {category.count}+
                      </Badge>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    
                    <div className="text-sm font-medium text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                      Browse properties
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}