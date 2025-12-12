'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, X, User, Home, Paperclip, Smile, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChatStore, Conversation } from '@/lib/chat-store'
import { useAuthStore } from '@/lib/auth-store'
import { mockUsers } from '@/data/mockData'
import { mockProperties } from '@/data/mockData'
import { formatDate } from '@/lib/utils'

interface ChatWindowProps {
  conversationId: string | null
  onClose: () => void
}

export default function ChatWindow({ conversationId, onClose }: ChatWindowProps) {
  const { user } = useAuthStore()
  const { conversations, sendMessage, setActiveConversation, markAsRead } = useChatStore()
  const [message, setMessage] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversation = conversations.find(c => c.id === conversationId)
  
  // Get other participant
  const otherParticipantId = conversation?.participants.find(id => id !== user?.id)
  const otherParticipant = mockUsers.find(u => u.id === otherParticipantId)

  // Get property if exists
  const property = conversation?.propertyId 
    ? mockProperties.find(p => p.id === conversation.propertyId)
    : null

  useEffect(() => {
    if (conversationId) {
      markAsRead(conversationId)
    }
  }, [conversationId, markAsRead])

  useEffect(() => {
    scrollToBottom()
  }, [conversation?.messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !user || !conversationId) return

    sendMessage(user.id, otherParticipantId!, message.trim(), conversation?.propertyId)
    setMessage('')
  }

  const formatMessageTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (!conversation || !user) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <User className="size-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Select a conversation to start chatting</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="size-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{otherParticipant?.name || 'User'}</h3>
            <p className="text-xs text-muted-foreground">
              {conversation.messages.filter(m => !m.read && m.receiverId === user.id).length > 0 
                ? `${conversation.messages.filter(m => !m.read && m.receiverId === user.id).length} unread messages`
                : 'Online'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {property && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(`/properties/${property.id}`, '_blank')}
              className="gap-2"
            >
              <Home className="size-4" />
              View Property
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="size-5" />
          </Button>
        </div>
      </div>

      {/* Property Info */}
      {property && (
        <div className="border-b p-4 bg-secondary/20">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">{property.title}</h4>
              <p className="text-xs text-muted-foreground">
                {property.location.city} • ${property.price.toLocaleString()}/year
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.messages.length === 0 ? (
          <div className="text-center py-8">
            <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="size-8 text-primary" />
            </div>
            <h4 className="font-medium mb-2">Start a conversation</h4>
            <p className="text-sm text-muted-foreground">
              Send a message to {otherParticipant?.name}
            </p>
          </div>
        ) : (
          conversation.messages.map((msg) => {
            const isOwn = msg.senderId === user.id
            const sender = mockUsers.find(u => u.id === msg.senderId)
            
            return (
              <div
                key={msg.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl p-3 ${
                    isOwn
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-secondary rounded-bl-none'
                  }`}
                >
                  {!isOwn && (
                    <div className="text-xs font-medium mb-1">
                      {sender?.name}
                    </div>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  <div className={`text-xs mt-1 ${isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {formatMessageTime(msg.timestamp)}
                  </div>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="pr-10"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Smile className="size-4" />
              </button>
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="size-4" />
              </button>
            </div>
          </div>
          <Button
            type="submit"
            disabled={!message.trim()}
            className="gap-2"
          >
            <Send className="size-4" />
            Send
          </Button>
        </div>
        
        {/* Quick Replies */}
        <div className="flex gap-2 mt-3">
          {[
            "Is this property still available?",
            "Can I schedule a visit?",
            "What's the minimum lease term?",
            "Are utilities included?"
          ].map((quickReply, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setMessage(quickReply)}
              className="text-xs px-3 py-1 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
            >
              {quickReply}
            </button>
          ))}
        </div>
      </form>
    </div>
  )
}