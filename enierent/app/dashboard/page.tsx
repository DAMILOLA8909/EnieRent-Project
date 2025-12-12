'use client'

import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Home, Settings, LogOut, Heart, Calendar, 
  MessageSquare, Bell, User, Shield, Plus,
  DollarSign, Map, Search, BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import { useAuthStore } from '@/lib/auth-store'
import { mockProperties } from '@/data/mockData' // Add this import
import PropertyCard from '@/components/properties/PropertyCard'
import PropertyManagement from '@/components/dashboard/PropertyManagement'
import FavoritesSection from '@/components/dashboard/FavoritesSection'
import AddPropertyForm from '@/components/dashboard/AddPropertyForm'
import toast from 'react-hot-toast'
import { Property } from '@/types' // Add this import

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [showAddProperty, setShowAddProperty] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  const handlePropertyAdded = () => {
    toast.success('Property added successfully!')
  }

  // Fix: Calculate savedProperties with proper typing
  const savedProperties = useMemo(() => {
    if (!user?.savedProperties?.length) return []
    return mockProperties.filter((property: Property) => 
      user.savedProperties.includes(property.id)
    )
  }, [user])

  // Fix: Sample recent activity with proper typing
  const recentActivities = [
    { action: 'Viewed', property: 'Modern 2-Bedroom Apartment in Ikeja', time: '2 hours ago' },
    { action: 'Saved', property: 'Luxury Penthouse in Banana Island', time: '1 day ago' },
    { action: 'Scheduled visit for', property: '3-Bedroom Bungalow in Surulere', time: '2 days ago' },
  ] as const

  if (!user) return null

  return (
    <ProtectedRoute>
      <LayoutWrapper>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user.name}! 👋
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push('/properties')}>
                <Home className="size-4 mr-2" />
                Browse Properties
              </Button>
              {user.role === 'landlord' && (
                <Button onClick={() => setShowAddProperty(true)}>
                  <Plus className="size-4 mr-2" />
                  Add Property
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  {/* User Info */}
                  <div className="text-center mb-6">
                    <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="size-10 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                      <Shield className="size-3" />
                      {user.role === 'tenant' ? 'Tenant' : 'Landlord'}
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeTab === 'overview'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary'
                      }`}
                      type="button"
                    >
                      <BarChart3 className="size-4" />
                      Overview
                    </button>
                    <button
                      onClick={() => setActiveTab('favorites')}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeTab === 'favorites'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary'
                      }`}
                      type="button"
                    >
                      <Heart className="size-4" />
                      Favorites
                      {savedProperties.length > 0 && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {savedProperties.length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        activeTab === 'bookings'
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-secondary'
                      }`}
                      type="button"
                    >
                      <Calendar className="size-4" />
                      Bookings
                    </button>
                    {user.role === 'landlord' && (
                      <button
                        onClick={() => setActiveTab('properties')}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                          activeTab === 'properties'
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-secondary'
                        }`}
                        type="button"
                      >
                        <Home className="size-4" />
                        My Properties
                      </button>
                    )}
                    <button
                      onClick={() => router.push('/chat')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                      type="button"
                    >
                      <MessageSquare className="size-4" />
                      Messages
                    </button>
                    <button
                      onClick={() => setActiveTab('notifications')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                      type="button"
                    >
                      <Bell className="size-4" />
                      Notifications
                    </button>
                    <button
                      onClick={() => setActiveTab('settings')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                      type="button"
                    >
                      <Settings className="size-4" />
                      Settings
                    </button>
                  </nav>

                  {/* Logout */}
                  <div className="mt-8 pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={handleLogout}
                      className="w-full gap-2"
                    >
                      <LogOut className="size-4" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">
                          {user.role === 'tenant' ? '12' : '5'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.role === 'tenant' ? 'Properties Viewed' : 'Total Listings'}
                        </div>
                      </div>
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Home className="size-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">
                          {user.role === 'tenant' ? savedProperties.length : '23'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.role === 'tenant' ? 'Saved Properties' : 'Total Views'}
                        </div>
                      </div>
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <Heart className="size-6 text-green-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">
                          {user.role === 'tenant' ? '3' : '7'}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {user.role === 'tenant' ? 'Scheduled Visits' : 'Total Inquiries'}
                        </div>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <Calendar className="size-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Dynamic Content Based on Active Tab */}
              <Card>
                <CardHeader>
                  <CardTitle>
                    {activeTab === 'overview' && 'Dashboard Overview'}
                    {activeTab === 'favorites' && 'Favorite Properties'}
                    {activeTab === 'bookings' && 'Booking History'}
                    {activeTab === 'properties' && 'Property Management'}
                    {activeTab === 'messages' && 'Messages'}
                    {activeTab === 'notifications' && 'Notifications'}
                    {activeTab === 'settings' && 'Settings'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeTab === 'overview' && (
                    <div className="space-y-8">
                      {user.role === 'tenant' ? (
                        <FavoritesSection />
                      ) : (
                        <PropertyManagement userId={user.id} />
                      )}
                      
                      {/* Recent Activity */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                          {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                {activity.action === 'Viewed' && <Home className="size-5 text-primary" />}
                                {activity.action === 'Saved' && <Heart className="size-5 text-red-500" />}
                                {activity.action === 'Scheduled visit for' && <Calendar className="size-5 text-blue-500" />}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium">
                                  {activity.action} <span className="text-primary">{activity.property}</span>
                                </div>
                                <div className="text-sm text-muted-foreground">{activity.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'favorites' && user.role === 'tenant' && (
                    <FavoritesSection />
                  )}

                  {activeTab === 'bookings' && user.role === 'tenant' && (
                    <div className="text-center py-12">
                      <Calendar className="size-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Booking History</h3>
                      <p className="text-muted-foreground">
                        View and manage your scheduled property visits
                      </p>
                    </div>
                  )}

                  {activeTab === 'properties' && user.role === 'landlord' && (
                    <PropertyManagement userId={user.id} />
                  )}

                  {activeTab === 'messages' && (
                    <div className="text-center py-12">
                      <MessageSquare className="size-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Messages</h3>
                      <p className="text-muted-foreground">
                        Chat with landlords and tenants about properties
                      </p>
                      <Button 
                        onClick={() => router.push('/chat')}
                        className="mt-4"
                      >
                        Go to Chat
                      </Button>
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div className="text-center py-12">
                      <Settings className="size-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Settings</h3>
                      <p className="text-muted-foreground">
                        Manage your account preferences and notifications
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Add Property Modal */}
        {showAddProperty && (
          <AddPropertyForm
            onClose={() => setShowAddProperty(false)}
            onSuccess={handlePropertyAdded}
          />
        )}
      </LayoutWrapper>
    </ProtectedRoute>
  )
}