import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Download, Upload, Trash2, Eye, EyeOff, Key, Bot } from 'lucide-react';
import { useSettingsStore } from '@/stores/settingsStore';
import { useStudyStore } from '@/stores/studyStore';
import { useQuizStore } from '@/stores/quizStore';
import { toast } from 'sonner';

const MODELS = [
  { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku (Fast)' },
  { id: 'anthropic/claude-3-sonnet', name: 'Claude 3 Sonnet' },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini (Fast)' },
  { id: 'openai/gpt-4o', name: 'GPT-4o' },
  { id: 'meta-llama/llama-3-8b-instruct', name: 'Llama 3 8B (Free)' },
  { id: 'mistralai/mistral-7b-instruct', name: 'Mistral 7B (Free)' },
];

export function Settings() {
  const { openaiApiKey, setApiKey, selectedModel, setSelectedModel } =
    useSettingsStore();
  const progress = useStudyStore(state => state.progress);
  const quizHistory = useQuizStore(state => state.quizHistory);

  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(openaiApiKey);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveApiKey = () => {
    setIsSaving(true);
    setApiKey(apiKeyInput.trim());
    setTimeout(() => {
      setIsSaving(false);
      toast.success('API key saved successfully');
    }, 500);
  };

  const exportData = () => {
    const data = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      progress,
      quizHistory,
      settings: {
        hasApiKey: !!openaiApiKey,
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `myrevisor-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Progress exported successfully');
  };

  const importData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const data = JSON.parse(text);

        if (!data.version || !data.progress) {
          throw new Error('Invalid backup file');
        }

        toast.success(
          'Progress imported successfully. Refresh to see changes.'
        );
      } catch {
        toast.error('Failed to import: Invalid file format');
      }
    };
    input.click();
  };

  const clearAllData = () => {
    if (
      window.confirm(
        'Are you sure you want to clear all data? This cannot be undone.'
      )
    ) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Settings
        </h1>

        {/* API Key */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              AI Integration (OpenRouter)
            </CardTitle>
            <CardDescription>
              Connect your OpenRouter API key to enable AI chatbot with multiple
              models
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKeyInput}
                    onChange={e => setApiKeyInput(e.target.value)}
                    placeholder="sk-or-..."
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showApiKey ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <Button onClick={handleSaveApiKey} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Your API key is stored locally and never sent to our servers.
                Get your key at{' '}
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:underline"
                >
                  openrouter.ai
                </a>
              </p>

              {/* Model Selection */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Bot className="w-4 h-4 inline mr-1" />
                  AI Model
                </label>
                <select
                  value={selectedModel || 'anthropic/claude-3-haiku'}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedModel(e.target.value)
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                >
                  {MODELS.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Data</CardTitle>
            <CardDescription>
              Export, import, or clear your progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={exportData}
              >
                <Download className="w-4 h-4 mr-2" />
                Export Progress as JSON
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={importData}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Progress
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-error-500 hover:text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20"
                onClick={clearAllData}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-2xl font-bold text-primary-500">
                  {Object.values(progress).reduce(
                    (acc, p) => acc + p.questionsKnown.length,
                    0
                  )}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Questions Mastered
                </p>
              </div>
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-2xl font-bold text-success-500">
                  {quizHistory.length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quizzes Taken
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              MyRevisor v2.0 - DevOps Interview Study Application
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              All data is stored locally in your browser.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
