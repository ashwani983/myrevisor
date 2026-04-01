import { motion } from 'framer-motion';
import { BookOpen, Trophy, Bot, ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressCircle } from '@/components/ui/Progress';
import { SubjectCard } from '@/components/SubjectCard';
import { StreakDisplay } from '@/components/StreakDisplay';

const subjects = [
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    icon: '☸️',
    color: 'from-blue-500 to-cyan-500',
    totalQuestions: 50,
    masteredQuestions: 39,
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: '🐳',
    color: 'from-blue-600 to-blue-400',
    totalQuestions: 50,
    masteredQuestions: 27,
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: '☁️',
    color: 'from-orange-500 to-yellow-500',
    totalQuestions: 50,
    masteredQuestions: 16,
  },
  {
    id: 'jenkins',
    name: 'Jenkins',
    icon: '🔧',
    color: 'from-red-500 to-pink-500',
    totalQuestions: 50,
    masteredQuestions: 7,
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    icon: '📦',
    color: 'from-orange-600 to-red-500',
    totalQuestions: 10,
    masteredQuestions: 2,
  },
  {
    id: 'shell',
    name: 'Shell Scripting',
    icon: '💻',
    color: 'from-green-500 to-emerald-500',
    totalQuestions: 10,
    masteredQuestions: 1,
  },
];

const totalMastered = subjects.reduce((acc, s) => acc + s.masteredQuestions, 0);
const totalQuestions = subjects.reduce((acc, s) => acc + s.totalQuestions, 0);
const overallProgress = Math.round((totalMastered / totalQuestions) * 100);

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
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
                Welcome back! 👋
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

            <StreakDisplay streak={5} />
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
                  12
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
          <Card variant="interactive" className="p-6 group" padding="none">
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
                    Kubernetes - 78% complete
                  </p>
                </div>
              </div>
              <Button className="w-full group-hover:shadow-lg transition-shadow">
                Continue
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </Card>

          <Card variant="interactive" className="p-6 group" padding="none">
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
              <span>{subjects.length} topics</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((subject, index) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                index={index}
                onStudy={() => console.log('Study', subject.id)}
                onQuiz={() => console.log('Quiz', subject.id)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
