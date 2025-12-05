import { Property, User } from '@/types'

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Modern 2-Bedroom Apartment in Ikeja',
    description: 'A beautiful modern apartment with spacious rooms, balcony, and beautiful view of the city. Located in a secure estate with 24/7 security.',
    price: 750000,
    location: {
      address: '123 Allen Avenue',
      city: 'Ikeja',
      state: 'Lagos',
      coordinates: [6.6018, 3.3515],
    },
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w-800&auto=format&fit=crop',
    ],
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['WiFi', 'Parking', 'Swimming Pool', 'Gym', '24/7 Security', 'Water Supply'],
    size: 1200,
    isVerified: true,
    rating: 4.8,
    reviews: [
      {
        id: 'r1',
        userId: 'u2',
        userName: 'Jane Smith',
        rating: 5,
        comment: 'Excellent apartment with great amenities!',
        date: new Date('2024-01-15'),
      },
    ],
    availability: 'available',
    ownerId: 'landlord1',
    createdAt: new Date('2024-01-01'),
    featured: true,
  },
  // Add more properties here...
]

export const mockUsers: User[] = [
  {
    id: 'tenant1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'tenant',
    phone: '+2348012345678',
    savedProperties: ['1', '3'],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'landlord1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'landlord',
    phone: '+2348098765432',
    savedProperties: [],
    createdAt: new Date('2024-01-01'),
  },
]

export const propertyTypes = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'self_contain', label: 'Self Contain' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'short_let', label: 'Short Let' },
  { value: 'studio', label: 'Studio' },
  { value: 'bungalow', label: 'Bungalow' },
]

export const amenitiesList = [
  'WiFi',
  'Parking',
  'Swimming Pool',
  'Gym',
  '24/7 Security',
  'Water Supply',
  'Furnished',
  'AC',
  'Garden',
  'BQ',
  'Generator',
  'Daily Cleaning',
  'Cable TV',
  'Pet Friendly',
  'Laundry',
]