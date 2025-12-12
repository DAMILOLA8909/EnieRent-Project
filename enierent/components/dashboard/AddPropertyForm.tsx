'use client'

import React, { useState } from 'react'
import { Upload, X, MapPin, Home, DollarSign, Bed, Bath } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { amenitiesList, propertyTypes } from '@/data/mockData'
import { mockProperties } from '@/data/mockData'
import toast from 'react-hot-toast'

interface AddPropertyFormProps {
  onClose: () => void
  onSuccess: () => void
}

export default function AddPropertyForm({ onClose, onSuccess }: AddPropertyFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: 'Lagos',
    type: 'apartment',
    bedrooms: '2',
    bathrooms: '2',
    size: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Generate new property ID
      const newId = `prop_${Date.now()}`
      
      // Create new property object
      const newProperty = {
        id: newId,
        title: formData.title,
        description: formData.description,
        price: parseInt(formData.price),
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          coordinates: [6.5244, 3.3792], // Default Lagos coordinates
        },
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop'],
        type: formData.type as any,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        amenities: selectedAmenities,
        size: parseInt(formData.size),
        isVerified: false,
        rating: 0,
        reviews: [],
        availability: 'available',
        ownerId: 'current_user',
        createdAt: new Date(),
        featured: false,
      }

      // Add to localStorage
      const existingProperties = JSON.parse(localStorage.getItem('enierent_properties') || '[]')
      localStorage.setItem('enierent_properties', JSON.stringify([...existingProperties, newProperty]))
      
      toast.success('Property listed successfully!')
      setIsSubmitting(false)
      onSuccess()
      onClose()
    }, 1500)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // For demo, just add placeholder URLs
    const newImages = Array.from(files).map(() => 
      `https://images.unsplash.com/photo-${Date.now()}?w=800&auto=format&fit=crop`
    )
    
    setImages([...images, ...newImages.slice(0, 5 - images.length)])
    toast.success(`${newImages.length} images added`)
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">List New Property</h2>
              <p className="text-muted-foreground">Fill in the details of your property</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Property Title *</label>
                <Input
                  placeholder="e.g., Modern 2-Bedroom Apartment"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Property Type *</label>
                <select
                  className="w-full h-10 px-3 py-2 border rounded-md bg-background"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                >
                  {propertyTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <DollarSign className="inline size-4" /> Price per Year (₦) *
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 750000"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Bed className="inline size-4" /> Bedrooms *
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  <Bath className="inline size-4" /> Bathrooms *
                </label>
                <Input
                  type="number"
                  placeholder="e.g., 2"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Size (sq ft) *</label>
                <Input
                  type="number"
                  placeholder="e.g., 1200"
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  <MapPin className="inline size-4" /> Address *
                </label>
                <Input
                  placeholder="Street address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">City *</label>
                <Input
                  placeholder="e.g., Ikeja"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">State *</label>
                <select
                  className="w-full h-10 px-3 py-2 border rounded-md bg-background"
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                  required
                >
                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Port Harcourt">Port Harcourt</option>
                  <option value="Ibadan">Ibadan</option>
                  <option value="Kano">Kano</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <Textarea
                placeholder="Describe your property in detail..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-medium mb-2">Property Images (Max 5)</label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <Upload className="size-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Upload up to 5 images of your property
                </p>
                <label className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md cursor-pointer hover:bg-primary/90">
                  <Upload className="size-4 mr-2" />
                  Choose Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={images.length >= 5}
                  />
                </label>
                <p className="text-xs text-muted-foreground mt-2">
                  {images.length}/5 images selected
                </p>
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 size-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium mb-3">Select Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {amenitiesList.map((amenity) => (
                  <label
                    key={amenity}
                    className="flex items-center gap-2 p-2 border rounded-lg hover:bg-secondary cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => toggleAmenity(amenity)}
                      className="size-4 rounded border-gray-300"
                    />
                    <span className="text-sm">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Listing Property...' : 'List Property'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}