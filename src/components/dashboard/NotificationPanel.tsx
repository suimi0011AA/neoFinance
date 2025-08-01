import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Notification } from '../../types';
import { mockNotifications } from '../../data/mockData';
import { useLanguage } from '../../hooks/useLanguage';
import { t } from '../../utils/translations';
import { format } from 'date-fns';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const { language } = useLanguage();

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return AlertTriangle;
      case 'success':
        return CheckCircle;
      case 'error':
        return AlertCircle;
      default:
        return Info;
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return 'text-yellow-500';
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
          
          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t('nav.notifications', language)}
                  </h2>
                  {unreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Actions */}
              {unreadCount > 0 && (
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllAsRead}
                    className="w-full flex items-center space-x-2"
                  >
                    <Check className="h-4 w-4" />
                    <span>Mark all as read</span>
                  </Button>
                </div>
              )}

              {/* Notifications List */}
              <div className="flex-1 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <Bell className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No notifications
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      You're all caught up!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1 p-4">
                    {notifications.map((notification) => {
                      const Icon = getIcon(notification.type);
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                            notification.read
                              ? 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                              : 'bg-white dark:bg-gray-800 border-teal-200 dark:border-teal-800 shadow-sm'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <Icon className={`h-5 w-5 mt-0.5 ${getIconColor(notification.type)}`} />
                            <div className="flex-1 min-w-0">
                              <h4 className={`text-sm font-medium ${
                                notification.read 
                                  ? 'text-gray-700 dark:text-gray-300' 
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                {format(notification.createdAt, 'MMM dd, HH:mm')}
                              </p>
                            </div>
                            <div className="flex space-x-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-1"
                                >
                                  <Check className="h-3 w-3" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteNotification(notification.id)}
                                className="p-1 text-red-500 hover:text-red-700"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};