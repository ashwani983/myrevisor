import chalk from 'chalk';
import { colors, emojis, getSubjectEmoji } from '../utils/colors.js';
import { createResultBox } from './box.js';
import { clearScreen } from '../utils/clear.js';

export class ScoresUI {
  constructor(dataLoader, configStore) {
    this.dataLoader = dataLoader;
    this.configStore = configStore;
  }

  async show(subjectName = null) {
    clearScreen();

    console.log(chalk.cyan(`${emojis.scores}  Your Progress`));
    console.log(chalk.gray('─'.repeat(60)));
    console.log();

    const subjects = this.dataLoader.getSubjectsList();
    const scores = this.configStore.getScores();

    if (subjectName) {
      const subject = subjects.find(
        (s) => s.name.toLowerCase() === subjectName.toLowerCase()
      );
      if (!subject) {
        console.log(chalk.red(`Subject not found: ${subjectName}`));
        return;
      }
      return this.showSubjectScores(subject, scores[subject.id]);
    }

    let totalQuizzes = 0;
    let totalCorrect = 0;
    let totalQuestions = 0;

    for (const subject of subjects) {
      const subjectScores = scores[subject.id];
      if (subjectScores) {
        totalQuizzes += subjectScores.quizzesTaken || 0;
        totalCorrect += subjectScores.correctAnswers || 0;
        totalQuestions += subjectScores.totalQuestions || 0;
      }
    }

    const overallMastery =
      totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

    console.log(
      createResultBox(
        `${'Subject'.padEnd(18)} | ${'High'.padEnd(8)} | ${'Avg'.padEnd(8)} | ${'Quizzes'.padEnd(8)} | ${'Streak'.padEnd(8)}\n` +
          `${'─'.repeat(18)}-+-${'─'.repeat(8)}-+-${'─'.repeat(8)}-+-${'─'.repeat(8)}-+-${'─'.repeat(8)}\n` +
          subjects
            .map((s) => {
              const sc = scores[s.id] || {};
              const high = sc.highScore ? `${sc.highScore}%` : '-';
              const avg = sc.averageScore ? `${sc.averageScore}%` : '-';
              const qz = sc.quizzesTaken || '-';
              const streak = sc.streak || '-';
              const emoji = getSubjectEmoji(s.name);
              return `${emoji} ${s.name.padEnd(16)} | ${high.padEnd(8)} | ${avg.padEnd(8)} | ${String(qz).padEnd(8)} | ${emojis.fire} ${streak}`;
            })
            .join('\n')
      )
    );

    console.log();
    console.log(
      colors.muted(
        `  Total Quizzes: ${totalQuizzes}  |  Overall Mastery: ${overallMastery}%`
      )
    );
    console.log();
    console.log(chalk.gray('Press ENTER to continue...'));

    return { totalQuizzes, overallMastery };
  }

  showSubjectScores(subject, subjectScores) {
    console.log(chalk.bold(`${getSubjectEmoji(subject.name)} ${subject.name}`));
    console.log(chalk.gray('─'.repeat(60)));
    console.log();

    if (!subjectScores) {
      console.log(colors.muted('  No scores yet for this subject.\n'));
      console.log(chalk.gray('Press ENTER to continue...'));
      return;
    }

    console.log(
      createResultBox(
        `${colors.success(`${emojis.trophy} High Score:`)} ${subjectScores.highScore}%\n` +
          `${colors.info(`${emojis.scores} Average Score:`)} ${subjectScores.averageScore}%\n` +
          `${colors.info('Quizzes Taken:')} ${subjectScores.quizzesTaken}\n` +
          `${colors.info('Questions Answered:')} ${subjectScores.correctAnswers} / ${subjectScores.totalQuestions}\n` +
          `${colors.warning(`${emojis.fire} Current Streak:`)} ${subjectScores.streak}\n` +
          `${colors.muted('Last Studied:')} ${subjectScores.lastStudied ? new Date(subjectScores.lastStudied).toLocaleDateString() : 'Never'}`
      )
    );

    console.log();

    const questionStats = subjectScores.questionStats || {};
    const weakQuestions = Object.entries(questionStats)
      .filter(([_, stat]) => stat.asked >= 2 && stat.correct / stat.asked < 0.5)
      .slice(0, 5);

    if (weakQuestions.length > 0) {
      console.log(colors.warning('  📌 Areas to improve:'));
      for (const [qId, stat] of weakQuestions) {
        const question = this.dataLoader.getQuestion(subject.id, qId);
        if (question) {
          const accuracy = Math.round((stat.correct / stat.asked) * 100);
          console.log(
            colors.muted(`    - ${question.question.substring(0, 50)}... (${accuracy}% correct)`)
          );
        }
      }
    }

    console.log();
    console.log(chalk.gray('Press ENTER to continue...'));
  }
}
