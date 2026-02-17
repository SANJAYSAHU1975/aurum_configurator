import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { buildSystemPrompt } from '@/data/product-knowledge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'apply_configuration',
      description:
        'Apply a recommended configuration to the product wizard. Use this when the customer agrees to a brand, theme, or size recommendation.',
      parameters: {
        type: 'object',
        properties: {
          brand: {
            type: 'string',
            enum: ['luxuria', 'modura', 'nivasa'],
            description: 'The brand to select',
          },
          theme: {
            type: 'string',
            description:
              'The theme ID to select (e.g. lux-zen, lux-roma, mod-modern, niv-modern)',
          },
          size: {
            type: 'number',
            description: 'The size in sqft (e.g. 1000, 1500, 2000)',
          },
        },
        required: ['brand'],
      },
    },
  },
];

export async function POST(req: NextRequest) {
  try {
    const { messages, currentConfig } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OPENAI_API_KEY not configured. Add it to .env.local' },
        { status: 500 }
      );
    }

    // Build context-aware system prompt
    const systemPrompt = buildSystemPrompt(currentConfig);

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1024,
      tools,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      ],
    });

    const choice = response.choices[0];

    // Check if GPT wants to call a function
    if (choice.finish_reason === 'tool_calls' && choice.message.tool_calls) {
      const toolCall = choice.message.tool_calls[0];
      if (toolCall.type === 'function' && toolCall.function.name === 'apply_configuration') {
        const args = JSON.parse(toolCall.function.arguments);

        // Get a follow-up response after the tool call
        const followUp = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          max_tokens: 512,
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map((m: { role: string; content: string }) => ({
              role: m.role as 'user' | 'assistant',
              content: m.content,
            })),
            choice.message,
            {
              role: 'tool',
              tool_call_id: toolCall.id,
              content: `Configuration applied: brand=${args.brand}${args.theme ? `, theme=${args.theme}` : ''}${args.size ? `, size=${args.size}sqft` : ''}. The wizard has been updated.`,
            },
          ],
        });

        const followUpText = followUp.choices[0]?.message?.content || "I've updated your configuration!";

        return NextResponse.json({
          content: followUpText,
          configAction: {
            action: 'configure',
            brand: args.brand,
            theme: args.theme,
            size: args.size,
          },
        });
      }
    }

    // Regular text response
    const text = choice.message?.content || '';
    return NextResponse.json({ content: text });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response. Please try again.' },
      { status: 500 }
    );
  }
}
