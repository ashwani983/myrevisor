import chalk from 'chalk';
import inquirer from 'inquirer';
import { DataLoader } from '../data/loader.js';
import { ConfigStore } from '../config/store.js';

export async function reset(subjectName, options = {}) {
  const dataLoader = new DataLoader();
  const configStore = new ConfigStore();

  await dataLoader.loadAllSubjects();

  const subject = dataLoader.getSubject(subjectName);
  if (!subject) {
    console.error(`Subject not found: ${subjectName}`);
    return;
  }

  if (!options.yes) {
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `Are you sure you want to reset all progress for ${subject.name}?`,
        default: false,
      },
    ]);

    if (!confirm) {
      console.log(chalk.gray('Reset cancelled.'));
      return;
    }
  }

  configStore.resetProgress(subject.id);
  console.log(chalk.green(`✓ Progress reset for ${subject.name}`));
}
