import { AIMode, AIRecommendation } from '../types';

export const aiModeConfig = {
  advisor: {
    name: 'Financial Advisor',
    icon: '💼',
    description: 'Professional and analytical guidance',
    tone: 'formal'
  },
  coach: {
    name: 'Financial Coach',
    icon: '🤝',
    description: 'Friendly and supportive advice',
    tone: 'supportive'
  },
  motivator: {
    name: 'Financial Motivator',
    icon: '🚀',
    description: 'Goal-driven and energetic push',
    tone: 'energetic'
  }
};

export const generateAIResponse = (question: string, mode: AIMode, userData: any): string => {
  // This would integrate with GPT/Gemini in a real implementation
  const responses = {
    advisor: {
      spending: "Based on your financial data, I recommend implementing a structured budget allocation strategy. Consider the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment.",
      saving: "Your current savings rate is commendable. To optimize returns, consider diversifying your emergency fund across high-yield savings accounts and low-risk money market funds.",
      investment: "Given your moderate risk profile, I suggest a balanced portfolio with 60% stocks and 40% bonds, focusing on low-cost index funds for long-term growth."
    },
    coach: {
      spending: "Great job tracking your expenses! I notice you're doing well with most categories. Let's work together on creating small, sustainable changes that won't feel restrictive.",
      saving: "You're on the right track with your savings goals! Remember, every riyal counts, and you're building amazing financial habits. Keep up the momentum!",
      investment: "Investing can feel overwhelming, but you've got this! Start small, stay consistent, and remember that time in the market beats timing the market."
    },
    motivator: {
      spending: "You're capable of incredible financial discipline! Cut that unnecessary spending and watch your wealth grow. Every riyal you save today is a riyal working for your future self!",
      saving: "Your goals are within reach! Push harder, save more, and don't let anything stand between you and financial freedom. You're stronger than your spending impulses!",
      investment: "This is your moment to take control! Start investing NOW and compound your way to wealth. Future you will thank present you for taking action today!"
    }
  };

  // Simple keyword matching for demo purposes
  if (question.toLowerCase().includes('spend')) {
    return responses[mode].spending;
  } else if (question.toLowerCase().includes('save')) {
    return responses[mode].saving;
  } else {
    return responses[mode].investment;
  }
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (amount: number): string => {
  return new Intl.NumberFormat('en-US').format(amount);
};