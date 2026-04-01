import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Question } from './studyStore';

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: string;
  correct: boolean;
  timeSpent: number;
}

export interface QuizResult {
  id: string;
  subject: string;
  mode: 'mcq' | 'flashcard' | 'timed';
  answers: QuizAnswer[];
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  duration: number;
  createdAt: string;
}

interface QuizState {
  // Quiz configuration
  selectedSubject: string | null;
  questionCount: number;
  difficulty: 'all' | 'easy' | 'medium' | 'hard';
  mode: 'mcq' | 'flashcard' | 'timed';

  // Current quiz
  currentQuiz: {
    questions: Question[];
    answers: QuizAnswer[];
    currentIndex: number;
    startTime: number;
    streak: number;
    maxStreak: number;
    score: number;
  } | null;

  // Quiz history
  quizHistory: QuizResult[];

  // Actions
  setConfiguration: (config: {
    subject?: string;
    questionCount?: number;
    difficulty?: 'all' | 'easy' | 'medium' | 'hard';
    mode?: 'mcq' | 'flashcard' | 'timed';
  }) => void;
  startQuiz: (questions: Question[]) => void;
  submitAnswer: (answer: string, isCorrect: boolean, timeSpent: number) => void;
  nextQuestion: () => void;
  endQuiz: () => QuizResult;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      selectedSubject: null,
      questionCount: 10,
      difficulty: 'all',
      mode: 'mcq',
      currentQuiz: null,
      quizHistory: [],

      setConfiguration: config => {
        set(state => ({
          ...state,
          ...config,
        }));
      },

      startQuiz: questions => {
        set({
          currentQuiz: {
            questions,
            answers: [],
            currentIndex: 0,
            startTime: Date.now(),
            streak: 0,
            maxStreak: 0,
            score: 0,
          },
        });
      },

      submitAnswer: (answer, isCorrect, timeSpent) => {
        const { currentQuiz } = get();
        if (!currentQuiz) return;

        const newAnswers = [
          ...currentQuiz.answers,
          {
            questionId: currentQuiz.questions[currentQuiz.currentIndex].id,
            selectedAnswer: answer,
            correct: isCorrect,
            timeSpent,
          },
        ];

        const newStreak = isCorrect ? currentQuiz.streak + 1 : 0;
        const newScore = currentQuiz.score + (isCorrect ? 1 : 0);

        set({
          currentQuiz: {
            ...currentQuiz,
            answers: newAnswers,
            streak: newStreak,
            maxStreak: Math.max(currentQuiz.maxStreak, newStreak),
            score: newScore,
          },
        });
      },

      nextQuestion: () => {
        const { currentQuiz } = get();
        if (!currentQuiz) return;

        set({
          currentQuiz: {
            ...currentQuiz,
            currentIndex: currentQuiz.currentIndex + 1,
          },
        });
      },

      endQuiz: () => {
        const { currentQuiz, selectedSubject, mode, quizHistory } = get();
        if (!currentQuiz) {
          throw new Error('No active quiz');
        }

        // Get subject from current quiz questions or fall back to store state
        const subject =
          currentQuiz.questions[0]?.subject || selectedSubject || 'unknown';

        // Get the mode from store state
        const quizMode = mode;

        const duration = Date.now() - currentQuiz.startTime;
        const correctAnswers = currentQuiz.answers.filter(
          a => a.correct
        ).length;
        const totalQuestions = currentQuiz.questions.length;
        const score =
          totalQuestions > 0
            ? Math.round((correctAnswers / totalQuestions) * 100)
            : 0;

        const result: QuizResult = {
          id: `quiz-${Date.now()}`,
          subject,
          mode: quizMode,
          answers: currentQuiz.answers,
          score,
          totalQuestions,
          correctAnswers,
          duration,
          createdAt: new Date().toISOString(),
        };

        set({
          currentQuiz: null,
          quizHistory: [result, ...quizHistory].slice(0, 50),
        });

        return result;
      },

      resetQuiz: () => {
        set({ currentQuiz: null });
      },
    }),
    {
      name: 'myrevisor-quiz',
      partialize: state => ({
        quizHistory: state.quizHistory,
      }),
    }
  )
);
