// استدعاء API حقيقية لوكيل ذكي (يمكنك استبدال URL بنموذج فعلي مثل OpenAI أو Agent-LLM)
export const fetchAIRecommendation = async (mode: 'opportunity' | 'advice') => {
  const response = await fetch(`https://api.example.com/agent?mode=${mode}`);
  if (!response.ok) throw new Error('Failed to fetch AI response');
  const data = await response.json();
  return data.result; // تأكد أن شكل الاستجابة فيه "result"
};
