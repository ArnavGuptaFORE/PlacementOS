'use client';

import { useState } from 'react';

interface CompanySearchFormProps {
  onSubmit: (companyName: string, roleType: string) => void;
  loading: boolean;
}

export default function CompanySearchForm({ onSubmit, loading }: CompanySearchFormProps) {
  const [companyName, setCompanyName] = useState('');
  const [roleType, setRoleType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(companyName, roleType);
  };

  const roleTypes = [
    'Software Engineer',
    'Product Manager',
    'Management Consultant',
    'Business Analyst',
    'Data Scientist',
    'Data Analyst',
    'Marketing Manager',
    'Financial Analyst',
    'Investment Banking Analyst',
    'Strategy Consultant',
    'Operations Manager',
    'Sales Manager',
    'HR Manager',
    'Supply Chain Analyst',
    'UX/UI Designer',
    'Business Development Manager',
    'Project Manager',
    'Risk Analyst',
    'Equity Research Analyst',
    'Digital Marketing Specialist',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-cream mb-2">
          Company Name
        </label>
        <input
          id="company"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-lg text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
          placeholder="e.g., McKinsey, Google, Amazon"
          required
        />
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-medium text-cream mb-2">
          Role Type
        </label>
        <select
          id="role"
          value={roleType}
          onChange={(e) => setRoleType(e.target.value)}
          className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-lg text-cream focus:outline-none focus:ring-2 focus:ring-gold/50"
          required
        >
          <option value="">Select a role type</option>
          {roleTypes.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-navy font-semibold py-3 px-6 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Researching...' : 'Get Company Intel'}
      </button>
    </form>
  );
}


