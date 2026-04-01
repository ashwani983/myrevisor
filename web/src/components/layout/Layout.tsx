import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Header } from './Header';
import { KeyboardShortcutsModal } from '@/components/ui/KeyboardShortcuts';
import { OfflineIndicator } from '@/components/ui/OfflineIndicator';

export function Layout() {
  const location = useLocation();
  const [showShortcuts, setShowShortcuts] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === '?') {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }

      if (e.key === 'Escape' && showShortcuts) {
        setShowShortcuts(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showShortcuts]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-500 focus:text-white focus:rounded-lg focus:outline-none"
      >
        Skip to main content
      </a>
      <OfflineIndicator />
      <Header />
      <main id="main-content" className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  );
}
