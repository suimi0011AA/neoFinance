import React from 'react';
import { TrendingUp, Shield, Zap } from 'lucide-react';
import { Card } from '../ui/Card';

interface PreferencesStepProps {
  data: {
    riskProfile: 'conservative' | 'moderate' | 'aggressive';
    savingHabits: string[];
    spendingHabits: string[];
  };
  onChange: (data: any) => void;
}

const riskProfiles = [
  {
    value: 'conservative' as const,
    title: 'Conservative',
    description: 'Safety first, steady growth',
    icon: Shield,
    color: 'from-green-500 to-emerald-500'
  },
  {
    value: 'moderate' as const,
    title: 'Moderate',
    description: 'Balanced approach to risk and reward',
    icon: TrendingUp,
    color: 'from-blue-500 to-purple-500'
  },
  {
    value: 'aggressive' as const,
    title: 'Aggressive',
    description: 'Higher risk for higher returns',
    icon: Zap,
    color: 'from-red-500 to-pink-500'
  }
];

const savingHabits = [
  'Automatic transfers',
  'Round-up savings',
  'Monthly budgeting',
  'Investment planning',
  'Emergency fund first',
  'Goal-based saving'
];

const spendingHabits = [
  'Track every expense',
  'Use cash more often',
  'Compare prices',
  'Avoid impulse buying',
  'Use cashback apps',
  'Budget for entertainment'
];

export const PreferencesStep: React.FC<PreferencesStepProps> = ({ data, onChange }) => {
  const handleRiskProfileChange = (profile: 'conservative' | 'moderate' | 'aggressive') => {
    onChange({ riskProfile: profile });
  };

  const handleHabitToggle = (type: 'savingHabits' | 'spendingHabits', habit: string) => {
    const currentHabits = data[type];
    const newHabits = currentHabits.includes(habit)
      ? currentHabits.filter(h => h !== habit)
      : [...currentHabits, habit];
    
    onChange({ [type]: newHabits });
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Your Financial Preferences
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Help us understand your approach to money management
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Risk Profile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {riskProfiles.map((profile) => (
              <Card
                key={profile.value}
                className={`p-4 cursor-pointer transition-all duration-200 ${
                  data.riskProfile === profile.value
                    ? 'ring-2 ring-teal-500 bg-teal-50 dark:bg-teal-900/20'
                    : 'hover:shadow-lg'
                }`}
                onClick={() => handleRiskProfileChange(profile.value)}
              >
                <div className="text-center space-y-3">
                  <div className={`w-12 h-12 bg-gradient-to-r ${profile.color} rounded-xl flex items-center justify-center mx-auto`}>
                    <profile.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {profile.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {profile.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Preferred Saving Habits
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {savingHabits.map((habit) => (
              <button
                key={habit}
                onClick={() => handleHabitToggle('savingHabits', habit)}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  data.savingHabits.includes(habit)
                    ? 'bg-teal-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {habit}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Spending Control Habits
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {spendingHabits.map((habit) => (
              <button
                key={habit}
                onClick={() => handleHabitToggle('spendingHabits', habit)}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  data.spendingHabits.includes(habit)
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {habit}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};