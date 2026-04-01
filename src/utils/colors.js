import chalk from 'chalk';

export const colors = {
  primary: chalk.cyan,
  secondary: chalk.blue,
  success: chalk.green,
  error: chalk.red,
  warning: chalk.yellow,
  info: chalk.white,
  muted: chalk.gray,
  bold: chalk.bold,
  dim: chalk.dim,
};

export const emojis = {
  book: '📚',
  study: '📖',
  quiz: '🧪',
  scores: '📊',
  help: '❓',
  exit: '🚪',
  check: '✓',
  cross: '✗',
  trophy: '🏆',
  fire: '🔥',
  clock: '⏱️',
  star: '⭐',
  k8s: '☸️',
  aws: '☁️',
  docker: '🐳',
  jenkins: '🔧',
  git: '📦',
  shell: '💻',
};

export function getSubjectEmoji(subject) {
  const name = subject.toLowerCase();
  if (name.includes('kubernetes') || name.includes('k8s')) return emojis.k8s;
  if (name.includes('aws')) return emojis.aws;
  if (name.includes('docker')) return emojis.docker;
  if (name.includes('jenkins')) return emojis.jenkins;
  if (name.includes('git')) return emojis.git;
  if (name.includes('shell')) return emojis.shell;
  return emojis.book;
}

export function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case 'easy':
      return chalk.green;
    case 'medium':
      return chalk.yellow;
    case 'hard':
      return chalk.red;
    default:
      return chalk.white;
  }
}

export function getDifficultyLabel(difficulty) {
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
}
