'use client';

import { useEffect, useRef } from 'react';
import { ChatMessage, ConfigureAction } from '@/types';

interface ChatMessagesProps {
  messages: ChatMessage[];
  loading: boolean;
  onApplyConfig: (action: ConfigureAction) => void;
}

function parseConfigAction(content: string): ConfigureAction | null {
  const match = content.match(/```json\s*(\{[^}]*"action"\s*:\s*"configure"[^}]*\})\s*```/);
  if (!match) return null;
  try {
    const parsed = JSON.parse(match[1]);
    if (parsed.action === 'configure' && parsed.brand) {
      return parsed as ConfigureAction;
    }
  } catch {
    // ignore parse errors
  }
  return null;
}

function removeConfigBlock(content: string): string {
  return content.replace(/```json\s*\{[^}]*"action"\s*:\s*"configure"[^}]*\}\s*```/g, '').trim();
}

export default function ChatMessages({ messages, loading, onApplyConfig }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3">
      {messages.length === 0 && (
        <div className="text-center py-8">
          <p className="text-3xl mb-2">🏠</p>
          <p className="text-sm font-medium text-gray-700">AURUM AI Assistant</p>
          <p className="text-xs text-gray-500 mt-1">
            Ask me anything about our homes, or let me help you find the perfect configuration!
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-400">Try asking:</p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {[
                'What can I get for 30 lakhs?',
                'Tell me about Luxuria themes',
                'Which home is best for a family of 4?',
              ].map((q) => (
                <span
                  key={q}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {q}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {messages.map((msg) => {
        const isUser = msg.role === 'user';
        const configAction = !isUser ? parseConfigAction(msg.content) : null;
        const displayContent = !isUser ? removeConfigBlock(msg.content) : msg.content;

        return (
          <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${
                isUser
                  ? 'bg-blue-600 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed">{displayContent}</p>
              {configAction && (
                <button
                  onClick={() => onApplyConfig(configAction)}
                  className="mt-2 w-full text-left bg-white border border-blue-300 rounded-lg px-3 py-2 text-xs font-medium text-blue-700 hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  ✨ Apply this configuration to the wizard
                </button>
              )}
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
