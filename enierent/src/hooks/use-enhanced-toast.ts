// hooks/use-enhanced-toast.ts - USING REACT-HOT-TOAST
"use client";

import { toast as hotToast } from "react-hot-toast";
import { ToastConfig } from "@/types";

export function useEnhancedToast() {
  const showToast = ({
    title,
    description,
    type = "info",
    duration = 3000,
  }: ToastConfig) => {
    const baseOptions = {
      duration,
      position: 'top-right' as const,
      style: {
        background: 'hsl(var(--background))',
        color: 'hsl(var(--foreground))',
        border: '1px solid hsl(var(--border))',
        borderRadius: '0.5rem',
        padding: '1rem',
      },
    };

    switch (type) {
      case 'success':
        hotToast.success(title, {
          ...baseOptions,
          icon: '✅',
        });
        break;
      case 'error':
        hotToast.error(title, {
          ...baseOptions,
          icon: '❌',
        });
        break;
      case 'warning':
        hotToast(title, {
          ...baseOptions,
          icon: '⚠️',
          style: {
            ...baseOptions.style,
            borderColor: 'hsl(var(--warning))',
          },
        });
        break;
      case 'info':
      default:
        hotToast(title, {
          ...baseOptions,
          icon: 'ℹ️',
        });
        break;
    }
  };

  return { showToast };
}

// Also export a direct function for convenience
export const toast = hotToast;