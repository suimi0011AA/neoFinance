import React from 'react';
import { DollarSign } from 'lucide-react';
import { Input } from '../ui/Input';
import { ExpenseCategory } from '../../types';
import { expenseCategories } from '../../data/mockData';
import { formatCurrency } from '../../utils/aiModes';

interface FinancialInfoStepProps {
  data: {
    monthlyIncome: number;
    expenses: Record<ExpenseCategory, number>;
  };
  onChange: (data: any) => void;
}

export const FinancialInfoStep: React.FC<FinancialInfoStepProps> = ({
  data,
  onChange,
}) => {
  const handleIncomeChange = (value: number) => {
    onChange({ monthlyIncome: value });
  };

  const handleExpenseChange = (category: ExpenseCategory, value: number) => {
    onChange({
      expenses: {
        ...data.expenses,
        [category]: value,
      },
    });
  };

  const totalExpenses = Object.values(data.expenses).reduce(
    (sum, amount) => sum + amount,
    0
  );
  const remainingIncome = data.monthlyIncome - totalExpenses;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your Financial Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell us about your monthly income and expenses
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Monthly Income (SAR)"
          type="number"
          placeholder=""
          value={data.monthlyIncome}
          onChange={(e) => handleIncomeChange(parseInt(e.target.value) || 0)}
          icon={<DollarSign className="h-5 w-5 text-gray-400" />}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Monthly Expenses
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expenseCategories.map((category) => (
              <Input
                key={category.value}
                label={`${category.icon} ${category.label}`}
                type="number"
                placeholder=""
                value={data.expenses[category.value]}
                onChange={(e) =>
                  handleExpenseChange(
                    category.value,
                    parseInt(e.target.value) || 0
                  )
                }
              />
            ))}
          </div>
        </div>

        {data.monthlyIncome > 0 && (
          <div className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-xl p-4 border border-teal-200 dark:border-teal-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Total Expenses:
              </span>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {formatCurrency(totalExpenses)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Remaining Income:
              </span>
              <span
                className={`text-sm font-semibold ${
                  remainingIncome >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {formatCurrency(remainingIncome)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
