import chalk from 'chalk';
import boxen from 'boxen';

export class HelpUI {
  show() {
    console.log(chalk.cyan('\n❓  Help & Keyboard Shortcuts\n'));
    console.log(chalk.gray('─'.repeat(60)));
    console.log();

    console.log(
      boxen(
        `${chalk.bold('CLI Commands')}\n` +
          `${chalk.green('myrevisor')}                    ${chalk.gray('-')} Interactive menu\n` +
          `${chalk.green('myrevisor study <subject>')}   ${chalk.gray('-')} Study mode\n` +
          `${chalk.green('myrevisor test <subject>')}    ${chalk.gray('-')} Quiz mode\n` +
          `${chalk.green('myrevisor scores')}            ${chalk.gray('-')} View scores\n` +
          `${chalk.green('myrevisor list')}               ${chalk.gray('-')} List subjects\n` +
          `${chalk.green('myrevisor --help')}            ${chalk.gray('-')} Show help\n\n` +
          `${chalk.bold('Quiz Options')}\n` +
          `${chalk.cyan('-n, --count <num>')}   ${chalk.gray('Number of questions (default: 10)')}\n` +
          `${chalk.cyan('-t, --timed <min>')}   ${chalk.gray('Timed quiz (minutes)')}\n` +
          `${chalk.cyan('-m, --mcq')}           ${chalk.gray('Multiple choice questions')}\n` +
          `${chalk.cyan('-s, --shuffle')}       ${chalk.gray('Shuffle question order')}\n` +
          `${chalk.cyan('-d, --difficulty')}    ${chalk.gray('easy|medium|hard')}`,
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'cyan',
        }
      )
    );

    console.log(
      boxen(
        `${chalk.bold('Study Mode')}\n` +
          `${chalk.cyan('SPACE/ENTER')}    ${chalk.gray('Reveal/Hide answer')}\n` +
          `${chalk.cyan('K')}              ${chalk.gray('Mark as Known')}\n` +
          `${chalk.cyan('R')}              ${chalk.gray('Mark for Review')}\n` +
          `${chalk.cyan('S')}              ${chalk.gray('Skip question')}\n` +
          `${chalk.cyan('Q')}              ${chalk.gray('Quit')}\n\n` +
          `${chalk.bold('Quiz Mode')}\n` +
          `${chalk.cyan('A/B/C/D')}        ${chalk.gray('Select option')}\n` +
          `${chalk.cyan('S')}              ${chalk.gray('Skip question')}\n` +
          `${chalk.cyan('T')}              ${chalk.gray('Toggle timer')}\n` +
          `${chalk.cyan('Q')}              ${chalk.gray('Quit quiz')}`,
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'cyan',
        }
      )
    );

    console.log(
      boxen(
        `${chalk.bold('Subjects Available')}\n` +
          `${chalk.cyan('kubernetes')}   ${chalk.gray('Container orchestration (50 Q)')}\n` +
          `${chalk.cyan('aws')}          ${chalk.gray('Amazon Web Services (10 Q)')}\n` +
          `${chalk.cyan('docker')}        ${chalk.gray('Container platform (50 Q)')}\n` +
          `${chalk.cyan('jenkins')}      ${chalk.gray('CI/CD automation (10 Q)')}\n` +
          `${chalk.cyan('git')}          ${chalk.gray('Version control (10 Q)')}\n` +
          `${chalk.cyan('shell')}        ${chalk.gray('Shell scripting (10 Q)')}`,
        {
          padding: 1,
          borderStyle: 'round',
          borderColor: 'cyan',
        }
      )
    );

    console.log();
    console.log(
      chalk.gray('  Tip: Use tab completion for subject names!')
    );
    console.log(
      chalk.gray('  Example: ') +
        chalk.green('myrevisor test kubernetes -n 20 --mcq')
    );
    console.log();
  }
}
