export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  jobType: string;
  city: string;
  monthlyIncome: number;
  riskProfile: 'conservative' | 'moderate' | 'aggressive';
  createdAt: Date;
  onboardingCompleted: boolean;
}

export interface Expense {
  id: string;
  category: ExpenseCategory;
  amount: number;
  description: string;
  date: Date;
}

export interface Income {
  id: string;
  source: string;
  amount: number;
  frequency: 'monthly' | 'weekly' | 'daily';
  date: Date;
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  category: 'vacation' | 'emergency_fund' | 'debt' | 'savings' | 'investment';
  priority: 'high' | 'medium' | 'low';
}

export type ExpenseCategory = 
  | 'food'
  | 'rent'
  | 'transportation'
  | 'entertainment'
  | 'utilities'
  | 'healthcare'
  | 'shopping'
  | 'education'
  | 'other';

export interface AIRecommendation {
  id: string;
  type: 'saving' | 'spending' | 'investment' | 'budget';
  title: string;
  description: string;
  impact: number;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
}

export interface CashflowPrediction {
  period: '30' | '60' | '90';
  income: number;
  expenses: number;
  savings: number;
  confidence: number;
}

export type AIMode = 'advisor' | 'coach' | 'motivator';

export interface DashboardData {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  monthlyBudget: number;
  goals: FinancialGoal[];
  recentTransactions: (Expense | Income)[];
  spendingByCategory: Record<ExpenseCategory, number>;
  savingsProgress: number;
  cashflowPrediction: CashflowPrediction[];
  aiRecommendations: AIRecommendation[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: Date;
}

export type Language = 'en' | 'ar';