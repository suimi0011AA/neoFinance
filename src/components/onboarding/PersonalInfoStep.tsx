import React from 'react';
import { User, Mail, MapPin, Briefcase } from 'lucide-react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { saudiCities, jobTypes } from '../../data/mockData';

interface PersonalInfoStepProps {
  data: {
    name: string;
    email: string;
    age: number;
    jobType: string;
    city: string;
  };
  onChange: (data: any) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = ({ data, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Let's get to know you
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Help us personalize your financial journey
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          value={data.name}
          onChange={(e) => handleChange('name', e.target.value)}
          icon={<User className="h-5 w-5 text-gray-400" />}
        />

        <Input
          label="Email Address"
          type="email"
          placeholder="your.email@example.com"
          value={data.email}
          onChange={(e) => handleChange('email', e.target.value)}
          icon={<Mail className="h-5 w-5 text-gray-400" />}
        />

        <Input
          label="Age"
          type="number"
          placeholder=""
          value={data.age}
          onChange={(e) => handleChange('age', parseInt(e.target.value) || 0)}
          min="18"
          max="100"
        />

        <Select
          label="Job Type"
          value={data.jobType}
          onChange={(e) => handleChange('jobType', e.target.value)}
          options={jobTypes.map(job => ({ value: job, label: job }))}
        />

        <Select
          label="City"
          value={data.city}
          onChange={(e) => handleChange('city', e.target.value)}
          options={saudiCities.map(city => ({ value: city, label: city }))}
        />
      </div>
    </div>
  );
};