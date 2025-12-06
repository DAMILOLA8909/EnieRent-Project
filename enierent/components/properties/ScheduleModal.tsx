'use client'

import React, { useState } from 'react'
import { X, Calendar, Clock, User, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Property } from '@/types'
import toast from 'react-hot-toast'

interface ScheduleModalProps {
  isOpen: boolean
  onClose: () => void
  property: Property
}

export default function ScheduleModal({ isOpen, onClose, property }: ScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate time slots (9 AM to 5 PM, 30-minute intervals)
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = 9 + Math.floor(i / 2)
    const minute = i % 2 === 0 ? '00' : '30'
    return `${hour.toString().padStart(2, '0')}:${minute}`
  })

  // Generate next 14 days for scheduling
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      // Skip weekends (optional)
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push(date.toISOString().split('T')[0])
      }
    }
    return dates
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDate || !selectedTime) {
      toast.error('Please select a date and time for your visit')
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const visitDate = new Date(selectedDate)
      const formattedDate = visitDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      toast.success(
        `Visit scheduled for ${formattedDate} at ${selectedTime}! Confirmation sent to your phone.`
      )
      
      setIsSubmitting(false)
      onClose()
      setSelectedDate('')
      setSelectedTime('')
      setFormData({ name: '', phone: '', notes: '' })
    }, 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Schedule a Visit</h2>
              <p className="text-muted-foreground text-sm mt-1">
                {property.title}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                <Calendar className="size-4" />
                Select Date
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {getAvailableDates().map((date) => {
                  const dateObj = new Date(date)
                  const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' })
                  const dateNum = dateObj.getDate()
                  
                  return (
                    <button
                      key={date}
                      type="button"
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-lg border transition-colors ${
                        selectedDate === date
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="text-sm font-medium">{day}</div>
                      <div className="text-lg font-bold">{dateNum}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                <Clock className="size-4" />
                Select Time
              </label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg border text-sm transition-colors ${
                      selectedTime === time
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+234 801 234 5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Additional Notes (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Any specific requests or questions..."
                />
              </div>
            </div>

            {/* Summary */}
            {selectedDate && selectedTime && (
              <div className="p-4 bg-secondary/20 rounded-lg">
                <h4 className="font-medium mb-2">Visit Summary</h4>
                <div className="text-sm text-muted-foreground">
                  <p>Date: {new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                  <p>Time: {selectedTime}</p>
                  <p className="mt-2 text-primary">
                    Please arrive 5 minutes early at {property.location.address}
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !selectedDate || !selectedTime}
                className="w-full gap-2"
              >
                {isSubmitting ? 'Scheduling...' : 'Schedule Visit'}
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                You'll receive a confirmation SMS with visit details
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}