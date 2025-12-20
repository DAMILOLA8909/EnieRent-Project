// hooks/use-toast.ts - SIMPLE WORKING VERSION
"use client";

import { useState, useEffect, useCallback } from 'react';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((title: string, options?: {
    description?: string;
    type?: Toast['type'];
    duration?: number;
  }) => {
    const id = Date.now().toString();
    const newToast: Toast = {
      id,
      title,
      description: options?.description,
      type: options?.type || 'info',
      duration: options?.duration || 3000,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, newToast.duration);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toast, toasts, removeToast };
}

// Export a simple toast function for direct use
export function showToast(title: string, options?: {
  description?: string;
  type?: Toast['type'];
  duration?: number;
}) {
  // This is a simplified version that logs to console
  console.log(`[TOAST] ${options?.type?.toUpperCase() || 'INFO'}: ${title}`);
  if (options?.description) {
    console.log(`  ${options.description}`);
  }
  
  // In a real implementation, this would dispatch to a toast store
  return {
    dismiss: () => console.log('Toast dismissed'),
  };
}