// app/properties/success/[bookingId]/page.tsx - UPDATED
"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Calendar, MapPin, Download, Home, Receipt } from "lucide-react";
import Link from "next/link";
import { Booking } from "@/types";
import { mockProperties } from "@/data/mockData";

export default function SuccessPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [propertyTitle, setPropertyTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch booking from localStorage
    const bookings = JSON.parse(localStorage.getItem('enierent-bookings') || '[]');
    const foundBooking = bookings.find((b: any) => b.id === bookingId);
    
    if (foundBooking) {
      // Convert localStorage data to match Booking type
      const bookingData: Booking = {
        id: foundBooking.id,
        propertyId: foundBooking.propertyId,
        propertyTitle: foundBooking.propertyTitle || "",
        userId: foundBooking.userId || "user_1",
        status: foundBooking.status || 'confirmed',
        startDate: new Date(foundBooking.startDate || Date.now() + 7 * 86400000),
        endDate: new Date(foundBooking.endDate || Date.now() + 30 * 86400000),
        totalAmount: foundBooking.totalAmount || foundBooking.amount || 0,
        securityDeposit: foundBooking.securityDeposit || 0,
        paymentStatus: foundBooking.paymentStatus || 'paid',
        paymentMethodId: foundBooking.paymentMethodId,
        createdAt: new Date(foundBooking.createdAt || foundBooking.date || Date.now()),
        updatedAt: new Date(foundBooking.updatedAt || foundBooking.date || Date.now()),
        specialRequests: foundBooking.specialRequests,
        // Add legacy support
        amount: foundBooking.amount,
        date: foundBooking.date,
        monthlyRent: foundBooking.monthlyRent,
        bookingDuration: foundBooking.bookingDuration,
      };
      
      setBooking(bookingData);
      
      // Try to get property title from mock data if not in booking
      if (!foundBooking.propertyTitle && foundBooking.propertyId) {
        const property = mockProperties.find(p => p.id === foundBooking.propertyId);
        if (property) {
          setPropertyTitle(property.title);
        }
      } else {
        setPropertyTitle(foundBooking.propertyTitle || "");
      }
    }
    
    setLoading(false);
  }, [bookingId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!booking) {
    notFound();
  }

  // Use booking.propertyTitle or fallback to the propertyTitle state
  const displayPropertyTitle = booking.propertyTitle || propertyTitle || "Unknown Property";
  
  // Use the correct amount (totalAmount for new format, amount for legacy)
  const displayAmount = booking.totalAmount || booking.amount || 0;
  
  // Calculate monthly payment if we have monthlyRent
  const monthlyPayment = booking.monthlyRent || Math.round(displayAmount / (booking.bookingDuration || 12) * 100) / 100;

  const downloadReceipt = () => {
    const receiptContent = `
      EnieRent - Booking Confirmation
      ================================
      
      Booking ID: ${booking.id}
      Property: ${displayPropertyTitle}
      Property ID: ${booking.propertyId}
      
      Payment Details:
      - Total Amount: ₦${displayAmount.toLocaleString()}
      ${booking.securityDeposit ? `- Security Deposit: ₦${booking.securityDeposit.toLocaleString()}` : ''}
      ${monthlyPayment ? `- Monthly Payment: ₦${monthlyPayment.toLocaleString()}` : ''}
      
      Booking Period:
      - Start Date: ${booking.startDate.toLocaleDateString()}
      - End Date: ${booking.endDate.toLocaleDateString()}
      ${booking.bookingDuration ? `- Duration: ${booking.bookingDuration} months` : ''}
      
      Payment Status: ${booking.paymentStatus.toUpperCase()}
      Booking Status: ${booking.status.toUpperCase()}
      Date: ${booking.createdAt.toLocaleDateString()}
      
      Thank you for choosing EnieRent!
      
      Need help? Contact support@enierent.com
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enierent-booking-${booking.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your stay at {displayPropertyTitle} has been successfully booked.
          </p>
        </div>

        <Card className="p-6 mb-6 shadow-lg">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{displayPropertyTitle}</h3>
                <p className="text-muted-foreground text-sm">
                  Booking ID: <span className="font-mono">{booking.id}</span>
                </p>
                <p className="text-muted-foreground text-sm">
                  Property ID: <span className="font-mono">{booking.propertyId}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">₦{displayAmount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Amount</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Booking Date</p>
                <p className="font-medium">
                  {booking.createdAt.toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800'
                    : booking.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : booking.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>

            {booking.securityDeposit > 0 && (
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Security Deposit</p>
                  <p className="font-semibold">₦{booking.securityDeposit.toLocaleString()}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Refundable at the end of your stay
                </p>
              </div>
            )}

            {monthlyPayment > 0 && (
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium">Monthly Payment</p>
                  <p className="font-semibold">₦{monthlyPayment.toLocaleString()}</p>
                </div>
                {booking.bookingDuration && (
                  <p className="text-xs text-muted-foreground">
                    For {booking.bookingDuration} months
                  </p>
                )}
              </div>
            )}

            <div className="pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="h-4 w-4" />
                <span>Booking Period</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Check-in</p>
                  <p className="text-muted-foreground">
                    {booking.startDate.toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Check-out</p>
                  <p className="text-muted-foreground">
                    {booking.endDate.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={downloadReceipt}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
          <Button asChild className="w-full">
            <Link href="/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Go to Dashboard
            </Link>
          </Button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
          <h3 className="font-semibold mb-3">What happens next?</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <span>You'll receive a confirmation email within 24 hours</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <span>The landlord will contact you for check-in details</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <span>Access virtual tour and property guide in your dashboard</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
              <span>Contact support if you have any questions</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <Button variant="ghost" asChild>
            <Link href="/properties">
              Browse More Properties
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}