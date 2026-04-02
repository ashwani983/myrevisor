import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, BarChart3, Keyboard } from 'lucide-react';
import { QuestionCard } from '@/components/ui/QuestionCard';
import { StudyActions } from '@/components/ui/StudyActions';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { KeyboardShortcutsModal } from '@/components/ui/KeyboardShortcuts';
import {
  getQuestionsForSubject,
  getSubjectName,
  getAllSubjects,
} from '@/data/questions';
import type { Question } from '@/stores/studyStore';
import { useStudyStore } from '@/stores/studyStore';

export function Study() {
  const navigate = useNavigate();
  const params = useParams();
  const subjectId = params.subjectId;

  const [showShortcuts, setShowShortcuts] = useState(false);
  const [sessionData, setSessionData] = useState<{
    subject: string;
    questions: Question[];
    currentIndex: number;
    isRevealed: boolean;
  } | null>(null);

  // Get store functions
  const setSubject = useStudyStore(state => state.setSubject);
  const updateQuestionIndex = useStudyStore(state => state.updateQuestionIndex);
  const markKnown = useStudyStore(state => state.markKnown);
  const markReview = useStudyStore(state => state.markReview);
  const resetSession = useStudyStore(state => state.resetSession);

  useEffect(() => {
    if (subjectId) {
      const questions = getQuestionsForSubject(subjectId);
      if (questions.length > 0) {
        setSubject(subjectId, questions);
        setSessionData({
          subject: subjectId,
          questions,
          currentIndex: 0,
          isRevealed: false,
        });
      }
    } else {
      setSessionData(null);
    }
  }, [subjectId, setSubject]);

  const savedIndex = useStudyStore(state => state.currentQuestionIndex);
  const currentSubject = useStudyStore(state => state.currentSubject);

  useEffect(() => {
    if (
      sessionData &&
      savedIndex > 0 &&
      sessionData.currentIndex === 0 &&
      currentSubject === sessionData.subject
    ) {
      setSessionData(prev =>
        prev
          ? {
              ...prev,
              currentIndex: savedIndex,
            }
          : null
      );
    }
  }, [savedIndex, sessionData, currentSubject]);

  const currentQuestion = sessionData?.questions[sessionData.currentIndex];
  const totalQuestions = sessionData?.questions.length || 0;

  const nextQuestion = useCallback(() => {
    if (
      !sessionData ||
      sessionData.currentIndex >= sessionData.questions.length - 1
    )
      return;
    const newIndex = sessionData.currentIndex + 1;
    setSessionData(prev =>
      prev
        ? {
            ...prev,
            currentIndex: newIndex,
            isRevealed: false,
          }
        : null
    );
    updateQuestionIndex(newIndex);
  }, [sessionData, updateQuestionIndex]);

  const prevQuestion = useCallback(() => {
    if (!sessionData || sessionData.currentIndex <= 0) return;
    const newIndex = sessionData.currentIndex - 1;
    setSessionData(prev =>
      prev
        ? {
            ...prev,
            currentIndex: newIndex,
            isRevealed: false,
          }
        : null
    );
    updateQuestionIndex(newIndex);
  }, [sessionData, updateQuestionIndex]);

  const revealAnswer = () => {
    setSessionData(prev => (prev ? { ...prev, isRevealed: true } : null));
  };

  const hideAnswer = () => {
    setSessionData(prev => (prev ? { ...prev, isRevealed: false } : null));
  };

  const handleKnown = () => {
    if (currentQuestion) {
      markKnown(currentQuestion.id);
      if (
        sessionData &&
        sessionData.currentIndex < sessionData.questions.length - 1
      ) {
        nextQuestion();
      }
    }
  };

  const handleReview = () => {
    if (currentQuestion) {
      markReview(currentQuestion.id);
      if (
        sessionData &&
        sessionData.currentIndex < sessionData.questions.length - 1
      ) {
        nextQuestion();
      }
    }
  };

  const handleExit = () => {
    resetSession();
    setSessionData(null);
    navigate('/');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (!sessionData) return;

      switch (e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          sessionData.isRevealed ? hideAnswer() : revealAnswer();
          break;
        case 'k':
          if (sessionData.isRevealed) handleKnown();
          break;
        case 'r':
          if (sessionData.isRevealed) handleReview();
          break;
        case 'arrowright':
          nextQuestion();
          break;
        case 'arrowleft':
          prevQuestion();
          break;
        case 'escape':
          handleExit();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sessionData]);

  // Subject selection view (when no subject is selected)
  if (!sessionData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Study Mode
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Choose a subject to start studying
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {getAllSubjects().map((subject, index) => (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    variant="interactive"
                    className="p-6"
                    onClick={() => navigate(`/study/${subject.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {subject.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {subject.questionCount} questions
                        </p>
                      </div>
                      <Play className="w-5 h-5 text-primary-500" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleExit}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Exit
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                {getSubjectName(sessionData.subject) || sessionData.subject}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Study Mode
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowShortcuts(true)}
              title="Keyboard shortcuts"
            >
              <Keyboard className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/quiz?subject=${sessionData.subject}`)}
              className="gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Take Quiz
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Progress
            value={sessionData.currentIndex + 1}
            max={totalQuestions}
            size="md"
            showLabel
          />
        </div>

        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard
            question={currentQuestion.question}
            answer={currentQuestion.answer}
            difficulty={currentQuestion.difficulty}
            tags={currentQuestion.tags}
            isRevealed={sessionData.isRevealed}
            onReveal={sessionData.isRevealed ? hideAnswer : revealAnswer}
          />
        </motion.div>

        <div className="mt-6">
          <StudyActions
            isRevealed={sessionData.isRevealed}
            onReveal={sessionData.isRevealed ? hideAnswer : revealAnswer}
            onKnown={handleKnown}
            onReview={handleReview}
            onSkip={nextQuestion}
            onPrev={prevQuestion}
            onNext={nextQuestion}
            canGoPrev={sessionData.currentIndex > 0}
            canGoNext={sessionData.currentIndex < totalQuestions - 1}
            currentIndex={sessionData.currentIndex}
            totalQuestions={totalQuestions}
          />
        </div>

        {sessionData.currentIndex === totalQuestions - 1 &&
          sessionData.isRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8"
            >
              <Card className="p-8 text-center bg-gradient-to-br from-success-50 to-accent-50 dark:from-success-900/20 dark:to-accent-900/20 border-success-200 dark:border-success-800">
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Session Complete!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Great job! You've reviewed all questions in this session.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" onClick={handleExit}>
                    Back to Dashboard
                  </Button>
                  <Button
                    onClick={() =>
                      navigate(`/quiz?subject=${sessionData.subject}`)
                    }
                  >
                    Take a Quiz
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
      </div>
      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  );
}
