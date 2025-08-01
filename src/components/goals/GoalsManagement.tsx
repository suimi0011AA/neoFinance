import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Target, Calendar, TrendingUp, Edit, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ProgressBar } from '../ui/ProgressBar';
import { FinancialGoal } from '../../types';
import { useDatabase } from '../../hooks/useDatabase';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../utils/translations';
import { formatCurrency } from '../../utils/aiModes';
import { format } from 'date-fns';

interface GoalsManagementProps {
  userData?: any;
}

export const GoalsManagement: React.FC<GoalsManagementProps> = ({
  userData,
}) => {
  const [goals, setGoals] = useState<any[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    deadline: '',
    category: 'savings' as const,
    priority: 'medium' as const,
  });

  const { getUserGoals, createGoal, updateGoalProgress } = useDatabase();
  const { language } = useLanguage();

  useEffect(() => {
    if (userData?.id) {
      loadGoals();
    }
  }, [userData]);

  const loadGoals = async () => {
    try {
      const userGoals = await getUserGoals(userData.id);
      setGoals(userGoals);
    } catch (error) {
      console.error('Error loading goals:', error);
    }
  };

  const handleCreateGoal = async () => {
    if (!newGoal.title || !newGoal.targetAmount || !newGoal.deadline) return;

    try {
      await createGoal(userData.id, {
        title: newGoal.title,
        targetAmount: parseFloat(newGoal.targetAmount),
        deadline: newGoal.deadline,
        category: newGoal.category,
        priority: newGoal.priority,
      });

      setNewGoal({
        title: '',
        targetAmount: '',
        deadline: '',
        category: 'savings',
        priority: 'medium',
      });
      setShowCreateForm(false);
      loadGoals();
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const categoryIcons = {
    vacation: '✈️',
    emergency_fund: '🛡️',
    debt: '💳',
    savings: '💰',
    investment: '📈',
  };

  const priorityColors = {
    high: 'red',
    medium: 'yellow',
    low: 'green',
  } as const;

  updateGoalProgress = (goalId: string, amount: number) => {
    const goal = goals.find((g) => g.id === goalId);
    if (goal) {
      const newAmount = Math.min(
        goal.current_amount + amount,
        goal.target_amount
      );
      updateGoalProgress(goalId, newAmount).then(() => {
        loadGoals();
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('goals.title', language)}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('goals.subtitle', language)}
          </p>
        </div>
        <Button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>{t('goals.createNew', language)}</span>
        </Button>
      </div>

      {/* Goals Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Goals
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {goals.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Target
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(
                  goals.reduce((sum, goal) => sum + goal.target_amount, 0)
                )}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Avg Progress
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {goals.length > 0
                  ? Math.round(
                      goals.reduce(
                        (sum, goal) =>
                          sum +
                          (goal.current_amount / goal.target_amount) * 100,
                        0
                      ) / goals.length
                    )
                  : 0}
                %
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = (goal.current_amount / goal.target_amount) * 100;
          const remaining = goal.target_amount - goal.current_amount;
          const daysLeft = Math.ceil(
            (goal.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          );

          return (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              layout
            >
              <Card className="p-6" hover>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {categoryIcons[goal.category]}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {goal.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                          {t(`goals.categories.${goal.category}`, language)} •{' '}
                          {goal.priority} priority
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        {t('goals.progress', language)}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {formatCurrency(goal.current_amount)} /{' '}
                        {formatCurrency(goal.target_amount)}
                      </span>
                    </div>
                    <ProgressBar
                      value={goal.current_amount}
                      max={goal.target_amount}
                      color={priorityColors[goal.priority]}
                      showPercentage
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Target className="h-4 w-4" />
                      <span>
                        {t('goals.remaining', language)}:{' '}
                        {formatCurrency(remaining)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {t('goals.dueDate', language)}:{' '}
                        {format(new Date(goal.deadline), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateGoalProgress(goal.id, 100)}
                      className="flex-1"
                    >
                      Add 100 SAR
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => updateGoalProgress(goal.id, 500)}
                      className="flex-1"
                    >
                      Add 500 SAR
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Create Goal Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('goals.createNew', language)}
            </h3>
            <div className="space-y-4">
              <Input
                label={language === 'ar' ? 'عنوان الهدف' : 'Goal Title'}
                value={newGoal.title}
                onChange={(e) =>
                  setNewGoal((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder=""
              />
              <Input
                label={
                  language === 'ar'
                    ? 'المبلغ المستهدف (ريال سعودي)'
                    : 'Target Amount (SAR)'
                }
                type="number"
                value={newGoal.targetAmount}
                onChange={(e) =>
                  setNewGoal((prev) => ({
                    ...prev,
                    targetAmount: e.target.value,
                  }))
                }
                placeholder=""
              />
              <Input
                label={language === 'ar' ? 'تاريخ الاستحقاق' : 'Deadline'}
                type="date"
                value={newGoal.deadline}
                onChange={(e) =>
                  setNewGoal((prev) => ({ ...prev, deadline: e.target.value }))
                }
              />
              <Select
                label={language === 'ar' ? 'الفئة' : 'Category'}
                value={newGoal.category}
                onChange={(e) =>
                  setNewGoal((prev) => ({
                    ...prev,
                    category: e.target.value as any,
                  }))
                }
                options={[
                  {
                    value: 'vacation',
                    label: language === 'ar' ? 'إجازة' : 'Vacation',
                  },
                  {
                    value: 'emergency_fund',
                    label:
                      language === 'ar' ? 'صندوق الطوارئ' : 'Emergency Fund',
                  },
                  {
                    value: 'debt',
                    label: language === 'ar' ? 'سداد الديون' : 'Debt Payoff',
                  },
                  {
                    value: 'savings',
                    label: language === 'ar' ? 'مدخرات' : 'Savings',
                  },
                  {
                    value: 'investment',
                    label: language === 'ar' ? 'استثمار' : 'Investment',
                  },
                ]}
              />
              <Select
                label={language === 'ar' ? 'الأولوية' : 'Priority'}
                value={newGoal.priority}
                onChange={(e) =>
                  setNewGoal((prev) => ({
                    ...prev,
                    priority: e.target.value as any,
                  }))
                }
                options={[
                  {
                    value: 'high',
                    label: language === 'ar' ? 'عالية' : 'High',
                  },
                  {
                    value: 'medium',
                    label: language === 'ar' ? 'متوسطة' : 'Medium',
                  },
                  { value: 'low', label: language === 'ar' ? 'منخفضة' : 'Low' },
                ]}
              />
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                className="flex-1"
              >
                {t('common.cancel', language)}
              </Button>
              <Button onClick={handleCreateGoal} className="flex-1">
                {t('common.save', language)}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
