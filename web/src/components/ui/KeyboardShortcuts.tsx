import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface Shortcut {
  key: string;
  description: string;
  scope?: string;
}

const shortcuts: Shortcut[] = [
  { key: 'Space', description: 'Reveal/Hide answer' },
  { key: 'K', description: 'Mark as Known' },
  { key: 'R', description: 'Mark for Review' },
  { key: '→', description: 'Next question' },
  { key: '←', description: 'Previous question' },
  { key: 'Escape', description: 'Exit to dashboard' },
  { key: '?', description: 'Show keyboard shortcuts' },
];

const quizShortcuts: Shortcut[] = [
  { key: 'A/B/C/D', description: 'Select option' },
  { key: 'Enter', description: 'Submit answer' },
  { key: '→', description: 'Next question' },
  { key: 'Escape', description: 'Exit quiz' },
];

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function KeyboardShortcutsModal({
  isOpen,
  onClose,
}: KeyboardShortcutsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md"
            >
              <Card className="shadow-2xl">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Keyboard className="w-5 h-5" />
                    Keyboard Shortcuts
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      Study Mode
                    </h3>
                    <div className="space-y-2">
                      {shortcuts.map(shortcut => (
                        <div
                          key={shortcut.key}
                          className="flex items-center justify-between py-1"
                        >
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {shortcut.description}
                          </span>
                          <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                            {shortcut.key}
                          </kbd>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                      Quiz Mode
                    </h3>
                    <div className="space-y-2">
                      {quizShortcuts.map(shortcut => (
                        <div
                          key={shortcut.key}
                          className="flex items-center justify-between py-1"
                        >
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {shortcut.description}
                          </span>
                          <kbd className="px-2 py-1 text-xs font-mono bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                            {shortcut.key}
                          </kbd>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

export function useKeyboardShortcuts() {
  const [showShortcuts, setShowShortcuts] = useState(false);

  return {
    showShortcuts,
    setShowShortcuts,
    ShortcutsModal: KeyboardShortcutsModal,
  };
}
