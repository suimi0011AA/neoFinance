import React from 'react';
import { Plane, Shield, CreditCard, Calendar } from 'lucide-react';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';

interface GoalsStepProps {
  data: {
    vacation: { enabled: boolean; amount: number; deadline: string };
    emergencyFund: { enabled: boolean; amount: number; deadline: string };
    debt: { enabled: boolean; amount: number; deadline: string };
  };
  onChange: (data: any) => void;
}

const goalTypes = [
  {
    key: 'vacation' as const,
    title: 'Dream Vacation',
    description: 'Save for that perfect getaway',
    icon: Plane,
    color: 'from-blue-500 to-purple-500'
  },
  {
    key: 'emergencyFund' as const,
    title: 'Emergency Fund',
    description: 'Build financial security',
    icon: Shield,
    color: 'from-green-500 to-emerald-500'
  },
  {
    key: 'debt' as const,
    title: 'Debt Payoff',
    description: 'Become debt-free faster',
    icon: CreditCard,
    color: 'from-red-500 to-pink-500'
  }
];

export const GoalsStep: React.FC<GoalsStepProps> = ({ data, onChange }) => {
  const handleGoalToggle = (goalKey: keyof typeof data) => {
    onChange({
      [goalKey]: {
        ...data[goalKey],
        enabled: !data[goalKey].enabled
      }
    });
  };

  const handleGoalChange = (goalKey: keyof typeof data, field: 'amount' | 'deadline', value: any) => {
    onChange({
      [goalKey]: {
        ...data[goalKey],
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Set Your Financial Goals
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          What would you like to achieve? (Optional - you can add more later)
        </p>
      </div>

      <div className="space-y-4">
        {goalTypes.map((goal) => (
          <Card key={goal.key} className="p-6" hover>
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 bg-gradient-to-r ${goal.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <goal.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {goal.description}
                    </p>
                  </div>
                  
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={data[goal.key].enabled}
                      onChange={() => handleGoalToggle(goal.key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                {data[goal.key].enabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Target Amount (SAR)"
                      type="number"
                      placeholder=""
                      value={data[goal.key].amount}
                      onChange={(e) => handleGoalChange(goal.key, 'amount', parseInt(e.target.value) || 0)}
                    />
                    <Input
                      label="Target Date"
                      type="date"
                      value={data[goal.key].deadline}
                      onChange={(e) => handleGoalChange(goal.key, 'deadline', e.target.value)}
                      icon={<Calendar className="h-5 w-5 text-gray-400" />}
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};