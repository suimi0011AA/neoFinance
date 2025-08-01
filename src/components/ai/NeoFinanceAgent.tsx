import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Lightbulb, TrendingUp, Target, MessageSquare } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { generateFinancialAdvice, generateFinancialInsights, AIAgentResponse } from '../../lib/openai';
import { useDatabase } from '../../hooks/useDatabase';
import { useLanguage } from '../../hooks/useLanguage';
import { formatCurrency } from '../../utils/aiModes';

interface NeoFinanceAgentProps {
  userData?: any;
}

const NeoFinanceAgent: React.FC<NeoFinanceAgentProps> = ({ userData }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<AIAgentResponse | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [userGoals, setUserGoals] = useState<any[]>([]);
  const [userTransactions, setUserTransactions] = useState<any[]>([]);
  
  const { getUserGoals, getUserTransactions } = useDatabase();
  const { language } = useLanguage();

  useEffect(() => {
    if (userData?.id) {
      loadUserData();
      loadInsights();
    }
  }, [userData]);

  const loadUserData = async () => {
    if (!userData?.id) return;
    
    try {
      const [goals, transactions] = await Promise.all([
        getUserGoals(userData.id),
        getUserTransactions(userData.id)
      ]);
      
      setUserGoals(goals);
      setUserTransactions(transactions);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadInsights = async () => {
    if (!userData?.id) return;
    
    try {
      const generatedInsights = await generateFinancialInsights(
        userData,
        userTransactions,
        userGoals,
        language
      );
      setInsights(generatedInsights);
    } catch (error) {
      console.error('Error loading insights:', error);
    }
  };

  const handleQuery = async () => {
    if (!query.trim() || loading) return;

    setLoading(true);
    try {
      const aiResponse = await generateFinancialAdvice(
        userData,
        userGoals,
        userTransactions,
        query,
        language
      );
      setResponse(aiResponse);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setResponse({
        message: language === 'ar' 
          ? 'عذراً، حدث خطأ أثناء معالجة استفسارك. يرجى المحاولة مرة أخرى.'
          : 'Sorry, there was an error processing your query. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleQuery();
    }
  };

  const quickQuestions = language === 'ar' ? [
    'كيف يمكنني توفير المزيد من المال؟',
    'ما هي أفضل استراتيجية استثمار لي؟',
    'كيف يمكنني تحقيق أهدافي المالية بشكل أسرع؟',
    'ما هي نصائحك لتقليل المصروفات؟'
  ] : [
    'How can I save more money?',
    'What\'s the best investment strategy for me?',
    'How can I achieve my financial goals faster?',
    'What are your tips for reducing expenses?'
  ];

  return (
    <div className="space-y-6">
      {/* AI Agent Header */}
      <Card className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-200 dark:border-purple-800">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {language === 'ar' ? 'الوكيل المالي الذكي' : 'NeoFinance AI Agent'}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {language === 'ar' 
                ? 'مستشارك المالي الشخصي المدعوم بالذكاء الاصطناعي'
                : 'Your AI-powered personal financial advisor'
              }
            </p>
          </div>
        </div>
      </Card>

      {/* Financial Insights */}
      {insights.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="h-6 w-6 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {language === 'ar' ? 'رؤى مالية ذكية' : 'Smart Financial Insights'}
            </h3>
          </div>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
              >
                <p className="text-gray-700 dark:text-gray-300">{insight}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      )}

      {/* AI Chat Interface */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <MessageSquare className="h-6 w-6 text-teal-500" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {language === 'ar' ? 'اسأل الوكيل الذكي' : 'Ask the AI Agent'}
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-3">
            <Input
              placeholder={language === 'ar' 
                ? 'اسأل عن أي شيء متعلق بأموالك...'
                : 'Ask anything about your finances...'
              }
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleQuery} 
              disabled={!query.trim() || loading}
              className="flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>{language === 'ar' ? 'إرسال' : 'Send'}</span>
            </Button>
          </div>

          {/* Quick Questions */}
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {language === 'ar' ? 'أسئلة سريعة:' : 'Quick questions:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(question)}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* AI Response */}
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-xl border border-teal-200 dark:border-teal-800"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {language === 'ar' ? 'نصيحة الوكيل الذكي:' : 'AI Agent Advice:'}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {response.message}
                  </p>
                  
                  {response.recommendations && response.recommendations.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">
                        {language === 'ar' ? 'التوصيات:' : 'Recommendations:'}
                      </h5>
                      <ul className="list-disc list-inside space-y-1">
                        {response.recommendations.map((rec, index) => (
                          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'يفكر الوكيل الذكي...' : 'AI Agent is thinking...'}
                </span>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Financial Summary */}
      {userData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'الدخل الشهري' : 'Monthly Income'}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(userData.monthly_income || 0)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'الأهداف النشطة' : 'Active Goals'}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {userGoals.length}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {language === 'ar' ? 'المعاملات الأخيرة' : 'Recent Transactions'}
                </p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {userTransactions.length}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default NeoFinanceAgent;