import chalk from 'chalk';
import { DataLoader } from '../data/loader.js';
import { getSubjectEmoji, colors } from '../utils/colors.js';

export async function listSubjects() {
  const dataLoader = new DataLoader();
  await dataLoader.loadAllSubjects();

  const subjects = dataLoader.getSubjectsList();

  console.log(chalk.cyan('📋  Available Subjects'));
  console.log(chalk.gray('─'.repeat(60)));
  console.log();

  for (const subject of subjects) {
    const emoji = getSubjectEmoji(subject.name);
    console.log(`  ${emoji}  ${colors.bold(subject.name)}`);
    console.log(`      ${colors.muted(subject.description || 'No description')}`);
    console.log(`      ${colors.info(`${subject.totalQuestions} questions`)}`);
    if (subject.lastUpdated) {
      console.log(`      ${colors.muted(`Last updated: ${subject.lastUpdated}`)}`);
    }
    console.log();
  }
}
