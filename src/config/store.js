import Conf from 'conf';

export class ConfigStore {
  constructor() {
    this.store = new Conf({
      projectName: 'myrevisor',
      defaults: {
        scores: {},
        settings: {
          defaultQuizCount: 10,
          showTimer: true,
          darkMode: true,
        },
      },
    });
  }

  getScores() {
    return this.store.get('scores', {});
  }

  getSubjectScores(subject) {
    const scores = this.getScores();
    return scores[subject] || null;
  }

  initSubjectScores(subject) {
    const scores = this.getScores();
    if (!scores[subject]) {
      scores[subject] = {
        quizzesTaken: 0,
        averageScore: 0,
        highScore: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        streak: 0,
        lastStudied: null,
        questionStats: {},
      };
      this.store.set('scores', scores);
    }
    return scores[subject];
  }

  saveQuizResult(subject, result) {
    const scores = this.getScores();
    let subjectScores = scores[subject];

    if (!subjectScores) {
      subjectScores = this.initSubjectScores(subject);
    }

    const totalQuizzes = subjectScores.quizzesTaken + 1;
    const newAverage =
      (subjectScores.averageScore * subjectScores.quizzesTaken + result.score) /
      totalQuizzes;

    subjectScores.quizzesTaken = totalQuizzes;
    subjectScores.averageScore = Math.round(newAverage * 10) / 10;
    subjectScores.highScore = Math.max(subjectScores.highScore, result.score);
    subjectScores.totalQuestions += result.total;
    subjectScores.correctAnswers += result.correct;
    subjectScores.lastStudied = new Date().toISOString();
    subjectScores.streak = result.streak;

    for (const [qId, stat] of Object.entries(result.questionStats || {})) {
      if (!subjectScores.questionStats[qId]) {
        subjectScores.questionStats[qId] = { asked: 0, correct: 0 };
      }
      subjectScores.questionStats[qId].asked += stat.asked || 0;
      subjectScores.questionStats[qId].correct += stat.correct || 0;
    }

    this.store.set('scores', scores);
    return subjectScores;
  }

  updateQuestionStat(subject, questionId, correct) {
    const scores = this.getScores();
    let subjectScores = scores[subject];

    if (!subjectScores) {
      subjectScores = this.initSubjectScores(subject);
    }

    if (!subjectScores.questionStats[questionId]) {
      subjectScores.questionStats[questionId] = { asked: 0, correct: 0 };
    }

    subjectScores.questionStats[questionId].asked++;
    if (correct) {
      subjectScores.questionStats[questionId].correct++;
    }

    this.store.set('scores', scores);
  }

  getSettings() {
    return this.store.get('settings');
  }

  saveSettings(settings) {
    const current = this.getSettings();
    this.store.set('settings', { ...current, ...settings });
  }

  resetProgress(subject) {
    const scores = this.getScores();
    if (scores[subject]) {
      delete scores[subject];
      this.store.set('scores', scores);
    }
  }

  resetAll() {
    this.store.set('scores', {});
  }
}
