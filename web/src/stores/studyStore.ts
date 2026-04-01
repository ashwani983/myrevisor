import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Question {
  id: string;
  subject: string;
  question: string;
  answer: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface SubjectProgress {
  questionsKnown: string[];
  questionsReview: string[];
  lastStudied: string | null;
  lastQuestionIndex: number;
  streak: number;
}

interface StudyState {
  currentSubject: string | null;
  currentQuestionIndex: number;
  questions: Question[];
  isAnswerRevealed: boolean;
  progress: Record<string, SubjectProgress>;

  setSubject: (subject: string, questions: Question[]) => void;
  updateQuestionIndex: (index: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  revealAnswer: () => void;
  hideAnswer: () => void;
  markKnown: (questionId: string) => void;
  markReview: (questionId: string) => void;
  resetSession: () => void;
  getProgress: (subject: string) => SubjectProgress;
}

const useStudyStore = create<StudyState>()(
  persist(
    (set, get) => ({
      currentSubject: null,
      currentQuestionIndex: 0,
      questions: [],
      isAnswerRevealed: false,
      progress: {},

      setSubject: (subject, questions) => {
        const existingProgress = get().progress[subject];
        const savedIndex = existingProgress?.lastQuestionIndex || 0;
        set({
          currentSubject: subject,
          questions,
          currentQuestionIndex: savedIndex,
          isAnswerRevealed: false,
        });
      },

      updateQuestionIndex: index => {
        const { currentSubject, progress } = get();
        if (!currentSubject) return;

        set({
          currentQuestionIndex: index,
        });

        // Save to progress
        const subjectProgress = progress[currentSubject] || {
          questionsKnown: [],
          questionsReview: [],
          lastStudied: null,
          lastQuestionIndex: 0,
          streak: 0,
        };

        const newProgress = {
          ...progress,
          [currentSubject]: {
            ...subjectProgress,
            lastQuestionIndex: index,
            lastStudied: new Date().toISOString(),
          },
        };

        set({ progress: newProgress });
        localStorage.setItem(
          'myrevisor-progress',
          JSON.stringify({
            state: { progress: newProgress },
            version: 0,
          })
        );
      },

      nextQuestion: () => {
        const { currentQuestionIndex, questions } = get();
        if (currentQuestionIndex < questions.length - 1) {
          set({
            currentQuestionIndex: currentQuestionIndex + 1,
            isAnswerRevealed: false,
          });
        }
      },

      prevQuestion: () => {
        const { currentQuestionIndex } = get();
        if (currentQuestionIndex > 0) {
          set({
            currentQuestionIndex: currentQuestionIndex - 1,
            isAnswerRevealed: false,
          });
        }
      },

      revealAnswer: () => set({ isAnswerRevealed: true }),
      hideAnswer: () => set({ isAnswerRevealed: false }),

      markKnown: questionId => {
        const { currentSubject, progress } = get();
        if (!currentSubject) return;

        const subjectProgress = progress[currentSubject] || {
          questionsKnown: [],
          questionsReview: [],
          lastStudied: null,
          lastQuestionIndex: 0,
          streak: 0,
        };

        const reviewFiltered = subjectProgress.questionsReview.filter(
          id => id !== questionId
        );

        const knownFiltered = subjectProgress.questionsKnown.includes(
          questionId
        )
          ? subjectProgress.questionsKnown
          : [...subjectProgress.questionsKnown, questionId];

        const newProgress = {
          ...progress,
          [currentSubject]: {
            ...subjectProgress,
            questionsKnown: knownFiltered,
            questionsReview: reviewFiltered,
            lastStudied: new Date().toISOString(),
          },
        };

        set({ progress: newProgress });
        localStorage.setItem(
          'myrevisor-progress',
          JSON.stringify({
            state: { progress: newProgress },
            version: 0,
          })
        );
      },

      markReview: questionId => {
        const { currentSubject, progress } = get();
        if (!currentSubject) return;

        const subjectProgress = progress[currentSubject] || {
          questionsKnown: [],
          questionsReview: [],
          lastStudied: null,
          lastQuestionIndex: 0,
          streak: 0,
        };

        const knownFiltered = subjectProgress.questionsKnown.filter(
          id => id !== questionId
        );

        const reviewFiltered = subjectProgress.questionsReview.includes(
          questionId
        )
          ? subjectProgress.questionsReview
          : [...subjectProgress.questionsReview, questionId];

        const newProgress = {
          ...progress,
          [currentSubject]: {
            ...subjectProgress,
            questionsKnown: knownFiltered,
            questionsReview: reviewFiltered,
            lastStudied: new Date().toISOString(),
          },
        };

        set({ progress: newProgress });
        localStorage.setItem(
          'myrevisor-progress',
          JSON.stringify({
            state: { progress: newProgress },
            version: 0,
          })
        );
      },

      resetSession: () => {
        set({
          currentSubject: null,
          currentQuestionIndex: 0,
          questions: [],
          isAnswerRevealed: false,
        });
      },

      getProgress: subject => {
        return (
          get().progress[subject] || {
            questionsKnown: [],
            questionsReview: [],
            lastStudied: null,
            lastQuestionIndex: 0,
            streak: 0,
          }
        );
      },
    }),
    {
      name: 'myrevisor-progress',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ progress: state.progress }),
    }
  )
);

export { useStudyStore };
