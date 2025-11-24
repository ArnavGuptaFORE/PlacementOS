import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { callGroqStreaming } from '@/lib/groq';
import { getChatMentorPrompt } from '@/lib/prompts';
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

    const { message, sessionId } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const currentSessionId = sessionId || `session-${Date.now()}`;

    // Save user message
    await prisma.chatMessage.create({
      data: {
        userId,
        role: 'user',
        content: message,
        sessionId: currentSessionId,
      },
    });

    // Get chat history for context
    const history = await prisma.chatMessage.findMany({
      where: { 
        userId,
        sessionId: currentSessionId 
      },
      orderBy: { createdAt: 'asc' },
      take: 20,
    });

    // Build context from history
    let contextPrompt = message;
    if (history.length > 1) {
      const recentHistory = history.slice(-6, -1); // Get last 5 messages before current
      contextPrompt = recentHistory
        .map(msg => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
        .join('\n') + `\nUser: ${message}`;
    }

    const stream = await callGroqStreaming({
      systemPrompt: getChatMentorPrompt(),
      userPrompt: contextPrompt,
      temperature: 0.7,
      maxTokens: 2048,
    });

    // Create a ReadableStream to send to client
    const encoder = new TextEncoder();
    let fullResponse = '';

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            fullResponse += content;
            controller.enqueue(encoder.encode(content));
          }

          // Save assistant response
          await prisma.chatMessage.create({
            data: {
              userId,
              role: 'assistant',
              content: fullResponse,
              sessionId: currentSessionId,
            },
          });

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'X-Session-Id': currentSessionId,
      },
    });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    const messages = await prisma.chatMessage.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chat history' },
      { status: 500 }
    );
  }
}


