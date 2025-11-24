import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { callGroq } from '@/lib/groq';
import { getGuesstimatePrompt } from '@/lib/prompts';
import { getUserIdFromRequest } from '@/lib/auth-helper';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { question } = await request.json();

    if (!question) {
      return NextResponse.json(
        { error: 'Question is required' },
        { status: 400 }
      );
    }

    const prompt = getGuesstimatePrompt();
    const response = await callGroq({
      systemPrompt: prompt.system,
      userPrompt: prompt.user(question),
      jsonMode: true,
      temperature: 0.5,
    });

    const result = JSON.parse(response);

    // Save to database
    const session = await prisma.guesstimateSession.create({
      data: {
        userId,
        inputText: question,
        result: JSON.stringify(result),
      },
    });

    return NextResponse.json({
      id: session.id,
      ...result,
    });
  } catch (error) {
    console.error('Guesstimate error:', error);
    return NextResponse.json(
      { error: 'Failed to solve guesstimate' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sessions = await prisma.guesstimateSession.findMany({
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
    console.error('Error fetching guesstimate sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch guesstimate sessions' },
      { status: 500 }
    );
  }
}


