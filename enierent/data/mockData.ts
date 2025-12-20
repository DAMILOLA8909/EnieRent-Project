// data/mockData.ts - Updated with Week 4 features
import { Property, User, Booking } from '@/types'

// Virtual tour images (using Pannellum sample panoramas)
const VIRTUAL_TOUR_IMAGES = [
  'https://pannellum.org/images/alma.jpg',
  'https://pannellum.org/images/cerro-toco-0.jpg',
  'https://pannellum.org/images/grand-canyon.jpg'
];

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
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop',
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
    
    // WEEK 4: Virtual tour and booking terms
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: [
        {
          id: 'living-room',
          pitch: 10,
          yaw: 180,
          type: 'info',
          text: 'Living Room - Spacious seating area with modern furniture'
        },
        {
          id: 'kitchen',
          pitch: -5,
          yaw: 90,
          type: 'info',
          text: 'Modern Kitchen - Fully equipped with stainless steel appliances'
        },
        {
          id: 'balcony',
          pitch: 20,
          yaw: 270,
          type: 'info',
          text: 'Balcony - Beautiful city views'
        }
      ]
    },
    
    bookingTerms: {
      securityDeposit: 1500000, // 2 months rent
      minimumStay: 12,
      utilitiesIncluded: false
    }
  },
  {
    id: '6',
    title: 'Luxury Penthouse in Banana Island',
    description: 'Ultra-modern penthouse with panoramic views, private pool, and smart home automation.',
    price: 15000000,
    location: {
      address: 'Banana Island',
      city: 'Ikoyi',
      state: 'Lagos',
      coordinates: [6.4455, 3.4300],
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop',
    ],
    type: 'apartment',
    bedrooms: 5,
    bathrooms: 6,
    amenities: ['Swimming Pool', 'Gym', 'Smart Home', 'Concierge', '24/7 Security', 'Private Garden', 'Cinema', 'Wine Cellar'],
    size: 4500,
    isVerified: true,
    rating: 4.9,
    reviews: [],
    availability: 'available',
    ownerId: 'landlord3',
    createdAt: new Date('2024-01-20'),
    featured: true,
    
    // WEEK 4: Virtual tour and booking terms
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: [
        {
          id: 'penthouse-view',
          pitch: 15,
          yaw: 220,
          type: 'info',
          text: 'Penthouse View - 360° panoramic view of Banana Island'
        },
        {
          id: 'private-pool',
          pitch: -10,
          yaw: 150,
          type: 'info',
          text: 'Private Infinity Pool - Overlooking the lagoon'
        },
        {
          id: 'home-theater',
          pitch: 5,
          yaw: 320,
          type: 'info',
          text: 'Home Theater - State-of-the-art cinema room'
        }
      ]
    },
    
    bookingTerms: {
      securityDeposit: 30000000, // 2 months rent
      minimumStay: 24,
      utilitiesIncluded: true
    }
  },
  {
    id: '7',
    title: 'Cozy Self-Contain in GRA, Port Harcourt',
    description: 'Fully furnished self-contain with modern kitchenette and en-suite bathroom. Perfect for single professionals.',
    price: 350000,
    location: {
      address: '45 GRA Phase 2',
      city: 'Port Harcourt',
      state: 'Rivers',
      coordinates: [4.8156, 7.0498],
    },
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?w=800&auto=format&fit=crop',
    ],
    type: 'self_contain',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Parking', 'AC', 'Furnished', 'Generator', 'Water Supply'],
    size: 500,
    isVerified: true,
    rating: 4.5,
    reviews: [
      {
        id: 'r2',
        userId: 'tenant1',
        userName: 'John Doe',
        rating: 4,
        comment: 'Great value for money. Landlord is very responsive.',
        date: new Date('2024-02-10'),
      },
    ],
    availability: 'available',
    ownerId: 'landlord2',
    createdAt: new Date('2024-01-25'),
    featured: false,
    
    // WEEK 4: Virtual tour and booking terms
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: [
        {
          id: 'studio-space',
          pitch: 8,
          yaw: 190,
          type: 'info',
          text: 'Studio Space - Open concept living area'
        },
        {
          id: 'kitchenette',
          pitch: -8,
          yaw: 100,
          type: 'info',
          text: 'Kitchenette - Fully equipped with modern appliances'
        }
      ]
    },
    
    bookingTerms: {
      securityDeposit: 700000, // 2 months rent
      minimumStay: 6,
      utilitiesIncluded: true
    }
  },
  {
    id: '8',
    title: 'Spacious Duplex in Maitama, Abuja',
    description: 'Luxurious 4-bedroom duplex with BQ, large compound and modern finishes. Located in a quiet neighborhood.',
    price: 4500000,
    location: {
      address: '12 Maitama Street',
      city: 'Abuja',
      state: 'FCT',
      coordinates: [9.0765, 7.3986],
    },
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    ],
    type: 'duplex',
    bedrooms: 4,
    bathrooms: 5,
    amenities: ['Parking', '24/7 Security', 'BQ', 'Garden', 'Generator', 'Water Supply', 'Gym'],
    size: 2800,
    isVerified: true,
    rating: 4.7,
    reviews: [],
    availability: 'available',
    ownerId: 'landlord4',
    createdAt: new Date('2024-02-01'),
    featured: true,
    
    // WEEK 4: Virtual tour and booking terms
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: [
        {
          id: 'living-area',
          pitch: 12,
          yaw: 180,
          type: 'info',
          text: 'Living Area - High ceilings and elegant design'
        },
        {
          id: 'master-suite',
          pitch: -5,
          yaw: 90,
          type: 'info',
          text: 'Master Suite - Walk-in closet and en-suite bathroom'
        },
        {
          id: 'garden',
          pitch: 25,
          yaw: 270,
          type: 'info',
          text: 'Garden - Landscaped outdoor space'
        }
      ]
    },
    
    bookingTerms: {
      securityDeposit: 9000000, // 2 months rent
      minimumStay: 12,
      utilitiesIncluded: false
    }
  },
  {
    id: '9',
    title: 'Beachfront Short Let in Lekki',
    description: 'Beautiful 2-bedroom apartment with direct beach access. Perfect for vacations and weekend getaways.',
    price: 85000,
    location: {
      address: 'Lekki Phase 1',
      city: 'Lekki',
      state: 'Lagos',
      coordinates: [6.4292, 3.4602],
    },
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
    ],
    type: 'short_let',
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['WiFi', 'Parking', 'AC', 'Furnished', 'Beach Access', 'Daily Cleaning', 'Cable TV'],
    size: 900,
    isVerified: false,
    rating: 4.3,
    reviews: [
      {
        id: 'r3',
        userId: 'tenant2',
        userName: 'Amina Bello',
        rating: 5,
        comment: 'Amazing view and great service! Will definitely return.',
        date: new Date('2024-01-28'),
      },
    ],
    availability: 'available',
    ownerId: 'landlord1',
    createdAt: new Date('2024-01-18'),
    featured: false,
    
    // WEEK 4: Virtual tour and booking terms
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: [
        {
          id: 'beach-view',
          pitch: 15,
          yaw: 200,
          type: 'info',
          text: 'Beach View - Direct access to private beach'
        },
        {
          id: 'balcony',
          pitch: 10,
          yaw: 120,
          type: 'info',
          text: 'Oceanfront Balcony - Perfect for sunset views'
        }
      ]
    },
    
    bookingTerms: {
      securityDeposit: 170000, // 2 months rent
      minimumStay: 1, // Short let - minimum 1 month
      utilitiesIncluded: true
    }
  },
  {
    id: '10',
    title: 'Modern Studio Apartment in Yaba',
    description: 'Newly renovated studio apartment with smart home features. Close to universities and tech hubs.',
    price: 420000,
    location: {
      address: '15 Herbert Macaulay Way',
      city: 'Yaba',
      state: 'Lagos',
      coordinates: [6.5095, 3.3711],
    },
    images: [
      'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?w=800&auto=format&fit=crop',
    ],
    type: 'studio',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Parking', 'AC', 'Furnished', 'Smart Home', 'Gym', '24/7 Security'],
    size: 450,
    isVerified: true,
    rating: 4.6,
    reviews: [],
    availability: 'rented',
    ownerId: 'landlord3',
    createdAt: new Date('2024-01-22'),
    featured: false,
    
    // WEEK 4: Virtual tour and booking terms (but rented)
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: []
    },
    
    bookingTerms: {
      securityDeposit: 840000,
      minimumStay: 12,
      utilitiesIncluded: true
    }
  },
  {
    id: '11',
    title: 'Family Bungalow in Bodija, Ibadan',
    description: '3-bedroom bungalow with large compound, perfect for families. Quiet neighborhood with good schools nearby.',
    price: 1800000,
    location: {
      address: '8 Bodija Estate',
      city: 'Ibadan',
      state: 'Oyo',
      coordinates: [7.3775, 3.9470],
    },
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
    ],
    type: 'bungalow',
    bedrooms: 3,
    bathrooms: 3,
    amenities: ['Parking', 'Garden', 'Generator', 'Water Supply', '24/7 Security', 'BQ'],
    size: 1500,
    isVerified: true,
    rating: 4.4,
    reviews: [
      {
        id: 'r4',
        userId: 'tenant5',
        userName: 'Michael Adeyemi',
        rating: 4,
        comment: 'Great family home. The compound is spacious for the kids.',
        date: new Date('2024-02-05'),
      },
    ],
    availability: 'available',
    ownerId: 'landlord5',
    createdAt: new Date('2024-01-30'),
    featured: false,
    
    // WEEK 4: Virtual tour and booking terms
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: [
        {
          id: 'family-room',
          pitch: 10,
          yaw: 180,
          type: 'info',
          text: 'Family Room - Spacious living area'
        },
        {
          id: 'compound',
          pitch: 20,
          yaw: 90,
          type: 'info',
          text: 'Compound - Large outdoor space for children'
        }
      ]
    },
    
    bookingTerms: {
      securityDeposit: 3600000,
      minimumStay: 12,
      utilitiesIncluded: false
    }
  },
  {
    id: '12',
    title: 'Luxury Apartment in VI, Lagos',
    description: 'Premium 3-bedroom apartment in Victoria Island with concierge service and state-of-the-art amenities.',
    price: 6500000,
    location: {
      address: '24A Ahmadu Bello Way',
      city: 'Victoria Island',
      state: 'Lagos',
      coordinates: [6.4281, 3.4202],
    },
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
    ],
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 4,
    amenities: ['Swimming Pool', 'Gym', 'Concierge', '24/7 Security', 'Smart Home', 'Cinema', 'Wine Cellar', 'Parking'],
    size: 3200,
    isVerified: true,
    rating: 4.9,
    reviews: [],
    availability: 'available',
    ownerId: 'landlord3',
    createdAt: new Date('2024-02-03'),
    featured: true,
    
    // WEEK 4: Virtual tour and booking terms
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: [
        {
          id: 'city-view',
          pitch: 15,
          yaw: 220,
          type: 'info',
          text: 'City View - Panoramic views of Victoria Island'
        },
        {
          id: 'concierge',
          pitch: -5,
          yaw: 150,
          type: 'info',
          text: 'Concierge Lounge - 24/7 personalized service'
        }
      ]
    },
    
    bookingTerms: {
      securityDeposit: 13000000,
      minimumStay: 24,
      utilitiesIncluded: true
    }
  },
  {
    id: '13',
    title: 'Affordable Self-Contain in Surulere',
    description: 'Clean and affordable self-contain unit with basic amenities. Perfect for students and young professionals.',
    price: 280000,
    location: {
      address: '72 Bode Thomas Street',
      city: 'Surulere',
      state: 'Lagos',
      coordinates: [6.5010, 3.3580],
    },
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop',
    ],
    type: 'self_contain',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Parking', 'Water Supply', 'Generator'],
    size: 400,
    isVerified: false,
    rating: 3.9,
    reviews: [
      {
        id: 'r5',
        userId: 'tenant3',
        userName: 'Chike Obi',
        rating: 3,
        comment: 'Basic but clean. Good for the price.',
        date: new Date('2024-02-08'),
      },
    ],
    availability: 'available',
    ownerId: 'landlord2',
    createdAt: new Date('2024-01-28'),
    featured: false,
    
    // WEEK 4: Virtual tour (not enabled for basic properties)
    virtualTour: {
      enabled: false,
      images: [],
      hotspots: []
    },
    
    bookingTerms: {
      securityDeposit: 560000,
      minimumStay: 6,
      utilitiesIncluded: false
    }
  },
  {
    id: '14',
    title: 'Executive Duplex in Asokoro, Abuja',
    description: 'Premium 5-bedroom executive duplex with staff quarters and full smart home automation.',
    price: 8500000,
    location: {
      address: 'Asokoro District',
      city: 'Abuja',
      state: 'FCT',
      coordinates: [9.0495, 7.4975],
    },
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop',
    ],
    type: 'duplex',
    bedrooms: 5,
    bathrooms: 6,
    amenities: ['Swimming Pool', 'Gym', 'Smart Home', '24/7 Security', 'BQ', 'Garden', 'Cinema', 'Wine Cellar', 'Generator'],
    size: 4200,
    isVerified: true,
    rating: 4.8,
    reviews: [],
    availability: 'available',
    ownerId: 'landlord4',
    createdAt: new Date('2024-02-10'),
    featured: true,
    
    // WEEK 4: Virtual tour and booking terms
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: [
        {
          id: 'executive-office',
          pitch: 10,
          yaw: 180,
          type: 'info',
          text: 'Executive Office - Wood-paneled study'
        },
        {
          id: 'wine-cellar',
          pitch: -15,
          yaw: 90,
          type: 'info',
          text: 'Wine Cellar - Temperature-controlled storage'
        }
      ]
    },
    
    bookingTerms: {
      securityDeposit: 17000000,
      minimumStay: 24,
      utilitiesIncluded: true
    }
  },
  {
    id: '15',
    title: 'Short Let Serviced Apartment in Ikoyi',
    description: 'Fully serviced 1-bedroom apartment with daily housekeeping. Ideal for business travelers.',
    price: 95000,
    location: {
      address: '3A Bourdillon Road',
      city: 'Ikoyi',
      state: 'Lagos',
      coordinates: [6.4524, 3.4358],
    },
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&auto=format&fit=crop',
    ],
    type: 'short_let',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Parking', 'AC', 'Furnished', 'Daily Cleaning', 'Concierge', 'Laundry', 'Cable TV'],
    size: 600,
    isVerified: true,
    rating: 4.7,
    reviews: [
      {
        id: 'r6',
        userId: 'tenant4',
        userName: 'Fatima Yusuf',
        rating: 5,
        comment: 'Excellent service and very comfortable stay.',
        date: new Date('2024-02-12'),
      },
    ],
    availability: 'available',
    ownerId: 'landlord1',
    createdAt: new Date('2024-02-05'),
    featured: false,
    
    // WEEK 4: Virtual tour and booking terms
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: [
        {
          id: 'serviced-living',
          pitch: 8,
          yaw: 190,
          type: 'info',
          text: 'Serviced Living - Daily housekeeping included'
        }
      ]
    },
    
    bookingTerms: {
      securityDeposit: 190000,
      minimumStay: 1,
      utilitiesIncluded: true
    }
  },
  {
    id: '16',
    title: 'Modern Bungalow in GRA, Enugu',
    description: 'Newly built 3-bedroom bungalow with modern kitchen and spacious living areas.',
    price: 2200000,
    location: {
      address: '14 GRA Enugu',
      city: 'Enugu',
      state: 'Enugu',
      coordinates: [6.4584, 7.5464],
    },
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
      'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
    ],
    type: 'bungalow',
    bedrooms: 3,
    bathrooms: 3,
    amenities: ['Parking', 'Garden', 'Generator', 'Water Supply', '24/7 Security', 'AC'],
    size: 1800,
    isVerified: true,
    rating: 4.5,
    reviews: [],
    availability: 'rented',
    ownerId: 'landlord5',
    createdAt: new Date('2024-02-08'),
    featured: false,
    
    // WEEK 4: Virtual tour and booking terms (but rented)
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: []
    },
    
    bookingTerms: {
      securityDeposit: 4400000,
      minimumStay: 12,
      utilitiesIncluded: false
    }
  },
  {
    id: '17',
    title: 'Studio Loft in Maryland, Lagos',
    description: 'Industrial-style studio loft with high ceilings and modern industrial finishes.',
    price: 380000,
    location: {
      address: 'Maryland Mall Road',
      city: 'Maryland',
      state: 'Lagos',
      coordinates: [6.5784, 3.3742],
    },
    images: [
      'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558036117-15e82a2c9a9a?w=800&auto=format&fit=crop',
    ],
    type: 'studio',
    bedrooms: 1,
    bathrooms: 1,
    amenities: ['WiFi', 'Parking', 'AC', 'Furnished', '24/7 Security', 'Gym'],
    size: 480,
    isVerified: true,
    rating: 4.4,
    reviews: [],
    availability: 'available',
    ownerId: 'landlord3',
    createdAt: new Date('2024-02-15'),
    featured: false,
    
    // WEEK 4: Virtual tour and booking terms
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: [
        {
          id: 'loft-space',
          pitch: 15,
          yaw: 180,
          type: 'info',
          text: 'Loft Space - High ceilings, industrial design'
        }
      ]
    },
    
    bookingTerms: {
      securityDeposit: 760000,
      minimumStay: 6,
      utilitiesIncluded: true
    }
  },
  {
    id: '18',
    title: 'Waterfront Apartment in Oniru, Lagos',
    description: 'Stunning 2-bedroom apartment with lagoon views and private balcony.',
    price: 5200000,
    location: {
      address: 'Oniru Beach Road',
      city: 'Oniru',
      state: 'Lagos',
      coordinates: [6.4281, 3.4520],
    },
    images: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
    ],
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    amenities: ['Swimming Pool', 'Gym', '24/7 Security', 'Water View', 'Parking', 'AC', 'Furnished'],
    size: 1500,
    isVerified: true,
    rating: 4.6,
    reviews: [
      {
        id: 'r7',
        userId: 'tenant2',
        userName: 'Amina Bello',
        rating: 5,
        comment: 'Breathtaking views! Absolutely love it here.',
        date: new Date('2024-02-18'),
      },
    ],
    availability: 'available',
    ownerId: 'landlord1',
    createdAt: new Date('2024-02-12'),
    featured: true,
    
    // WEEK 4: Virtual tour and booking terms
    virtualTour: {
      enabled: true,
      images: VIRTUAL_TOUR_IMAGES,
      hotspots: [
        {
          id: 'lagoon-view',
          pitch: 20,
          yaw: 200,
          type: 'info',
          text: 'Lagoon View - Direct waterfront access'
        },
        {
          id: 'waterfront-balcony',
          pitch: 10,
          yaw: 150,
          type: 'info',
          text: 'Waterfront Balcony - Private outdoor space'
        }
      ]
    },
    
    bookingTerms: {
      securityDeposit: 10400000,
      minimumStay: 12,
      utilitiesIncluded: true
    }
  }
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
    
    // WEEK 4: Payment methods
    paymentMethods: [
      {
        id: 'pm_1',
        type: 'card',
        lastFour: '4242',
        expiryDate: '12/25',
        isDefault: true
      }
    ]
  },
  {
    id: 'landlord1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'landlord',
    phone: '+2348098765432',
    savedProperties: [],
    createdAt: new Date('2024-01-01'),
    
    // WEEK 4: Payment methods
    paymentMethods: [
      {
        id: 'pm_landlord1',
        type: 'bank_transfer',
        isDefault: true
      }
    ]
  },
  {
    id: 'tenant2',
    name: 'Amina Bello',
    email: 'amina@example.com',
    role: 'tenant',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina',
    phone: '+2348023456789',
    savedProperties: ['2', '4'],
    createdAt: new Date('2024-01-15'),
    
    // WEEK 4: Payment methods
    paymentMethods: [
      {
        id: 'pm_2',
        type: 'card',
        lastFour: '5555',
        expiryDate: '06/26',
        isDefault: true
      }
    ]
  },
  {
    id: 'landlord2',
    name: 'David Okonkwo',
    email: 'david@example.com',
    role: 'landlord',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    phone: '+2348034567890',
    savedProperties: [],
    createdAt: new Date('2024-01-05'),
    
    paymentMethods: []
  },
  {
    id: 'landlord3',
    name: 'Chioma Nwosu',
    email: 'chioma@example.com',
    role: 'landlord',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chioma',
    phone: '+2348045678901',
    savedProperties: [],
    createdAt: new Date('2024-01-10'),
    
    paymentMethods: []
  },
  {
    id: 'tenant3',
    name: 'Chike Obi',
    email: 'chike@example.com',
    role: 'tenant',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chike',
    phone: '+2348056789012',
    savedProperties: ['7', '10'],
    createdAt: new Date('2024-01-20'),
    
    paymentMethods: []
  },
  {
    id: 'landlord4',
    name: 'Mohammed Bello',
    email: 'mohammed@example.com',
    role: 'landlord',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed',
    phone: '+2348067890123',
    savedProperties: [],
    createdAt: new Date('2024-01-25'),
    
    paymentMethods: []
  },
  {
    id: 'tenant4',
    name: 'Fatima Yusuf',
    email: 'fatima@example.com',
    role: 'tenant',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
    phone: '+2348078901234',
    savedProperties: ['12', '15', '18'],
    createdAt: new Date('2024-02-01'),
    
    paymentMethods: []
  },
  {
    id: 'landlord5',
    name: 'James Okoro',
    email: 'james@example.com',
    role: 'landlord',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    phone: '+2348089012345',
    savedProperties: [],
    createdAt: new Date('2024-01-28'),
    
    paymentMethods: []
  },
  {
    id: 'tenant5',
    name: 'Michael Adeyemi',
    email: 'michael@example.com',
    role: 'tenant',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    phone: '+2348090123456',
    savedProperties: ['8', '11'],
    createdAt: new Date('2024-02-05'),
    
    paymentMethods: []
  }
]

