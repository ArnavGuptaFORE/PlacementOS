'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import GuesstimateForm from '@/components/GuesstimateForm';
import ResultCard, { ResultItem, ResultList } from '@/components/ResultCard';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Assumption {
  parameter: string;
  value: string;
  rationale: string;
}

interface CalculationStep {
  step: number;
  description: string;
  formula: string;
  result: string;
}

interface GuesstimateResult {
  question: string;
  approach: string;
  assumptions: Assumption[];
  calculation: CalculationStep[];
  finalAnswer: string;
  sensitivityAnalysis: string[];
  sanityCheck: string;
}

export default function GuesstimatePage() {
  const [result, setResult] = useState<GuesstimateResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('guesstimate-result');
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
      localStorage.setItem('guesstimate-result', JSON.stringify(result));
    }
  }, [result]);

  const handleSubmit = async (question: string) => {
    setLoading(true);
    setResult(null);

    try {
      const { fetchWithAuth } = await import('@/lib/api-client');
      const response = await fetchWithAuth('/api/guesstimate', {
        method: 'POST',
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('Please log in to use this feature');
          return;
        }
        throw new Error('Failed to solve guesstimate');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to solve guesstimate. Please try again.');
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
            <h1 className="text-3xl font-bold text-cream mb-2">Guesstimate Helper</h1>
            <p className="text-cream/60">
              Master market sizing and estimation problems with structured, step-by-step solutions
            </p>
          </div>

          <div className="bg-navy-light rounded-xl border border-gold/20 p-6 mb-8">
            <GuesstimateForm onSubmit={handleSubmit} loading={loading} />
          </div>

          {result && (
            <div className="space-y-6">
              <ResultCard title="Question">
                <p className="text-cream/80 font-medium">{result.question}</p>
              </ResultCard>

              <ResultCard title="Approach">
                <p className="text-cream/80">{result.approach}</p>
              </ResultCard>

              <div>
                <h2 className="text-xl font-semibold text-cream mb-4">Assumptions</h2>
                <div className="space-y-3">
                  {result.assumptions.map((assumption, index) => (
                    <div
                      key={index}
                      className="bg-navy-light rounded-xl border border-gold/20 p-5"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-gold font-semibold">{assumption.parameter}</h4>
                        <span className="text-cream font-mono text-sm">{assumption.value}</span>
                      </div>
                      <p className="text-cream/70 text-sm">{assumption.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-cream mb-4">Calculation Steps</h2>
                <div className="space-y-3">
                  {result.calculation.map((step) => (
                    <div
                      key={step.step}
                      className="bg-navy-light rounded-xl border border-gold/20 p-5"
                    >
                      <div className="text-gold font-bold text-sm mb-2">Step {step.step}</div>
                      <h4 className="text-cream font-semibold mb-2">{step.description}</h4>
                      <div className="bg-navy px-4 py-2 rounded-lg mb-2">
                        <code className="text-gold text-sm font-mono">{step.formula}</code>
                      </div>
                      <div className="text-cream/80">
                        <span className="text-cream/60">Result: </span>
                        <span className="font-semibold">{step.result}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <ResultCard title="Final Answer" variant="success">
                <div className="text-center py-4">
                  <div className="text-3xl font-bold text-gold mb-2">{result.finalAnswer}</div>
                </div>
              </ResultCard>

              <ResultCard title="Sensitivity Analysis">
                <ResultList items={result.sensitivityAnalysis} />
              </ResultCard>

              <ResultCard title="Sanity Check">
                <p className="text-cream/80">{result.sanityCheck}</p>
              </ResultCard>
            </div>
          )}
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}


