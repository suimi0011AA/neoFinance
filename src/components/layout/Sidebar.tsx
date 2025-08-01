import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Target,
  TrendingUp,
  PieChart,
  MessageSquare,
  Settings,
  X,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../utils/translations';
import { Bot } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeSection,
  onSectionChange,
}) => {
  const { language } = useLanguage();

  const menuItems = [
    {
      id: 'dashboard',
      label: t('nav.dashboard', language),
      icon: LayoutDashboard,
    },
    { id: 'goals', label: t('nav.goals', language), icon: Target },
    { id: 'analytics', label: t('nav.analytics', language), icon: TrendingUp },
    { id: 'spending', label: t('nav.spending', language), icon: PieChart },
    { id: 'ai-chat', label: t('nav.aiChat', language), icon: MessageSquare },
    {
      id: 'neo-agent',
      label: language === 'ar' ? 'الوكيل الذكي' : 'Smart Agent',
      icon: Bot,
    },

    { id: 'settings', label: t('nav.settings', language), icon: Settings },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: language === 'ar' ? 320 : -320 }}
            animate={{ x: 0 }}
            exit={{ x: language === 'ar' ? 320 : -320 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className={`fixed ${
              language === 'ar' ? 'right-0' : 'left-0'
            } top-0 h-full w-80 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-${
              language === 'ar' ? 'l' : 'r'
            } border-gray-200 dark:border-gray-700 z-50 lg:relative lg:translate-x-0`}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 lg:hidden">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Menu
              </h2>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="p-6 space-y-2">
              {menuItems.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onSectionChange(item.id);
                    onClose();
                  }}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${
                      language === 'ar'
                        ? 'flex-row-reverse space-x-reverse'
                        : ''
                    }
                    ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
