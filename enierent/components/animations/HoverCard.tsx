// components/animations/HoverCard.tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  yOffset?: number;
  shadow?: boolean;
  duration?: number;
}

export function HoverCard({ 
  children, 
  className = "", 
  scale = 1.02,
  yOffset = -4,
  shadow = true,
  duration = 0.2
}: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ 
        y: yOffset,
        scale: scale,
        transition: { 
          type: "spring", 
          stiffness: 400, 
          damping: 25,
          duration: duration
        }
      }}
      whileTap={{ scale: 0.98 }}
      className={`transition-all duration-200 ${className}`}
      style={{
        boxShadow: shadow ? 
          "0 4px 14px 0 rgba(0, 0, 0, 0.1)" : 
          "none"
      }}
    >
      {children}
    </motion.div>
  );
}

// Optional: Create a more advanced version with glass effect
export function GlassHoverCard({ 
  children, 
  className = "" 
}: HoverCardProps) {
  return (
    <motion.div
      whileHover={{ 
        y: -6,
        scale: 1.03,
        boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.7)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }}
      className={`rounded-xl border border-white/20 backdrop-blur-sm ${className}`}
    >
      {children}
    </motion.div>
  );
}