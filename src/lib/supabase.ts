import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  job_type: string;
  city: string;
  monthly_income: number;
  risk_profile: 'conservative' | 'moderate' | 'aggressive';
  created_at: string;
  updated_at: string;
}

export interface UserGoal {
  id: string;
  user_id: string;
  title: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
  category: 'vacation' | 'emergency_fund' | 'debt' | 'savings' | 'investment';
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  created_at: string;
}

export interface UserExpense {
  id: string;
  user_id: string;
  category: string;
  monthly_amount: number;
  created_at: string;
  updated_at: string;
}