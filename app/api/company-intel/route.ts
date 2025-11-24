import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { callGroq } from '@/lib/groq';
import { getCompanyIntelPrompt } from '@/lib/prompts';
import { getUserIdFromRequest } from '@/lib/auth-helper';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { companyName, roleType } = await request.json();

    if (!companyName || !roleType) {
      return NextResponse.json(
        { error: 'Company name and role type are required' },
        { status: 400 }
      );
    }

    const prompt = getCompanyIntelPrompt();
    const response = await callGroq({
      systemPrompt: prompt.system,
      userPrompt: prompt.user(companyName, roleType),
      jsonMode: true,
      temperature: 0.6,
    });

    const result = JSON.parse(response);

    // Try to save to database (may fail on serverless with SQLite)
    try {
      const session = await prisma.companyIntelSession.create({
        data: {
          userId,
          companyName,
          roleType,
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
    console.error('Company intel error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company intelligence' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const sessions = await prisma.companyIntelSession.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    const formatted = sessions.map(session => ({
      id: session.id,
      createdAt: session.createdAt,
      companyName: session.companyName,
      roleType: session.roleType,
      result: JSON.parse(session.result),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error('Error fetching company intel sessions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch company intel sessions' },
      { status: 500 }
    );
  }
}


