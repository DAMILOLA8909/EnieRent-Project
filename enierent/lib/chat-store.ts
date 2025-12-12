import { create } from 'zustand'
import { mockUsers } from '@/data/mockData'

export interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: Date
  read: boolean
  propertyId?: string
}

export interface Conversation {
  id: string
  participants: string[]
  messages: Message[]
  lastMessage: Date
  propertyId?: string
}

interface ChatStore {
  conversations: Conversation[]
  activeConversation: string | null
  notifications: number
  
  // Actions
  sendMessage: (senderId: string, receiverId: string, content: string, propertyId?: string) => void
  markAsRead: (conversationId: string) => void
  startConversation: (participant1: string, participant2: string, propertyId?: string) => string
  setActiveConversation: (conversationId: string | null) => void
  getUnreadCount: (userId: string) => number
  getConversationsForUser: (userId: string) => Conversation[]
  loadFromStorage: () => void
  saveToStorage: () => void
}

// Generate ID
const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

export const useChatStore = create<ChatStore>((set, get) => ({
  conversations: [],
  activeConversation: null,
  notifications: 0,
  
  sendMessage: (senderId, receiverId, content, propertyId) => {
    const { conversations, activeConversation } = get()
    
    // Find existing conversation or create new
    let conversation = conversations.find(conv =>
      conv.participants.includes(senderId) &&
      conv.participants.includes(receiverId) &&
      (propertyId ? conv.propertyId === propertyId : true)
    )
    
    if (!conversation) {
      const newConversation: Conversation = {
        id: generateId(),
        participants: [senderId, receiverId],
        messages: [],
        lastMessage: new Date(),
        propertyId
      }
      conversation = newConversation
      set(state => ({
        conversations: [...state.conversations, newConversation],
        activeConversation: newConversation.id
      }))
    }
    
    const newMessage: Message = {
      id: generateId(),
      senderId,
      receiverId,
      content,
      timestamp: new Date(),
      read: false,
      propertyId
    }
    
    set(state => ({
      conversations: state.conversations.map(conv =>
        conv.id === conversation!.id
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
              lastMessage: new Date()
            }
          : conv
      ),
      notifications: state.notifications + (activeConversation !== conversation.id ? 1 : 0)
    }))
    
    // Save to localStorage
    get().saveToStorage()
  },
  
  markAsRead: (conversationId) => {
    set(state => ({
      conversations: state.conversations.map(conv =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: conv.messages.map(msg => ({ ...msg, read: true }))
            }
          : conv
      )
    }))
    get().saveToStorage()
  },
  
  startConversation: (participant1, participant2, propertyId) => {
    const conversationId = generateId()
    const newConversation: Conversation = {
      id: conversationId,
      participants: [participant1, participant2],
      messages: [],
      lastMessage: new Date(),
      propertyId
    }
    
    set(state => ({
      conversations: [...state.conversations, newConversation],
      activeConversation: conversationId
    }))
    
    get().saveToStorage()
    return conversationId
  },
  
  setActiveConversation: (conversationId) => {
    set({ activeConversation: conversationId })
    if (conversationId) {
      get().markAsRead(conversationId)
    }
  },
  
  getUnreadCount: (userId) => {
    const { conversations } = get()
    return conversations.reduce((count, conv) => {
      if (conv.participants.includes(userId)) {
        const unreadMessages = conv.messages.filter(
          msg => msg.receiverId === userId && !msg.read
        )
        return count + unreadMessages.length
      }
      return count
    }, 0)
  },
  
  getConversationsForUser: (userId) => {
    const { conversations } = get()
    return conversations
      .filter(conv => conv.participants.includes(userId))
      .sort((a, b) => new Date(b.lastMessage).getTime() - new Date(a.lastMessage).getTime())
  },
  
  loadFromStorage: () => {
    if (typeof window === 'undefined') return
    
    try {
      const saved = localStorage.getItem('enierent_chat')
      if (saved) {
        const data = JSON.parse(saved)
        // Convert string dates back to Date objects
        const conversations = data.conversations.map((conv: any) => ({
          ...conv,
          lastMessage: new Date(conv.lastMessage),
          messages: conv.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }))
        set({ conversations })
      }
    } catch (error) {
      console.error('Failed to load chat data:', error)
    }
  },
  
  saveToStorage: () => {
    if (typeof window === 'undefined') return
    
    try {
      const { conversations } = get()
      localStorage.setItem('enierent_chat', JSON.stringify({ conversations }))
    } catch (error) {
      console.error('Failed to save chat data:', error)
    }
  }
}))