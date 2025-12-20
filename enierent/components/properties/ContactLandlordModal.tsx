// components/properties/ContactLandlordModal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import { Property, User as UserType } from "@/types";
import { mockUsers } from "@/data/mockData";

interface ContactLandlordModalProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactLandlordModal({ property, open, onOpenChange }: ContactLandlordModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    interestedIn: "renting", // "renting", "viewing", "questions"
  });

  if (!open) return null;

  // Find landlord info
  const landlord = mockUsers.find(user => user.id === property.ownerId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage
    const messages = JSON.parse(localStorage.getItem('enierent-landlord-messages') || '[]');
    messages.push({
      id: `msg_${Date.now()}`,
      propertyId: property.id,
      propertyTitle: property.title,
      landlordId: property.ownerId,
      landlordName: landlord?.name || "Landlord",
      ...formData,
      date: new Date().toISOString(),
      status: 'sent'
    });
    localStorage.setItem('enierent-landlord-messages', JSON.stringify(messages));

    setIsSubmitting(false);
    onOpenChange(false);
    
    // Show success message
    alert(`Message sent successfully! ${landlord?.name || "The landlord"} will contact you soon.`);
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      interestedIn: "renting",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Contact Landlord</h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {landlord?.name || "Property Owner"}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          {/* Property Info */}
          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
            <h4 className="font-medium text-sm mb-1">Property: {property.title}</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {property.location.address}, {property.location.city}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              ₦{property.price.toLocaleString()}/month • {property.bedrooms} beds
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="flex items-center gap-2 mb-1">
                <User className="h-4 w-4" />
                Your Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  placeholder="+234 801 234 5678"
                  required
                />
              </div>
            </div>

            {/* Interest */}
            <div>
              <Label htmlFor="interestedIn">I'm interested in:</Label>
              <select
                id="interestedIn"
                name="interestedIn"
                value={formData.interestedIn}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-900 mt-1"
                required
              >
                <option value="renting">Renting this property</option>
                <option value="viewing">Scheduling a viewing</option>
                <option value="questions">Asking questions</option>
                <option value="negotiation">Price negotiation</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="flex items-center gap-2 mb-1">
                <MessageSquare className="h-4 w-4" />
                Your Message
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={`Hi, I'm interested in ${property.title}. I'd like to know more about...`}
                rows={4}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Mention your move-in date and duration
              </p>
            </div>

            {/* Landlord Response Time */}
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-medium text-sm mb-1">⏰ Response Time:</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {landlord?.name || "The landlord"} typically responds within 24 hours.
                You'll receive an email and/or SMS when they reply.
              </p>
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
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>

            <p className="text-xs text-center text-gray-500">
              Your message will be sent directly to the landlord
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}