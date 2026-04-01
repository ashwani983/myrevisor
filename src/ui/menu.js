import inquirer from 'inquirer';
import chalk from 'chalk';
import { getSubjectEmoji, colors } from '../utils/colors.js';
import { clearScreen } from '../utils/clear.js';

export class MainMenu {
  constructor(subjects, dataLoader, configStore) {
    this.subjects = subjects;
    this.dataLoader = dataLoader;
    this.configStore = configStore;
  }

  async show() {
    clearScreen();

    const choices = [
      {
        name: `${colors.primary('📖')}  Study a Subject`,
        value: 'study',
        short: 'Study',
      },
      {
        name: `${colors.primary('🧪')}  Take a Quiz`,
        value: 'test',
        short: 'Quiz',
      },
      {
        name: `${colors.primary('📊')}  View My Scores`,
        value: 'scores',
        short: 'Scores',
      },
      {
        name: `${colors.primary('📋')}  List Subjects`,
        value: 'list',
        short: 'List',
      },
      new inquirer.Separator(),
      {
        name: `${colors.muted('❌')}  Quit`,
        value: 'quit',
        short: 'Quit',
      },
    ];

    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: chalk.cyan('What would you like to do?'),
        choices,
        loop: false,
      },
    ]);

    if (action === 'study') {
      return await this.selectSubject('study');
    } else if (action === 'test') {
      return await this.selectSubject('test');
    } else if (action === 'scores') {
      return await this.selectSubject('scores');
    } else if (action === 'list') {
      return { action: 'list' };
    } else if (action === 'quit') {
      return { action: 'quit' };
    }

    return { action: 'quit' };
  }

  async selectSubject(intent) {
    clearScreen();

    const choices = this.subjects.map((subject) => ({
      name: `${getSubjectEmoji(subject.name)}  ${subject.name} (${subject.totalQuestions} questions)`,
      value: subject.id,
      short: subject.name,
      description: subject.description,
    }));

    choices.push(
      new inquirer.Separator(),
      {
        name: `${colors.muted('⬅️')}  Back to Menu`,
        value: 'back',
        short: 'Back',
      }
    );

    const { subject } = await inquirer.prompt([
      {
        type: 'list',
        name: 'subject',
        message: chalk.cyan(
          intent === 'study'
            ? '📖  Choose a subject to study:'
            : intent === 'test'
              ? '🧪  Choose a subject to test:'
              : '📊  View scores for:'
        ),
        choices,
        loop: false,
      },
    ]);

    if (subject === 'back') {
      return this.show();
    }

    return { action: intent, subject };
  }
}
