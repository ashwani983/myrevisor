import inquirer from 'inquirer';
import chalk from 'chalk';
import { colors, getSubjectEmoji, emojis } from '../utils/colors.js';
import {
  createProgressBar,
  createQuestionBox,
  createResultBox,
} from './box.js';
import { clearScreen } from '../utils/clear.js';

export class QuizUI {
  constructor(subject, questions, options, dataLoader, configStore) {
    this.subject = subject;
    this.questions = questions;
    this.options = options;
    this.dataLoader = dataLoader;
    this.configStore = configStore;
    this.currentIndex = 0;
    this.answers = [];
    this.startTime = Date.now();
    this.streak = 0;
    this.maxStreak = 0;
    this.questionStats = {};
    this.useMCQ = options.mcq || false;
    this.timed = options.timed ? parseInt(options.timed) : null;
    this.timeRemaining = this.timed ? this.timed * 60 : null;
    this.timerInterval = null;
    this.timeExpired = false;
  }

  async start() {
    clearScreen();

    console.log(chalk.cyan(`${emojis.quiz}  ${this.subject.name} - Quiz Mode`));
    console.log(chalk.gray('─'.repeat(60)));

    if (this.timed) {
      console.log(chalk.yellow(`⏱️  Timed: ${this.timed} minutes`));
    }

    console.log(chalk.gray(`📝 ${this.questions.length} questions\n`));

    if (this.timed) {
      this.startTimer();
    }

    while (this.currentIndex < this.questions.length && !this.timeExpired) {
      const answered = await this.showQuestion();
      if (!answered) break;
    }

    this.stopTimer();
    return this.showResults();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeRemaining--;
      if (this.timeRemaining <= 0) {
        this.timeExpired = true;
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getTimeRemaining() {
    if (this.timeRemaining === null) return null;
    const minutes = Math.floor(this.timeRemaining / 60);
    const seconds = this.timeRemaining % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  async showQuestion() {
    if (this.timeExpired) {
      console.log(chalk.red("\n⏱️  Time's up!"));
      await inquirer.prompt([
        {
          type: 'input',
          name: 'cont',
          message: 'Press ENTER to see results...',
        },
      ]);
      return false;
    }

    const question = this.questions[this.currentIndex];
    const { bar, percentage } = createProgressBar(
      this.currentIndex + 1,
      this.questions.length
    );

    clearScreen();

    console.log(chalk.cyan(`${emojis.quiz}  ${this.subject.name} - Quiz Mode`));
    console.log(chalk.gray('─'.repeat(60)));

    let timeDisplay = '';
    if (this.timed) {
      const timeStr = this.getTimeRemaining();
      const isLow = this.timeRemaining < 60;
      timeDisplay = isLow
        ? chalk.red(`⏱️ ${timeStr}`)
        : chalk.yellow(`⏱️ ${timeStr}`);
    } else {
      timeDisplay = chalk.gray(`⏱️ ${this.getElapsedTime()}`);
    }

    console.log(
      chalk.gray(`  Q${this.currentIndex + 1}/${this.questions.length}  `) +
        `[${chalk.green(bar)}] ${percentage}%  ` +
        timeDisplay
    );
    console.log();

    if (this.useMCQ) {
      return await this.showMCQQuestion(question);
    } else {
      return await this.showFlashcardQuestion(question);
    }
  }

  async showFlashcardQuestion(question) {
    console.log(
      createQuestionBox(
        `${chalk.bold('Q' + (this.currentIndex + 1) + '.')} ${question.question}`
      )
    );
    console.log();

    const choices = [
      { name: `${colors.success('✓')} Show Answer`, value: 'show' },
      { name: `${colors.muted('→')} Skip Question`, value: 'skip' },
      { name: `${colors.error('✗')} Quit Quiz`, value: 'quit' },
    ];

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: '',
        choices,
        loop: false,
      },
    ]);

    if (action === 'skip') {
      this.answers.push({
        questionId: question.id,
        correct: null,
        skipped: true,
      });
      this.currentIndex++;
      return true;
    }

    if (action === 'quit') {
      return false;
    }

    clearScreen();
    console.log(chalk.cyan(`${emojis.quiz}  ${this.subject.name} - Quiz Mode`));
    console.log(chalk.gray('─'.repeat(60)));
    console.log(
      chalk.gray(`  Q${this.currentIndex + 1}/${this.questions.length}`)
    );
    console.log();
    console.log(createQuestionBox(question.question));
    console.log();
    console.log(createResultBox(`${question.answer}`));
    console.log();

    const { selfGrade } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selfGrade',
        message: 'Did you know the answer?',
        choices: [
          { name: `${colors.success('✓')} Yes, I knew it`, value: true },
          { name: `${colors.error('✗')} No, I didn't know`, value: false },
        ],
        loop: false,
      },
    ]);

    this.recordAnswer(question.id, selfGrade);
    this.currentIndex++;
    return true;
  }

  async showMCQQuestion(question) {
    const wrongAnswers = this.dataLoader.getWrongAnswers(
      this.subject.id,
      question,
      3
    );

    const options = this.shuffle([
      question.answer,
      ...wrongAnswers.map(a => a.answer),
    ]);
    const correctIndex = options.indexOf(question.answer);

    const choices = options.map((opt, i) => ({
      name: `${String.fromCharCode(65 + i)}) ${opt.substring(0, 80)}${opt.length > 80 ? '...' : ''}`,
      value: i,
    }));

    choices.push(
      new inquirer.Separator(),
      { name: `${colors.muted('→')} Skip Question`, value: 'skip' },
      { name: `${colors.error('✗')} Quit Quiz`, value: 'quit' }
    );

    console.log(
      createQuestionBox(
        `${chalk.bold('Q' + (this.currentIndex + 1) + '.')} ${question.question}`
      )
    );
    console.log();

    const { selected } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selected',
        message: 'Select your answer:',
        choices,
        loop: false,
      },
    ]);

    if (selected === 'skip') {
      this.answers.push({
        questionId: question.id,
        correct: null,
        skipped: true,
      });
      this.currentIndex++;
      return true;
    }

    if (selected === 'quit') {
      return false;
    }

    const isCorrect = selected === correctIndex;

    clearScreen();
    console.log(chalk.cyan(`${emojis.quiz}  ${this.subject.name} - Quiz Mode`));
    console.log(chalk.gray('─'.repeat(60)));
    console.log(createQuestionBox(question.question));
    console.log();

    options.forEach((opt, i) => {
      let line = `${String.fromCharCode(65 + i)}) ${opt}`;
      if (i === correctIndex) {
        line = colors.success('✓ ' + line);
      } else if (i === selected && !isCorrect) {
        line = colors.error('✗ ' + line);
      }
      console.log('  ' + line);
    });

    console.log();
    console.log(
      isCorrect
        ? colors.success(`${emojis.check} Correct!`)
        : colors.error(
            `${emojis.cross} Incorrect! The correct answer was: ${question.answer.substring(0, 60)}...`
          )
    );

    console.log(chalk.gray('\nPress ENTER to continue...'));
    await inquirer.prompt([
      {
        type: 'input',
        name: 'continue',
        message: '',
      },
    ]);

    this.recordAnswer(question.id, isCorrect);
    this.currentIndex++;
    return true;
  }

  recordAnswer(questionId, correct) {
    if (!this.questionStats[questionId]) {
      this.questionStats[questionId] = { asked: 0, correct: 0 };
    }
    this.questionStats[questionId].asked++;

    if (correct) {
      this.streak++;
      this.maxStreak = Math.max(this.maxStreak, this.streak);
      this.questionStats[questionId].correct++;
    } else {
      this.streak = 0;
    }

    this.answers.push({ questionId, correct, skipped: false });
  }

  showResults() {
    clearScreen();

    const total = this.answers.filter(a => !a.skipped).length;
    const correct = this.answers.filter(a => a.correct === true).length;
    const incorrect = this.answers.filter(a => a.correct === false).length;
    const skipped = this.answers.filter(a => a.skipped).length;
    const score = total > 0 ? Math.round((correct / total) * 100) : 0;
    const elapsed = this.formatTime(Date.now() - this.startTime);

    console.log(chalk.cyan(`🎯  Quiz Complete!`));
    console.log(chalk.gray('─'.repeat(60)));
    console.log();
    console.log(
      createResultBox(
        `${chalk.bold('Subject:')} ${this.subject.name}\n` +
          `${chalk.bold('Questions:')} ${total} (+ ${skipped} skipped)\n` +
          `${chalk.bold('Time:')} ${elapsed}\n` +
          `${'─'.repeat(40)}\n` +
          `${colors.success('✓ Correct:')} ${correct} (${total > 0 ? Math.round((correct / total) * 100) : 0}%)\n` +
          `${colors.error('✗ Incorrect:')} ${incorrect}\n` +
          `${'─'.repeat(40)}\n` +
          `${colors.warning(`${emojis.trophy} High Score: ${score}%`)} ${colors.muted(`(Previous best)`)}\n` +
          `${colors.warning(`${emojis.fire} Streak: ${this.maxStreak}`)}`
      )
    );
    console.log();

    return {
      score,
      total,
      correct,
      incorrect,
      skipped,
      streak: this.maxStreak,
      questionStats: this.questionStats,
      elapsed,
    };
  }

  getElapsedTime() {
    const elapsed = Date.now() - this.startTime;
    return this.formatTime(elapsed);
  }

  formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
