import { useState, useEffect } from 'react';
import { supabase, UserProfile, UserGoal, Transaction, UserExpense } from '../lib/supabase';
import { User } from '../types';

export const useDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUserProfile = async (userData: any): Promise<UserProfile | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .insert([{
          name: userData.personalInfo.name,
          email: userData.personalInfo.email,
          age: userData.personalInfo.age,
          job_type: userData.personalInfo.jobType,
          city: userData.personalInfo.city,
          monthly_income: userData.financialInfo.monthlyIncome,
          risk_profile: userData.preferences.riskProfile
        }])
        .select()
        .single();

      if (error) throw error;

      // Create user expenses
      const expensePromises = Object.entries(userData.financialInfo.expenses).map(([category, amount]) => 
        supabase.from('user_expenses').insert([{
          user_id: data.id,
          category,
          monthly_amount: amount as number
        }])
      );

      await Promise.all(expensePromises);

      // Create user goals
      const goalPromises = Object.entries(userData.goals)
        .filter(([_, goal]: [string, any]) => goal.enabled)
        .map(([category, goal]: [string, any]) => 
          supabase.from('user_goals').insert([{
            user_id: data.id,
            title: category === 'vacation' ? 'Dream Vacation' : 
                   category === 'emergencyFund' ? 'Emergency Fund' : 'Debt Payoff',
            target_amount: goal.amount,
            current_amount: 0,
            deadline: goal.deadline,
            category: category === 'emergencyFund' ? 'emergency_fund' : category,
            priority: 'medium'
          }])
        );

      await Promise.all(goalPromises);

      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserGoals = async (userId: string): Promise<UserGoal[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('user_goals')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createGoal = async (userId: string, goalData: any): Promise<UserGoal | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('user_goals')
        .insert([{
          user_id: userId,
          title: goalData.title,
          target_amount: goalData.targetAmount,
          current_amount: goalData.currentAmount || 0,
          deadline: goalData.deadline,
          category: goalData.category,
          priority: goalData.priority
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateGoalProgress = async (goalId: string, amount: number): Promise<boolean> => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('user_goals')
        .update({ current_amount: amount })
        .eq('id', goalId);

      if (error) throw error;
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addTransaction = async (userId: string, transactionData: any): Promise<Transaction | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('transactions')
        .insert([{
          user_id: userId,
          type: transactionData.type,
          amount: transactionData.amount,
          category: transactionData.category,
          description: transactionData.description,
          date: transactionData.date || new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserTransactions = async (userId: string): Promise<Transaction[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })
        .limit(50);

      if (error) throw error;
      return data || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getUserExpenses = async (userId: string): Promise<UserExpense[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('user_expenses')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      return data || [];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createUserProfile,
    getUserProfile,
    getUserGoals,
    createGoal,
    updateGoalProgress,
    addTransaction,
    getUserTransactions,
    getUserExpenses
  };
};