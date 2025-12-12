'use client'

import React, { useEffect } from 'react'
import { MessageSquare, User, Home, Clock, Check, CheckCheck } from 'lucide-react'
import { useChatStore } from '@/lib/chat-store'
import { useAuthStore } from '@/lib/auth-store'
import { mockUsers } from '@/data/mockData'
import { mockProperties } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

interface ConversationsListProps {
  onSelectConversation: (conversationId: string) => void
  activeConversation: string | null
}

export default function ConversationsList({ 
  onSelectConversation, 
  activeConversation 
}: ConversationsListProps) {
  const { user } = useAuthStore()
  const { getConversationsForUser, getUnreadCount, loadFromStorage } = useChatStore()
  
  const conversations = getConversationsForUser(user?.id || '')
  const unreadCount = getUnreadCount(user?.id || '')

  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])

  const getOtherParticipant = (conversation: any) => {
    const otherId = conversation.participants.find((id: string) => id !== user?.id)
    return mockUsers.find(u => u.id === otherId)
  }

  const getLastMessage = (conversation: any) => {
    if (conversation.messages.length === 0) return 'No messages yet'
    return conversation.messages[conversation.messages.length - 1].content
  }

  const getPropertyInfo = (conversation: any) => {
    if (!conversation.propertyId) return null
    return mockProperties.find(p => p.id === conversation.propertyId)
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <MessageSquare className="size-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Please login to see messages</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold text-lg">Messages</h2>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {unreadCount} unread
          </span>
        )}
      </div>

      {conversations.length === 0 ? (
        <div className="text-center py-8">
          <MessageSquare className="size-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-medium mb-2">No conversations yet</h3>
          <p className="text-sm text-muted-foreground">
            Start chatting with landlords or tenants
          </p>
        </div>
      ) : (
        conversations.map((conversation) => {
          const otherUser = getOtherParticipant(conversation)
          const lastMessage = getLastMessage(conversation)
          const property = getPropertyInfo(conversation)
          const isActive = conversation.id === activeConversation
          const unreadMessages = conversation.messages.filter(
            (msg: any) => !msg.read && msg.receiverId === user.id
          )

          return (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full text-left p-4 border-b hover:bg-secondary transition-colors ${
                isActive ? 'bg-secondary' : ''
              }`}
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="size-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="size-6 text-primary" />
                  </div>
                  {unreadMessages.length > 0 && (
                    <div className="absolute -top-1 -right-1 size-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadMessages.length}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-semibold">{otherUser?.name}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3" />
                      {formatDate(new Date(conversation.lastMessage))}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground truncate mb-2">
                    {lastMessage}
                  </p>

                  {property && (
                    <div className="flex items-center gap-2 text-xs">
                      <Home className="size-3" />
                      <span className="truncate">{property.title}</span>
                    </div>
                  )}

                  {/* Message Status */}
                  {conversation.messages.length > 0 && (
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-xs text-muted-foreground">
                        {conversation.messages.length} messages
                      </div>
                      <div className="flex items-center gap-1">
                        {unreadMessages.length > 0 ? (
                          <span className="text-xs bg-primary text-white px-2 py-0.5 rounded">
                            New
                          </span>
                        ) : conversation.messages[conversation.messages.length - 1]?.senderId === user.id ? (
                          <CheckCheck className="size-4 text-blue-500" />
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          )
        })
      )}
    </div>
  )
}