import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Play, 
  Brain, 
  Target, 
  TrendingUp, 
  Shield, 
  Globe, 
  MapPin,
  Users,
  PiggyBank,
  Award,
  Smartphone,
  BarChart3,
  Zap,
  X
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../utils/translations';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { language, toggleLanguage } = useLanguage();
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      icon: Brain,
      title: t('features.items.0.title', language),
      description: t('features.items.0.description', language),
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: BarChart3,
      title: t('features.items.1.title', language),
      description: t('features.items.1.description', language),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: t('features.items.2.title', language),
      description: t('features.items.2.description', language),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: t('features.items.3.title', language),
      description: t('features.items.3.description', language),
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Globe,
      title: t('features.items.4.title', language),
      description: t('features.items.4.description', language),
      color: 'from-teal-500 to-green-500'
    },
    {
      icon: MapPin,
      title: t('features.items.5.title', language),
      description: t('features.items.5.description', language),
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const DemoModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setShowDemo(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('demo.title', language)}
          </h3>
          <Button variant="ghost" size="sm" onClick={() => setShowDemo(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="space-y-6">
          <div className="aspect-video bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="h-10 w-10" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Interactive Demo</h4>
              <p className="text-teal-100">Experience NeoFinance features in action</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                🤖 AI-Powered Insights
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Get personalized recommendations based on your spending patterns and financial goals.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                📊 Smart Analytics
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Visualize your financial data with interactive charts and real-time insights.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                🎯 Goal Tracking
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Set and achieve financial goals with intelligent progress tracking and reminders.
              </p>
            </Card>
            
            <Card className="p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                🔮 Future Predictions
              </h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Forecast your financial future with advanced analytics and scenario planning.
              </p>
            </Card>
          </div>
          
          <div className="text-center">
            <Button onClick={onGetStarted} size="lg" className="mx-auto">
              {t('hero.cta', language)}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-green-50 dark:from-teal-900/20 dark:via-gray-900 dark:to-green-900/20">
      {/* Header */}
      <header className="relative z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                  NeoFinance
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'العربية' : 'English'}</span>
              </Button>
              <Button onClick={onGetStarted}>
                {t('hero.cta', language)}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {t('hero.title', language)}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('hero.subtitle', language)}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={onGetStarted}
                  className="flex items-center space-x-2"
                >
                  <span>{t('hero.cta', language)}</span>
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowDemo(true)}
                  className="flex items-center space-x-2"
                >
                  <Play className="h-5 w-5" />
                  <span>{t('hero.demo', language)}</span>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl mx-auto mb-2">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('hero.stats.users', language)}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl mx-auto mb-2">
                    <PiggyBank className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('hero.stats.savings', language)}
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl mx-auto mb-2">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('hero.stats.goals', language)}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <Card className="p-8" glass>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Monthly Overview
                      </h3>
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-r from-teal-500/10 to-green-500/10 rounded-xl p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Income</p>
                        <p className="text-2xl font-bold text-teal-600">3,000 SAR</p>
                      </div>
                      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Savings</p>
                        <p className="text-2xl font-bold text-blue-600">600 SAR</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Emergency Fund</span>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '35%' }}
                          transition={{ duration: 1.5, delay: 1 }}
                          className="bg-gradient-to-r from-teal-500 to-green-500 h-2 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Brain className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">AI Insight</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        You can save an extra 200 SAR this month by reducing dining out expenses.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('features.title', language)}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('features.subtitle', language)}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 h-full" hover>
                  <div className="space-y-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('demo.title', language)}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('demo.subtitle', language)}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <Card className="p-8" glass>
              <div className="aspect-video bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={() => setShowDemo(true)}
                  className="flex items-center space-x-3"
                >
                  <Play className="h-6 w-6" />
                  <span className="text-lg">Watch Demo</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-green-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              {t('cta.title', language)}
            </h2>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto">
              {t('cta.subtitle', language)}
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={onGetStarted}
              className="bg-white text-teal-600 hover:bg-gray-50 flex items-center space-x-2 mx-auto"
            >
              <span>{t('cta.button', language)}</span>
              <ArrowRight className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <h3 className="text-xl font-bold">NeoFinance</h3>
            </div>
            <p className="text-gray-400">
              Empowering financial futures with AI-driven insights
            </p>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      {showDemo && <DemoModal />}
    </div>
  );
};