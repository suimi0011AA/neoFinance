import React from 'react';
import { Target, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/Button';
import { FinancialGoal } from '../../types';
import { formatCurrency } from '../../utils/aiModes';
import { format } from 'date-fns';

interface GoalCardProps {
  goal: FinancialGoal;
  onUpdate?: (goalId: string, amount: number) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdate }) => {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;
  const remaining = goal.targetAmount - goal.currentAmount;
  const daysLeft = Math.ceil((goal.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const priorityColors = {
    high: 'red',
    medium: 'yellow',
    low: 'green'
  } as const;

  const categoryIcons = {
    vacation: '✈️',
    emergency_fund: '🛡️',
    debt: '💳',
    savings: '💰',
    investment: '📈'
  };

  return (
    <Card className="p-6" hover>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{categoryIcons[goal.category]}</span>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {goal.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {goal.category.replace('_', ' ')} • {goal.priority} priority
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
            </p>
            <p className="text-xs text-gray-400">
              {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
            </p>
          </div>
        </div>

        <ProgressBar
          value={goal.currentAmount}
          max={goal.targetAmount}
          color={priorityColors[goal.priority]}
          showPercentage
        />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Target className="h-4 w-4" />
            <span>Remaining: {formatCurrency(remaining)}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Calendar className="h-4 w-4" />
            <span>Due: {format(goal.deadline, 'MMM dd, yyyy')}</span>
          </div>
        </div>

        {onUpdate && (
          <div className="flex space-x-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdate(goal.id, 100)}
              className="flex-1"
            >
              Add 100 SAR
            </Button>
            <Button
              size="sm"
              onClick={() => onUpdate(goal.id, 500)}
              className="flex-1"
            >
              Add 500 SAR
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};