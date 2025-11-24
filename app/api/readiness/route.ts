import { NextRequest, NextResponse } from 'next/server';
import { getReadinessStats, calculateSimpleReadinessScore } from '@/lib/readiness';
import { callGroq } from '@/lib/groq';
import { getReadinessPrompt } from '@/lib/prompts';
import { getUserIdFromRequest } from '@/lib/auth-helper';

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    let stats;
    try {
      stats = await getReadinessStats(userId);
    } catch (dbError) {
      console.warn('Database query failed, returning zero stats:', dbError);
      // Return zero stats if database fails
      stats = {
        resumeAnalyses: 0,
        caseSessions: 0,
        guesstimatesSessions: 0,
        companyIntelSessions: 0,
        chatMessages: 0,
      };
    }
    const simpleScore = calculateSimpleReadinessScore(stats);

    // Check if user has any activity
    const hasActivity = stats.resumeAnalysisCount > 0 || 
                       stats.caseSessionsCount > 0 || 
                       stats.guesstimateCount > 0 || 
                       stats.companyResearchCount > 0;

    // Return zero state if no activity
    if (!hasActivity || simpleScore === 0) {
      return NextResponse.json({
        stats,
        simpleScore: 0,
        readinessScore: 0,
        breakdown: {
          resumeReadiness: 0,
          caseReadiness: 0,
          researchReadiness: 0,
          overallPreparation: 0,
        },
        strengths: [],
        improvements: [
          'Start by analyzing your resume with a job description',
          'Practice at least 3 case studies',
          'Complete 2-3 guesstimate problems',
          'Research companies you\'re interested in',
        ],
        recommendations: [
          'Begin with Resume Matcher to optimize your resume',
          'Use Case Solver to practice consulting cases',
          'Try Guesstimate Helper for market sizing practice',
          'Research target companies using Company Intel',
        ],
        summary: 'You haven\'t started your placement preparation yet. Begin with the Resume Matcher to get your first score!',
      });
    }

    // Get AI-powered analysis only if there's actual activity
    try {
      const prompt = getReadinessPrompt();
      const response = await callGroq({
        systemPrompt: prompt.system,
        userPrompt: prompt.user(stats),
        jsonMode: true,
        temperature: 0.5,
      });

      const analysis = JSON.parse(response);

      return NextResponse.json({
        stats,
        simpleScore,
        ...analysis,
      });
    } catch (error) {
      // Fallback if AI call fails
      console.error('Error calling AI for readiness:', error);
      return NextResponse.json({
        stats,
        simpleScore,
        readinessScore: simpleScore,
        breakdown: {
          resumeReadiness: Math.min(100, (stats.resumeAnalysisCount * 20) + (stats.avgMatchScore * 0.5)),
          caseReadiness: Math.min(100, stats.caseSessionsCount * 10),
          researchReadiness: Math.min(100, stats.companyResearchCount * 12),
          overallPreparation: simpleScore,
        },
        strengths: [],
        improvements: ['Continue practicing to improve your readiness'],
        recommendations: ['Keep using PlacementOS features to increase your score'],
        summary: 'Your readiness is improving. Keep practicing!',
      });
    }
  } catch (error) {
    console.error('Readiness error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate readiness' },
      { status: 500 }
    );
  }
}


