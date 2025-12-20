// components/properties/ScheduleVisitModal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, Mail, Phone } from "lucide-react";
import { Property } from "@/types";

interface ScheduleVisitModalProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScheduleVisitModal({ property, open, onOpenChange }: ScheduleVisitModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "10:00",
    message: "",
  });

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage
    const visits = JSON.parse(localStorage.getItem('enierent-scheduled-visits') || '[]');
    visits.push({
      id: `visit_${Date.now()}`,
      propertyId: property.id,
      propertyTitle: property.title,
      ...formData,
      date: new Date().toISOString(),
      status: 'pending'
    });
    localStorage.setItem('enierent-scheduled-visits', JSON.stringify(visits));

    setIsSubmitting(false);
    onOpenChange(false);
    
    // Show success message
    alert(`Visit scheduled successfully! The landlord will contact you at ${formData.phone} to confirm.`);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "10:00",
      message: "",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Generate next available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Schedule a Visit</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {property.title}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="flex items-center gap-2 mb-1">
                <User className="h-4 w-4" />
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2 mb-1">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 mb-1">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+234 801 234 5678"
                  required
                />
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDate" className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4" />
                  Preferred Date
                </Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Available: Mon - Fri, 9AM - 5PM
                </p>
              </div>
              <div>
                <Label htmlFor="preferredTime" className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4" />
                  Preferred Time
                </Label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleSelectChange}
                  className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:text-white"
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
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Additional Message (Optional)</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Any specific requirements or questions..."
                rows={3}
              />
            </div>

            {/* Confirmation */}
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-sm mb-1">📋 What to expect:</h4>
              <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Landlord will call to confirm within 24 hours</li>
                <li>• Please bring a valid ID</li>
                <li>• Arrive 5 minutes before scheduled time</li>
                <li>• Masks may be required in common areas</li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                  Scheduling...
                </>
              ) : (
                "Schedule Visit"
              )}
            </Button>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              By scheduling, you agree to our terms and privacy policy
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}