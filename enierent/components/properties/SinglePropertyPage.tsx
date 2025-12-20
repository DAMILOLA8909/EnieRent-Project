// components/properties/SinglePropertyPage.tsx - Updated with working buttons
"use client";

import { useState } from "react";
import { Property } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bed, 
  Bath, 
  Square, 
  MapPin, 
  Star, 
  Heart, 
  Share2, 
  Calendar,
  Wifi,
  Car,
  Snowflake,
  Dumbbell,
  Coffee,
  Dog,
  Shield,
  CheckCircle,
  MessageSquare,
  User,
  Mail,
  Phone,
  Clock,
  X
} from "lucide-react";
import Image from "next/image";
import { PropertyImageGallery } from "./PropertyImageGallery";
import PropertyMap from "@/components/map/PropertyMap";
import { SimilarProperties } from "./SimilarProperties";
import { PaymentModal } from "@/components/payment/PaymentModal";
import { VirtualTourViewer } from "@/components/virtual-tour/VirtualTourViewer";
import { PageTransition } from "@/components/animations/page-transition";
import { HoverCard } from "@/components/animations/HoverCard";
import { useEnhancedToast } from "@/src/hooks/use-enhanced-toast";
import { Loader2 } from "lucide-react";

interface SinglePropertyPageProps {
  property: Property;
}

