import { Card } from '@/components/ui/Card';

export function Quiz() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Mode
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Quiz mode is coming soon...
          </p>
        </Card>
      </div>
    </div>
  );
}
