import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/Progress';
import { Button } from '@/components/ui/Button';
import { BookOpen, Trophy } from 'lucide-react';

interface SubjectCardProps {
  subject: {
    id: string;
    name: string;
    icon: string;
    color: string;
    totalQuestions: number;
    masteredQuestions: number;
  };
  index: number;
  onStudy?: () => void;
  onQuiz?: () => void;
}

const subjectEmojis: Record<string, string> = {
  kubernetes: '☸️',
  docker: '🐳',
  aws: '☁️',
  jenkins: '🔧',
  git: '📦',
  shell: '💻',
};

const subjectColors: Record<string, string> = {
  kubernetes: 'from-blue-500 to-cyan-500',
  docker: 'from-blue-600 to-blue-400',
  aws: 'from-orange-500 to-yellow-500',
  jenkins: 'from-red-500 to-pink-500',
  git: 'from-orange-600 to-red-500',
  shell: 'from-green-500 to-emerald-500',
};

export function SubjectCard({
  subject,
  index,
  onStudy,
  onQuiz,
}: SubjectCardProps) {
  const percentage = Math.round(
    (subject.masteredQuestions / subject.totalQuestions) * 100
  );
  const emoji = subjectEmojis[subject.id] || '📚';
  const colorClass = subjectColors[subject.id] || 'from-gray-500 to-gray-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <div className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-12 h-12 rounded-xl bg-gradient-to-br',
                colorClass,
                'flex items-center justify-center text-2xl shadow-lg'
              )}
            >
              {emoji}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {subject.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {subject.totalQuestions} questions
              </p>
            </div>
          </div>

          {/* Percentage badge */}
          <div
            className={cn(
              'px-3 py-1 rounded-full text-sm font-bold',
              percentage >= 75
                ? 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400'
                : percentage >= 50
                  ? 'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
            )}
          >
            {percentage}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <Progress
            value={subject.masteredQuestions}
            max={subject.totalQuestions}
            variant={
              percentage >= 75
                ? 'success'
                : percentage >= 50
                  ? 'warning'
                  : 'default'
            }
          />
          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{subject.masteredQuestions} mastered</span>
            <span>
              {subject.totalQuestions - subject.masteredQuestions} remaining
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onStudy}
          >
            <BookOpen className="w-4 h-4 mr-1" />
            Study
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={onQuiz}
          >
            <Trophy className="w-4 h-4 mr-1" />
            Quiz
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
