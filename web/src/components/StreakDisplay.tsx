import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakDisplayProps {
  streak: number;
  className?: string;
}

export function StreakDisplay({ streak, className }: StreakDisplayProps) {
  if (streak === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={className}
    >
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-lg">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [-5, 5, -5],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.5,
            ease: 'easeInOut',
          }}
        >
          <Flame className="w-5 h-5 text-white" />
        </motion.div>

        <motion.span
          className="text-white font-bold text-lg"
          key={streak}
          initial={{ scale: 1.5 }}
          animate={{ scale: 1 }}
        >
          {streak}
        </motion.span>

        <span className="text-white/90 text-sm font-medium">
          day{streak !== 1 ? 's' : ''} streak
        </span>
      </div>
    </motion.div>
  );
}

export function StreakBadge({ streak }: { streak: number }) {
  if (streak === 0) return null;

  return (
    <div className="inline-flex items-center gap-1">
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
          ease: 'easeInOut',
        }}
      >
        <Flame className="w-4 h-4 text-orange-500" />
      </motion.div>
      <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
        {streak}
      </span>
    </div>
  );
}
