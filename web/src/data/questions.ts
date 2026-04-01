import kubernetesQuestions from '../../../src/data/kubernetes.json';
import dockerQuestions from '../../../src/data/docker.json';
import awsQuestions from '../../../src/data/aws.json';
import jenkinsQuestions from '../../../src/data/jenkins.json';
import gitQuestions from '../../../src/data/git-github.json';
import shellQuestions from '../../../src/data/shell-scripting.json';
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

export const questionData: Record<string, QuestionData> = {
  kubernetes: kubernetesQuestions as QuestionData,
  docker: dockerQuestions as QuestionData,
  aws: awsQuestions as QuestionData,
  jenkins: jenkinsQuestions as QuestionData,
  git: gitQuestions as QuestionData,
  shell: shellQuestions as QuestionData,
};

export const subjectNames: Record<string, string> = {
  kubernetes: 'Kubernetes',
  docker: 'Docker',
  aws: 'AWS',
  jenkins: 'Jenkins',
  git: 'Git & GitHub',
  shell: 'Shell Scripting',
};

export const subjectDescriptions: Record<string, string> = {
  kubernetes:
    'Container orchestration platform for automating deployment, scaling, and management',
  docker:
    'Containerization platform for building, shipping, and running applications',
  aws: 'Amazon Web Services cloud platform for infrastructure and services',
  jenkins: 'Open source automation server for CI/CD pipelines',
  git: 'Version control system for tracking changes in source code',
  shell:
    'Shell scripting for command-line automation and system administration',
};

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
    name: subjectNames[id] || id,
    description: data.description,
    questionCount: data.totalQuestions,
  }));
}
