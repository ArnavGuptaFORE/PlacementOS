'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import CompanySearchForm from '@/components/CompanySearchForm';
import ResultCard, { ResultItem, ResultList } from '@/components/ResultCard';

interface InterviewFocus {
  technicalSkills: string[];
  behavioralThemes: string[];
  caseTypes: string[];
}

interface CompanyResult {
  companyOverview: string;
  industry: string;
  businessModel: string;
  keyProducts: string[];
  recentNews: string[];
  competitivePosition: string;
  interviewFocus: InterviewFocus;
  likelyQuestions: string[];
  preparationTips: string[];
  keyMetrics: string;
}

export default function CompanyIntelPage() {
  const [result, setResult] = useState<CompanyResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('company-intel-result');
    if (saved) {
      try {
        setResult(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved result', e);
      }
    }
  }, []);

  useEffect(() => {
    if (result) {
      localStorage.setItem('company-intel-result', JSON.stringify(result));
    }
  }, [result]);

  const handleSubmit = async (companyName: string, roleType: string) => {
    setLoading(true);
    setResult(null);

    try {
      const { fetchWithAuth } = await import('@/lib/api-client');
      const response = await fetchWithAuth('/api/company-intel', {
        method: 'POST',
        body: JSON.stringify({ companyName, roleType }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('Please log in to use this feature');
          return;
        }
        throw new Error('Failed to fetch company intelligence');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch company intelligence. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-navy">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-cream mb-2">Company Intelligence</h1>
            <p className="text-cream/60">
              Deep-dive company research with interview questions and role-specific expectations
            </p>
          </div>

          <div className="bg-navy-light rounded-xl border border-gold/20 p-6 mb-8">
            <CompanySearchForm onSubmit={handleSubmit} loading={loading} />
          </div>

          {result && (
            <div className="space-y-6">
              <ResultCard title="Company Overview" variant="success">
                <p className="text-cream/80 mb-4">{result.companyOverview}</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ResultItem label="Industry" value={result.industry} />
                  <ResultItem label="Competitive Position" value={result.competitivePosition} />
                </div>
              </ResultCard>

              <ResultCard title="Business Model">
                <p className="text-cream/80">{result.businessModel}</p>
              </ResultCard>

              <ResultCard title="Key Products & Services">
                <ResultList items={result.keyProducts} />
              </ResultCard>

              <ResultCard title="Recent Developments">
                <ResultList items={result.recentNews} />
              </ResultCard>

              <ResultCard title="Key Business Metrics">
                <p className="text-cream/80">{result.keyMetrics}</p>
              </ResultCard>

              <div>
                <h2 className="text-xl font-semibold text-cream mb-4">Interview Focus Areas</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-navy-light rounded-xl border border-gold/20 p-5">
                    <h4 className="text-gold font-semibold mb-3">Technical Skills</h4>
                    <ResultList items={result.interviewFocus.technicalSkills} />
                  </div>
                  <div className="bg-navy-light rounded-xl border border-gold/20 p-5">
                    <h4 className="text-gold font-semibold mb-3">Behavioral Themes</h4>
                    <ResultList items={result.interviewFocus.behavioralThemes} />
                  </div>
                  <div className="bg-navy-light rounded-xl border border-gold/20 p-5">
                    <h4 className="text-gold font-semibold mb-3">Case Types</h4>
                    <ResultList items={result.interviewFocus.caseTypes} />
                  </div>
                </div>
              </div>

              <ResultCard title="Likely Interview Questions">
                <div className="space-y-3">
                  {result.likelyQuestions.map((question, index) => (
                    <div key={index} className="bg-navy border border-gold/20 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <span className="text-gold font-bold">{index + 1}.</span>
                        <span className="text-cream/80 text-sm flex-1">{question}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ResultCard>

              <ResultCard title="Preparation Tips">
                <ResultList items={result.preparationTips} />
              </ResultCard>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


