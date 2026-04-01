import chalk from 'chalk';
import boxen from 'boxen';

export class ErrorUI {
  static dataNotFound(subject) {
    console.log(
      boxen(
        `${chalk.red('❌  Error: Subject Not Found')}\n\n` +
          `${chalk.gray('Could not find: ')}${chalk.cyan(subject)}\n\n` +
          `${chalk.gray('Available subjects:')}\n` +
          `${chalk.cyan('kubernetes, aws, docker, jenkins, git, shell')}`,
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'red',
        }
      )
    );
    console.log(chalk.gray('\nRun ') + chalk.green('myrevisor list') + chalk.gray(' to see all subjects\n'));
  }

  static dataLoadError(filename) {
    console.log(
      boxen(
        `${chalk.red('❌  Error: Failed to Load Data')}\n\n` +
          `${chalk.gray('Could not load: ')}${chalk.cyan(filename)}\n\n` +
          `${chalk.gray('Please check that the data file exists and is valid JSON.')}`,
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'red',
        }
      )
    );
  }

  static generalError(message) {
    console.log(
      boxen(
        `${chalk.red('❌  Error')}\n\n` +
          `${message}`,
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'red',
        }
      )
    );
  }

  static quitConfirmation() {
    console.log(
      boxen(
        `${chalk.yellow('⚠️  Are you sure you want to quit?')}\n\n` +
          `${chalk.gray('Your progress in this session will be lost.')}`,
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'yellow',
        }
      )
    );
  }

  static welcomeBack(user) {
    console.log(
      boxen(
        `${chalk.green('👋  Welcome Back!')}\n\n` +
          `${chalk.gray('Your previous stats:')}\n` +
          `${chalk.cyan('Total Quizzes: ')}${chalk.bold(user.totalQuizzes)}\n` +
          `${chalk.cyan('Overall Mastery: ')}${chalk.bold(user.mastery)}%`,
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'green',
        }
      )
    );
  }
}
