import { create } from 'zustand'
import { User } from '@/types'
import { mockUsers } from '@/data/mockData'

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (userData: Omit<User, 'id' | 'createdAt' | 'savedProperties'> & { password: string }) => Promise<{ success: boolean; message: string }>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  toggleSaveProperty: (propertyId: string) => void
  checkAuth: () => void
}

// Simple hash function for demonstration (not for production!)
const simpleHash = (str: string): string => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash.toString(36)
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (email, password) => {
    set({ isLoading: true })
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if user exists in mock data
    const foundUser = mockUsers.find(user => user.email === email)
    
    if (!foundUser) {
      set({ isLoading: false })
      return { success: false, message: 'User not found' }
    }
    
    // In real app, verify password hash from backend
    // For demo, any password works with mock users
    const hashedPassword = simpleHash(password)
    
    // Store user in localStorage for persistence
    const userWithToken = {
      ...foundUser,
      token: `demo_token_${Date.now()}_${hashedPassword}`
    }
    
    localStorage.setItem('enierent_user', JSON.stringify(userWithToken))
    localStorage.setItem('enierent_token', userWithToken.token)
    
    set({
      user: foundUser,
      isAuthenticated: true,
      isLoading: false
    })
    
    return { success: true, message: 'Login successful' }
  },
  
  register: async (userData) => {
    set({ isLoading: true })
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check if email already exists
    const emailExists = mockUsers.some(user => user.email === userData.email)
    
    if (emailExists) {
      set({ isLoading: false })
      return { success: false, message: 'Email already registered' }
    }
    
    // Create new user
    const newUser: User = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: userData.avatar,
      phone: userData.phone,
      savedProperties: [],
      createdAt: new Date()
    }
    
    // Hash password (demo)
    const hashedPassword = simpleHash(userData.password)
    
    // Store in localStorage
    const userWithToken = {
      ...newUser,
      token: `demo_token_${Date.now()}_${hashedPassword}`
    }
    
    localStorage.setItem('enierent_user', JSON.stringify(userWithToken))
    localStorage.setItem('enierent_token', userWithToken.token)
    
    set({
      user: newUser,
      isAuthenticated: true,
      isLoading: false
    })
    
    return { success: true, message: 'Registration successful' }
  },
  
  logout: () => {
    localStorage.removeItem('enierent_user')
    localStorage.removeItem('enierent_token')
    set({
      user: null,
      isAuthenticated: false
    })
  },
  
  updateUser: (userData) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...userData } : null
    }))
    
    // Update localStorage
    const currentUser = get().user
    if (currentUser) {
      const storedUser = localStorage.getItem('enierent_user')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        const updatedUser = { ...parsedUser, ...userData }
        localStorage.setItem('enierent_user', JSON.stringify(updatedUser))
      }
    }
  },
  
  toggleSaveProperty: (propertyId) => {
    set((state) => {
      if (!state.user) return state
      
      const isSaved = state.user.savedProperties.includes(propertyId)
      const updatedSavedProperties = isSaved
        ? state.user.savedProperties.filter(id => id !== propertyId)
        : [...state.user.savedProperties, propertyId]
      
      const updatedUser = {
        ...state.user,
        savedProperties: updatedSavedProperties
      }
      
      // Update localStorage
      const storedUser = localStorage.getItem('enierent_user')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        const updatedStoredUser = { ...parsedUser, savedProperties: updatedSavedProperties }
        localStorage.setItem('enierent_user', JSON.stringify(updatedStoredUser))
      }
      
      return { user: updatedUser }
    })
  },
  
  checkAuth: () => {
    const storedUser = localStorage.getItem('enierent_user')
    const storedToken = localStorage.getItem('enierent_token')
    
    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser)
        set({
          user: user,
          isAuthenticated: true
        })
      } catch (error) {
        localStorage.removeItem('enierent_user')
        localStorage.removeItem('enierent_token')
      }
    }
  }
}))