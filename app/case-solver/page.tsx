'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import CaseInputForm from '@/components/CaseInputForm';
import ResultCard, { ResultList } from '@/components/ResultCard';
import ProtectedRoute from '@/components/ProtectedRoute';

interface SlideOutline {
  slideNumber: number;
  title: string;
  content: string;
  framework: string;
}

interface CaseResult {
  caseSummary: string;
  problemStatements: string[];
  constraints: string[];
  recommendedFrameworks: string[];
  slideOutline: SlideOutline[];
  keyInsights: string[];
  nextSteps: string[];
}

export default function CaseSolverPage() {
  const [result, setResult] = useState<CaseResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('case-solver-result');
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
      localStorage.setItem('case-solver-result', JSON.stringify(result));
    }
  }, [result]);

  const handleSubmit = async (caseText: string) => {
    setLoading(true);
    setResult(null);

    try {
      const { fetchWithAuth } = await import('@/lib/api-client');
      const response = await fetchWithAuth('/api/case-solver', {
        method: 'POST',
        body: JSON.stringify({ caseText }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('Please log in to use this feature');
          return;
        }
        throw new Error('Failed to solve case');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to solve case. Please try again.');
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
            <h1 className="text-3xl font-bold text-cream mb-2">Case Study Solver</h1>
            <p className="text-cream/60">
              Break down complex case studies into structured solutions with recommended frameworks
            </p>
          </div>

          <div className="bg-navy-light rounded-xl border border-gold/20 p-6 mb-8">
            <CaseInputForm onSubmit={handleSubmit} loading={loading} />
          </div>

          {result && (
            <div className="space-y-6">
              <ResultCard title="Case Summary" variant="success">
                <p className="text-cream/80">{result.caseSummary}</p>
              </ResultCard>

              <ResultCard title="Problem Statements">
                <ResultList items={result.problemStatements} />
              </ResultCard>

              <ResultCard title="Constraints & Considerations">
                <ResultList items={result.constraints} />
              </ResultCard>

              <ResultCard title="Recommended Frameworks">
                <div className="flex flex-wrap gap-2">
                  {result.recommendedFrameworks.map((framework, index) => (
                    <span
                      key={index}
                      className="bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {framework}
                    </span>
                  ))}
                </div>
              </ResultCard>

              <div>
                <h2 className="text-xl font-semibold text-cream mb-4">Slide-by-Slide Outline</h2>
                <div className="space-y-4">
                  {result.slideOutline.map((slide) => (
                    <div
                      key={slide.slideNumber}
                      className="bg-navy-light rounded-xl border border-gold/20 p-6"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="text-gold font-bold text-sm">Slide {slide.slideNumber}</div>
                          <h3 className="text-lg font-semibold text-cream mt-1">{slide.title}</h3>
                        </div>
                        {slide.framework && (
                          <div className="bg-navy px-3 py-1 rounded-full text-xs text-gold">
                            {slide.framework}
                          </div>
                        )}
                      </div>
                      <div className="text-cream/80 text-sm space-y-2">
                        {typeof slide.content === 'string' ? (
                          slide.content.split('\n').filter(line => line.trim()).map((line, idx) => (
                            <div key={idx} className="flex items-start space-x-2">
                              {line.trim().match(/^[-•]/) ? (
                                <>
                                  <span className="text-gold mt-1">•</span>
                                  <span className="flex-1">{line.replace(/^[-•]\s*/, '')}</span>
                                </>
                              ) : (
                                <p className="w-full">{line}</p>
                              )}
                            </div>
                          ))
                        ) : (
                          <p>{String(slide.content)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ResultCard title="Key Insights">
                <ResultList items={result.keyInsights} />
              </ResultCard>

              <ResultCard title="Recommended Next Steps">
                <ResultList items={result.nextSteps} />
              </ResultCard>
            </div>
          )}
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}


