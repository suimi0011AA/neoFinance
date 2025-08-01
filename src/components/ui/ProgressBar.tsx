import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'teal' | 'blue' | 'green' | 'yellow' | 'red';
  size?: 'sm' | 'md' | 'lg';
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  showPercentage = true,
  color = 'teal',
  size = 'md'
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colors = {
    teal: 'bg-gradient-to-r from-teal-500 to-green-500',
    blue: 'bg-gradient-to-r from-blue-500 to-purple-500',
    green: 'bg-gradient-to-r from-green-500 to-emerald-500',
    yellow: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    red: 'bg-gradient-to-r from-red-500 to-pink-500'
  };

  const heights = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </span>
          {showPercentage && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {percentage.toFixed(0)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${heights[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`${heights[size]} ${colors[color]} rounded-full shadow-sm`}
        />
      </div>
    </div>
  );
};