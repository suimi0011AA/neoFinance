import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ExpenseCategory } from '../../types';
import { expenseCategories } from '../../data/mockData';
import { formatCurrency } from '../../utils/aiModes';

interface PieChartProps {
  data: Record<ExpenseCategory, number>;
  title?: string;
}

const COLORS = [
  '#14B8A6', '#10B981', '#06B6D4', '#3B82F6', '#6366F1', 
  '#8B5CF6', '#A855F7', '#D946EF', '#EC4899'
];

export const ExpensePieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const chartData = expenseCategories
    .map((category, index) => ({
      name: category.label,
      value: data[category.value],
      color: COLORS[index % COLORS.length],
      icon: category.icon
    }))
    .filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {data.icon} {data.name}
          </p>
          <p className="text-sm text-teal-600 dark:text-teal-400 font-semibold">
            {formatCurrency(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry: any) => (
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {entry.payload.icon} {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};