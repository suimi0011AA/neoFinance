import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { AIMode } from '../../types';
import { aiModeConfig, generateAIResponse } from '../../utils/aiModes';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mode?: AIMode;
}

interface AIChatProps {
  userData?: any;
}

export const AIChat: React.FC<AIChatProps> = ({ userData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI financial assistant. I can help you with budgeting, saving strategies, and financial planning. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      mode: 'coach'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [currentMode, setCurrentMode] = useState<AIMode>('coach');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText, currentMode, userData);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        mode: currentMode
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Mode Selector */}
      <Card className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Choose Your AI Assistant Mode
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.entries(aiModeConfig).map(([mode, config]) => (
            <button
              key={mode}
              onClick={() => setCurrentMode(mode as AIMode)}
              className={`p-3 rounded-xl text-left transition-all duration-200 ${
                currentMode === mode
                  ? 'bg-teal-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">{config.icon}</span>
                <span className="font-medium">{config.name}</span>
              </div>
              <p className="text-xs opacity-80">{config.description}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Chat Messages */}
      <Card className="p-6">
        <div className="h-96 overflow-y-auto space-y-4 mb-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                      : 'bg-gradient-to-r from-teal-500 to-green-500'
                  }`}>
                    {message.sender === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                  }`}>
                    <p className="text-sm">{message.text}</p>
                    {message.mode && (
                      <p className="text-xs opacity-60 mt-1">
                        {aiModeConfig[message.mode].name}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <Input
            placeholder="Ask me about your finances..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Questions */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {[
              "How much can I spend this weekend?",
              "Should I increase my emergency fund?",
              "What's my biggest expense category?",
              "How to save for vacation faster?"
            ].map((question) => (
              <button
                key={question}
                onClick={() => setInputText(question)}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};