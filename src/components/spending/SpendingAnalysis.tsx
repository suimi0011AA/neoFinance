import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Filter, Search, Calendar, TrendingDown, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { ExpensePieChart } from '../charts/PieChart';
import { generateSpendingData, mockDashboardData, expenseCategories } from '../../data/mockData';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../utils/translations';
import { formatCurrency } from '../../utils/aiModes';
import { format } from 'date-fns';

export const SpendingAnalysis: React.FC = () => {
  const [transactions] = useState(generateSpendingData());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const { language } = useLanguage();

  const filteredTransactions = transactions
    .filter(transaction => 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || transaction.category === selectedCategory)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.amount - a.amount;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return b.date.getTime() - a.date.getTime();
      }
    });

  const totalSpending = transactions.reduce((sum, t) => sum + t.amount, 0);
  const avgTransaction = totalSpending / transactions.length;

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...expenseCategories.map(cat => ({ value: cat.value, label: cat.label }))
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'category', label: 'Category' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('spending.title', language)}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('spending.subtitle', language)}
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>{t('spending.addTransaction', language)}</span>
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Spending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(totalSpending)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Transactions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {transactions.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Avg Transaction</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(avgTransaction)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ExpensePieChart 
            data={mockDashboardData.spendingByCategory} 
            title={t('spending.topCategories', language)}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('spending.monthlySpending', language)}
          </h3>
          <div className="space-y-4">
            {expenseCategories.slice(0, 6).map((category, index) => {
              const amount = mockDashboardData.spendingByCategory[category.value];
              const percentage = (amount / totalSpending) * 100;
              
              return (
                <motion.div
                  key={category.value}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category.icon} {category.label}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatCurrency(amount)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="bg-gradient-to-r from-teal-500 to-green-500 h-2 rounded-full"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Transactions List */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('spending.recentTransactions', language)}
            </h3>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={categoryOptions}
              />
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={sortOptions}
              />
            </div>
          </div>

          <div className="space-y-2">
            {filteredTransactions.map((transaction, index) => {
              const category = expenseCategories.find(cat => cat.value === transaction.category);
              
              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{category?.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {category?.label} • {format(transaction.date, 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-red-600">
                      -{formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};