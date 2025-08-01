import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { GoalsManagement } from './components/goals/GoalsManagement';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { SpendingAnalysis } from './components/spending/SpendingAnalysis';
import { AIChat } from './components/dashboard/AIChat';
import { SettingsPanel } from './components/settings/SettingsPanel';
import { mockDashboardData } from './data/mockData';
import { useTheme } from './hooks/useTheme';
import { useLanguage } from './hooks/useLanguage';
import NeoFinanceAgent from './components/ai/NeoFinanceAgent';
import { useDatabase } from './hooks/useDatabase';

type AppState = 'landing' | 'onboarding' | 'app';

function App() {
  const [appState, setAppState] = useState<AppState>('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userData, setUserData] = useState(null);
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { createUserProfile } = useDatabase();

  const handleGetStarted = () => {
    setAppState('onboarding');
  };

  const handleOnboardingComplete = async (data: any) => {
    try {
      // For now, let's skip the database creation and go directly to the app
      // This ensures the user can proceed even if there are database issues
      console.log('Onboarding data:', data);
      
      // Create a mock user profile from the onboarding data
      const mockUserProfile = {
        id: 'mock-user-id',
        personalInfo: data.personalInfo,
        financialInfo: data.financialInfo,
        goals: data.goals,
        preferences: data.preferences,
        monthly_income: data.financialInfo.monthlyIncome,
        name: data.personalInfo.name,
        email: data.personalInfo.email,
        age: data.personalInfo.age,
        job_type: data.personalInfo.jobType,
        city: data.personalInfo.city,
        risk_profile: data.preferences.riskProfile
      };
      
      setUserData(mockUserProfile);
      setAppState('app');
      
      // Optionally try to create the user profile in the background
      try {
        await createUserProfile(data);
      } catch (error) {
        console.warn('Background user profile creation failed:', error);
      }
    } catch (error) {
      console.error('Error during onboarding completion:', error);
      // Even if there's an error, let the user proceed
      const mockUserProfile = {
        id: 'mock-user-id',
        personalInfo: data.personalInfo,
        financialInfo: data.financialInfo,
        goals: data.goals,
        preferences: data.preferences,
        monthly_income: data.financialInfo.monthlyIncome,
        name: data.personalInfo.name,
        email: data.personalInfo.email,
        age: data.personalInfo.age,
        job_type: data.personalInfo.jobType,
        city: data.personalInfo.city,
        risk_profile: data.preferences.riskProfile
      };
      
      setUserData(mockUserProfile);
      setAppState('app');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardOverview data={mockDashboardData} />;
      case 'goals':
        return <GoalsManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'spending':
        return <SpendingAnalysis />;
      case 'ai-chat':
        return <AIChat userData={userData} />;
      case 'settings':
        return <SettingsPanel userData={userData} />;
      case 'neo-agent':
        return <NeoFinanceAgent userData={userData} />;

      default:
        return <DashboardOverview data={mockDashboardData} />;
    }
  };

  if (appState === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  if (appState === 'onboarding') {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ${theme} ${
        language === 'ar' ? 'font-arabic' : ''
      }`}
    >
      <Header
        onMenuClick={() => setSidebarOpen(true)}
        userName={userData?.personalInfo?.name || 'Abdullah'}
      />

      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <main className="flex-1 p-4 lg:p-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto"
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default App;
