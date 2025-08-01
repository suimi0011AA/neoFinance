import { DashboardData, AIRecommendation, ExpenseCategory, Notification, Expense, Income } from '../types';

export const mockDashboardData: DashboardData = {
  totalIncome: 3000,
  totalExpenses: 2400,
  totalSavings: 600,
  monthlyBudget: 2800,
  goals: [
    {
      id: '1',
      title: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 3500,
      deadline: new Date('2024-12-31'),
      category: 'emergency_fund',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Vacation to Dubai',
      targetAmount: 5000,
      currentAmount: 1200,
      deadline: new Date('2024-08-15'),
      category: 'vacation',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Investment Portfolio',
      targetAmount: 15000,
      currentAmount: 2800,
      deadline: new Date('2025-06-30'),
      category: 'investment',
      priority: 'low'
    }
  ],
  recentTransactions: [
    {
      id: '1',
      category: 'food',
      amount: 45,
      description: 'Lunch at restaurant',
      date: new Date('2024-01-15')
    },
    {
      id: '2',
      source: 'Salary',
      amount: 3000,
      frequency: 'monthly',
      date: new Date('2024-01-01')
    },
    {
      id: '3',
      category: 'transportation',
      amount: 25,
      description: 'Uber ride',
      date: new Date('2024-01-14')
    }
  ],
  spendingByCategory: {
    food: 900,
    rent: 1200,
    transportation: 150,
    entertainment: 100,
    utilities: 50,
    healthcare: 0,
    shopping: 0,
    education: 0,
    other: 0
  },
  savingsProgress: 65,
  cashflowPrediction: [
    { period: '30', income: 3000, expenses: 2400, savings: 600, confidence: 85 },
    { period: '60', income: 6000, expenses: 4800, savings: 1200, confidence: 78 },
    { period: '90', income: 9000, expenses: 7200, savings: 1800, confidence: 72 }
  ],
  aiRecommendations: [
    {
      id: '1',
      type: 'spending',
      title: 'Reduce Dining Out',
      description: 'You spend 30% more on food than similar users. Consider cooking at home 2-3 times per week.',
      impact: 300,
      priority: 'high',
      actionable: true
    },
    {
      id: '2',
      type: 'saving',
      title: 'Automate Savings',
      description: 'Set up automatic transfers to reach your emergency fund goal faster.',
      impact: 500,
      priority: 'medium',
      actionable: true
    }
  ]
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Budget Alert',
    message: 'You have spent 85% of your monthly budget',
    type: 'warning',
    read: false,
    createdAt: new Date('2024-01-15T10:30:00')
  },
  {
    id: '2',
    title: 'Goal Achievement',
    message: 'Congratulations! You reached 50% of your vacation goal',
    type: 'success',
    read: false,
    createdAt: new Date('2024-01-14T15:45:00')
  },
  {
    id: '3',
    title: 'AI Recommendation',
    message: 'New saving strategy available based on your spending patterns',
    type: 'info',
    read: true,
    createdAt: new Date('2024-01-13T09:15:00')
  }
];

export const expenseCategories: { value: ExpenseCategory; label: string; icon: string }[] = [
  { value: 'food', label: 'Food & Dining', icon: '🍽️' },
  { value: 'rent', label: 'Rent & Housing', icon: '🏠' },
  { value: 'transportation', label: 'Transportation', icon: '🚗' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'utilities', label: 'Utilities', icon: '💡' },
  { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
  { value: 'shopping', label: 'Shopping', icon: '🛍️' },
  { value: 'education', label: 'Education', icon: '📚' },
  { value: 'other', label: 'Other', icon: '📋' }
];

export const saudiCities = [
  'Riyadh', 'Jeddah', 'Mecca', 'Medina', 'Dammam', 'Khobar', 'Dhahran',
  'Taif', 'Buraidah', 'Tabuk', 'Hail', 'Abha', 'Najran', 'Jizan', 'Yanbu'
];

export const jobTypes = [
  'Student', 'Software Engineer', 'Teacher', 'Doctor', 'Nurse', 'Engineer',
  'Accountant', 'Sales', 'Marketing', 'Business Owner', 'Freelancer',
  'Government Employee', 'Consultant', 'Other'
];

// Generate mock analytics data
export const generateAnalyticsData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return {
    spendingTrends: months.map(month => ({
      month,
      spending: Math.floor(Math.random() * 1000) + 2000,
      income: Math.floor(Math.random() * 500) + 2800,
      savings: Math.floor(Math.random() * 300) + 400
    })),
    categoryTrends: expenseCategories.map(cat => ({
      category: cat.label,
      thisMonth: Math.floor(Math.random() * 500) + 100,
      lastMonth: Math.floor(Math.random() * 500) + 100,
      change: (Math.random() - 0.5) * 40
    }))
  };
};

// Generate mock spending data
export const generateSpendingData = () => {
  const transactions: (Expense & { id: string })[] = [];
  const categories = expenseCategories;
  
  for (let i = 0; i < 20; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    transactions.push({
      id: `expense-${i}`,
      category: category.value,
      amount: Math.floor(Math.random() * 200) + 20,
      description: `${category.label} expense`,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    });
  }
  
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};