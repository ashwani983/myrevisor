import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Trophy,
  Flame,
  Target,
  Clock,
  TrendingUp,
  Award,
  Zap,
  BookOpen,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import { useStudyStore } from '@/stores/studyStore';
import { useQuizStore } from '@/stores/quizStore';
import { getAllSubjects, getSubjectName } from '@/data/questions';
import { cn } from '@/lib/utils';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: typeof Trophy;
  color: string;
  condition: () => boolean;
}

export function ProgressPage() {
  const navigate = useNavigate();
  const progress = useStudyStore(state => state.progress);
  const quizHistory = useQuizStore(state => state.quizHistory);

  const allSubjects = getAllSubjects();

  const totalQuestionsKnown = Object.values(progress).reduce(
    (acc, p) => acc + p.questionsKnown.length,
    0
  );

  const totalQuestions = allSubjects.reduce(
    (acc, s) => acc + s.questionCount,
    0
  );

  const totalQuizzesTaken = quizHistory.length;

  const averageScore =
    quizHistory.length > 0
      ? Math.round(
          quizHistory.reduce((acc, q) => acc + q.score, 0) / quizHistory.length
        )
      : 0;

  const achievements: Achievement[] = [
    {
      id: 'first-quiz',
      name: 'First Steps',
      description: 'Complete your first quiz',
      icon: Target,
      color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
      condition: () => totalQuizzesTaken >= 1,
    },
    {
      id: 'first-10-known',
      name: 'Knowledge Builder',
      description: 'Master 10 questions',
      icon: BookOpen,
      color: 'text-green-500 bg-green-100 dark:bg-green-900/30',
      condition: () => totalQuestionsKnown >= 10,
    },
    {
      id: 'first-50-known',
      name: 'DevOps Enthusiast',
      description: 'Master 50 questions',
      icon: TrendingUp,
      color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
      condition: () => totalQuestionsKnown >= 50,
    },
    {
      id: 'first-100-known',
      name: 'DevOps Expert',
      description: 'Master 100 questions',
      icon: Trophy,
      color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
      condition: () => totalQuestionsKnown >= 100,
    },
    {
      id: 'quiz-master',
      name: 'Quiz Master',
      description: 'Score 100% on a quiz',
      icon: Star,
      color: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30',
      condition: () => quizHistory.some(q => q.score === 100),
    },
    {
      id: 'streak-3',
      name: 'On Fire',
      description: 'Score 80%+ on 3 quizzes in a row',
      icon: Flame,
      color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30',
      condition: () => {
        let streak = 0;
        for (const quiz of quizHistory.slice(0, 10)) {
          if (quiz.score >= 80) streak++;
          else streak = 0;
          if (streak >= 3) return true;
        }
        return false;
      },
    },
    {
      id: 'dedicated',
      name: 'Dedicated Learner',
      description: 'Complete 10 quizzes',
      icon: Clock,
      color: 'text-cyan-500 bg-cyan-100 dark:bg-cyan-900/30',
      condition: () => totalQuizzesTaken >= 10,
    },
    {
      id: 'perfect-average',
      name: 'Consistency King',
      description: 'Maintain 90%+ average score',
      icon: Award,
      color: 'text-pink-500 bg-pink-100 dark:bg-pink-900/30',
      condition: () => averageScore >= 90 && totalQuizzesTaken >= 5,
    },
    {
      id: 'speed-demon',
      name: 'Speed Demon',
      description: 'Complete a quiz in under 1 minute',
      icon: Zap,
      color: 'text-red-500 bg-red-100 dark:bg-red-900/30',
      condition: () => quizHistory.some(q => q.duration < 60000),
    },
  ];

  const unlockedAchievements = achievements.filter(a => a.condition());
  const lockedAchievements = achievements.filter(a => !a.condition());

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
            Your Progress
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Track your DevOps learning journey
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary-500 mb-1">
                  {totalQuestionsKnown}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Questions Mastered
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-success-500 mb-1">
                  {totalQuizzesTaken}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Quizzes Taken
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-warning-500 mb-1">
                  {averageScore}%
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Average Score
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-accent-500 mb-1">
                  {unlockedAchievements.length}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Achievements
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Overall Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">
                    {totalQuestionsKnown} of {totalQuestions} questions mastered
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {Math.round((totalQuestionsKnown / totalQuestions) * 100)}%
                  </span>
                </div>
                <Progress
                  value={totalQuestionsKnown}
                  max={totalQuestions}
                  size="lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Subject Progress */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Progress by Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allSubjects.map(subject => {
                  const subjectProgress = progress[subject.id] || {
                    questionsKnown: [],
                    questionsReview: [],
                    lastStudied: null,
                    streak: 0,
                  };
                  const known = subjectProgress.questionsKnown.length;

                  return (
                    <div key={subject.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                          {subject.name}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {known}/{subject.questionCount}
                        </span>
                      </div>
                      <Progress
                        value={known}
                        max={subject.questionCount}
                        size="sm"
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              {unlockedAchievements.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                    Unlocked ({unlockedAchievements.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {unlockedAchievements.map(achievement => (
                      <motion.div
                        key={achievement.id}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={cn(
                          'flex items-start gap-3 p-3 rounded-xl',
                          'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
                          'border border-yellow-200 dark:border-yellow-800'
                        )}
                      >
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                            achievement.color
                          )}
                        >
                          <achievement.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white flex items-center gap-1">
                            {achievement.name}
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {achievement.description}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {lockedAchievements.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                    Locked ({lockedAchievements.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {lockedAchievements.map(achievement => (
                      <div
                        key={achievement.id}
                        className={cn(
                          'flex items-start gap-3 p-3 rounded-xl',
                          'bg-gray-100 dark:bg-gray-800/50',
                          'opacity-60'
                        )}
                      >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                          <achievement.icon className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-500 dark:text-gray-400">
                            {achievement.name}
                          </div>
                          <p className="text-sm text-gray-400 dark:text-gray-500">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Quizzes */}
          {quizHistory.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quizHistory.slice(0, 5).map(quiz => (
                    <div
                      key={quiz.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {getSubjectName(quiz.subject) || quiz.subject}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(quiz.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            quiz.score >= 80
                              ? 'success'
                              : quiz.score >= 60
                                ? 'warning'
                                : 'error'
                          }
                        >
                          {quiz.score}%
                        </Badge>
                        <span className="text-sm text-gray-400">
                          {quiz.correctAnswers}/{quiz.totalQuestions}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
