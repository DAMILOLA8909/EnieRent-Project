// components/payment/PaymentModal.tsx - SIMPLIFIED VERSION
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, CheckCircle, Lock, Building } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  propertyId: string;
  propertyTitle: string;
  amount: number;
}

export function PaymentModal({
  open,
  onOpenChange,
  propertyId,
  propertyTitle,
  amount,
}: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [bookingDuration, setBookingDuration] = useState(12);
  const router = useRouter();

  // Calculate totals based on duration
  const monthlyRent = amount / 3; // Assuming amount is total first payment
  const totalRent = monthlyRent * bookingDuration;
  const securityDeposit = monthlyRent * 2;
  const totalAmount = monthlyRent + securityDeposit;

  // Don't render if not open
  if (!open) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate booking ID
    const newBookingId = `booking_${Date.now()}`;
    
    // Store booking in localStorage
    const booking = {
      id: newBookingId,
      propertyId,
      propertyTitle,
      amount: totalAmount,
      monthlyRent,
      securityDeposit,
      bookingDuration,
      date: new Date().toISOString(),
      status: 'confirmed',
      paymentMethod
    };
    
    const bookings = JSON.parse(localStorage.getItem('enierent-bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('enierent-bookings', JSON.stringify(bookings));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Show success alert
    alert(`Payment Successful! Your booking for ${propertyTitle} has been confirmed.`);
    
    setTimeout(() => {
      onOpenChange(false);
      router.push(`/properties/success/${newBookingId}`);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Complete Your Booking</h2>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Secure payment for {propertyTitle}
          </p>

          {!isSuccess ? (
            <div className="space-y-6">
              {/* Booking Duration */}
              <div>
                <h3 className="font-medium mb-2">Booking Duration (Months)</h3>
                <div className="grid grid-cols-4 gap-2">
                  {[6, 12, 18, 24].map((months) => (
                    <button
                      key={months}
                      type="button"
                      onClick={() => setBookingDuration(months)}
                      className={`px-3 py-2 rounded-lg border ${
                        bookingDuration === months
                          ? "bg-primary text-primary-foreground border-primary"
                          : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {months} months
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <Card className="border-2 border-primary/20">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-3">Price Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Monthly Rent ({bookingDuration} months)</span>
                      <span className="font-semibold">₦{monthlyRent.toLocaleString()}/month</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Security Deposit (2 months)</span>
                      <span className="font-semibold">₦{securityDeposit.toLocaleString()}</span>
                    </div>
                    <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
                    <div className="flex justify-between text-base font-bold">
                      <span>First Payment Due Now</span>
                      <span className="text-primary">₦{totalAmount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Remaining ₦{(totalRent - monthlyRent).toLocaleString()} paid monthly
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <div>
                <h3 className="font-medium mb-3">Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                      paymentMethod === 'card'
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <CreditCard className="mb-2 h-6 w-6" />
                    <span>Credit Card</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-4 rounded-lg border-2 flex flex-col items-center ${
                      paymentMethod === 'bank'
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Building className="mb-2 h-6 w-6" />
                    <span>Bank Transfer</span>
                  </button>
                </div>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <Input 
                      placeholder="1234 5678 9012 3456"
                      className="font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry Date</label>
                      <Input placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVC</label>
                      <Input placeholder="123" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                    <Input placeholder="John Doe" />
                  </div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                  <h4 className="font-medium mb-2">Bank Transfer Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Bank Name:</span>
                      <span className="font-mono">EnieRent Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Account Number:</span>
                      <span className="font-mono">1234567890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Account Name:</span>
                      <span className="font-mono">EnieRent Properties Ltd.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Reference:</span>
                      <span className="font-mono">ENIE-{propertyId.slice(0, 8)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Lock className="h-4 w-4" />
                <p>Your payment is secured with 256-bit SSL encryption</p>
              </div>

              <Button 
                className="w-full" 
                onClick={handlePayment}
                disabled={isProcessing}
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                    Processing...
                  </>
                ) : (
                  `Pay ₦${totalAmount.toLocaleString()}`
                )}
              </Button>
              
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                This is a demo. No real payment will be processed.
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Payment Successful!</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your booking has been confirmed. Redirecting...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}