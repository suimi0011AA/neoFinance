import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  Target,
  PiggyBank,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardData } from '../../types';
import { StatsCard } from './StatsCard';
import { GoalCard } from './GoalCard';
import { AIRecommendationCard } from './AIRecommendationCard';
import { ExpensePieChart } from '../charts/PieChart';
import { CashflowBarChart } from '../charts/BarChart';
import { Card } from '../ui/Card';
import { useDatabase } from '../../hooks/useDatabase';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../utils/translations';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { expenseCategories } from '../../data/mockData';

interface DashboardOverviewProps {
  data: DashboardData;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  data,
}) => {
  const [userGoals, setUserGoals] = useState<any[]>([]);
  const [userTransactions, setUserTransactions] = useState<any[]>([]);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    category: 'food',
    description: '',
  });
  const [incomeForm, setIncomeForm] = useState({
    amount: '',
    source: '',
    description: '',
  });

  const {
    getUserGoals,
    getUserTransactions,
    addTransaction,
    updateGoalProgress,
  } = useDatabase();
  const { language } = useLanguage();

  useEffect(() => {
    if (data?.userId) {
      loadUserData();
    }
  }, [data]);

  const loadUserData = async () => {
    try {
      const [goals, transactions] = await Promise.all([
        getUserGoals(data.userId),
        getUserTransactions(data.userId),
      ]);
      setUserGoals(goals);
      setUserTransactions(transactions);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleAddExpense = async () => {
    if (!expenseForm.amount || !expenseForm.description) return;

    try {
      await addTransaction(data.userId, {
        type: 'expense',
        amount: parseFloat(expenseForm.amount),
        category: expenseForm.category,
        description: expenseForm.description,
      });
      setExpenseForm({ amount: '', category: 'food', description: '' });
      setShowAddExpense(false);
      loadUserData();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const handleAddIncome = async () => {
    if (!incomeForm.amount || !incomeForm.source) return;

    try {
      await addTransaction(data.userId, {
        type: 'income',
        amount: parseFloat(incomeForm.amount),
        category: 'income',
        description: incomeForm.source,
      });
      setIncomeForm({ amount: '', source: '', description: '' });
      setShowAddIncome(false);
      loadUserData();
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  const handleUpdateGoal = async (goalId: string, amount: number) => {
    try {
      const goal = userGoals.find((g) => g.id === goalId);
      if (goal) {
        const newAmount = Math.min(
          goal.current_amount + amount,
          goal.target_amount
        );
        await updateGoalProgress(goalId, newAmount);
        loadUserData();
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const savingsRate = ((data.totalSavings / data.totalIncome) * 100).toFixed(1);
  const budgetUtilization = (
    (data.totalExpenses / data.monthlyBudget) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          {language === 'ar' ? 'مرحباً بعودتك' : 'Welcome back'},{' '}
          {data.userName || 'User'}! 👋
        </h1>
        <p className="text-teal-100">
          {language === 'ar'
            ? `إليك نظرة عامة على أموالك لهذا الشهر. أنت توفر ${savingsRate}% من دخلك!`
            : `Here's your financial overview for this month. You're saving ${savingsRate}% of your income!`}
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Monthly Income"
          value={data.totalIncome}
          change={5.2}
          icon={DollarSign}
          color="teal"
        />
        <StatsCard
          title="Total Expenses"
          value={data.totalExpenses}
          change={-2.1}
          icon={TrendingUp}
          color="red"
        />
        <StatsCard
          title="Total Savings"
          value={data.totalSavings}
          change={12.5}
          icon={PiggyBank}
          color="green"
        />
        <StatsCard
          title="Budget Usage"
          value={parseFloat(budgetUtilization)}
          icon={AlertCircle}
          color={parseFloat(budgetUtilization) > 90 ? 'red' : 'yellow'}
          format="percentage"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ExpensePieChart
            data={data.spendingByCategory}
            title="Spending Breakdown"
          />
        </Card>
        <Card className="p-6">
          <CashflowBarChart
            data={data.cashflowPrediction}
            title="Cashflow Forecast"
          />
        </Card>
      </div>

      {/* Goals and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Goals Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.yourGoals', language)}
          </h2>
          <div className="space-y-4">
            {userGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={{
                  id: goal.id,
                  title: goal.title,
                  targetAmount: goal.target_amount,
                  currentAmount: goal.current_amount,
                  deadline: new Date(goal.deadline),
                  category: goal.category,
                  priority: goal.priority,
                }}
                onUpdate={handleUpdateGoal}
              />
            ))}
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('dashboard.aiRecommendations', language)}
          </h2>
          <div className="space-y-4">
            {data.aiRecommendations.map((recommendation) => (
              <AIRecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('dashboard.quickActions', language)}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddExpense(true)}
            className="p-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="text-2xl mb-2">💸</div>
            <div className="text-sm">
              {t('dashboard.actions.addExpense', language)}
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddIncome(true)}
            className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="text-2xl mb-2">💰</div>
            <div className="text-sm">
              {t('dashboard.actions.logIncome', language)}
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm">
              {t('dashboard.actions.updateGoal', language)}
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-4 rounded-xl bg-gradient-to-r from-teal-500 to-green-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <div className="text-2xl mb-2">🤖</div>
            <div className="text-sm">
              {t('dashboard.actions.askAI', language)}
            </div>
          </motion.button>
        </div>
      </Card>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('dashboard.actions.addExpense', language)}
            </h3>
            <div className="space-y-4">
              <Input
                label={
                  language === 'ar' ? 'المبلغ (ريال سعودي)' : 'Amount (SAR)'
                }
                type="number"
                value={expenseForm.amount}
                onChange={(e) =>
                  setExpenseForm((prev) => ({
                    ...prev,
                    amount: e.target.value,
                  }))
                }
                placeholder=""
              />
              <Select
                label={language === 'ar' ? 'الفئة' : 'Category'}
                value={expenseForm.category}
                onChange={(e) =>
                  setExpenseForm((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                options={expenseCategories.map((cat) => ({
                  value: cat.value,
                  label: cat.label,
                }))}
              />
              <Input
                label={language === 'ar' ? 'الوصف' : 'Description'}
                value={expenseForm.description}
                onChange={(e) =>
                  setExpenseForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder=""
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddExpense(false)}
                className="flex-1"
              >
                {t('common.cancel', language)}
              </Button>
              <Button onClick={handleAddExpense} className="flex-1">
                {t('common.add', language)}
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Income Modal */}
      {showAddIncome && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('dashboard.actions.logIncome', language)}
            </h3>
            <div className="space-y-4">
              <Input
                label={
                  language === 'ar' ? 'المبلغ (ريال سعودي)' : 'Amount (SAR)'
                }
                type="number"
                value={incomeForm.amount}
                onChange={(e) =>
                  setIncomeForm((prev) => ({ ...prev, amount: e.target.value }))
                }
                placeholder=""
              />
              <Input
                label={language === 'ar' ? 'المصدر' : 'Source'}
                value={incomeForm.source}
                onChange={(e) =>
                  setIncomeForm((prev) => ({ ...prev, source: e.target.value }))
                }
                placeholder=""
              />
              <Input
                label={language === 'ar' ? 'الوصف' : 'Description'}
                value={incomeForm.description}
                onChange={(e) =>
                  setIncomeForm((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder=""
              />
            </div>
            <div className="flex space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAddIncome(false)}
                className="flex-1"
              >
                {t('common.cancel', language)}
              </Button>
              <Button onClick={handleAddIncome} className="flex-1">
                {t('common.add', language)}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
