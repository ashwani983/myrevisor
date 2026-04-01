import boxen from 'boxen';

export function createBox(content, options = {}) {
  const defaults = {
    padding: 1,
    borderStyle: 'round',
    borderColor: 'cyan',
  };

  return boxen(content, { ...defaults, ...options });
}

export function createQuestionBox(content) {
  return boxen(content, {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'cyan',
    width: 70,
  });
}

export function createAnswerBox(content) {
  return boxen(content, {
    padding: 1,
    borderStyle: 'single',
    borderColor: 'green',
    width: 70,
  });
}

export function createResultBox(content) {
  return boxen(content, {
    padding: 1,
    borderStyle: 'round',
    borderColor: 'cyan',
    width: 60,
  });
}

export function createProgressBar(current, total, width = 40) {
  const percentage = Math.round((current / total) * 100);
  const filled = Math.round((current / total) * width);
  const empty = width - filled;

  const filledBar = '█'.repeat(filled);
  const emptyBar = '░'.repeat(empty);

  return { bar: `${filledBar}${emptyBar}`, percentage };
}
