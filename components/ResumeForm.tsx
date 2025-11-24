'use client';

import { useState } from 'react';

interface ResumeFormProps {
  onSubmit: (resumeText: string, jdText: string) => void;
  loading: boolean;
}

export default function ResumeForm({ onSubmit, loading }: ResumeFormProps) {
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(resumeText, jdText);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="resume" className="block text-sm font-medium text-cream mb-2">
          Your Resume Text
        </label>
        <textarea
          id="resume"
          rows={8}
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-lg text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
          placeholder="Paste your resume text here..."
          required
        />
      </div>

      <div>
        <label htmlFor="jd" className="block text-sm font-medium text-cream mb-2">
          Job Description
        </label>
        <textarea
          id="jd"
          rows={8}
          value={jdText}
          onChange={(e) => setJdText(e.target.value)}
          className="w-full px-4 py-3 bg-navy border border-gold/20 rounded-lg text-cream placeholder-cream/40 focus:outline-none focus:ring-2 focus:ring-gold/50"
          placeholder="Paste the job description here..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-navy font-semibold py-3 px-6 rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Analyzing...' : 'Analyze Match'}
      </button>
    </form>
  );
}


