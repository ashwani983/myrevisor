import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Moon, Sun, Monitor, Download, Upload, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark' | 'system';

export function Settings() {
  const [theme, setTheme] = useState<Theme>('system');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Settings
        </h1>

        {/* Theme */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how MyRevisor looks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              {[
                { value: 'light' as Theme, icon: Sun, label: 'Light' },
                { value: 'dark' as Theme, icon: Moon, label: 'Dark' },
                { value: 'system' as Theme, icon: Monitor, label: 'System' },
              ].map(item => (
                <button
                  key={item.value}
                  onClick={() => setTheme(item.value)}
                  className={cn(
                    'flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all',
                    theme === item.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  <item.icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.label}
                  </span>
                </button>
              ))}
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
              <Button variant="outline" className="w-full justify-start">
                <Download className="w-4 h-4 mr-2" />
                Export Progress as JSON
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-2" />
                Import Progress
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-error-500 hover:text-error-600 hover:bg-error-50 dark:hover:bg-error-900/20"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
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