export default function SinglePropertyPage({ property }: SinglePropertyPageProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "10:00",
    message: "",
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "I'm interested in renting",
    message: "",
  });
  const { showToast } = useEnhancedToast();

  // Format location for display
  const formattedLocation = `${property.location.address}, ${property.location.city}, ${property.location.state}`;
  
  // Calculate total first payment
  const totalFirstPayment = property.price + (property.bookingTerms?.securityDeposit || property.price * 2);

  const amenitiesIcons: Record<string, React.ReactNode> = {
    'Swimming Pool': <div className="p-2 bg-blue-100 rounded-lg"><div className="h-5 w-5 bg-blue-500 rounded-sm" /></div>,
    'Gym': <Dumbbell className="h-5 w-5" />,
    '24/7 Security': <Shield className="h-5 w-5" />,
    'Parking': <Car className="h-5 w-5" />,
    'Wifi': <Wifi className="h-5 w-5" />,
    'Air Conditioning': <Snowflake className="h-5 w-5" />,
    'Pet Friendly': <Dog className="h-5 w-5" />,
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: property.title,
          text: `Check out this amazing property: ${property.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast({
        title: "Link copied!",
        description: "Property link copied to clipboard",
        type: "success",
      });
    }
  };

  const handleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    
    // Save to localStorage
    const favorites = JSON.parse(localStorage.getItem('enierent-favorites') || '[]');
    if (newFavoriteState) {
      if (!favorites.includes(property.id)) {
        favorites.push(property.id);
      }
    } else {
      const index = favorites.indexOf(property.id);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    }
    localStorage.setItem('enierent-favorites', JSON.stringify(favorites));
    
    showToast({
      title: newFavoriteState ? "Added to favorites!" : "Removed from favorites",
      type: newFavoriteState ? "success" : "info",
    });
  };

  const handleScheduleVisit = () => {
    setIsScheduleModalOpen(true);
  };

  const handleContactLandlord = () => {
    setIsContactModalOpen(true);
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage
    const visits = JSON.parse(localStorage.getItem('enierent-scheduled-visits') || '[]');
    visits.push({
      id: `visit_${Date.now()}`,
      propertyId: property.id,
      propertyTitle: property.title,
      ...scheduleForm,
      date: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('enierent-scheduled-visits', JSON.stringify(visits));

    setIsLoading(false);
    setIsScheduleModalOpen(false);
    
    showToast({
      title: "Visit Scheduled!",
      description: `The landlord will contact you at ${scheduleForm.phone} to confirm.`,
      type: "success",
    });
    
    // Reset form
    setScheduleForm({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "10:00",
      message: "",
    });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage
    const messages = JSON.parse(localStorage.getItem('enierent-landlord-messages') || '[]');
    messages.push({
      id: `msg_${Date.now()}`,
      propertyId: property.id,
      propertyTitle: property.title,
      ...contactForm,
      date: new Date().toISOString(),
      status: 'sent'
    });
    localStorage.setItem('enierent-landlord-messages', JSON.stringify(messages));

    setIsLoading(false);
    setIsContactModalOpen(false);
    
    showToast({
      title: "Message Sent!",
      description: "The landlord will contact you soon.",
      type: "success",
    });
    
    // Reset form
    setContactForm({
      name: "",
      email: "",
      phone: "",
      subject: "I'm interested in renting",
      message: "",
    });
  };

  const handleScheduleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setScheduleForm(prev => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  // Generate next available dates (next 7 days, excluding weekends)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends (0 = Sunday, 6 = Saturday)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  return (
    <>
      <PageTransition>
        <div className="min-h-screen bg-background">
          {/* Hero Section with Gallery */}
          <div className="relative">
            <PropertyImageGallery images={property.images} />
            
            {/* Floating Action Buttons */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <HoverCard>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleFavorite}
                  className="bg-white/90 backdrop-blur-sm shadow-lg"
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </HoverCard>
              
              <HoverCard>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleShare}
                  className="bg-white/90 backdrop-blur-sm shadow-lg"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </HoverCard>
              
              {/* Virtual Tour Button - Only show if available */}
              {property.virtualTour?.enabled && (
                <HoverCard>
                  <VirtualTourViewer
                    images={property.virtualTour.images}
                    propertyTitle={property.title}
                    hotspots={property.virtualTour.hotspots}
                    trigger={
                      <Button
                        variant="secondary"
                        className="bg-white/90 backdrop-blur-sm shadow-lg gap-2"
                      >
                        <div className="relative">
                          <div className="h-4 w-4 rounded-full border-2 border-current" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs">360°</span>
                          </div>
                        </div>
                        Virtual Tour
                      </Button>
                    }
                  />
                </HoverCard>
              )}
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Property Details */}
              <div className="lg:col-span-2 space-y-8">
                {/* Property Header */}
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h1 className="text-3xl font-bold tracking-tight">
                          {property.title}
                        </h1>
                        {property.isVerified && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4" />
                        <span>{formattedLocation}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{property.rating}</span>
                          <span className="text-muted-foreground">
                            ({property.reviews.length} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary">
                        ${property.price.toLocaleString()}
                        <span className="text-lg font-normal text-muted-foreground">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        ${Math.round(property.price / 30).toLocaleString()} per night
                      </p>
                    </div>
                  </div>

                  {/* Property Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary" className="capitalize">
                      {property.type.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline">{property.availability}</Badge>
                    {property.featured && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        Featured
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-green-500 text-green-600">
                      Available Now
                    </Badge>
                  </div>
                </div>

                {/* Key Features Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Bed className="h-5 w-5 text-muted-foreground" />
                      <span className="text-lg font-semibold">{property.bedrooms}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <span className="text-lg font-semibold">{property.bathrooms}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Square className="h-5 w-5 text-muted-foreground" />
                      <span className="text-lg font-semibold">{property.size.toLocaleString()}</span>
                      <span className="text-sm">sq ft</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Area</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span className="text-lg font-semibold">
                        {property.bookingTerms?.minimumStay || 12}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Months Min</p>
                  </div>
                </div>

                {/* Tabs for Description, Amenities, etc. */}
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews ({property.reviews.length})</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="space-y-4 pt-6">
                    <p className="text-foreground leading-relaxed whitespace-pre-line">
                      {property.description}
                    </p>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-semibold text-blue-900 mb-2">Property Features:</h4>
                      <ul className="grid grid-cols-2 gap-2 text-sm text-blue-800">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {property.bedrooms} Bedrooms
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {property.bathrooms} Bathrooms
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {property.size.toLocaleString()} sq ft
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                          {property.type.replace('_', ' ')}
                        </li>
                      </ul>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="amenities" className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/50 transition-colors">
                          <div className="text-primary">
                            {amenitiesIcons[amenity] || <Coffee className="h-5 w-5" />}
                          </div>
                          <span className="text-sm font-medium">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="reviews" className="pt-6">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="text-center p-4 bg-muted/30 rounded-lg">
                          <div className="text-3xl font-bold">{property.rating}</div>
                          <div className="flex items-center justify-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(property.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'fill-muted text-muted'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {property.reviews.length} reviews
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground">
                            Based on {property.reviews.length} verified reviews from tenants
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {property.reviews.map((review) => (
                          <div key={review.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <p className="font-medium">{review.userName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {review.date.toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'fill-muted text-muted'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-foreground">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="location" className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">Address:</h4>
                        <p className="text-foreground">{formattedLocation}</p>
                      </div>
                      
                      <div className="h-96 rounded-lg overflow-hidden border">
                        <PropertyMap 
                          properties={[property]} // Pass as array
                          center={property.location.coordinates} // Center on this property
                          zoom={14} // Zoom in closer for single property
                          showFindNearMe={true}
                          className="w-full h-full"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/30 rounded-lg">
                        <div>
                          <h5 className="font-medium mb-2">Nearby Amenities</h5>
                          <ul className="text-sm space-y-1">
                            <li>🏪 Supermarket - 0.5 miles</li>
                            <li>🏥 Hospital - 1.2 miles</li>
                            <li>🏫 Schools - 0.8 miles</li>
                            <li>🚉 Public Transport - 0.3 miles</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Neighborhood</h5>
                          <p className="text-sm">
                            {property.location.city} is known for its vibrant community,
                            excellent schools, and easy access to public transportation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Virtual Tour Section - If available */}
                {property.virtualTour?.enabled && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">Virtual 360° Tour</h3>
                        <p className="text-sm text-muted-foreground">
                          Explore this property from every angle without leaving your home
                        </p>
                      </div>
                      <VirtualTourViewer
                        images={property.virtualTour.images}
                        hotspots={property.virtualTour.hotspots}
                        propertyTitle={property.title}
                        trigger={
                          <Button className="gap-2">
                            <div className="relative">
                              <div className="h-5 w-5 rounded-full border-2 border-current" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-xs">360°</span>
                              </div>
                            </div>
                            Start Virtual Tour
                          </Button>
                        }
                      />
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <p className="text-sm text-blue-800">
                        💡 <strong>Tip:</strong> Click and drag to look around. Use hotspots to 
                        explore different areas of the property.
                      </p>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Similar Properties */}
                <div>
                  <h3 className="text-xl font-semibold mb-6">Similar Properties</h3>
                  <SimilarProperties currentPropertyId={property.id} />
                </div>
              </div>

              {/* Right Column - Booking Card */}
              <div className="lg:col-span-1">
                <HoverCard className="sticky top-24">
                  <Card className="border-2 shadow-xl">
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {/* Price Summary */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-lg">Price Summary</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Monthly rent</span>
                              <span className="font-medium">${property.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Security deposit</span>
                              <span className="font-medium">
                                ${(property.bookingTerms?.securityDeposit || property.price * 2).toLocaleString()}
                              </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-base font-bold">
                              <span>Total first payment</span>
                              <span className="text-primary">
                                ${totalFirstPayment.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Booking Terms */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-lg">Booking Terms</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Minimum stay</span>
                              <span className="font-medium">
                                {property.bookingTerms?.minimumStay || 12} months
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Utilities</span>
                              <span className="font-medium">
                                {property.bookingTerms?.utilitiesIncluded ? 'Included' : 'Not included'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Availability</span>
                              <span className="font-medium capitalize">{property.availability}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <Button
                            className="w-full py-6 text-lg shadow-lg"
                            size="lg"
                            onClick={() => setIsPaymentModalOpen(true)}
                            disabled={property.availability !== 'available'}
                          >
                            {property.availability === 'available' ? 'Book Now' : 'Not Available'}
                          </Button>

                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleScheduleVisit}
                            disabled={property.availability !== 'available'}
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule a Visit
                          </Button>

                          <Button 
                            variant="ghost" 
                            className="w-full"
                            onClick={handleContactLandlord}
                          >
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contact Landlord
                          </Button>
                        </div>

                        {/* Verification Badge */}
                        {property.isVerified && (
                          <div className="pt-4 border-t">
                            <div className="flex items-center gap-2 text-sm text-green-600">
                              <Shield className="h-4 w-4" />
                              <span>Verified Property • Secure Booking • Landlord Verified</span>
                            </div>
                          </div>
                        )}

                        {/* Safety Info */}
                        <div className="pt-4 border-t">
                          <p className="text-xs text-muted-foreground text-center">
                            🔒 Secure payment • 📝 Digital contract • 🏠 Property inspection • 👥 24/7 support
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </HoverCard>
              </div>
            </div>
          </div>

          {/* Payment Modal */}
          <PaymentModal
            open={isPaymentModalOpen}
            onOpenChange={setIsPaymentModalOpen}
            propertyId={property.id}
            propertyTitle={property.title}
            amount={totalFirstPayment}
          />

          {/* Floating Booking Bar for Mobile */}
          <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg z-50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold">${property.price.toLocaleString()}/month</div>
                <div className={`text-sm ${property.availability === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                  {property.availability === 'available' ? 'Available now' : 'Currently rented'}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setIsPaymentModalOpen(true)}
                  disabled={property.availability !== 'available'}
                >
                  {property.availability === 'available' ? 'Book Now' : 'Booked'}
                </Button>
                <Button variant="outline" size="icon" onClick={handleFavorite}>
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>

      {/* Schedule Visit Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Schedule a Visit</h2>
                </div>
                <button
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Arrange a viewing for <span className="font-medium">{property.title}</span>
              </p>

              <form onSubmit={handleScheduleSubmit} className="space-y-4">
                {/* Calendar Date Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2">Select Date</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableDates.map((date, index) => (
                      <button
                        key={date}
                        type="button"
                        onClick={() => setScheduleForm(prev => ({ ...prev, preferredDate: date }))}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          scheduleForm.preferredDate === date
                            ? 'bg-primary text-white border-primary'
                            : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="text-xs font-medium">
                          {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-lg font-bold">
                          {new Date(date).getDate()}
                        </div>
                        <div className="text-xs">
                          {new Date(date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </button>
                    ))}
                  </div>
                  {!availableDates.includes(scheduleForm.preferredDate) && scheduleForm.preferredDate && (
                    <p className="text-sm text-red-500 mt-2">
                      Selected date is not available. Please choose from available dates.
                    </p>
                  )}
                </div>

                {/* Time Selection */}
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Preferred Time
                  </label>
                  <select
                    name="preferredTime"
                    value={scheduleForm.preferredTime}
                    onChange={handleScheduleChange}
                    className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900"
                    required
                  >
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="12:00">12:00 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>

                {/* Contact Info */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={scheduleForm.name}
                      onChange={handleScheduleChange}
                      className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={scheduleForm.email}
                        onChange={handleScheduleChange}
                        className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={scheduleForm.phone}
                        onChange={handleScheduleChange}
                        className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900"
                        placeholder="+234 801 234 5678"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-sm font-medium mb-1">Additional Notes (Optional)</label>
                  <textarea
                    name="message"
                    value={scheduleForm.message}
                    onChange={handleScheduleChange}
                    className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900"
                    placeholder="Any special requirements or questions..."
                    rows={3}
                  />
                </div>

                {/* Info Box */}
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">📋 What to expect:</h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Landlord will call within 24 hours to confirm</li>
                    <li>• Please bring a valid ID</li>
                    <li>• Arrive 5 minutes before scheduled time</li>
                    <li>• Property viewing takes about 30 minutes</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || !scheduleForm.preferredDate}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                      Scheduling...
                    </>
                  ) : (
                    "Schedule Visit"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Contact Landlord Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Contact Landlord</h2>
                </div>
                <button
                  onClick={() => setIsContactModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Send a message about <span className="font-medium">{property.title}</span>
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                {/* Contact Info */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactChange}
                        className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactChange}
                        className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900"
                        placeholder="+234 801 234 5678"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium mb-1">Subject</label>
                  <select
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900"
                    required
                  >
                    <option value="I'm interested in renting">I'm interested in renting</option>
                    <option value="Question about the property">Question about the property</option>
                    <option value="Price negotiation">Price negotiation</option>
                    <option value="Viewing arrangement">Viewing arrangement</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium mb-1">Your Message</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900"
                    placeholder={`Hello, I'm interested in ${property.title}...`}
                    rows={4}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Tip: Mention your move-in date, duration, and any specific requirements
                  </p>
                </div>

                {/* Info Box */}
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-medium text-sm mb-1">⏰ Response Time:</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    The landlord typically responds within 24 hours. You'll receive an email when they reply.
                  </p>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                      Sending...
                    </>
                  ) : (
                    "Send Message to Landlord"
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}