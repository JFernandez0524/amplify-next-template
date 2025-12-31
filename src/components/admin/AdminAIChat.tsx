'use client';

import { useState, useRef, useEffect } from 'react';

interface AdminMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  insights?: any[];
  actionTaken?: string;
  suggestsAutomation?: boolean;
}

interface AdminAIChatProps {
  className?: string;
}

export default function AdminAIChat({ className = '' }: AdminAIChatProps) {
  const [messages, setMessages] = useState<AdminMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message when component mounts
    setMessages([{
      role: 'assistant',
      content: `Hi! I'm your AI business manager. I can help you monitor operations, track KPIs, and automate administrative tasks. 

Try asking me:
• "How is my business performing?"
• "What needs my attention today?"
• "Analyze my recent leads"
• "Check for overdue payments"
• "Execute automated follow-ups"

What would you like to know about your business?`,
      timestamp: new Date(),
    }]);
  }, []);

  const sendMessage = async (message?: string, action?: string) => {
    const messageToSend = message || inputMessage;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: AdminMessage = {
      role: 'user',
      content: messageToSend,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          action,
          conversationHistory: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage: AdminMessage = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
          insights: data.insights,
          actionTaken: data.actionTaken,
          suggestsAutomation: data.suggestsAutomation,
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Admin chat error:', error);
      const errorMessage: AdminMessage = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error analyzing your business data. Please try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { label: 'Analyze Business', action: 'analyze_business' },
    { label: 'Check Overdue Items', message: 'What items need my immediate attention?' },
    { label: 'Revenue Report', message: 'How is my revenue trending?' },
    { label: 'Lead Analysis', message: 'Analyze my recent leads and conversion rates' },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 flex flex-col ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3">
            🤖
          </div>
          <div>
            <h3 className="font-semibold">AI Business Manager</h3>
            <p className="text-sm opacity-90">Your automated business assistant</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600 mb-2">Quick Actions:</p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => sendMessage(action.message, action.action)}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              disabled={isLoading}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-96">
        {messages.map((message, index) => (
          <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              
              {/* Show insights if available */}
              {message.insights && message.insights.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-semibold">Key Insights:</p>
                  {message.insights.slice(0, 3).map((insight, idx) => (
                    <div key={idx} className="text-xs bg-white bg-opacity-20 p-2 rounded">
                      <div className="flex items-center justify-between">
                        <span className={`px-1 rounded text-xs ${
                          insight.priority === 'high' ? 'bg-red-100 text-red-800' :
                          insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {insight.priority}
                        </span>
                        <span className="text-xs">{insight.type}</span>
                      </div>
                      <p className="mt-1">{insight.title}</p>
                      {insight.automated && (
                        <button
                          onClick={() => sendMessage(`Execute automation for: ${insight.title}`, 'execute_automation')}
                          className="mt-1 px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                        >
                          Auto-Fix
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Action confirmation */}
              {message.actionTaken && (
                <div className="mt-2 text-xs bg-green-100 text-green-800 p-2 rounded">
                  ✅ Action completed: {message.actionTaken}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your business operations..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
