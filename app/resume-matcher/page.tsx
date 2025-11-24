'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ResumeForm from '@/components/ResumeForm';
import ResultCard, { ResultItem, ResultList } from '@/components/ResultCard';
import ProtectedRoute from '@/components/ProtectedRoute';

interface ResumeResult {
  matchScore: number;
  strengths: string[];
  gaps: string[];
  improvedBullets: string[];
  atsTips: string[];
  keywordsMissing: string[];
  overallFeedback: string;
}

export default function ResumeMatcherPage() {
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Load saved result from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('resume-matcher-result');
    if (saved) {
      try {
        setResult(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved result', e);
      }
    }
  }, []);

  // Save result to localStorage whenever it changes
  useEffect(() => {
    if (result) {
      localStorage.setItem('resume-matcher-result', JSON.stringify(result));
    }
  }, [result]);

  const handleSubmit = async (resumeText: string, jdText: string) => {
    setLoading(true);
    setResult(null);

    try {
      const { fetchWithAuth } = await import('@/lib/api-client');
      const response = await fetchWithAuth('/api/resume-matcher', {
        method: 'POST',
        body: JSON.stringify({ resumeText, jdText }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('Please log in to use this feature');
          return;
        }
        throw new Error('Failed to analyze resume');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
    <div className="flex min-h-screen bg-navy">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-cream mb-2">Resume + JD Matcher</h1>
            <p className="text-cream/60">
              Analyze how well your resume matches a job description and get ATS optimization tips
            </p>
          </div>

          <div className="bg-navy-light rounded-xl border border-gold/20 p-6 mb-8">
            <ResumeForm onSubmit={handleSubmit} loading={loading} />
          </div>

          {result && (
            <div className="space-y-6">
              <ResultCard title="Match Score" variant="success">
                <div className="text-center py-4">
                  <div className="text-6xl font-bold text-gold mb-2">{result.matchScore}</div>
                  <div className="text-cream/60">out of 100</div>
                </div>
              </ResultCard>

              <ResultCard title="Overall Feedback">
                <p className="text-cream/80">{result.overallFeedback}</p>
              </ResultCard>

              <ResultCard title="Strengths" variant="success">
                <ResultList items={result.strengths} />
              </ResultCard>

              <ResultCard title="Gaps to Address" variant="warning">
                <ResultList items={result.gaps} />
              </ResultCard>

              <ResultCard title="Missing Keywords">
                <ResultList items={result.keywordsMissing} />
              </ResultCard>

              <ResultCard title="Improved Resume Bullets">
                <ResultList items={result.improvedBullets} />
              </ResultCard>

              <ResultCard title="ATS Optimization Tips">
                <ResultList items={result.atsTips} />
              </ResultCard>
            </div>
          )}
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}


