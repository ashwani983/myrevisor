import { motion } from 'framer-motion';
import {
  Check,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface StudyActionsProps {
  isRevealed: boolean;
  onReveal: () => void;
  onKnown: () => void;
  onReview: () => void;
  onSkip: () => void;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  currentIndex: number;
  totalQuestions: number;
  className?: string;
}

export function StudyActions({
  isRevealed,
  onReveal,
  onKnown,
  onReview,
  onSkip,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
  currentIndex,
  totalQuestions,
  className,
}: StudyActionsProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <span className="font-medium">
          {Math.round(((currentIndex + 1) / totalQuestions) * 100)}% complete
        </span>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrev}
          disabled={!canGoPrev}
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex gap-1">
          {Array.from({ length: Math.min(totalQuestions, 10) }).map((_, i) => {
            const index =
              Math.max(0, Math.min(totalQuestions - 10, currentIndex - 5)) + i;
            return (
              <div
                key={i}
                className={cn(
                  'w-2 h-2 rounded-full transition-colors',
                  index === currentIndex
                    ? 'bg-primary-500'
                    : index < currentIndex
                      ? 'bg-primary-300 dark:bg-primary-700'
                      : 'bg-gray-300 dark:bg-gray-700'
                )}
              />
            );
          })}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onNext}
          disabled={!canGoNext}
          className="gap-1"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Toggle reveal */}
        <Button variant="outline" onClick={onReveal} className="gap-2">
          {isRevealed ? (
            <>
              <EyeOff className="w-4 h-4" />
              Hide
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Reveal
            </>
          )}
        </Button>

        {/* Known */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="col-span-1"
        >
          <Button
            variant="outline"
            onClick={onKnown}
            disabled={!isRevealed}
            className={cn(
              'w-full gap-2 border-success-300 dark:border-success-700',
              'hover:bg-success-50 dark:hover:bg-success-900/20',
              'hover:border-success-500',
              !isRevealed && 'opacity-50 cursor-not-allowed'
            )}
          >
            <motion.div
              animate={isRevealed ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Check className="w-4 h-4 text-success-500" />
            </motion.div>
            Known
          </Button>
        </motion.div>

        {/* Review */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="col-span-1"
        >
          <Button
            variant="outline"
            onClick={onReview}
            disabled={!isRevealed}
            className={cn(
              'w-full gap-2 border-warning-300 dark:border-warning-700',
              'hover:bg-warning-50 dark:hover:bg-warning-900/20',
              'hover:border-warning-500',
              !isRevealed && 'opacity-50 cursor-not-allowed'
            )}
          >
            <RotateCcw className="w-4 h-4 text-warning-500" />
            Review
          </Button>
        </motion.div>

        {/* Skip */}
        <Button variant="ghost" onClick={onSkip} className="gap-2">
          Skip
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Keyboard shortcuts hint */}
      <p className="text-center text-xs text-gray-400 dark:text-gray-500">
        Press{' '}
        <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
          Space
        </kbd>{' '}
        to reveal,{' '}
        <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
          K
        </kbd>{' '}
        for Known,{' '}
        <kbd className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 font-mono">
          R
        </kbd>{' '}
        for Review
      </p>
    </div>
  );
}
