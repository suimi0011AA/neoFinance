import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true
});

export interface AIAgentResponse {
  message: string;
  recommendations?: string[];
  insights?: string[];
  actionItems?: string[];
}

export const generateFinancialAdvice = async (
  userProfile: any,
  userGoals: any[],
  recentTransactions: any[],
  query: string,
  language: 'en' | 'ar' = 'en'
): Promise<AIAgentResponse> => {
  try {
    const systemPrompt = language === 'ar' 
      ? `أنت مستشار مالي ذكي متخصص في السوق السعودي. قدم نصائح مالية شخصية باللغة العربية بناءً على البيانات المالية للمستخدم. استخدم الأرقام الإنجليزية فقط حتى في النسخة العربية.`
      : `You are an intelligent financial advisor specialized in the Saudi market. Provide personalized financial advice based on the user's financial data. Always use English numbers, never Arabic numerals.`;

    const userContext = `
User Profile:
- Name: ${userProfile?.name || 'User'}
- Age: ${userProfile?.age || 'N/A'}
- Monthly Income: ${userProfile?.monthly_income || 0} SAR
- Job: ${userProfile?.job_type || 'N/A'}
- City: ${userProfile?.city || 'N/A'}
- Risk Profile: ${userProfile?.risk_profile || 'moderate'}

Goals: ${JSON.stringify(userGoals)}
Recent Transactions: ${JSON.stringify(recentTransactions.slice(0, 5))}

User Query: ${query}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContext }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || 'I apologize, but I cannot provide advice at the moment.';

    return {
      message: response,
      recommendations: [],
      insights: [],
      actionItems: []
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return {
      message: language === 'ar' 
        ? 'عذراً، لا يمكنني تقديم المشورة في الوقت الحالي. يرجى المحاولة مرة أخرى لاحقاً.'
        : 'I apologize, but I cannot provide advice at the moment. Please try again later.',
      recommendations: [],
      insights: [],
      actionItems: []
    };
  }
};

export const generateFinancialInsights = async (
  userProfile: any,
  transactions: any[],
  goals: any[],
  language: 'en' | 'ar' = 'en'
): Promise<string[]> => {
  try {
    const systemPrompt = language === 'ar'
      ? `قم بتحليل البيانات المالية وقدم 3-5 رؤى مالية مفيدة باللغة العربية. استخدم الأرقام الإنجليزية فقط.`
      : `Analyze the financial data and provide 3-5 useful financial insights. Use English numbers only.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `User Profile: ${JSON.stringify(userProfile)}\nTransactions: ${JSON.stringify(transactions)}\nGoals: ${JSON.stringify(goals)}` }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content || '';
    return response.split('\n').filter(line => line.trim().length > 0);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return language === 'ar' 
      ? ['تعذر تحليل البيانات المالية في الوقت الحالي.']
      : ['Unable to analyze financial data at the moment.'];
  }
};