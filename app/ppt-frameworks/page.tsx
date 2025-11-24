'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import JDForm from '@/components/JDForm';
import FrameworkCard from '@/components/FrameworkCard';
import FrameworkVisualizer from '@/components/FrameworkVisualizer';
import ResultCard, { ResultList } from '@/components/ResultCard';

interface Framework {
  name: string;
  relevance: string;
  application: string;
}

interface SlideStructure {
  slideNumber: number;
  title: string;
  framework: string;
  keyPoints: string[];
  visualSuggestion: string;
}

interface PPTResult {
  recommendedFrameworks: Framework[];
  slideStructure: SlideStructure[];
  executiveSummary: string;
}

export default function PPTFrameworksPage() {
  const [result, setResult] = useState<PPTResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ppt-frameworks-result');
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
      localStorage.setItem('ppt-frameworks-result', JSON.stringify(result));
    }
  }, [result]);

  const handleSubmit = async (problemText: string) => {
    setLoading(true);
    setResult(null);

    try {
      const { fetchWithAuth } = await import('@/lib/api-client');
      const response = await fetchWithAuth('/api/ppt-frameworks', {
        method: 'POST',
        body: JSON.stringify({ problemText }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert('Please log in to use this feature');
          return;
        }
        throw new Error('Failed to generate frameworks');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate frameworks. Please try again.');
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
            <h1 className="text-3xl font-bold text-cream mb-2">PPT Framework Generator</h1>
            <p className="text-cream/60">
              Get recommended business frameworks and slide-by-slide structure for your presentation
            </p>
          </div>

          <div className="bg-navy-light rounded-xl border border-gold/20 p-6 mb-8">
            <JDForm
              onSubmit={handleSubmit}
              loading={loading}
              placeholder="Describe your business problem, case, or presentation topic..."
              buttonText="Generate Frameworks"
              label="Business Problem / Presentation Topic"
            />
          </div>

          {result && (
            <div className="space-y-6">
              <ResultCard title="Executive Summary" variant="success">
                <p className="text-cream/80 font-medium">{result.executiveSummary}</p>
              </ResultCard>

              <div>
                <h2 className="text-xl font-semibold text-cream mb-4">Recommended Frameworks</h2>
                <div className="space-y-6">
                  {result.recommendedFrameworks.map((framework, index) => (
                    <div key={index} className="space-y-4">
                      <FrameworkCard framework={framework} />
                      <FrameworkVisualizer 
                        frameworkName={framework.name} 
                        data={framework.application}
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
    </div>
  );
}


