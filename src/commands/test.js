import { DataLoader } from '../data/loader.js';
import { ConfigStore } from '../config/store.js';
import { QuizUI } from '../ui/quiz.js';

export async function test(subjectName, options = {}) {
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

  const count = parseInt(options.count) || 10;
  const questions = dataLoader.getRandomQuestions(subject.id, count);

  if (questions.length === 0) {
    console.log('No questions available.');
    return;
  }

  const quizUI = new QuizUI(subject, questions, options, dataLoader, configStore);
  const result = await quizUI.start();

  configStore.saveQuizResult(subject.id, result);

  const inquirer = await import('inquirer');
  await inquirer.default.prompt([
    {
      type: 'input',
      name: 'continue',
      message: '',
    },
  ]);
}
