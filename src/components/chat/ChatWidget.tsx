'use client';

import { useState, useCallback } from 'react';
import { ChatMessage, ConfigureAction } from '@/types';
import { generateId } from '@/lib/utils';
import { useConfiguratorStore } from '@/store/configurator-store';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const applyConfiguration = useConfiguratorStore((s) => s.applyConfiguration);

  // Get current config state to send as context
  const brand = useConfiguratorStore((s) => s.brand);
  const theme = useConfiguratorStore((s) => s.theme);
  const size = useConfiguratorStore((s) => s.size);
  const currentStep = useConfiguratorStore((s) => s.currentStep);
  const selectedAddons = useConfiguratorStore((s) => s.selectedAddons);

  const sendMessage = useCallback(
    async (content: string) => {
      const userMsg: ChatMessage = { id: generateId(), role: 'user', content };
      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setLoading(true);

      // Build current config context
      const currentConfig: Record<string, unknown> = { step: currentStep };
      if (brand) currentConfig.brand = brand.id;
      if (theme) currentConfig.theme = theme.name;
      if (size) currentConfig.size = size.sqft;
      if (Object.keys(selectedAddons).length > 0) {
        currentConfig.addons = Object.values(selectedAddons);
      }

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
            currentConfig,
          }),
        });

        const data = await res.json();

        if (data.error) {
          setMessages([
            ...newMessages,
            { id: generateId(), role: 'assistant', content: `Sorry, I encountered an error: ${data.error}` },
          ]);
        } else {
          // Handle function call config action from the API
          if (data.configAction) {
            applyConfiguration(
              data.configAction.brand,
              data.configAction.theme,
              data.configAction.size
            );
          }

          setMessages([
            ...newMessages,
            { id: generateId(), role: 'assistant', content: data.content },
          ]);
        }
      } catch {
        setMessages([
          ...newMessages,
          {
            id: generateId(),
            role: 'assistant',
            content: 'Sorry, I couldn\'t connect to the AI service. Please check your internet connection and try again.',
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, brand, theme, size, currentStep, selectedAddons, applyConfiguration]
  );

  const handleApplyConfig = useCallback(
    (action: ConfigureAction) => {
      applyConfiguration(action.brand, action.theme, action.size);
      setIsOpen(false);
    },
    [applyConfiguration]
  );

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div>
              <p className="font-semibold text-sm">AURUM AI Assistant</p>
              <p className="text-xs text-blue-200">
                {brand ? `Helping with ${brand.name}` : 'Ask me anything about our homes'}
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white cursor-pointer p-1"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <ChatMessages messages={messages} loading={loading} onApplyConfig={handleApplyConfig} />

          {/* Input */}
          <ChatInput onSend={sendMessage} disabled={loading} />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-105 z-50 flex items-center justify-center cursor-pointer"
        title="Chat with AI Assistant"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </>
  );
}
