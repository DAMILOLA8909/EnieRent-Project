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
    coordinates: [number, number]; // [latitude, longitude]
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
  
  // WEEK 4: Virtual tour support
  virtualTour?: {
    enabled: boolean;
    images: string[];
    hotspots?: VirtualTourHotspot[];
  };
  
  // WEEK 4: Payment/booking info
  bookingTerms?: {
    securityDeposit: number;
    minimumStay: number; // in months
    utilitiesIncluded: boolean;
  };
}

export interface VirtualTourHotspot {
  id: string;
  pitch: number;
  yaw: number;
  type: 'info' | 'link' | 'scene';
  text?: string;
  targetSceneId?: string;
  url?: string;
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
  
  // WEEK 4: Payment methods
  paymentMethods?: PaymentMethod[];
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank_transfer';
  lastFour?: string;
  expiryDate?: string;
  isDefault: boolean;
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

// WEEK 4: Booking & Payment Types
export interface Booking {
  id: string;
  propertyId: string;
  propertyTitle?: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  securityDeposit: number;
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  paymentMethodId?: string;
  createdAt: Date;
  updatedAt: Date;
  cancellationReason?: string;
  specialRequests?: string;
  // Added for the success page
  amount?: number; // Legacy support
  date?: string; // Legacy support
  monthlyRent?: number;
  bookingDuration?: number;
}

export interface PaymentIntent {
  id: string;
  bookingId: string;
  amount: number;
  currency: 'USD' | 'NGN' | 'EUR';
  status: 'requires_payment_method' | 'requires_confirmation' | 'processing' | 'requires_action' | 'succeeded' | 'canceled' | 'failed';
  clientSecret?: string;
  paymentMethod?: string;
  errorMessage?: string;
  createdAt: Date;
}

export interface Receipt {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  paymentDate: Date;
  items: ReceiptItem[];
  taxAmount: number;
  totalAmount: number;
  pdfUrl?: string;
}

export interface ReceiptItem {
  description: string;
  amount: number;
  quantity: number;
}

// WEEK 4: Toast/Notification Types
export interface ToastConfig {
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// WEEK 4: Animation Config
export interface AnimationConfig {
  type: 'fade' | 'slide' | 'scale' | 'bounce';
  duration: number;
  delay?: number;
  easing?: string;
}

// WEEK 4: Virtual Tour Config
export interface VirtualTourConfig {
  autoRotate: boolean;
  autoRotateSpeed: number;
  showControls: boolean;
  showZoomCtrl: boolean;
  showFullscreenCtrl: boolean;
  hotSpotDebug: boolean;
}