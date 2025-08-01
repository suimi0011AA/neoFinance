import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useOnboarding } from '../../hooks/useOnboarding';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { ProgressBar } from '../ui/ProgressBar';
import { PersonalInfoStep } from './PersonalInfoStep';
import { FinancialInfoStep } from './FinancialInfoStep';
import { GoalsStep } from './GoalsStep';
import { PreferencesStep } from './PreferencesStep';

interface OnboardingFlowProps {
  onComplete: (data: any) => void;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { step, data, updateData, nextStep, prevStep, isStepValid, totalSteps } = useOnboarding();

  const handleNext = () => {
    if (step === totalSteps - 1) {
      onComplete(data);
    } else {
      nextStep();
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <PersonalInfoStep
            data={data.personalInfo}
            onChange={(newData) => updateData('personalInfo', newData)}
          />
        );
      case 1:
        return (
          <FinancialInfoStep
            data={data.financialInfo}
            onChange={(newData) => updateData('financialInfo', newData)}
          />
        );
      case 2:
        return (
          <GoalsStep
            data={data.goals}
            onChange={(newData) => updateData('goals', newData)}
          />
        );
      case 3:
        return (
          <PreferencesStep
            data={data.preferences}
            onChange={(newData) => updateData('preferences', newData)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 dark:from-teal-900/20 dark:via-gray-900 dark:to-green-900/20 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="p-8" glass>
          <div className="mb-8">
            <ProgressBar
              value={step + 1}
              max={totalSteps}
              label={`Step ${step + 1} of ${totalSteps}`}
              color="teal"
            />
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>

          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={step === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    i <= step ? 'bg-teal-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!isStepValid(step)}
              className="flex items-center space-x-2"
            >
              <span>{step === totalSteps - 1 ? 'Complete' : 'Next'}</span>
              {step === totalSteps - 1 ? (
                <Check className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};