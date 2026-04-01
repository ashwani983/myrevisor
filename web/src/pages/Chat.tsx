import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Send,
  Bot,
  User,
  Settings,
  AlertCircle,
  Trash2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useSettingsStore } from '@/stores/settingsStore';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are a DevOps study assistant helping users prepare for DevOps interviews. 
You have expertise in: Kubernetes, Docker, AWS, Jenkins, Git, Shell Scripting.
Answer questions concisely and provide examples when helpful.
Format code blocks with proper syntax highlighting.
Keep explanations clear and beginner-friendly.`;

export function Chat() {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const apiKey = useSettingsStore(state => state.openaiApiKey);
  const selectedModel = useSettingsStore(state => state.selectedModel);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);

  const quickQuestions = [
    'Explain Kubernetes architecture',
    'How do containers communicate in Docker?',
    'What is CI/CD?',
    'Explain Git rebase vs merge',
    'How does autoscaling work in Kubernetes?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !apiKey) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowQuickQuestions(false);

    try {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'MyRevisor',
          },
          body: JSON.stringify({
            model: selectedModel || 'anthropic/claude-3-haiku',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...messages.map(m => ({
                role: m.role,
                content: m.content,
              })),
              { role: 'user', content: content.trim() },
            ],
            max_tokens: 1500,
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'API request failed');
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          data.choices[0]?.message?.content ||
          'Sorry, I could not generate a response.',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content:
          'Sorry, I encountered an error. Please check your API key and try again.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setShowQuickQuestions(true);
  };

  if (!apiKey) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-warning-100 dark:bg-warning-900/30 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-warning-500" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                API Key Required
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                To use the AI chatbot, you need to add your OpenRouter API key
                in Settings. Your API key is stored locally and never sent to
                our servers.
              </p>
              <div className="flex gap-3 justify-center">
                <Button variant="outline" onClick={() => navigate('/')}>
                  Go to Dashboard
                </Button>
                <Button onClick={() => navigate('/settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Add API Key
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-500" />
              </div>
              <div>
                <h1 className="font-semibold text-gray-900 dark:text-white">
                  AI Study Assistant
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  DevOps Interview Prep
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={clearChat}>
                <Trash2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/settings')}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {showQuickQuestions && messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Quick questions to get started:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'flex gap-3 mb-4',
                  message.role === 'user' && 'flex-row-reverse'
                )}
              >
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                    message.role === 'user'
                      ? 'bg-primary-100 dark:bg-primary-900/30'
                      : 'bg-gray-100 dark:bg-gray-800'
                  )}
                >
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-primary-500" />
                  ) : (
                    <Bot className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  )}
                </div>
                <div
                  className={cn(
                    'max-w-[85%] rounded-2xl px-4 py-3',
                    message.role === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                  )}
                >
                  {message.role === 'user' ? (
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  ) : (
                    <div className="prose prose-sm dark:prose-invert max-w-none text-gray-900 dark:text-gray-100">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          h1: ({ children }) => (
                            <h1 className="text-lg font-bold mt-4 mb-2">
                              {children}
                            </h1>
                          ),
                          h2: ({ children }) => (
                            <h2 className="text-base font-bold mt-3 mb-2">
                              {children}
                            </h2>
                          ),
                          h3: ({ children }) => (
                            <h3 className="text-sm font-semibold mt-2 mb-1">
                              {children}
                            </h3>
                          ),
                          p: ({ children }) => (
                            <p className="text-sm mb-2">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="list-disc list-inside text-sm mb-2 space-y-1">
                              {children}
                            </ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal list-inside text-sm mb-2 space-y-1">
                              {children}
                            </ol>
                          ),
                          li: ({ children }) => (
                            <li className="text-sm">{children}</li>
                          ),
                          code: ({ className, children }) => {
                            const isInline = !className;
                            return isInline ? (
                              <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono">
                                {children}
                              </code>
                            ) : (
                              <code className="block bg-gray-100 dark:bg-gray-900 p-3 rounded-lg text-xs font-mono overflow-x-auto mb-2">
                                {children}
                              </code>
                            );
                          },
                          pre: ({ children }) => (
                            <pre className="bg-gray-100 dark:bg-gray-900 p-3 rounded-lg text-xs font-mono overflow-x-auto mb-2">
                              {children}
                            </pre>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-semibold">
                              {children}
                            </strong>
                          ),
                          a: ({ href, children }) => (
                            <a
                              href={href}
                              className="text-primary-500 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {children}
                            </a>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3 mb-4"
            >
              <div className="w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900/30 flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent-600 dark:text-accent-400" />
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <span
                      className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    ></span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    Thinking...
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about DevOps..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={1}
              style={{ maxHeight: '120px' }}
            />
            <Button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="self-end"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            AI responses are generated by OpenRouter models. Verify important
            information.
          </p>
        </div>
      </div>
    </div>
  );
}
