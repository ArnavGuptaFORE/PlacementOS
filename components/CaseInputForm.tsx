'use client';

import { useState } from 'react';

interface CaseInputFormProps {
  onSubmit: (caseText: string) => void;
  loading: boolean;
}

export default function CaseInputForm({ onSubmit, loading }: CaseInputFormProps) {
  const [caseText, setCaseText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(caseText);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="case" className="block text-sm font-medium text-cream mb-2">
          Case Study Text
        </label>
        <textarea
          id="case"
          rows={12}
          value={caseText}
          onChange={(e) => setCaseText(e.target.value)}
          className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-lg text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
          placeholder="Paste your case study here..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-navy font-semibold py-3 px-6 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Analyzing Case...' : 'Solve Case'}
      </button>
    </form>
  );
}


