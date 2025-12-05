// Property Types
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: [number, number];
  };
  images: string[];
  type: 'apartment' | 'self_contain' | 'duplex' | 'short_let' | 'studio' | 'bungalow';
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  size: number; // in sq ft
  isVerified: boolean;
  rating: number;
  reviews: Review[];
  availability: 'available' | 'rented' | 'reserved';
  ownerId: string;
  createdAt: Date;
  featured?: boolean;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tenant' | 'landlord' | 'admin';
  avatar?: string;
  phone?: string;
  savedProperties: string[];
  createdAt: Date;
}

export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  location: string;
  propertyTypes: string[];
  bedrooms: number | null;
  amenities: string[];
  sortBy: 'price_asc' | 'price_desc' | 'newest' | 'rating';
}