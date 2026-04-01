import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Trophy, Bot, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressCircle } from '@/components/ui/Progress';
import { SubjectCard } from '@/components/SubjectCard';
import { StreakDisplay } from '@/components/StreakDisplay';
import { useStudyStore } from '@/stores/studyStore';
import { useQuizStore } from '@/stores/quizStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { getAllSubjects } from '@/data/questions';
import { useEffect, useState } from 'react';

export function Dashboard() {
  const navigate = useNavigate();
  const progress = useStudyStore(state => state.progress);
  const quizHistory = useQuizStore(state => state.quizHistory);
  const userName = useSettingsStore(state => state.userName);

  // Force re-render to pick up latest progress from localStorage
  const [key, setKey] = useState(0);
  useEffect(() => {
    // Re-render when component mounts to pick up latest progress
    setKey(prev => prev + 1);
  }, []);

  const allSubjects = getAllSubjects();

  const totalMastered = Object.values(progress).reduce(
    (acc, p) => acc + p.questionsKnown.length,
    0
  );
  const totalQuestions = allSubjects.reduce(
    (acc, s) => acc + s.questionCount,
    0
  );
  const overallProgress =
    totalQuestions > 0 ? Math.round((totalMastered / totalQuestions) * 100) : 0;

  const quizzesCompleted = quizHistory.length;

  const displayName = userName || 'DevOps Learner';
  const greeting = getGreeting(displayName);

  const lastStudiedSubject = findLastStudiedSubject(progress, allSubjects);

  const getSubjectProgress = (subjectId: string) => {
    const subjectProgress = progress[subjectId];
    return subjectProgress ? subjectProgress.questionsKnown.length : 0;
  };

  return (
    <div key={key} className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <motion.h1
                className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                {greeting}
              </motion.h1>
              <motion.p
                className="text-gray-500 dark:text-gray-400 text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Ready to continue your DevOps journey?
              </motion.p>
            </div>

            <StreakDisplay streak={quizzesCompleted} />
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="text-center p-6">
                <ProgressCircle value={overallProgress} size={100} />
                <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Overall Progress
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 dark:bg-primary-900/30">
                  <BookOpen className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                  {totalMastered}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Questions Mastered
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-success-100 dark:bg-success-900/30">
                  <Trophy className="w-8 h-8 text-success-600 dark:text-success-400" />
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white text-center">
                  {quizzesCompleted}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Quizzes Completed
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10"
        >
          <Card
            variant="interactive"
            className="p-6 group"
            padding="none"
            onClick={() =>
              navigate(
                lastStudiedSubject
                  ? `/study/${lastStudiedSubject.id}`
                  : '/study'
              )
            }
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Continue Studying
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {lastStudiedSubject
                      ? `${lastStudiedSubject.name} - ${Math.round((getSubjectProgress(lastStudiedSubject.id) / lastStudiedSubject.questionCount) * 100)}% complete`
                      : 'Start your learning journey'}
                  </p>
                </div>
              </div>
              <Button className="w-full group-hover:shadow-lg transition-shadow">
                Continue
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>

          <Card
            variant="interactive"
            className="p-6 group"
            padding="none"
            onClick={() => navigate('/chat')}
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-500 to-emerald-500 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    AI Assistant
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Ask anything about DevOps
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                className="w-full group-hover:shadow-lg transition-shadow"
              >
                Try AI Chat
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Subject Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Subjects
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Sparkles className="w-4 h-4" />
              <span>{allSubjects.length} topics</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allSubjects.map((subject, index) => {
              const mastered = getSubjectProgress(subject.id);
              return (
                <SubjectCard
                  key={subject.id}
                  subject={{
                    id: subject.id,
                    name: subject.name,
                    icon: getSubjectIcon(subject.id),
                    color: getSubjectColor(subject.id),
                    totalQuestions: subject.questionCount,
                    masteredQuestions: mastered,
                  }}
                  index={index}
                  onStudy={() => navigate(`/study/${subject.id}`)}
                  onQuiz={() => navigate(`/quiz?subject=${subject.id}`)}
                />
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function getGreeting(name: string): string {
  const hour = new Date().getHours();
  let greeting = 'Hello';

  if (hour < 12) greeting = 'Good morning';
  else if (hour < 18) greeting = 'Good afternoon';
  else greeting = 'Good evening';

  return `${greeting}, ${name}! 👋`;
}

function getSubjectIcon(subjectId: string): string {
  const icons: Record<string, string> = {
    kubernetes: '☸️',
    docker: '🐳',
    aws: '☁️',
    jenkins: '🔧',
    git: '📦',
    shell: '💻',
  };
  return icons[subjectId] || '📚';
}

function getSubjectColor(subjectId: string): string {
  const colors: Record<string, string> = {
    kubernetes: 'from-blue-500 to-cyan-500',
    docker: 'from-blue-600 to-blue-400',
    aws: 'from-orange-500 to-yellow-500',
    jenkins: 'from-red-500 to-pink-500',
    git: 'from-orange-600 to-red-500',
    shell: 'from-green-500 to-emerald-500',
  };
  return colors[subjectId] || 'from-gray-500 to-gray-400';
}

function findLastStudiedSubject(
  progress: Record<
    string,
    { lastStudied: string | null; questionsKnown: string[] }
  >,
  subjects: Array<{ id: string; name: string; questionCount: number }>
) {
  let lastStudied: {
    id: string;
    name: string;
    questionCount: number;
    lastStudied: string | null;
  } | null = null;

  for (const subject of subjects) {
    const subjectProgress = progress[subject.id];
    if (subjectProgress?.lastStudied) {
      if (
        !lastStudied ||
        new Date(subjectProgress.lastStudied) >
          new Date(lastStudied.lastStudied || 0)
      ) {
        lastStudied = { ...subject, lastStudied: subjectProgress.lastStudied };
      }
    }
  }

  return lastStudied;
}
