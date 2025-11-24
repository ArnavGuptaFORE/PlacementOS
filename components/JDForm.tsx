'use client';

import { useState } from 'react';

interface JDFormProps {
  onSubmit: (text: string) => void;
  loading: boolean;
  placeholder: string;
  buttonText: string;
  label: string;
}

export default function JDForm({ onSubmit, loading, placeholder, buttonText, label }: JDFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="input" className="block text-sm font-medium text-cream mb-2">
          {label}
        </label>
        <textarea
          id="input"
          rows={10}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-lg text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
          placeholder={placeholder}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-navy font-semibold py-3 px-6 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : buttonText}
      </button>
    </form>
  );
}


