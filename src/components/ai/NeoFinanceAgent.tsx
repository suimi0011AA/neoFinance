import React, { useState, useRef, useEffect } from 'react';
import {
  Calculator,
  TrendingUp,
  PieChart,
  Bot,
  User,
  Send,
  Globe,
  Languages,
  Sun,
  Moon,
  Lightbulb,
  MessageSquare,
  Zap,
  Play,
  Pause,
  RotateCcw,
  AlertCircle
} from 'lucide-react';

const NeoFinanceAgent = () => {
  const [language, setLanguage] = useState('ar');
  const [darkMode, setDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [calculatorMode, setCalculatorMode] = useState('loan');
  const [calculatorInputs, setCalculatorInputs] = useState({
    loanAmount: '',
    interestRate: '',
    loanTerm: '',
    investmentAmount: '',
    annualReturn: '',
    investmentTerm: '',
    monthlyIncome: '',
    fixedExpenses: '',
    savingsGoal: '',
    zakatAmount: ''
  });
  const [digitalTwinData, setDigitalTwinData] = useState({
    totalAssets: 250000,
    monthlyIncome: 12000,
    monthlyExpenses: 7500,
    savingsRate: 37.5,
    investmentGrowth: 14.2,
    riskScore: 55,
    netWorth: 180000,
    creditScore: 780,
    debtToIncome: 12.8,
    emergencyFund: 45000,
    investmentPortfolio: 125000
  });
  const [isSimulating, setIsSimulating] = useState(false);
  const [smartInsights, setSmartInsights] = useState([]);
  const [showInsights, setShowInsights] = useState(true);
  const messagesEndRef = useRef(null);

  // الترجمات
  const translations = {
    ar: {
      title: "NeoFinance Agent الذكي",
      subtitle: "مساعدك المالي الذكي المدعوم بالتوأم الرقمي والذكاء الاصطناعي المتقدم",
      welcomeMessage: "🤖 مرحباً! أنا NeoFinance Agent - مساعدك المالي الذكي المتطور. أستطيع تحليل وضعك المالي، تقديم نصائح مخصصة، ومساعدتك في تحقيق أهدافك المالية. كيف يمكنني مساعدتك اليوم؟",
      serverOffline: "⚠️ النظام يعمل بالوضع التلقائي",
      scenarios: {
        loan: { title: "حساب القرض والفوائد", desc: "احسب القسط الشهري وإجمالي التكلفة" },
        investment: { title: "نمو الاستثمار", desc: "تنبؤ بنمو الاستثمارات المركبة" },
        budget: { title: "تخطيط الميزانية الذكية", desc: "إنشاء ميزانية متوازنة وذكية" },
        zakat: { title: "حساب الزكاة", desc: "احسب زكاة الأموال وفق الأحكام الشرعية" }
      },
      digitalTwin: {
        title: "التوأم الرقمي المالي المتقدم",
        savingsRate: "معدل الادخار",
        netWorth: "صافي الثروة",
        creditScore: "التقييم الائتماني",
        riskScore: "مؤشر المخاطرة",
        investmentPortfolio: "المحفظة الاستثمارية",
        monthlyIncome: "الدخل الشهري",
        monthlyExpenses: "المصروفات الشهرية"
      },
      smartInsights: {
        financial: "رؤى مالية ذكية"
      },
      quickActions: {
        simulate: "محاكاة التوأم الرقمي",
        reset: "إعادة تعيين البيانات"
      },
      chat: {
        placeholder: "اسأل عن أي شيء مالي... مثل: كيف أوفر أكثر؟ ما أفضل استثمار لي؟",
        quickQuestions: [
          "كيف يمكنني توفير المزيد من المال؟",
          "ما هي أفضل استراتيجية استثمار لي؟",
          "كيف أحقق أهدافي المالية بشكل أسرع؟"
        ]
      },
      calculator: {
        loan: "حساب القرض",
        investment: "حساب الاستثمار",
        zakat: "حساب الزكاة",
        budget: "تخطيط الميزانية",
        calculate: "احسب النتيجة",
        loanAmount: "مبلغ القرض (ريال)",
        interestRate: "معدل الفائدة السنوي (%)",
        loanTerm: "مدة القرض (سنوات)",
        investmentAmount: "مبلغ الاستثمار الأولي (ريال)",
        annualReturn: "العائد السنوي المتوقع (%)",
        investmentTerm: "مدة الاستثمار (سنوات)",
        zakatAmount: "المبلغ الخاضع للزكاة (ريال)",
        monthlyIncome: "الدخل الشهري (ريال)",
        fixedExpenses: "المصروفات الثابتة (ريال)",
        savingsGoal: "هدف الادخار (ريال)"
      }
    },
    en: {
      title: "NeoFinance Smart Agent",
      subtitle: "Your intelligent financial assistant powered by advanced Digital Twin and AI technology",
      welcomeMessage: "🤖 Hello! I'm NeoFinance Agent - your advanced smart financial assistant. I can analyze your financial situation, provide personalized advice, and help you achieve your financial goals. How can I help you today?",
      serverOffline: "⚠️ System running in fallback mode",
      scenarios: {
        loan: { title: "Loan & Interest Calculation", desc: "Calculate monthly payments and total cost" },
        investment: { title: "Investment Growth", desc: "Predict compound investment growth" },
        budget: { title: "Smart Budget Planning", desc: "Create balanced and smart budgets" },
        zakat: { title: "Zakat Calculation", desc: "Calculate Zakat according to Islamic law" }
      },
      digitalTwin: {
        title: "Advanced Financial Digital Twin",
        savingsRate: "Savings Rate",
        netWorth: "Net Worth",
        creditScore: "Credit Score",
        riskScore: "Risk Score",
        investmentPortfolio: "Investment Portfolio",
        monthlyIncome: "Monthly Income",
        monthlyExpenses: "Monthly Expenses"
      },
      smartInsights: {
        financial: "Smart Financial Insights"
      },
      quickActions: {
        simulate: "Simulate Digital Twin",
        reset: "Reset Data"
      },
      chat: {
        placeholder: "Ask anything about finance... like: How can I save more? What's the best investment for me?",
        quickQuestions: [
          "How can I save more money?",
          "What's the best investment strategy for me?",
          "How can I achieve my financial goals faster?"
        ]
      },
      calculator: {
        loan: "Loan Calculator",
        investment: "Investment Calculator",
        zakat: "Zakat Calculator",
        budget: "Budget Planner",
        calculate: "Calculate Result",
        loanAmount: "Loan Amount (SAR)",
        interestRate: "Annual Interest Rate (%)",
        loanTerm: "Loan Term (Years)",
        investmentAmount: "Initial Investment (SAR)",
        annualReturn: "Expected Annual Return (%)",
        investmentTerm: "Investment Term (Years)",
        zakatAmount: "Amount Subject to Zakat (SAR)",
        monthlyIncome: "Monthly Income (SAR)",
        fixedExpenses: "Fixed Expenses (SAR)",
        savingsGoal: "Savings Goal (SAR)"
      }
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value && value[k];
    }
    return value || key;
  };

  // ✅ محاكاة API مع نظام fallback ذكي
  const generateSmartFallbackResponse = (query, language) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('قرض') || lowerQuery.includes('loan') || lowerQuery.includes('تمويل')) {
      return {
        message: language === 'ar' 
          ? `بخصوص "${query}":\n\n🏦 نصائح القروض والتمويل:\n• احسب قدرتك على السداد قبل التقديم\n• قارن بين عروض البنوك المختلفة\n• تأكد من أن القسط لا يتجاوز 33% من راتبك\n• اقرأ الشروط والأحكام بعناية\n• فكر في التأمين على القرض\n\n💡 استخدم الحاسبة المالية لمعرفة القسط الشهري المتوقع.`
          : `Regarding "${query}":\n\n🏦 Loan and Financing Tips:\n• Calculate your repayment capacity before applying\n• Compare offers from different banks\n• Ensure monthly payment doesn't exceed 33% of salary\n• Read terms and conditions carefully\n• Consider loan insurance\n\n💡 Use the financial calculator to know expected monthly payment.`
      };
    }
    
    if (lowerQuery.includes('استثمار') || lowerQuery.includes('invest') || lowerQuery.includes('أسهم')) {
      return {
        message: language === 'ar'
          ? `حول "${query}":\n\n📈 دليل الاستثمار الذكي:\n• ابدأ بصندوق طوارئ يغطي 6 أشهر\n• نوّع محفظتك الاستثمارية\n• استثمر في صناديق المؤشرات كبداية\n• لا تستثمر أموال تحتاجها خلال 5 سنوات\n• تعلم قبل الاستثمار\n\n🎯 الهدف: بناء ثروة طويلة المدى بدلاً من الربح السريع.`
          : `About "${query}":\n\n📈 Smart Investment Guide:\n• Start with 6-month emergency fund\n• Diversify your investment portfolio\n• Begin with index funds\n• Don't invest money needed within 5 years\n• Learn before investing\n\n🎯 Goal: Build long-term wealth instead of quick profits.`
      };
    }
    
    if (lowerQuery.includes('ادخار') || lowerQuery.includes('save') || lowerQuery.includes('توفير')) {
      return {
        message: language === 'ar'
          ? `بشأن "${query}":\n\n💰 استراتيجيات الادخار الفعالة:\n• اتبع قاعدة 50/30/20 (ضروريات/ترفيه/ادخار)\n• أتمت عملية الادخار\n• ابدأ بمبلغ صغير وارفعه تدريجياً\n• ضع أهدافاً واضحة للادخار\n• قلل المصاريف غير الضرورية\n\n✨ نصيحة: ادخر فور استلام الراتب قبل أي مصروف.`
          : `About "${query}":\n\n💰 Effective Saving Strategies:\n• Follow 50/30/20 rule (needs/wants/savings)\n• Automate your savings\n• Start small and gradually increase\n• Set clear savings goals\n• Reduce unnecessary expenses\n\n✨ Tip: Save immediately after receiving salary before any expense.`
      };
    }
    
    return {
      message: language === 'ar'
        ? `شكراً لسؤالك: "${query}"\n\n🧠 نصائح مالية عامة:\n• ابدأ بإنشاء ميزانية شهرية\n• وفر 20% من دخلك كحد أدنى\n• أنشئ صندوق طوارئ\n• استثمر في نفسك والتعليم\n• تجنب الديون الاستهلاكية\n\n💡 استخدم الأدوات المتاحة في التطبيق للحصول على تحليل مخصص أكثر.`
        : `Thank you for your question: "${query}"\n\n🧠 General Financial Tips:\n• Start with monthly budgeting\n• Save at least 20% of income\n• Build emergency fund\n• Invest in yourself and education\n• Avoid consumer debt\n\n💡 Use the available tools in the app for more personalized analysis.`
    };
  };

  const generateFallbackInsights = (language) => {
    const insights = language === 'ar' ? [
      'ابدأ بتسجيل جميع مصاريفك لمدة شهر لفهم أنماط الإنفاق بشكل أفضل',
      'اتبع قاعدة 50/30/20: 50% للضروريات، 30% للترفيه، 20% للادخار والاستثمار',
      'أنشئ أهدافاً مالية قصيرة وطويلة المدى وراجعها شهرياً',
      'راجع اشتراكاتك الشهرية وألغ ما لا تحتاجه فعلياً'
    ] : [
      'Start recording all expenses for a month to better understand spending patterns',
      'Follow the 50/30/20 rule: 50% needs, 30% wants, 20% savings and investment',
      'Create short and long-term financial goals and review them monthly',
      'Review monthly subscriptions and cancel what you do not actually need'
    ];
    
    return insights;
  };

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'agent',
        content: t('welcomeMessage'),
        timestamp: new Date(),
        type: 'welcome'
      }
    ]);
    setSmartInsights(generateFallbackInsights(language));
  }, [language]);

  // معالجة إرسال الرسائل
  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, newMessage]);
    
    const currentQuery = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateSmartFallbackResponse(currentQuery, language);
      const aiMessage = {
        id: messages.length + 2,
        sender: 'agent',
        content: response.message,
        timestamp: new Date(),
        type: 'ai-response'
      };
      setMessages(prev => [...prev, aiMessage]);

      // تحديد نوع الحاسبة المناسبة بناءً على السؤال
      const msg = currentQuery.toLowerCase();
      if (msg.includes('قرض') || msg.includes('loan') || msg.includes('تمويل')) {
        setSelectedScenario('loan');
        setCalculatorMode('loan');
      } else if (msg.includes('استثمار') || msg.includes('investment') || msg.includes('أسهم')) {
        setSelectedScenario('investment');
        setCalculatorMode('investment');
      } else if (msg.includes('زكاة') || msg.includes('zakat')) {
        setSelectedScenario('zakat');
        setCalculatorMode('zakat');
      } else if (msg.includes('ميزانية') || msg.includes('budget') || msg.includes('ادخار')) {
        setSelectedScenario('budget');
        setCalculatorMode('budget');
      }
      
      setIsTyping(false);
    }, 1500);
  };

  // دوال الحاسبة
  const calculateLoan = (principal, rate, term) => {
    const monthlyRate = rate / 100 / 12;
    const numPayments = term * 12;
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - principal;
    return { 
      monthlyPayment: monthlyPayment.toFixed(2), 
      totalPaid: totalPaid.toFixed(2), 
      totalInterest: totalInterest.toFixed(2) 
    };
  };

  const calculateInvestment = (principal, rate, time) => {
    const finalAmount = principal * Math.pow(1 + rate / 100, time);
    const profit = finalAmount - principal;
    return {
      finalAmount: finalAmount.toFixed(2),
      profit: profit.toFixed(2),
      profitPercentage: ((profit / principal) * 100).toFixed(2)
    };
  };

  const calculateZakat = (amount) => {
    return (amount * 0.025).toFixed(2);
  };

  const calculateBudget = (income, expenses, savings) => {
    const remaining = income - expenses;
    const savingsPercentage = (savings / income) * 100;
    const expenseRatio = (expenses / income) * 100;
    return {
      remaining: remaining.toFixed(2),
      savingsPercentage: savingsPercentage.toFixed(1),
      expenseRatio: expenseRatio.toFixed(1),
      recommendation: remaining > 0 ? 'positive' : 'negative'
    };
  };

  const runCalculation = () => {
    let resultMessage = '';

    if (calculatorMode === 'loan' && calculatorInputs.loanAmount && calculatorInputs.interestRate && calculatorInputs.loanTerm) {
      const result = calculateLoan(
        parseFloat(calculatorInputs.loanAmount),
        parseFloat(calculatorInputs.interestRate),
        parseFloat(calculatorInputs.loanTerm)
      );
      resultMessage = language === 'ar'
        ? `💰 نتائج حساب القرض:\n📋 القسط الشهري: ${result.monthlyPayment} ريال\n💸 إجمالي المبلغ المدفوع: ${result.totalPaid} ريال\n💳 إجمالي الفوائد: ${result.totalInterest} ريال`
        : `💰 Loan Calculation Results:\n📋 Monthly Payment: ${result.monthlyPayment} SAR\n💸 Total Amount Paid: ${result.totalPaid} SAR\n💳 Total Interest: ${result.totalInterest} SAR`;
    }

    if (calculatorMode === 'investment' && calculatorInputs.investmentAmount && calculatorInputs.annualReturn && calculatorInputs.investmentTerm) {
      const result = calculateInvestment(
        parseFloat(calculatorInputs.investmentAmount),
        parseFloat(calculatorInputs.annualReturn),
        parseFloat(calculatorInputs.investmentTerm)
      );
      resultMessage = language === 'ar'
        ? `📈 نتائج تحليل الاستثمار:\n💰 المبلغ الأولي: ${calculatorInputs.investmentAmount} ريال\n📊 العائد السنوي: ${calculatorInputs.annualReturn}%\n📅 المدة: ${calculatorInputs.investmentTerm} سنوات\n🎯 المبلغ النهائي: ${result.finalAmount} ريال\n📈 الربح: ${result.profit} ريال (${result.profitPercentage}%)`
        : `📈 Investment Analysis Results:\n💰 Initial Amount: ${calculatorInputs.investmentAmount} SAR\n📊 Annual Return: ${calculatorInputs.annualReturn}%\n📅 Term: ${calculatorInputs.investmentTerm} years\n🎯 Final Amount: ${result.finalAmount} SAR\n📈 Profit: ${result.profit} SAR (${result.profitPercentage}%)`;
    }

    if (calculatorMode === 'zakat' && calculatorInputs.zakatAmount) {
      const zakatAmount = calculateZakat(parseFloat(calculatorInputs.zakatAmount));
      resultMessage = language === 'ar'
        ? `🕌 حساب الزكاة:\n💰 المبلغ الخاضع للزكاة: ${calculatorInputs.zakatAmount} ريال\n📿 مقدار الزكاة الواجبة: ${zakatAmount} ريال\n📋 معدل الزكاة: 2.5%`
        : `🕌 Zakat Calculation:\n💰 Amount Subject to Zakat: ${calculatorInputs.zakatAmount} SAR\n📿 Zakat Due: ${zakatAmount} SAR\n📋 Zakat Rate: 2.5%`;
    }

    if (calculatorMode === 'budget' && calculatorInputs.monthlyIncome && calculatorInputs.fixedExpenses) {
      const result = calculateBudget(
        parseFloat(calculatorInputs.monthlyIncome),
        parseFloat(calculatorInputs.fixedExpenses),
        parseFloat(calculatorInputs.savingsGoal || 0)
      );
      resultMessage = language === 'ar'
        ? `💼 تحليل الميزانية:\n💰 الدخل الشهري: ${calculatorInputs.monthlyIncome} ريال\n💸 المصروفات الثابتة: ${calculatorInputs.fixedExpenses} ريال\n💵 المتبقي: ${result.remaining} ريال\n📊 نسبة المصروفات: ${result.expenseRatio}%`
        : `💼 Budget Analysis:\n💰 Monthly Income: ${calculatorInputs.monthlyIncome} SAR\n💸 Fixed Expenses: ${calculatorInputs.fixedExpenses} SAR\n💵 Remaining: ${result.remaining} SAR\n📊 Expense Ratio: ${result.expenseRatio}%`;
    }

    if (resultMessage) {
      const calculationMessage = {
        id: messages.length + 1,
        sender: 'agent',
        content: resultMessage,
        timestamp: new Date(),
        type: 'calculation'
      };
      setMessages(prev => [...prev, calculationMessage]);
    }
  };

  const toggleLanguage = () => setLanguage(prev => prev === 'ar' ? 'en' : 'ar');
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const simulateDigitalTwin = () => {
    setIsSimulating(!isSimulating);
    if (!isSimulating) {
      const interval = setInterval(() => {
        setDigitalTwinData(prev => ({
          ...prev,
          savingsRate: Math.max(0, Math.min(100, prev.savingsRate + (Math.random() - 0.5) * 5)),
          investmentGrowth: Math.max(-20, Math.min(30, prev.investmentGrowth + (Math.random() - 0.5) * 3)),
          riskScore: Math.max(0, Math.min(100, prev.riskScore + (Math.random() - 0.5) * 10)),
          netWorth: Math.max(0, prev.netWorth + (Math.random() - 0.5) * 5000),
          creditScore: Math.max(300, Math.min(850, prev.creditScore + (Math.random() - 0.5) * 20))
        }));
      }, 2000);
      setTimeout(() => clearInterval(interval), 12000);
    }
  };

  const resetData = () => {
    setDigitalTwinData({
      totalAssets: 250000,
      monthlyIncome: 12000,
      monthlyExpenses: 7500,
      savingsRate: 37.5,
      investmentGrowth: 14.2,
      riskScore: 55,
      netWorth: 180000,
      creditScore: 780,
      debtToIncome: 12.8,
      emergencyFund: 45000,
      investmentPortfolio: 125000
    });
    setCalculatorInputs({
      loanAmount: '',
      interestRate: '',
      loanTerm: '',
      investmentAmount: '',
      annualReturn: '',
      investmentTerm: '',
      monthlyIncome: '',
      fixedExpenses: '',
      savingsGoal: '',
      zakatAmount: ''
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scenarios = [
    {
      id: 'loan',
      title: t('scenarios.loan.title'),
      description: t('scenarios.loan.desc'),
      icon: Calculator,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'investment',
      title: t('scenarios.investment.title'),
      description: t('scenarios.investment.desc'),
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'budget',
      title: t('scenarios.budget.title'),
      description: t('scenarios.budget.desc'),
      icon: PieChart,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'zakat',
      title: t('scenarios.zakat.title'),
      description: t('scenarios.zakat.desc'),
      icon: Globe,
      color: 'from-teal-500 to-green-600'
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'} p-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bot className={`h-10 w-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('title')}</h1>
          </div>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('subtitle')}</p>
          
          {/* Status */}
          <div className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200`}>
            <AlertCircle className="w-4 h-4" />
            {t('serverOffline')}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chat Area */}
          <div className="lg:col-span-2">
            <div className={`rounded-3xl shadow-2xl border backdrop-blur-sm overflow-hidden ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageSquare className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    <h2 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>المحادثة المالية</h2>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={toggleLanguage}
                      className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                      aria-label="Toggle language"
                    >
                      <Languages className="h-5 w-5" />
                    </button>
                    <button
                      onClick={toggleDarkMode}
                      className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
                      aria-label="Toggle dark mode"
                    >
                      {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages Container */}
              <div className="h-96 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start gap-3 max-w-xs lg:max-w-md ${
                        message.sender === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                            : 'bg-gradient-to-r from-green-500 to-emerald-600'
                        }`}
                      >
                        {message.sender === 'user' ? (
                          <User className="h-5 w-5 text-white" />
                        ) : (
                          <Bot className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div
                        className={`px-5 py-4 rounded-2xl shadow-lg ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                            : darkMode
                            ? 'bg-gray-700/80 text-gray-100'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="text-sm whitespace-pre-line leading-relaxed">{message.content}</div>
                        <div className="text-xs opacity-75 mt-2">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                      <div
                        className={`px-5 py-4 rounded-2xl shadow-lg ${
                          darkMode ? 'bg-gray-700/80 text-gray-100' : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                {/* Quick Questions */}
                <div className="mb-4">
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    💬 {language === 'ar' ? 'أسئلة سريعة:' : 'Quick questions:'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {t('chat.quickQuestions').slice(0, 3).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => setInputMessage(question)}
                        className={`px-3 py-2 rounded-full text-xs transition-all duration-200 ${
                          darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } hover:scale-105`}
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={t('chat.placeholder')}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                    className={`flex-1 px-5 py-3 rounded-xl border-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      darkMode
                        ? 'bg-gray-700/80 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Digital Twin */}
            <div className={`rounded-3xl shadow-2xl border backdrop-blur-sm overflow-hidden ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}>
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <Zap className={`h-5 w-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                  <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t('digitalTwin.title')}</h3>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('digitalTwin.monthlyIncome')}</span>
                    <span className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {formatCurrency(digitalTwinData.monthlyIncome)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('digitalTwin.monthlyExpenses')}</span>
                    <span className={`font-bold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                      {formatCurrency(digitalTwinData.monthlyExpenses)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('digitalTwin.netWorth')}</span>
                    <span className={`font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {formatCurrency(digitalTwinData.netWorth)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('digitalTwin.investmentPortfolio')}</span>
                    <span className={`font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                      {formatCurrency(digitalTwinData.investmentPortfolio)}
                    </span>
                  </div>
                </div>

                {/* Savings Rate */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('digitalTwin.savingsRate')}</span>
                    <span
                      className={`font-bold ${
                        digitalTwinData.savingsRate > 30
                          ? 'text-green-500'
                          : digitalTwinData.savingsRate > 20
                          ? 'text-yellow-500'
                          : 'text-red-500'
                      }`}
                    >
                      {digitalTwinData.savingsRate.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        digitalTwinData.savingsRate > 30
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : digitalTwinData.savingsRate > 20
                          ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                          : 'bg-gradient-to-r from-red-500 to-pink-500'
                      }`}
                      style={{ width: `${Math.min(digitalTwinData.savingsRate, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Credit Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('digitalTwin.creditScore')}</span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {digitalTwinData.creditScore}
                    </span>
                  </div>
                  <div className="text-xs opacity-75">
                    {digitalTwinData.creditScore > 700
                      ? language === 'ar'
                        ? '🌟 ممتاز'
                        : '🌟 Excellent'
                      : digitalTwinData.creditScore > 650
                      ? language === 'ar'
                        ? '👍 جيد'
                        : '👍 Good'
                      : language === 'ar'
                      ? '⚠️ مقبول'
                      : '⚠️ Fair'}
                  </div>
                </div>

                {/* Risk Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('digitalTwin.riskScore')}</span>
                    <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {digitalTwinData.riskScore}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          digitalTwinData.riskScore > 70
                            ? 'bg-gradient-to-r from-red-500 to-red-600'
                            : digitalTwinData.riskScore > 40
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                            : 'bg-gradient-to-r from-green-500 to-emerald-500'
                        }`}
                        style={{ width: `${digitalTwinData.riskScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 space-y-3">
                  <button
                    onClick={simulateDigitalTwin}
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      isSimulating
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSimulating ? (
                      <>
                        <Pause className="h-5 w-5" />
                        {language === 'ar' ? 'إيقاف المحاكاة' : 'Stop Simulation'}
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5" />
                        {t('quickActions.simulate')}
                      </>
                    )}
                  </button>

                  <button
                    onClick={resetData}
                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      darkMode
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                  >
                    <RotateCcw className="h-5 w-5" />
                    {t('quickActions.reset')}
                  </button>
                </div>
              </div>
            </div>

            {/* Smart Insights */}
            {showInsights && (
              <div className={`rounded-3xl shadow-2xl border backdrop-blur-sm overflow-hidden ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Lightbulb className="h-6 w-6 text-yellow-500" />
                      <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {t('smartInsights.financial')}
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowInsights(false)}
                      className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  {smartInsights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border ${
                        darkMode
                          ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-800'
                          : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'
                      }`}
                    >
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>💡 {insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Scenarios */}
            <div className="grid grid-cols-2 gap-4">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => {
                    setSelectedScenario(scenario.id);
                    setCalculatorMode(scenario.id);
                  }}
                  className={`p-4 rounded-xl text-white font-medium transition-all transform hover:scale-105 hover:shadow-lg ${
                    selectedScenario === scenario.id
                      ? 'ring-2 ring-white ring-opacity-50 scale-105'
                      : ''
                  } bg-gradient-to-br ${scenario.color}`}
                >
                  <scenario.icon className="h-6 w-6 mx-auto mb-2" />
                  <div className="text-sm font-semibold">{scenario.title}</div>
                </button>
              ))}
            </div>

            {/* Calculator */}
            {selectedScenario && (
              <div className={`rounded-3xl shadow-2xl border backdrop-blur-sm overflow-hidden ${darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}>
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <Calculator className={`h-5 w-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {t(`calculator.${calculatorMode}`)}
                    </h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {calculatorMode === 'loan' && (
                    <>
                      <input
                        type="number"
                        placeholder={t('calculator.loanAmount')}
                        value={calculatorInputs.loanAmount}
                        onChange={(e) =>
                          setCalculatorInputs((prev) => ({ ...prev, loanAmount: e.target.value }))
                        }
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        }`}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                      <input
                        type="number"
                        placeholder={t('calculator.interestRate')}
                        value={calculatorInputs.interestRate}
                        onChange={(e) =>
                          setCalculatorInputs((prev) => ({ ...prev, interestRate: e.target.value }))
                        }
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        }`}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                      <input
                        type="number"
                        placeholder={t('calculator.loanTerm')}
                        value={calculatorInputs.loanTerm}
                        onChange={(e) =>
                          setCalculatorInputs((prev) => ({ ...prev, loanTerm: e.target.value }))
                        }
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        }`}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                    </>
                  )}

                  {calculatorMode === 'investment' && (
                    <>
                      <input
                        type="number"
                        placeholder={t('calculator.investmentAmount')}
                        value={calculatorInputs.investmentAmount}
                        onChange={(e) =>
                          setCalculatorInputs((prev) => ({ ...prev, investmentAmount: e.target.value }))
                        }
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        }`}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                      <input
                        type="number"
                        placeholder={t('calculator.annualReturn')}
                        value={calculatorInputs.annualReturn}
                        onChange={(e) =>
                          setCalculatorInputs((prev) => ({ ...prev, annualReturn: e.target.value }))
                        }
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        }`}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                      <input
                        type="number"
                        placeholder={t('calculator.investmentTerm')}
                        value={calculatorInputs.investmentTerm}
                        onChange={(e) =>
                          setCalculatorInputs((prev) => ({ ...prev, investmentTerm: e.target.value }))
                        }
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        }`}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                    </>
                  )}

                  {calculatorMode === 'zakat' && (
                    <input
                      type="number"
                      placeholder={t('calculator.zakatAmount')}
                      value={calculatorInputs.zakatAmount}
                      onChange={(e) =>
                        setCalculatorInputs((prev) => ({ ...prev, zakatAmount: e.target.value }))
                      }
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                      }`}
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    />
                  )}

                  {calculatorMode === 'budget' && (
                    <>
                      <input
                        type="number"
                        placeholder={t('calculator.monthlyIncome')}
                        value={calculatorInputs.monthlyIncome}
                        onChange={(e) =>
                          setCalculatorInputs((prev) => ({ ...prev, monthlyIncome: e.target.value }))
                        }
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        }`}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                      <input
                        type="number"
                        placeholder={t('calculator.fixedExpenses')}
                        value={calculatorInputs.fixedExpenses}
                        onChange={(e) =>
                          setCalculatorInputs((prev) => ({ ...prev, fixedExpenses: e.target.value }))
                        }
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        }`}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                      <input
                        type="number"
                        placeholder={t('calculator.savingsGoal')}
                        value={calculatorInputs.savingsGoal}
                        onChange={(e) =>
                          setCalculatorInputs((prev) => ({ ...prev, savingsGoal: e.target.value }))
                        }
                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                        }`}
                        dir={language === 'ar' ? 'rtl' : 'ltr'}
                      />
                    </>
                  )}

                  <button
                    onClick={runCalculation}
                    className="w-full px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                  >
                    ✨ {t('calculator.calculate')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeoFinanceAgent;