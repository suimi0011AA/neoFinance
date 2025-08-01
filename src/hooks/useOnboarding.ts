import { useState } from 'react';
import { User, ExpenseCategory } from '../types';

interface OnboardingData {
  personalInfo: {
    name: string;
    email: string;
    age: number;
    jobType: string;
    city: string;
  };
  financialInfo: {
    monthlyIncome: number;
    expenses: Record<ExpenseCategory, number>;
  };
  goals: {
    vacation: { enabled: boolean; amount: number; deadline: string };
    emergencyFund: { enabled: boolean; amount: number; deadline: string };
    debt: { enabled: boolean; amount: number; deadline: string };
  };
  preferences: {
    riskProfile: 'conservative' | 'moderate' | 'aggressive';
    savingHabits: string[];
    spendingHabits: string[];
  };
}

export const useOnboarding = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    personalInfo: {
      name: '',
      email: '',
      age: 25,
      jobType: '',
      city: 'Riyadh'
    },
    financialInfo: {
      monthlyIncome: 0,
      expenses: {
        food: 0,
        rent: 0,
        transportation: 0,
        entertainment: 0,
        utilities: 0,
        healthcare: 0,
        shopping: 0,
        education: 0,
        other: 0
      }
    },
    goals: {
      vacation: { enabled: false, amount: 0, deadline: '' },
      emergencyFund: { enabled: false, amount: 0, deadline: '' },
      debt: { enabled: false, amount: 0, deadline: '' }
    },
    preferences: {
      riskProfile: 'moderate',
      savingHabits: [],
      spendingHabits: []
    }
  });

  const updateData = (section: keyof OnboardingData, newData: any) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...newData }
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(0, prev - 1));

  const isStepValid = (currentStep: number): boolean => {
    switch (currentStep) {
      case 0:
        return !!(data.personalInfo.name && data.personalInfo.email && data.personalInfo.city);
      case 1:
        return data.financialInfo.monthlyIncome > 0;
      case 2:
        return true; // Goals are optional
      case 3:
        return true; // Preferences have defaults
      default:
        return true;
    }
  };

  return {
    step,
    data,
    updateData,
    nextStep,
    prevStep,
    isStepValid,
    totalSteps: 4
  };
};