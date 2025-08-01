import React from 'react';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AIRecommendation } from '../../types';
import { formatCurrency } from '../../utils/aiModes';

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
  onApply?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  recommendation,
  onApply,
  onDismiss
}) => {
  const typeIcons = {
    saving: TrendingUp,
    spending: AlertTriangle,
    investment: Lightbulb,
    budget: CheckCircle
  };

  const typeColors = {
    saving: 'from-green-500 to-emerald-500',
    spending: 'from-yellow-500 to-orange-500',
    investment: 'from-blue-500 to-purple-500',
    budget: 'from-teal-500 to-green-500'
  };

  const priorityColors = {
    high: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20',
    medium: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20',
    low: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
  };

  const Icon = typeIcons[recommendation.type];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className={`p-4 border-l-4 ${priorityColors[recommendation.priority]}`}>
        <div className="flex items-start space-x-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${typeColors[recommendation.type]} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {recommendation.title}
              </h4>
              <div className="flex items-center space-x-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  recommendation.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                }`}>
                  {recommendation.priority}
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {recommendation.description}
            </p>
            
            {recommendation.impact > 0 && (
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                Potential savings: {formatCurrency(recommendation.impact)}
              </p>
            )}
            
            {recommendation.actionable && (onApply || onDismiss) && (
              <div className="flex space-x-2 pt-2">
                {onApply && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onApply(recommendation.id)}
                  >
                    Apply
                  </Button>
                )}
                {onDismiss && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDismiss(recommendation.id)}
                  >
                    Dismiss
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};