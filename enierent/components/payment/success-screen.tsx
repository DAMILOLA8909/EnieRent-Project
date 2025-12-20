// components/payment/success-screen.tsx
"use client";

import { CheckCircle, Calendar, MapPin, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface BookingDetails {
  id: string;
  propertyTitle: string;
  address: string;
  amount: number;
  checkIn: string;
  checkOut: string;
}

export function SuccessScreen({ bookingId }: { bookingId: string }) {
  const [booking, setBooking] = useState<BookingDetails | null>(null);

  useEffect(() => {
    // Fetch booking details from localStorage
    const bookings = JSON.parse(localStorage.getItem('enie-rent-bookings') || '[]');
    const foundBooking = bookings.find((b: any) => b.id === bookingId);
    if (foundBooking) {
      setBooking({
        id: foundBooking.id,
        propertyTitle: foundBooking.propertyTitle,
        address: "123 Main St, New York, NY",
        amount: foundBooking.amount,
        checkIn: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        checkOut: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      });
    }
  }, [bookingId]);

  const downloadReceipt = () => {
    if (!booking) return;
    
    const receiptContent = `
      EnieRent Booking Receipt
      ========================
      
      Booking ID: ${booking.id}
      Property: ${booking.propertyTitle}
      Address: ${booking.address}
      Amount Paid: $${booking.amount}
      Check-in: ${new Date(booking.checkIn).toLocaleDateString()}
      Check-out: ${new Date(booking.checkOut).toLocaleDateString()}
      
      Thank you for choosing EnieRent!
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `eni-rent-receipt-${booking.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!booking) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground">
            Your stay at {booking.propertyTitle} has been successfully booked.
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <MapPin className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Property</p>
                <p className="font-semibold">{booking.propertyTitle}</p>
                <p className="text-sm">{booking.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Dates</p>
                <p className="font-semibold">
                  {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                </p>
                <p className="text-sm">14 nights</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount</span>
                <span className="text-2xl font-bold">${booking.amount}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={downloadReceipt}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Receipt
          </Button>
          <Button className="w-full">
            View Booking Details
          </Button>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">What's Next?</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
              <span>You'll receive a confirmation email within 24 hours</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
              <span>The host will contact you for check-in details</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
              <span>Virtual tour and property guide available in your dashboard</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}