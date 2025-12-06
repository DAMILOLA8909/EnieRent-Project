'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Home, Settings, LogOut, Heart, Calendar, 
  MessageSquare, Bell, User, Shield, Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import { useAuthStore } from '@/lib/auth-store'
import { mockProperties } from '@/data/mockData'
import PropertyCard from '@/components/properties/PropertyCard'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  const savedProperties = mockProperties.filter(property => 
    user?.savedProperties.includes(property.id)
  )

  return (
    <ProtectedRoute>
      <LayoutWrapper>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, {user?.name}! 👋
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => router.push('/properties')}>
                <Home className="size-4 mr-2" />
                Browse Properties
              </Button>
              {user?.role === 'landlord' && (
                <Button onClick={() => router.push('/dashboard/add-property')}>
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
                    <h3 className="font-bold text-lg">{user?.name}</h3>
                    <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                      <Shield className="size-3" />
                      {user?.role === 'tenant' ? 'Tenant' : 'Landlord'}
                    </div>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-2">
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <Home className="size-4" />
                      Overview
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/saved')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <Heart className="size-4" />
                      Saved Properties
                      {savedProperties.length > 0 && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          {savedProperties.length}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/visits')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <Calendar className="size-4" />
                      Scheduled Visits
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/messages')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <MessageSquare className="size-4" />
                      Messages
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/notifications')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <Bell className="size-4" />
                      Notifications
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/settings')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold">12</div>
                        <div className="text-sm text-muted-foreground">Properties Viewed</div>
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
                        <div className="text-2xl font-bold">5</div>
                        <div className="text-sm text-muted-foreground">Saved Properties</div>
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
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-sm text-muted-foreground">Scheduled Visits</div>
                      </div>
                      <div className="p-3 bg-blue-500/10 rounded-lg">
                        <Calendar className="size-6 text-blue-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Saved Properties */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="size-5" />
                    Saved Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {savedProperties.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {savedProperties.map((property) => (
                        <PropertyCard 
                          key={property.id} 
                          property={property} 
                          compact 
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Heart className="size-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No saved properties yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Start browsing properties and save your favorites
                      </p>
                      <Button onClick={() => router.push('/properties')}>
                        Browse Properties
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'Viewed', property: 'Modern 2-Bedroom Apartment in Ikeja', time: '2 hours ago' },
                      { action: 'Saved', property: 'Luxury Penthouse in Banana Island', time: '1 day ago' },
                      { action: 'Scheduled visit for', property: '3-Bedroom Bungalow in Surulere', time: '2 days ago' },
                    ].map((activity, index) => (
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </ProtectedRoute>
  )
}