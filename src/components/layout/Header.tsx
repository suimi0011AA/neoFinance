import React, { useState } from 'react';
import { Moon, Sun, Bell, User, Menu, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../hooks/useLanguage';
import { Button } from '../ui/Button';
import { NotificationPanel } from '../dashboard/NotificationPanel';
import { mockNotifications } from '../../data/mockData';

interface HeaderProps {
  onMenuClick: () => void;
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, userName = 'Abdullah' }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = mockNotifications.filter(n => !n.read).length;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMenuClick}
                className="lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                    NeoFinance
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Financial Intelligence Platform
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="flex items-center space-x-2"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:block">
                  {language === 'en' ? 'العربية' : 'English'}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="relative"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>

              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setShowNotifications(true)}
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    <span className="text-white text-[10px]">{unreadCount}</span>
                  </span>
                )}
              </Button>

              <div className="flex items-center space-x-2 pl-3 border-l border-gray-200 dark:border-gray-700">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                  {userName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <NotificationPanel 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </>
  );
};