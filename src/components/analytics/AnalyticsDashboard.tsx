import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Target,
} from 'lucide-react';
import { Card } from '../ui/Card';
import { StatsCard } from '../dashboard/StatsCard';
import { ExpensePieChart } from '../charts/PieChart';
import { CashflowBarChart } from '../charts/BarChart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { generateAnalyticsData, mockDashboardData } from '../../data/mockData';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../utils/translations';
import { formatCurrency } from '../../utils/aiModes';
import NeoFinanceAgent from '../ai/NeoFinanceAgent';

export const AnalyticsDashboard: React.FC = () => {
  const { language } = useLanguage();
  const analyticsData = generateAnalyticsData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('analytics.title', language)}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('analytics.subtitle', language)}
        </p>
      </div>

      {/* AI Finance Agent */}
      <NeoFinanceAgent />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={t('analytics.savingsRate', language)}
          value={20}
          change={5.2}
          icon={TrendingUp}
          color="green"
          format="percentage"
        />
        <StatsCard
          title="Monthly Growth"
          value={12.5}
          change={2.1}
          icon={BarChart3}
          color="blue"
          format="percentage"
        />
        <StatsCard
          title="Expense Ratio"
          value={80}
          change={-3.2}
          icon={PieChart}
          color="yellow"
          format="percentage"
        />
        <StatsCard
          title="Goal Progress"
          value={65}
          change={8.7}
          icon={Target}
          color="teal"
          format="percentage"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trends */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('analytics.spendingTrends', language)}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.spendingTrends}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="month"
                  className="text-gray-600 dark:text-gray-400"
                  fontSize={12}
                />
                <YAxis
                  className="text-gray-600 dark:text-gray-400"
                  fontSize={12}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="spending"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.1}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#14B8A6"
                  fill="#14B8A6"
                  fillOpacity={0.1}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Income Analysis */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('analytics.incomeAnalysis', language)}
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.spendingTrends}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis
                  dataKey="month"
                  className="text-gray-600 dark:text-gray-400"
                  fontSize={12}
                />
                <YAxis
                  className="text-gray-600 dark:text-gray-400"
                  fontSize={12}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#14B8A6"
                  strokeWidth={3}
                  dot={{ fill: '#14B8A6', strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Category Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <ExpensePieChart
            data={mockDashboardData.spendingByCategory}
            title={t('analytics.categoryBreakdown', language)}
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {t('analytics.monthlyComparison', language)}
          </h3>
          <div className="space-y-4">
            {analyticsData.categoryTrends.slice(0, 5).map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <span className="font-medium text-gray-900 dark:text-white">
                  {category.category}
                </span>
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatCurrency(category.thisMonth)}
                  </span>
                  <div
                    className={`flex items-center space-x-1 ${
                      category.change >= 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {category.change >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    <span className="text-sm font-medium">
                      {Math.abs(category.change).toFixed(1)}%
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Predictions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {t('analytics.predictions', language)}
        </h3>
        <CashflowBarChart
          data={mockDashboardData.cashflowPrediction}
          title="90-Day Financial Forecast"
        />
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
