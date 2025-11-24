import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface ReadinessStats {
  resumeAnalysisCount: number;
  avgMatchScore: number;
  caseSessionsCount: number;
  guesstimateCount: number;
  companyResearchCount: number;
}

export async function getReadinessStats(userId?: string): Promise<ReadinessStats> {
  try {
    const whereClause = userId ? { userId } : {};
    
    const resumeAnalyses = await prisma.resumeAnalysis.findMany({ where: whereClause });
    const caseSessions = await prisma.caseSession.findMany({ where: whereClause });
    const guesstimatesSessions = await prisma.guesstimateSession.findMany({ where: whereClause });
    const companyIntelSessions = await prisma.companyIntelSession.findMany({ where: whereClause });

    // Calculate average match score from resume analyses
    let avgMatchScore = 0;
    if (resumeAnalyses.length > 0) {
      const scores = resumeAnalyses.map(analysis => {
        try {
          const result = JSON.parse(analysis.result);
          return result.matchScore || 0;
        } catch {
          return 0;
        }
      });
      avgMatchScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    }

    return {
      resumeAnalysisCount: resumeAnalyses.length,
      avgMatchScore: Math.round(avgMatchScore),
      caseSessionsCount: caseSessions.length,
      guesstimateCount: guesstimatesSessions.length,
      companyResearchCount: companyIntelSessions.length,
    };
  } catch (error) {
    console.error('Error fetching readiness stats:', error);
    return {
      resumeAnalysisCount: 0,
      avgMatchScore: 0,
      caseSessionsCount: 0,
      guesstimateCount: 0,
      companyResearchCount: 0,
    };
  }
}

export function calculateSimpleReadinessScore(stats: ReadinessStats): number {
  // Simple weighted scoring algorithm
  const resumeWeight = 30;
  const caseWeight = 30;
  const guesstimateWeight = 20;
  const researchWeight = 20;

  const resumeScore = Math.min(100, (stats.resumeAnalysisCount * 20) + (stats.avgMatchScore * 0.5));
  const caseScore = Math.min(100, stats.caseSessionsCount * 10);
  const guesstimateScore = Math.min(100, stats.guesstimateCount * 15);
  const researchScore = Math.min(100, stats.companyResearchCount * 12);

  const totalScore = 
    (resumeScore * resumeWeight / 100) +
    (caseScore * caseWeight / 100) +
    (guesstimateScore * guesstimateWeight / 100) +
    (researchScore * researchWeight / 100);

  return Math.round(totalScore);
}


