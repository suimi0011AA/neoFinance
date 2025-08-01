import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';
import { formatCurrency } from '../../utils/aiModes';

interface StatsCardProps {
  title: string;
  value: number;
  change?: number;
  icon: LucideIcon;
  color: 'teal' | 'blue' | 'green' | 'yellow' | 'red';
  format?: 'currency' | 'percentage' | 'number';
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color,
  format = 'currency'
}) => {
  const colors = {
    teal: 'from-teal-500 to-green-500',
    blue: 'from-blue-500 to-purple-500',
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-orange-500',
    red: 'from-red-500 to-pink-500'
  };

  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val);
      case 'percentage':
        return `${val}%`;
      default:
        return val.toLocaleString();
    }
  };

  return (
    <Card className="p-6" hover>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatValue(value)}
          </p>
          {change !== undefined && (
            <p className={`text-sm mt-1 ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {change >= 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <div className={`w-12 h-12 bg-gradient-to-r ${colors[color]} rounded-xl flex items-center justify-center`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </Card>
  );
};