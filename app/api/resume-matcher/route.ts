import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { callGroq } from '@/lib/groq';
import { getResumeMatcherPrompt } from '@/lib/prompts';
import { getUserIdFromRequest } from '@/lib/auth-helper';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { resumeText, jdText } = await request.json();

    if (!resumeText || !jdText) {
      return NextResponse.json(
        { error: 'Resume text and JD text are required' },
        { status: 400 }
      );
    }

    const prompt = getResumeMatcherPrompt();
    const response = await callGroq({
      systemPrompt: prompt.system,
      userPrompt: prompt.user(resumeText, jdText),
      jsonMode: true,
      temperature: 0.5,
    });

    const result = JSON.parse(response);

    // Try to save to database (may fail on serverless with SQLite)
    try {
      const analysis = await prisma.resumeAnalysis.create({
        data: {
          userId,
          inputText: resumeText,
          jdText: jdText,
          result: JSON.stringify(result),
        },
      });

      return NextResponse.json({
        id: analysis.id,
        ...result,
      });
    } catch (dbError) {
      console.warn('Database save failed, returning result without saving:', dbError);
      return NextResponse.json({
        id: `temp-${Date.now()}`,
        ...result,
      });
    }
  } catch (error) {
    console.error('Resume matcher error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const analyses = await prisma.resumeAnalysis.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const formatted = analyses.map(analysis => ({
      id: analysis.id,
      createdAt: analysis.createdAt,
      result: JSON.parse(analysis.result),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching analyses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analyses' },
      { status: 500 }
    );
  }
}


