import type { Question } from '@/stores/studyStore';

export interface QuestionData {
  subject: string;
  description: string;
  totalQuestions: number;
  lastUpdated: string;
  questions: Array<{
    id: string;
    question: string;
    answer: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
  }>;
}

const subjectOverrides: Record<
  string,
  { name?: string; description?: string }
> = {
  aws: { name: 'AWS' },
  docker: { name: 'Docker' },
  git: { name: 'Git & GitHub' },
  jenkins: { name: 'Jenkins' },
  kubernetes: { name: 'Kubernetes' },
  linux: { name: 'Linux' },
  shell: { name: 'Shell Scripting' },
  ansible: { name: 'Ansible' },
  terraform: { name: 'Terraform' },
  cicd: { name: 'CI/CD (GitHub/GitLab)' },
  azure: { name: 'Microsoft Azure' },
  prometheus: { name: 'Prometheus & Grafana' },
  python: { name: 'Python for DevOps' },
  networking: { name: 'Networking Fundamentals' },
};

const globModules = import.meta.glob<{ default: QuestionData }>(
  '../../../src/data/*.json',
  { eager: true }
);

const questionData: Record<string, QuestionData> = {};

for (const [path, module] of Object.entries(globModules)) {
  const filename = path.split('/').pop()?.replace('.json', '') || '';
  if (filename !== 'versions') {
    questionData[filename] = module.default;
  }
}

export function getSubjectName(id: string): string {
  return subjectOverrides[id]?.name || questionData[id]?.subject || id;
}

export function getSubjectDescription(id: string): string {
  return (
    subjectOverrides[id]?.description || questionData[id]?.description || ''
  );
}

export function getQuestionsForSubject(subject: string): Question[] {
  const data = questionData[subject];
  if (!data) return [];

  return data.questions.map(q => ({
    id: q.id,
    subject,
    question: q.question,
    answer: q.answer,
    difficulty: q.difficulty,
    tags: q.tags,
  }));
}

export function getAllSubjects(): Array<{
  id: string;
  name: string;
  description: string;
  questionCount: number;
}> {
  return Object.entries(questionData).map(([id, data]) => ({
    id,
    name: getSubjectName(id),
    description: data.description || getSubjectDescription(id),
    questionCount: data.questions?.length || data.totalQuestions || 0,
  }));
}
