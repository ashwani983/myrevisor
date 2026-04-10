import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Clock,
  Target,
  Check,
  X,
  RotateCcw,
  Home,
  BookOpen,
  Keyboard,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
import { StreakBadge } from '@/components/StreakDisplay';
import { KeyboardShortcutsModal } from '@/components/ui/KeyboardShortcuts';
import { useQuizStore } from '@/stores/quizStore';
import { getQuestionsForSubject, getAllSubjects } from '@/data/questions';

const quizOptions = [
  { value: 5, label: '5 questions' },
  { value: 10, label: '10 questions' },
  { value: 15, label: '15 questions' },
  { value: 20, label: '20 questions' },
];

const difficultyOptions = [
  { value: 'all', label: 'All Levels' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export function Quiz() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get('subject');

  const {
    selectedSubject,
    questionCount,
    currentQuiz,
    setConfiguration,
    startQuiz,
    submitAnswer,
    nextQuestion,
    endQuiz,
    resetQuiz,
  } = useQuizStore();

  const [showConfig, setShowConfig] = useState(!subjectParam);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [quizResult, setQuizResult] = useState<ReturnType<
    typeof endQuiz
  > | null>(null);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [dropdownSubject, setDropdownSubject] = useState<string>(
    subjectParam || 'kubernetes'
  );

  // Initialize from URL param
  useEffect(() => {
    if (subjectParam) {
      setDropdownSubject(subjectParam);
      setConfiguration({ subject: subjectParam });
      setShowConfig(true);
    }
  }, [subjectParam]);

  // Start quiz
  const handleStartQuiz = () => {
    const subject = dropdownSubject;
    setConfiguration({ subject });
    const allQuestions = getQuestionsForSubject(subject);
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, questionCount);
    startQuiz(selectedQuestions);
    setShowConfig(false);
    setSelectedOption(null);
    setQuestionStartTime(Date.now());
  };

  // Handle answer selection
  const handleSubmitAnswer = () => {
    if (!currentQuiz || selectedOption === null) return;

    const currentQuestion = currentQuiz.questions[currentQuiz.currentIndex];
    const isCorrect = selectedOption === currentQuestion.answer;
    const timeSpent = Date.now() - questionStartTime;

    submitAnswer(selectedOption, isCorrect, timeSpent);
  };

  // Move to next question or end quiz
  const handleNext = () => {
    if (!currentQuiz) return;

    if (currentQuiz.currentIndex < currentQuiz.questions.length - 1) {
      nextQuestion();
      setSelectedOption(null);
      setQuestionStartTime(Date.now());
    } else {
      const result = endQuiz();
      setQuizResult(result);
      setShowResult(true);
    }
  };

  // Reset and go back
  const handleReset = () => {
    resetQuiz();
    setShowResult(false);
    setQuizResult(null);
    setSelectedOption(null);
    navigate('/');
  };

  // Results screen - check this BEFORE currentQuiz check
  if (showResult && quizResult) {
    const isGoodScore = quizResult.score >= 70;

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-7xl mb-4">{isGoodScore ? '🏆' : '💪'}</div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {isGoodScore ? 'Excellent!' : 'Good effort!'}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              You scored {quizResult.score}% on this quiz
            </p>

            <Card className="p-6 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-success-500">
                    {quizResult.correctAnswers}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Correct
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-error-500">
                    {quizResult.totalQuestions - quizResult.correctAnswers}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Incorrect
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary-500">
                    {quizResult.score}%
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Score
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex gap-3 justify-center">
              <Button variant="outline" onClick={handleReset}>
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowResult(false);
                  setQuizResult(null);
                  setShowConfig(true);
                }}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              <Button onClick={() => navigate(`/study/${selectedSubject}`)}>
                <BookOpen className="w-4 h-4 mr-2" />
                Study
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Configuration screen
  if (showConfig) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              Quiz Mode
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Test your knowledge with a quiz
            </p>

            <Card className="p-6 space-y-6">
              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <select
                  value={dropdownSubject}
                  onChange={e => setDropdownSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
                >
                  {getAllSubjects().map(subject => (
                    <option key={subject.id} value={subject.id}>
                      {subject.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Question count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Questions
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {quizOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setConfiguration({ questionCount: opt.value })
                      }
                      className={cn(
                        'px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all',
                        questionCount === opt.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty
                </label>
                <div className="flex gap-2">
                  {difficultyOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() =>
                        setConfiguration({ difficulty: opt.value as any })
                      }
                      className={cn(
                        'flex-1 px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all',
                        (useQuizStore.getState().difficulty || 'all') ===
                          opt.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Start button */}
              <Button onClick={handleStartQuiz} size="lg" className="w-full">
                <Target className="w-5 h-5 mr-2" />
                Start Quiz
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  // Quiz in progress (or no active quiz)
  if (!currentQuiz) {
    // If we have a result but no current quiz, redirect to dashboard
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Quiz completed!
          </p>
          <Button onClick={() => navigate('/')}>
            <Home className="w-4 h-4 mr-2" />
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuiz.currentIndex];
  const progress =
    ((currentQuiz.currentIndex + 1) / currentQuiz.questions.length) * 100;

  // Generate options for MCQ - get wrong answers from other questions in the quiz
  const otherAnswers = currentQuiz.questions
    .filter(q => q.id !== currentQuestion.id)
    .map(q => q.answer)
    .slice(0, 3);

  while (otherAnswers.length < 3) {
    otherAnswers.push(`Option ${otherAnswers.length + 2}`);
  }

  const options = [currentQuestion.answer, ...otherAnswers].sort(
    () => Math.random() - 0.5
  );

  const hasAnswered = currentQuiz.answers.length > currentQuiz.currentIndex;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Exit Quiz
          </Button>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowShortcuts(true)}
              title="Keyboard shortcuts"
            >
              <Keyboard className="w-4 h-4" />
            </Button>
            <div className="flex items-center gap-1 text-sm">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-gray-600 dark:text-gray-400">
                Q{currentQuiz.currentIndex + 1}/{currentQuiz.questions.length}
              </span>
            </div>
            <StreakBadge streak={currentQuiz.streak} />
          </div>
        </div>

        {/* Progress */}
        <Progress value={progress} size="sm" className="mb-8" />

        {/* Question */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6 mb-6">
            <Badge variant={currentQuestion.difficulty as any} className="mb-4">
              {currentQuestion.difficulty}
            </Badge>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {currentQuestion.question}
            </h2>
          </Card>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {options.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQuestion.answer;
              const showCorrect = hasAnswered && isCorrect;
              const showWrong = hasAnswered && isSelected && !isCorrect;

              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: hasAnswered ? 1 : 1.01 }}
                  whileTap={{ scale: hasAnswered ? 1 : 0.99 }}
                  onClick={() => !hasAnswered && setSelectedOption(option)}
                  disabled={hasAnswered}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-left transition-all',
                    'flex items-center gap-3',
                    showCorrect &&
                      'border-success-500 bg-success-50 dark:bg-success-900/20',
                    showWrong &&
                      'border-error-500 bg-error-50 dark:bg-error-900/20',
                    !hasAnswered &&
                      isSelected &&
                      'border-primary-500 bg-primary-50 dark:bg-primary-900/20',
                    !hasAnswered &&
                      !isSelected &&
                      'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold text-sm',
                      showCorrect &&
                        'bg-success-500 border-success-500 text-white',
                      showWrong && 'bg-error-500 border-error-500 text-white',
                      !hasAnswered &&
                        isSelected &&
                        'bg-primary-500 border-primary-500 text-white',
                      !hasAnswered &&
                        !isSelected &&
                        'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                    )}
                  >
                    {showCorrect ? (
                      <Check className="w-4 h-4" />
                    ) : showWrong ? (
                      <X className="w-4 h-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className="flex-1 text-gray-900 dark:text-white">
                    {option}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {!hasAnswered ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedOption}
                className="flex-1"
              >
                Submit Answer
              </Button>
            ) : (
              <Button onClick={handleNext} className="flex-1">
                {currentQuiz.currentIndex < currentQuiz.questions.length - 1
                  ? 'Next Question'
                  : 'See Results'}
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Button>
            )}
          </div>

          {/* Score indicator */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Current Score:{' '}
              <span className="font-bold text-primary-500">
                {currentQuiz.score}/
                {currentQuiz.currentIndex + (hasAnswered ? 1 : 0)}
              </span>
            </span>
          </div>
        </motion.div>
      </div>
      <KeyboardShortcutsModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  );
}
