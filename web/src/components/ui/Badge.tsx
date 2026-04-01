import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | 'default'
    | 'easy'
    | 'medium'
    | 'hard'
    | 'success'
    | 'warning'
    | 'error';
  size?: 'sm' | 'md';
  className?: string;
}

const variants = {
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
  easy: 'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
  medium:
    'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400',
  hard: 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400',
  success:
    'bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400',
  warning:
    'bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400',
  error: 'bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
};

export function Badge({
  children,
  variant = 'default',
  size = 'sm',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export function DifficultyBadge({
  difficulty,
}: {
  difficulty: 'easy' | 'medium' | 'hard';
}) {
  return (
    <Badge variant={difficulty} size="sm">
      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
    </Badge>
  );
}