// WEEK 4: Mock bookings data
export const mockBookings: Booking[] = [
  {
    id: 'booking_1',
    propertyId: '1',
    userId: 'tenant1',
    status: 'confirmed',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2025-02-28'),
    totalAmount: 2250000, // First payment: 750,000 + 1,500,000 security deposit
    securityDeposit: 1500000,
    paymentStatus: 'paid',
    paymentMethodId: 'pm_1',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
    specialRequests: 'Early check-in at 1 PM requested'
  },
  {
    id: 'booking_2',
    propertyId: '9',
    userId: 'tenant2',
    status: 'confirmed',
    startDate: new Date('2024-02-25'),
    endDate: new Date('2024-03-24'),
    totalAmount: 255000, // First payment: 85,000 + 170,000 security deposit
    securityDeposit: 170000,
    paymentStatus: 'paid',
    paymentMethodId: 'pm_2',
    createdAt: new Date('2024-02-18'),
    updatedAt: new Date('2024-02-18'),
    specialRequests: 'Need extra towels and beach towels'
  },
  {
    id: 'booking_3',
    propertyId: '10',
    userId: 'tenant3',
    status: 'completed',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2024-11-30'),
    totalAmount: 1260000, // First payment: 420,000 + 840,000 security deposit
    securityDeposit: 840000,
    paymentStatus: 'paid',
    createdAt: new Date('2023-11-25'),
    updatedAt: new Date('2024-02-01')
  }
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