import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { callGroq } from '@/lib/groq';
import { getPPTFrameworkPrompt } from '@/lib/prompts';
import { getUserIdFromRequest } from '@/lib/auth-helper';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { problemText } = await request.json();

    if (!problemText) {
      return NextResponse.json(
        { error: 'Problem text is required' },
        { status: 400 }
      );
    }

    const prompt = getPPTFrameworkPrompt();
    const response = await callGroq({
      systemPrompt: prompt.system,
      userPrompt: prompt.user(problemText),
      jsonMode: true,
      temperature: 0.6,
    });

    const result = JSON.parse(response);

    // Try to save to database (may fail on serverless with SQLite)
    try {
      const session = await prisma.caseSession.create({
        data: {
          userId,
          inputText: problemText,
          sessionType: 'ppt-frameworks',
          result: JSON.stringify(result),
        },
      });

      return NextResponse.json({
        id: session.id,
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
    console.error('PPT frameworks error:', error);
    return NextResponse.json(
      { error: 'Failed to generate frameworks' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sessions = await prisma.caseSession.findMany({
      where: { sessionType: 'ppt-frameworks' },
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
    console.error('Error fetching frameworks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch frameworks' },
      { status: 500 }
    );
  }
}


