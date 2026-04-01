#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../src/data');

const requiredFields = {
  subject: 'string',
  description: 'string',
  totalQuestions: 'number',
  lastUpdated: 'string',
  questions: 'array',
};

const questionRequiredFields = [
  'id',
  'question',
  'answer',
  'difficulty',
  'tags',
];

const validDifficulties = ['easy', 'medium', 'hard'];

function getType(value) {
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function validateJsonFile(filepath) {
  const errors = [];
  const warnings = [];

  let data;
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    data = JSON.parse(content);
  } catch (e) {
    return {
      valid: false,
      errors: [`Invalid JSON: ${e.message}`],
      warnings: [],
    };
  }

  for (const [field, expectedType] of Object.entries(requiredFields)) {
    if (!(field in data)) {
      errors.push(`Missing required field: ${field}`);
    } else if (getType(data[field]) !== expectedType) {
      errors.push(
        `Field "${field}" should be ${expectedType}, got ${getType(data[field])}`
      );
    }
  }

  if (data.questions && Array.isArray(data.questions)) {
    if (data.questions.length !== data.totalQuestions) {
      warnings.push(
        `totalQuestions (${data.totalQuestions}) doesn't match actual questions (${data.questions.length})`
      );
    }

    const seenIds = new Set();
    const seenQuestions = new Set();

    data.questions.forEach((q, index) => {
      for (const field of questionRequiredFields) {
        if (!(field in q)) {
          errors.push(
            `Question ${index + 1}: Missing required field: ${field}`
          );
        }
      }

      if (q.id) {
        if (seenIds.has(q.id)) {
          errors.push(`Duplicate question ID: ${q.id}`);
        }
        seenIds.add(q.id);
      }

      if (q.question) {
        if (seenQuestions.has(q.question)) {
          warnings.push(`Duplicate question text at index ${index + 1}`);
        }
        seenQuestions.add(q.question);
      }

      if (q.difficulty && !validDifficulties.includes(q.difficulty)) {
        errors.push(
          `Question ${index + 1}: Invalid difficulty "${q.difficulty}". Must be one of: ${validDifficulties.join(', ')}`
        );
      }

      if (q.tags && !Array.isArray(q.tags)) {
        errors.push(`Question ${index + 1}: tags should be an array`);
      }
    });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    stats: {
      questions: data.questions?.length || 0,
      subjects: 1,
    },
  };
}

function main() {
  console.log('\n🔍 MyRevisor Data Validation\n');
  console.log('─'.repeat(50));

  if (!fs.existsSync(DATA_DIR)) {
    console.error(`❌ Data directory not found: ${DATA_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));

  if (files.length === 0) {
    console.error('❌ No JSON files found in data directory');
    process.exit(1);
  }

  let totalErrors = 0;
  let totalWarnings = 0;
  let totalQuestions = 0;

  for (const file of files) {
    const filepath = path.join(DATA_DIR, file);
    const result = validateJsonFile(filepath);

    const status = result.valid ? '✅' : '❌';
    console.log(`\n${status} ${file}`);

    if (result.errors.length > 0) {
      console.log('   Errors:');
      result.errors.forEach(e => {
        console.log(`     • ${e}`);
        totalErrors++;
      });
    }

    if (result.warnings.length > 0) {
      console.log('   Warnings:');
      result.warnings.forEach(w => {
        console.log(`     ⚠ ${w}`);
        totalWarnings++;
      });
    }

    if (result.valid) {
      console.log(`   📊 ${result.stats.questions} questions`);
      totalQuestions += result.stats.questions;
    }
  }

  console.log('\n' + '─'.repeat(50));
  console.log(`\n📊 Summary:`);
  console.log(`   Files validated: ${files.length}`);
  console.log(`   Total questions: ${totalQuestions}`);
  console.log(`   Errors: ${totalErrors}`);
  console.log(`   Warnings: ${totalWarnings}`);

  if (totalErrors === 0) {
    console.log('\n✅ All data files are valid!\n');
    process.exit(0);
  } else {
    console.log('\n❌ Data validation failed. Please fix the errors above.\n');
    process.exit(1);
  }
}

main();
