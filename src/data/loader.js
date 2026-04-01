import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class DataLoader {
  constructor() {
    this.dataDir = path.join(__dirname, '..', 'data');
    this.subjects = new Map();
  }

  async loadAllSubjects() {
    const files = fs.readdirSync(this.dataDir).filter(f => f.endsWith('.json'));
    const spinner = ora({
      text: 'Loading subjects...',
      spinner: 'dots',
    }).start();

    for (const file of files) {
      const subjectName = file.replace('.json', '');
      spinner.text = `Loading ${subjectName}...`;
      await this.loadSubject(subjectName);
    }

    spinner.succeed(`Loaded ${this.subjects.size} subjects`);
  }

  async loadSubject(subjectName) {
    const filePath = path.join(this.dataDir, `${subjectName}.json`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Data file not found: ${subjectName}.json`);
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(content);

    this.validateData(data, subjectName);
    data.id = subjectName.toLowerCase();
    data.name = data.subject;
    this.subjects.set(subjectName.toLowerCase(), data);

    return data;
  }

  validateData(data, filename) {
    if (!data.subject) {
      throw new Error(`${filename}: Missing 'subject' field`);
    }
    if (!Array.isArray(data.questions)) {
      throw new Error(`${filename}: 'questions' must be an array`);
    }
    if (data.questions.length === 0) {
      throw new Error(`${filename}: No questions found`);
    }

    const ids = new Set();
    for (const q of data.questions) {
      if (!q.id) {
        throw new Error(`${filename}: Question missing 'id' field`);
      }
      if (ids.has(q.id)) {
        throw new Error(`${filename}: Duplicate question id: ${q.id}`);
      }
      ids.add(q.id);

      if (!q.question) {
        throw new Error(
          `${filename}: Question ${q.id} missing 'question' field`
        );
      }
      if (!q.answer) {
        throw new Error(`${filename}: Question ${q.id} missing 'answer' field`);
      }
      if (!['easy', 'medium', 'hard'].includes(q.difficulty)) {
        throw new Error(
          `${filename}: Question ${q.id} has invalid difficulty (must be easy/medium/hard)`
        );
      }
    }
  }

  getSubjectsList() {
    const list = [];
    for (const [key, data] of this.subjects) {
      list.push({
        id: key,
        name: data.subject,
        description: data.description || '',
        totalQuestions: data.questions.length,
        lastUpdated: data.lastUpdated,
      });
    }
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }

  getSubject(subjectName) {
    return this.subjects.get(subjectName.toLowerCase()) || null;
  }

  getQuestion(subjectName, questionId) {
    const subject = this.getSubject(subjectName);
    if (!subject) return null;
    return subject.questions.find(q => q.id === questionId) || null;
  }

  getRandomQuestions(subjectName, count, excludeIds = []) {
    const subject = this.getSubject(subjectName);
    if (!subject) return [];

    const available = subject.questions.filter(q => !excludeIds.includes(q.id));
    const shuffled = this.shuffle([...available]);
    return shuffled.slice(0, count);
  }

  getQuestionsByDifficulty(subjectName, difficulty) {
    const subject = this.getSubject(subjectName);
    if (!subject) return [];
    return subject.questions.filter(q => q.difficulty === difficulty);
  }

  getWrongAnswers(subjectName, question, count = 3) {
    const subject = this.getSubject(subjectName);
    if (!subject) return [];

    const others = subject.questions.filter(q => q.id !== question.id);
    const shuffled = this.shuffle([...others]);
    return shuffled.slice(0, count);
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
