import inquirer from 'inquirer';
import chalk from 'chalk';
import {
  colors,
  getDifficultyColor,
  getDifficultyLabel,
  emojis,
} from '../utils/colors.js';
import {
  createProgressBar,
  createQuestionBox,
  createAnswerBox,
} from './box.js';
import { clearScreen } from '../utils/clear.js';

export class StudyUI {
  constructor(subject, questions, configStore) {
    this.subject = subject;
    this.questions = questions;
    this.configStore = configStore;
    this.currentIndex = 0;
    this.answerRevealed = false;
    this.knownQuestions = new Set();
    this.reviewQuestions = [];
  }

  async start() {
    clearScreen();

    while (this.currentIndex < this.questions.length) {
      const result = await this.showQuestion();
      if (result === null) break;
    }

    return this.showCompletion();
  }

  async showQuestion() {
    const question = this.questions[this.currentIndex];
    const { bar, percentage } = createProgressBar(
      this.currentIndex + 1,
      this.questions.length
    );

    clearScreen();

    console.log(chalk.cyan(`📖  ${this.subject.name} - Study Mode`));
    console.log(chalk.gray('─'.repeat(60)));
    console.log(
      chalk.gray(
        `  Question ${this.currentIndex + 1} of ${this.questions.length}  `
      ) + `[${chalk.green(bar)}] ${percentage}%`
    );
    console.log();

    const diffColor = getDifficultyColor(question.difficulty);
    console.log(
      createQuestionBox(
        `${chalk.bold('Q' + (this.currentIndex + 1) + '.')} ${question.question}\n\n` +
          `${chalk.gray('Difficulty:')} ${diffColor(getDifficultyLabel(question.difficulty))}  ${chalk.gray('|')}  ${chalk.gray('Tags:')} ${colors.muted(question.tags?.join(', ') || 'general')}`
      )
    );
    console.log();

    if (this.answerRevealed) {
      console.log(createAnswerBox(`${question.answer}`));
      console.log();
      console.log(
        chalk.gray('  [K] ') +
          colors.success('Known  ') +
          chalk.gray('[R] ') +
          colors.warning('Review  ') +
          chalk.gray('[S] ') +
          'Skip  ' +
          chalk.gray('[Q] ') +
          'Quit'
      );
    } else {
      console.log(
        chalk.gray('  ┌' + '─'.repeat(56) + '┐\n') +
          chalk.gray('  │ ') +
          chalk.cyan('Press SPACE or ENTER to reveal answer') +
          chalk.gray(' '.repeat(20) + '│\n') +
          chalk.gray('  └' + '─'.repeat(56) + '┘')
      );
      console.log();
      console.log(
        chalk.gray('  [S] ') + 'Skip  ' + chalk.gray('[Q] ') + 'Quit'
      );
    }

    const answer = await this.waitForInput();

    if (answer === 'quit') {
      return null;
    } else if (answer === 'skip') {
      this.currentIndex++;
      this.answerRevealed = false;
    } else if (answer === 'reveal') {
      this.answerRevealed = true;
    } else if (answer === 'known') {
      this.knownQuestions.add(question.id);
      this.currentIndex++;
      this.answerRevealed = false;
    } else if (answer === 'review') {
      this.reviewQuestions.push(question);
      this.currentIndex++;
      this.answerRevealed = false;
    }
  }

  async waitForInput() {
    const { key } = await inquirer.prompt([
      {
        type: 'input',
        name: 'key',
        message: '',
      },
    ]);

    if (key === 'q' || key === 'Q') return 'quit';
    if (key === 's' || key === 'S') return 'skip';
    if (key === 'k' || key === 'K') return 'known';
    if (key === 'r' || key === 'R') return 'review';
    if (key === ' ' || key === '' || key === 'Enter') {
      return this.answerRevealed ? 'reveal' : 'reveal';
    }

    return 'reveal';
  }

  showCompletion() {
    clearScreen();

    const known = this.knownQuestions.size;
    const review = this.reviewQuestions.length;
    const skipped = this.questions.length - known - review;

    console.log(chalk.cyan(`📖  Study Session Complete!`));
    console.log(chalk.gray('─'.repeat(60)));
    console.log();
    console.log(
      createAnswerBox(
        `${emojis.check} ${colors.success('Known:')} ${known}\n` +
          `${emojis.cross} ${colors.warning('Review Again:')} ${review}\n` +
          `${emojis.cross} ${colors.muted('Skipped:')} ${skipped}`
      )
    );
    console.log();

    if (review > 0) {
      console.log(
        colors.warning(`${emojis.star} You have ${review} questions to review!`)
      );
    }

    console.log();
    console.log(chalk.gray('Press ENTER to continue...'));

    return {
      known: known,
      review: review,
      skipped: skipped,
    };
  }
}
