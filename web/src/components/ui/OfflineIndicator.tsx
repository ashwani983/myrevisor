import { useEffect, useState } from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showBanner) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 py-2 px-4 text-sm font-medium transition-colors ${
        isOnline ? 'bg-success-500 text-white' : 'bg-warning-500 text-gray-900'
      }`}
      role="status"
      aria-live="polite"
    >
      <WifiOff className="w-4 h-4" />
      {isOnline
        ? 'Back online!'
        : 'You are offline. Some features may be limited.'}
    </div>
  );
}
