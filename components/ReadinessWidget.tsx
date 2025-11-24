'use client';

import { useEffect, useState } from 'react';

interface ReadinessData {
  readinessScore: number;
  breakdown: {
    resumeReadiness: number;
    caseReadiness: number;
    researchReadiness: number;
    overallPreparation: number;
  };
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  summary: string;
}

export default function ReadinessWidget() {
  const [data, setData] = useState<ReadinessData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReadiness();
  }, []);

  const fetchReadiness = async () => {
    try {
      const { fetchWithAuth } = await import('@/lib/api-client');
      const response = await fetchWithAuth('/api/readiness');
      
      if (!response.ok) {
        if (response.status === 401) {
          // User not logged in, show zero state
          setData({
            readinessScore: 0,
            breakdown: {
              resumeReadiness: 0,
              caseReadiness: 0,
              researchReadiness: 0,
              overallPreparation: 0,
            },
            strengths: [],
            improvements: ['Log in to start tracking your progress'],
            recommendations: [],
            summary: 'Log in to see your placement readiness',
          });
          setLoading(false);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      
      // Ensure the data has the required structure
      if (result && result.readinessScore !== undefined && result.breakdown) {
        setData(result);
      } else {
        console.error('Invalid data structure:', result);
      }
    } catch (error) {
      console.error('Error fetching readiness:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-navy rounded w-1/2"></div>
          <div className="h-24 bg-navy rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
        <p className="text-cream/60">Failed to load readiness data</p>
      </div>
    );
  }

  return (
    <div className="bg-navy-light rounded-xl border border-gold/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-cream">Placement Readiness</h2>
        <div className="text-right">
          <div className="text-4xl font-bold text-gold">{data.readinessScore}</div>
          <div className="text-sm text-cream/60">out of 100</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <ScoreItem label="Resume" score={data.breakdown?.resumeReadiness || 0} />
        <ScoreItem label="Cases" score={data.breakdown?.caseReadiness || 0} />
        <ScoreItem label="Research" score={data.breakdown?.researchReadiness || 0} />
        <ScoreItem label="Overall" score={data.breakdown?.overallPreparation || 0} />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-cream mb-2">Summary</h3>
        <p className="text-sm text-cream/80">{data.summary || 'No summary available'}</p>
      </div>

      {data.strengths && data.strengths.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-green-400 mb-2">✓ Strengths</h3>
          <ul className="space-y-1">
            {data.strengths.map((strength, i) => (
              <li key={i} className="text-sm text-cream/70">• {strength}</li>
            ))}
          </ul>
        </div>
      )}

      {data.improvements && data.improvements.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-yellow-400 mb-2">⚡ Areas to Improve</h3>
          <ul className="space-y-1">
            {data.improvements.map((improvement, i) => (
              <li key={i} className="text-sm text-cream/70">• {improvement}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ScoreItem({ label, score }: { label: string; score: number }) {
  return (
    <div className="bg-navy rounded-lg p-3">
      <div className="text-cream/60 text-xs mb-1">{label}</div>
      <div className="text-gold font-semibold text-xl">{score}</div>
    </div>
  );
}


