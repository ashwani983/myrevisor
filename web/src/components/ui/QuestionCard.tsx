import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { DifficultyBadge } from './Badge';

interface QuestionCardProps {
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  isRevealed: boolean;
  onReveal: () => void;
  className?: string;
}

export function QuestionCard({
  question,
  answer,
  difficulty,
  tags,
  isRevealed,
  onReveal,
  className,
}: QuestionCardProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Question */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <DifficultyBadge difficulty={difficulty} />
          <div className="flex flex-wrap gap-1.5">
            {tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-relaxed">
          {question}
        </h2>
      </div>

      {/* Answer */}
      <AnimatePresence mode="wait">
        {!isRevealed ? (
          <motion.div
            key="hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-12 bg-gray-100 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 cursor-pointer hover:border-primary-400 dark:hover:border-primary-600 transition-colors"
            onClick={onReveal}
          >
            <div className="text-4xl mb-3">👁️</div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Tap to reveal answer
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              or press Space
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="revealed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl border border-primary-200 dark:border-primary-800 p-6 shadow-md"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">💡</span>
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
                Answer
              </span>
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap leading-relaxed">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
