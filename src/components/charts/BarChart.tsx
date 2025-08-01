import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CashflowPrediction } from '../../types';
import { formatCurrency } from '../../utils/aiModes';

interface CashflowBarChartProps {
  data: CashflowPrediction[];
  title?: string;
}

export const CashflowBarChart: React.FC<CashflowBarChartProps> = ({ data, title }) => {
  const chartData = data.map(item => ({
    period: `${item.period} Days`,
    Income: item.income,
    Expenses: item.expenses,
    Savings: item.savings,
    confidence: item.confidence
  }));

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
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Confidence: {payload[0]?.payload?.confidence}%
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
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="period" 
            className="text-gray-600 dark:text-gray-400"
            fontSize={12}
          />
          <YAxis 
            className="text-gray-600 dark:text-gray-400"
            fontSize={12}
            tickFormatter={(value) => `${value/1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Income" fill="#14B8A6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill="#EF4444" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Savings" fill="#10B981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};