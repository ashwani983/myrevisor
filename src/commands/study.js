import { DataLoader } from '../data/loader.js';
import { ConfigStore } from '../config/store.js';
import { StudyUI } from '../ui/study.js';

export async function study(subjectName, options = {}) {
  const dataLoader = new DataLoader();
  const configStore = new ConfigStore();

  await dataLoader.loadAllSubjects();

  const subject = dataLoader.getSubject(subjectName);
  if (!subject) {
    console.error(`Subject not found: ${subjectName}`);
    console.log('\nAvailable subjects:');
    const subjects = dataLoader.getSubjectsList();
    subjects.forEach((s) => console.log(`  - ${s.name}`));
    return;
  }

  let questions = [...subject.questions];

  if (options.difficulty) {
    questions = questions.filter((q) => q.difficulty === options.difficulty);
  }

  if (options.shuffle) {
    questions = shuffle(questions);
  }

  if (questions.length === 0) {
    console.log('No questions found for the selected criteria.');
    return;
  }

  const studyUI = new StudyUI(subject, questions, configStore);
  await studyUI.start();

  const inquirer = await import('inquirer');
  await inquirer.default.prompt([
    {
      type: 'input',
      name: 'continue',
      message: '',
    },
  ]);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
