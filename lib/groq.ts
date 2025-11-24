import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export interface GroqCallOptions {
  model?: string;
  systemPrompt: string;
  userPrompt: string;
  jsonMode?: boolean;
  temperature?: number;
  maxTokens?: number;
}

export async function callGroq({
  model = 'llama-3.3-70b-versatile',
  systemPrompt,
  userPrompt,
  jsonMode = false,
  temperature = 0.7,
  maxTokens = 4096,
}: GroqCallOptions): Promise<string> {
  try {
    const response = await groq.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature,
      max_tokens: maxTokens,
      ...(jsonMode && { response_format: { type: 'json_object' } }),
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Groq API Error:', error);
    throw new Error('Failed to call Groq API');
  }
}

export async function callGroqStreaming({
  model = 'llama-3.3-70b-versatile',
  systemPrompt,
  userPrompt,
  temperature = 0.7,
  maxTokens = 4096,
}: Omit<GroqCallOptions, 'jsonMode'>) {
  try {
    const stream = await groq.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
      temperature,
      max_tokens: maxTokens,
      stream: true,
    });

    return stream;
  } catch (error) {
    console.error('Groq API Error:', error);
    throw new Error('Failed to call Groq API');
  }
}


