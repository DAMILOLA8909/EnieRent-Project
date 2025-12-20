// components/properties/SimilarProperties.tsx
"use client";

import { useState, useEffect } from "react";
import { Property } from "@/types";
import { mockProperties } from "@/data/mockData";
import PropertyCard from "./PropertyCard";
import { PropertyCardSkeleton } from "@/components/loading/PropertyCardSkeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface SimilarPropertiesProps {
  currentPropertyId: string;
  maxItems?: number;
}

export function SimilarProperties({ 
  currentPropertyId, 
  maxItems = 3 
}: SimilarPropertiesProps) {
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const currentProperty = mockProperties.find(p => p.id === currentPropertyId);
      
      if (!currentProperty) {
        setSimilarProperties([]);
        setLoading(false);
        return;
      }

      // Filter similar properties based on:
      // 1. Same property type
      // 2. Same city
      // 3. Similar price range (±30%)
      // 4. Not the current property
      const similar = mockProperties
        .filter(property => {
          if (property.id === currentPropertyId) return false;
          if (property.availability !== 'available') return false;
          
          const sameType = property.type === currentProperty.type;
          const sameCity = property.location.city === currentProperty.location.city;
          const priceDifference = Math.abs(property.price - currentProperty.price) / currentProperty.price;
          const similarPrice = priceDifference <= 0.3; // Within 30% price difference
          
          return (sameType && sameCity) || (sameCity && similarPrice);
        })
        .sort((a, b) => {
          // Prioritize same type, then same city, then price similarity
          const aScore = getSimilarityScore(a, currentProperty);
          const bScore = getSimilarityScore(b, currentProperty);
          return bScore - aScore;
        })
        .slice(0, maxItems);

      setSimilarProperties(similar);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentPropertyId, maxItems]);

  const getSimilarityScore = (property: Property, current: Property): number => {
    let score = 0;
    
    // Same type gets high score
    if (property.type === current.type) score += 3;
    
    // Same city gets medium score
    if (property.location.city === current.location.city) score += 2;
    
    // Similar price range (±15%) gets score
    const priceDiff = Math.abs(property.price - current.price) / current.price;
    if (priceDiff <= 0.15) score += 2;
    else if (priceDiff <= 0.3) score += 1;
    
    // Same number of bedrooms gets score
    if (Math.abs(property.bedrooms - current.bedrooms) <= 1) score += 1;
    
    // Featured properties get bonus
    if (property.featured) score += 1;
    
    // Higher rated properties get bonus
    if (property.rating >= 4.5) score += 1;
    
    return score;
  };

  const getEmptyStateMessage = () => {
    const currentProperty = mockProperties.find(p => p.id === currentPropertyId);
    if (!currentProperty) return "No similar properties found.";
    
    const city = currentProperty.location.city;
    const type = currentProperty.type.replace('_', ' ');
    
    return `No similar ${type}s available in ${city} right now. Check back soon!`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Similar Properties</h3>
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (similarProperties.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Similar Properties</h3>
        </div>
        <div className="p-8 text-center border rounded-lg bg-gray-50 dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">{getEmptyStateMessage()}</p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/properties">
              Browse All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Similar Properties</h3>
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link href="/properties">
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similarProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="transition-all duration-300"
          >
            <PropertyCard property={property} />
          </motion.div>
        ))}
      </div>

      {/* Show more similar properties button if there are more */}
      {similarProperties.length === maxItems && (
        <div className="text-center pt-4">
          <Button asChild variant="outline">
            <Link href={`/properties?type=${mockProperties.find(p => p.id === currentPropertyId)?.type}`}>
              Show More Similar Properties
            </Link>
          </Button>
        </div>
      )}
    </motion.div>
  );
}