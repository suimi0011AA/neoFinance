import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  glass = false 
}) => {
  const baseClasses = 'rounded-2xl border transition-all duration-300';
  const glassClasses = glass 
    ? 'bg-white/10 backdrop-blur-md border-white/20 shadow-xl' 
    : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg';
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-[1.02]' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
};