import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Globe, Palette, DollarSign, Save, RotateCcw } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useLanguage } from '../../hooks/useLanguage';
import { useTheme } from '../../hooks/useTheme';
import { t } from '../../utils/translations';

interface SettingsPanelProps {
  userData?: any;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ userData }) => {
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    profile: {
      name: userData?.personalInfo?.name || 'Abdullah Al-Rashid',
      email: userData?.personalInfo?.email || 'abdullah@example.com',
      phone: '+966 50 123 4567',
      city: userData?.personalInfo?.city || 'Riyadh',
      age: userData?.personalInfo?.age || 25,
      jobType: userData?.personalInfo?.jobType || 'Software Engineer'
    },
    notifications: {
      budgetAlerts: true,
      goalReminders: true,
      weeklyReports: true,
      marketingEmails: false
    },
    preferences: {
      currency: 'SAR',
      dateFormat: 'DD/MM/YYYY',
      startOfWeek: 'Sunday'
    }
  });

  const handleSave = () => {
    // Save settings logic would go here
    console.log('Settings saved:', settings);
    // Show success message
    alert('Settings saved successfully!');
  };

  const handleResetPreferences = () => {
    if (confirm('Are you sure you want to reset all preferences to default? This action cannot be undone.')) {
      setSettings(prev => ({
        ...prev,
        preferences: {
          currency: 'SAR',
          dateFormat: 'DD/MM/YYYY',
          startOfWeek: 'Sunday'
        },
        notifications: {
          budgetAlerts: true,
          goalReminders: true,
          weeklyReports: true,
          marketingEmails: false
        }
      }));
      alert('Preferences reset to default values!');
    }
  };

  const handleResetProfile = () => {
    if (confirm('Are you sure you want to reset your profile information? This will restore the data from your onboarding.')) {
      setSettings(prev => ({
        ...prev,
        profile: {
          name: userData?.personalInfo?.name || 'Abdullah Al-Rashid',
          email: userData?.personalInfo?.email || 'abdullah@example.com',
          phone: '+966 50 123 4567',
          city: userData?.personalInfo?.city || 'Riyadh',
          age: userData?.personalInfo?.age || 25,
          jobType: userData?.personalInfo?.jobType || 'Software Engineer'
        }
      }));
      alert('Profile information reset!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t('settings.title', language)}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('settings.subtitle', language)}
        </p>
      </div>

      {/* Quick Settings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                {t('settings.language', language)}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={toggleLanguage}>
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Palette className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                {t('settings.theme', language)}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? 'Dark' : 'Light'}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">
                {t('settings.currency', language)}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              SAR
            </span>
          </div>
        </Card>
      </div>

      {/* Reset Options */}
      <Card className="p-6 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20">
        <div className="flex items-center space-x-3 mb-4">
          <RotateCcw className="h-5 w-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">
            Reset Options
          </h3>
        </div>
        <p className="text-orange-700 dark:text-orange-300 text-sm mb-4">
          Reset your settings to default values or restore from your onboarding data.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetPreferences}
            className="border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900/30"
          >
            Reset Preferences
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetProfile}
            className="border-orange-300 text-orange-700 hover:bg-orange-100 dark:border-orange-700 dark:text-orange-300 dark:hover:bg-orange-900/30"
          >
            Reset Profile
          </Button>
        </div>
      </Card>

      {/* Detailed Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('settings.profile', language)}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetProfile}
              className="text-orange-600 hover:text-orange-700"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <Input
              label="Full Name"
              value={settings.profile.name}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                profile: { ...prev.profile, name: e.target.value }
              }))}
            />
            <Input
              label="Email"
              type="email"
              value={settings.profile.email}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                profile: { ...prev.profile, email: e.target.value }
              }))}
            />
            <Input
              label="Phone"
              value={settings.profile.phone}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                profile: { ...prev.profile, phone: e.target.value }
              }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Age"
                type="number"
                value={settings.profile.age}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  profile: { ...prev.profile, age: parseInt(e.target.value) || 0 }
                }))}
              />
              <Select
                label="Job Type"
                value={settings.profile.jobType}
                onChange={(e) => setSettings(prev => ({
                  ...prev,
                  profile: { ...prev.profile, jobType: e.target.value }
                }))}
                options={[
                  { value: 'Student', label: 'Student' },
                  { value: 'Software Engineer', label: 'Software Engineer' },
                  { value: 'Teacher', label: 'Teacher' },
                  { value: 'Doctor', label: 'Doctor' },
                  { value: 'Business Owner', label: 'Business Owner' },
                  { value: 'Other', label: 'Other' }
                ]}
              />
            </div>
            <Select
              label="City"
              value={settings.profile.city}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                profile: { ...prev.profile, city: e.target.value }
              }))}
              options={[
                { value: 'Riyadh', label: 'Riyadh' },
                { value: 'Jeddah', label: 'Jeddah' },
                { value: 'Dammam', label: 'Dammam' },
                { value: 'Mecca', label: 'Mecca' },
                { value: 'Medina', label: 'Medina' }
              ]}
            />
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Bell className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('settings.notifications', language)}
            </h3>
          </div>
          
          <div className="space-y-4">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, [key]: e.target.checked }
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
                </label>
              </div>
            ))}
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('settings.security', language)}
            </h3>
          </div>
          
          <div className="space-y-4">
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
            <Button variant="outline" className="w-full">
              Enable Two-Factor Authentication
            </Button>
            <Button variant="outline" className="w-full">
              Download Data
            </Button>
            <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t('settings.preferences', language)}
              </h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetPreferences}
              className="text-orange-600 hover:text-orange-700"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <Select
              label="Currency"
              value={settings.preferences.currency}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, currency: e.target.value }
              }))}
              options={[
                { value: 'SAR', label: 'Saudi Riyal (SAR)' },
                { value: 'USD', label: 'US Dollar (USD)' },
                { value: 'EUR', label: 'Euro (EUR)' }
              ]}
            />
            <Select
              label="Date Format"
              value={settings.preferences.dateFormat}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, dateFormat: e.target.value }
              }))}
              options={[
                { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
                { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
                { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
              ]}
            />
            <Select
              label="Start of Week"
              value={settings.preferences.startOfWeek}
              onChange={(e) => setSettings(prev => ({
                ...prev,
                preferences: { ...prev.preferences, startOfWeek: e.target.value }
              }))}
              options={[
                { value: 'Sunday', label: 'Sunday' },
                { value: 'Monday', label: 'Monday' }
              ]}
            />
          </div>
        </Card>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>{t('settings.save', language)}</span>
        </Button>
      </div>
    </div>
  );
};