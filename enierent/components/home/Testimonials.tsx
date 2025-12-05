'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    name: 'John Adekunle',
    role: 'Software Engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    content: 'Found my dream apartment in just 2 days! The verification process gave me confidence in the landlord.',
    rating: 5,
    location: 'Lekki, Lagos'
  },
  {
    name: 'Chinwe Okafor',
    role: 'Marketing Manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chinwe',
    content: 'As a single mother, safety was my priority. EnieRent helped me find a secure estate with great amenities.',
    rating: 5,
    location: 'Ikeja, Lagos'
  },
  {
    name: 'Emeka Nwosu',
    role: 'Business Owner',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emeka',
    content: 'The short-let options saved my business trip. Clean, affordable, and in perfect locations.',
    rating: 4,
    location: 'Victoria Island, Lagos'
  },
  {
    name: 'Amina Bello',
    role: 'University Lecturer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amina',
    content: 'Moving to a new city was stressful until I found EnieRent. The virtual tours helped me decide remotely.',
    rating: 5,
    location: 'Abuja'
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-primary">Tenants</span> Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from satisfied tenants who found their perfect homes through EnieRent
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="size-24 rounded-full border-4 border-primary/10"
                    />
                    <div className="absolute -top-2 -right-2 bg-primary text-white p-2 rounded-full">
                      <Quote className="size-4" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-5 ${
                          i < testimonials[currentIndex].rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-xl italic text-muted-foreground mb-6">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div>
                    <div className="font-bold text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`size-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary w-6'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}