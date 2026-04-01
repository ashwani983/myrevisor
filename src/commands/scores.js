import { DataLoader } from '../data/loader.js';
import { ConfigStore } from '../config/store.js';
import { ScoresUI } from '../ui/scores.js';

export async function scores(subjectName = null) {
  const dataLoader = new DataLoader();
  const configStore = new ConfigStore();

  await dataLoader.loadAllSubjects();

  const scoresUI = new ScoresUI(dataLoader, configStore);
  await scoresUI.show(subjectName);

  const inquirer = await import('inquirer');
  await inquirer.default.prompt([
    {
      type: 'input',
      name: 'continue',
      message: '',
    },
  ]);
}
