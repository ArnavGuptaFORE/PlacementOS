'use client';

import { useState } from 'react';

interface GuesstimateFormProps {
  onSubmit: (question: string) => void;
  loading: boolean;
}

export default function GuesstimateForm({ onSubmit, loading }: GuesstimateFormProps) {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(question);
  };

  const exampleQuestions = [
    'How many pizza slices are consumed in New York City each year?',
    'What is the market size for electric vehicles in India?',
    'How many gas stations are there in the United States?',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="question" className="block text-sm font-medium text-cream mb-2">
          Guesstimate Question
        </label>
        <textarea
          id="question"
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-lg text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
          placeholder="Enter your guesstimate question..."
          required
        />
      </div>

      <div className="bg-navy-light border border-gold/20 rounded-lg p-4">
        <p className="text-cream/60 text-xs uppercase tracking-wider mb-2">Example Questions</p>
        <ul className="space-y-1">
          {exampleQuestions.map((ex, i) => (
            <li
              key={i}
              onClick={() => setQuestion(ex)}
              className="text-cream/80 text-sm cursor-pointer hover:text-gold transition-colors"
            >
              • {ex}
            </li>
          ))}
        </ul>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-navy font-semibold py-3 px-6 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Solving...' : 'Solve Guesstimate'}
      </button>
    </form>
  );
}


