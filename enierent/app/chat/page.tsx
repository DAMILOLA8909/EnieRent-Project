'use client'

import React, { useState, useEffect } from 'react'
import { MessageSquare, Users, Search, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import LayoutWrapper from '@/components/layout/LayoutWrapper'
import ChatWindow from '@/components/chat/ChatWindow'
import ConversationsList from '@/components/chat/ConversationsList'
import { useChatStore } from '@/lib/chat-store'
import { useAuthStore } from '@/lib/auth-store'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function ChatPage() {
  const { user } = useAuthStore()
  const { setActiveConversation, activeConversation, loadFromStorage } = useChatStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewChat, setShowNewChat] = useState(false)

  useEffect(() => {
    loadFromStorage()
  }, [loadFromStorage])

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversation(conversationId)
  }

  const handleCloseChat = () => {
    setActiveConversation(null)
  }

  if (!user) return null

  return (
    <ProtectedRoute>
      <LayoutWrapper>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Messages</h1>
              <p className="text-muted-foreground">
                Chat with landlords and tenants
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Users className="size-4" />
                All Conversations
              </Button>
              <Button className="gap-2" onClick={() => setShowNewChat(true)}>
                <Plus className="size-4" />
                New Chat
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Conversations */}
            <div className="lg:col-span-1">
              <div className="border rounded-xl overflow-hidden">
                {/* Search */}
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Conversations List */}
                <div className="h-[600px] overflow-y-auto">
                  <ConversationsList
                    onSelectConversation={handleSelectConversation}
                    activeConversation={activeConversation}
                  />
                </div>
              </div>

              {/* Chat Tips */}
              <div className="mt-6 bg-secondary/20 border rounded-xl p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <MessageSquare className="size-5" />
                  Chat Tips
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Be clear about your requirements and budget</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Schedule visits through the platform for safety</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Discuss payment terms clearly before agreement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Keep all communication within the platform</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Chat Window */}
            <div className="lg:col-span-2">
              {activeConversation ? (
                <div className="border rounded-xl overflow-hidden h-[600px]">
                  <ChatWindow
                    conversationId={activeConversation}
                    onClose={handleCloseChat}
                  />
                </div>
              ) : (
                <div className="border rounded-xl h-[600px] flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="size-16 text-muted-foreground mx-auto mb-6" />
                    <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      Choose a conversation from the list or start a new chat with a landlord or tenant
                    </p>
                    <Button onClick={() => setShowNewChat(true)} className="gap-2">
                      <Plus className="size-4" />
                      Start New Chat
                    </Button>
                  </div>
                </div>
              )}

              {/* Safety Notice */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="font-semibold text-blue-800 mb-2">Safety First</h3>
                <p className="text-sm text-blue-700">
                  • Never share personal financial information in chats<br/>
                  • Always verify property ownership before making payments<br/>
                  • Use the platform's official visit scheduling for meetings<br/>
                  • Report any suspicious behavior to our support team
                </p>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </ProtectedRoute>
  )
}