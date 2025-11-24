import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { callGroq } from '@/lib/groq';
import { getCaseSolverPrompt } from '@/lib/prompts';
import { getUserIdFromRequest } from '@/lib/auth-helper';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { caseText } = await request.json();

    if (!caseText) {
      return NextResponse.json(
        { error: 'Case text is required' },
        { status: 400 }
      );
    }

    const prompt = getCaseSolverPrompt();
    const response = await callGroq({
      systemPrompt: prompt.system,
      userPrompt: prompt.user(caseText),
      jsonMode: true,
      temperature: 0.6,
    });

    const result = JSON.parse(response);

    // Try to save to database (may fail on serverless with SQLite)
    try {
      const session = await prisma.caseSession.create({
        data: {
          userId,
          inputText: caseText,
          sessionType: 'case-solver',
          result: JSON.stringify(result),
        },
      });
      
      return NextResponse.json({
        id: session.id,
        ...result,
      });
    } catch (dbError) {
      // Database save failed (likely SQLite on serverless), return result anyway
      console.warn('Database save failed, returning result without saving:', dbError);
      return NextResponse.json({
        id: `temp-${Date.now()}`,
        ...result,
      });
    }
  } catch (error: any) {
    console.error('Case solver error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to solve case',
        details: error.message || 'Unknown error',
        type: error.name || 'Error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sessions = await prisma.caseSession.findMany({
      where: { sessionType: 'case-solver' },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const formatted = sessions.map(session => ({
      id: session.id,
      createdAt: session.createdAt,
      result: JSON.parse(session.result),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching case sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case sessions' },
      { status: 500 }
    );
  }
}


