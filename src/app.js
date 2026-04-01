import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { DataLoader } from './data/loader.js';
import { ConfigStore } from './config/store.js';
import { MainMenu } from './ui/menu.js';
import { clearScreen } from './utils/clear.js';

export class App {
  constructor() {
    this.dataLoader = new DataLoader();
    this.configStore = new ConfigStore();
  }

  async start() {
    clearScreen();
    this.displayBanner();

    try {
      await this.dataLoader.loadAllSubjects();
      const subjects = this.dataLoader.getSubjectsList();

      const menu = new MainMenu(subjects, this.dataLoader, this.configStore);
      const choice = await menu.show();

      await this.handleMenuChoice(choice);
    } catch (error) {
      console.error(chalk.red(`\nError: ${error.message}`));
      process.exit(1);
    }
  }

  displayBanner() {
    const banner = figlet.textSync('MyRevisor', { font: 'ANSI Shadow' });
    const coloredBanner = gradient.pastel(banner);

    console.log(coloredBanner);
    console.log(chalk.cyan('  Master your DevOps interviews!\n'));
    console.log(
      chalk.gray('  Study Kubernetes, AWS, Docker, Jenkins, Git & Shell Scripting\n')
    );
  }

  async handleMenuChoice(choice) {
    switch (choice.action) {
      case 'study':
        const studyCmd = await import('./commands/study.js');
        await studyCmd.study(choice.subject, { shuffle: false });
        break;
      case 'test':
        const testCmd = await import('./commands/test.js');
        await testCmd.test(choice.subject, { count: 10 });
        break;
      case 'scores':
        const scoresCmd = await import('./commands/scores.js');
        await scoresCmd.scores(choice.subject);
        break;
      case 'list':
        const listCmd = await import('./commands/list.js');
        await listCmd.listSubjects();
        break;
      case 'quit':
        console.log(chalk.cyan('\nThanks for using MyRevisor! Happy studying! 👋\n'));
        process.exit(0);
    }
  }
}
