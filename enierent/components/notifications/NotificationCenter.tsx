'use client'

import React, { useState, useEffect } from 'react'
import { Bell, X, CheckCircle, AlertCircle, Info, Calendar, MessageSquare, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'

export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error' | 'message' | 'booking'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'booking',
      title: 'Visit Scheduled',
      message: 'Your visit to Modern 2-Bedroom Apartment is confirmed for tomorrow at 2:00 PM',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
      action: {
        label: 'View Details',
        onClick: () => console.log('View booking details')
      }
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      message: 'Sarah Johnson sent you a message about the property',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: false,
      action: {
        label: 'Reply',
        onClick: () => console.log('Go to messages')
      }
    },
    {
      id: '3',
      type: 'success',
      title: 'Property Saved',
      message: 'Luxury Penthouse has been added to your favorites',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: true,
      action: {
        label: 'View',
        onClick: () => console.log('View property')
      }
    }
  ])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Load notifications from localStorage
    const saved = localStorage.getItem('enierent_notifications')
    if (saved) {
      setNotifications(JSON.parse(saved))
    }
  }, [])

  const saveNotifications = (updatedNotifications: Notification[]) => {
    setNotifications(updatedNotifications)
    localStorage.setItem('enierent_notifications', JSON.stringify(updatedNotifications))
  }

  const markAsRead = (id: string) => {
    const updated = notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    )
    saveNotifications(updated)
  }

  const markAllAsRead = () => {
    const updated = notifications.map(notif => ({ ...notif, read: true }))
    saveNotifications(updated)
    toast.success('All notifications marked as read')
  }

  const removeNotification = (id: string) => {
    const updated = notifications.filter(notif => notif.id !== id)
    saveNotifications(updated)
    toast.success('Notification removed')
  }

  const clearAll = () => {
    saveNotifications([])
    toast.success('All notifications cleared')
  }

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}`,
      timestamp: new Date(),
      read: false
    }
    const updated = [newNotification, ...notifications]
    saveNotifications(updated)
    
    // Show toast
    toast.success(notification.message, {
      icon: getNotificationIcon(notification.type),
      duration: 5000,
    })
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="size-5 text-green-500" />
      case 'warning': return <AlertCircle className="size-5 text-yellow-500" />
      case 'error': return <AlertCircle className="size-5 text-red-500" />
      case 'message': return <MessageSquare className="size-5 text-blue-500" />
      case 'booking': return <Calendar className="size-5 text-purple-500" />
      default: return <Info className="size-5 text-gray-500" />
    }
  }

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'message': return 'bg-blue-100 text-blue-800'
      case 'booking': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 size-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-96 bg-background border rounded-xl shadow-lg z-50">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <div className="font-semibold">Notifications</div>
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs"
                  >
                    Mark all read
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="size-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b hover:bg-secondary/50 transition-colors ${
                      !notification.read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <div className="font-medium">{notification.title}</div>
                          <button
                            onClick={() => removeNotification(notification.id)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-muted-foreground">
                            {formatTimeAgo(notification.timestamp)}
                          </div>
                          <div className="flex gap-2">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="text-xs text-primary hover:text-primary/80"
                              >
                                Mark read
                              </button>
                            )}
                            {notification.action && (
                              <button
                                onClick={notification.action.onClick}
                                className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90"
                              >
                                {notification.action.label}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t text-center">
              <Badge variant="secondary" className="gap-1">
                <Bell className="size-3" />
                Real-time notifications
              </Badge>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Helper function to format time
function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  let interval = seconds / 31536000
  if (interval > 1) return Math.floor(interval) + 'y ago'
  
  interval = seconds / 2592000
  if (interval > 1) return Math.floor(interval) + 'mo ago'
  
  interval = seconds / 86400
  if (interval > 1) return Math.floor(interval) + 'd ago'
  
  interval = seconds / 3600
  if (interval > 1) return Math.floor(interval) + 'h ago'
  
  interval = seconds / 60
  if (interval > 1) return Math.floor(interval) + 'm ago'
  
  return Math.floor(seconds) + 's ago'
}