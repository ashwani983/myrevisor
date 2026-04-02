#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import { App } from '../src/app.js';
import { study } from '../src/commands/study.js';
import { test } from '../src/commands/test.js';
import { scores } from '../src/commands/scores.js';
import { listSubjects } from '../src/commands/list.js';
import { reset } from '../src/commands/reset.js';
import { help } from '../src/commands/help.js';
import { web } from '../src/commands/web.js';
import { DataSync } from '../src/commands/sync.js';

const program = new Command();

const gradientColors = ['#00D9FF', '#0066FF'];

program
  .name('myrevisor')
  .description(
    gradient.pastel(figlet.textSync('MyRevisor', { font: 'ANSI Shadow' })) +
      '\n\n' +
      chalk.cyan('Master your DevOps interviews!') +
      '\nStudy Kubernetes, AWS, Docker, Jenkins, Git, Linux & Shell Scripting'
  )
  .version('2.0.1')
  .action(async () => {
    const app = new App();
    await app.start();
  });

program
  .command('study')
  .description('Study a subject')
  .argument('<subject>', 'Subject name to study')
  .option('-s, --shuffle', 'Shuffle questions')
  .option(
    '-d, --difficulty <level>',
    'Filter by difficulty (easy, medium, hard)'
  )
  .action(async (subject, options) => {
    await study(subject, options);
  });

program
  .command('test')
  .description('Take a quiz on a subject')
  .argument('<subject>', 'Subject name to test')
  .option('-n, --count <number>', 'Number of questions', '10')
  .option('-t, --timed <minutes>', 'Timed quiz (in minutes)')
  .option('-m, --mcq', 'Multiple choice questions')
  .action(async (subject, options) => {
    await test(subject, options);
  });

program
  .command('scores')
  .description('View your scores')
  .argument('[subject]', 'Optional: specific subject')
  .action(async subject => {
    await scores(subject);
  });

program
  .command('list')
  .description('List all available subjects')
  .action(async () => {
    await listSubjects();
  });

program
  .command('reset')
  .description('Reset progress for a subject')
  .argument('<subject>', 'Subject name to reset')
  .option('-y, --yes', 'Skip confirmation')
  .action(async (subject, options) => {
    await reset(subject, options);
  });

program
  .command('help-cmd')
  .description('Show help information')
  .action(async () => {
    await help();
  });

program
  .command('web')
  .description('Launch the MyRevisor web application')
  .option('-p, --port <number>', 'Port to run on', '3000')
  .action(async options => {
    await web(options);
  });

program
  .command('sync')
  .description('Sync latest question data from GitHub')
  .option('-f, --force', 'Force sync all files')
  .option('-s, --subject <name>', 'Sync specific subject only')
  .action(async options => {
    const dataSync = new DataSync();

    if (options.subject) {
      try {
        await dataSync.syncSubject(options.subject);
      } catch (error) {
        console.error(chalk.red(`❌ Error: ${error.message}`));
        process.exit(1);
      }
    } else {
      const result = await dataSync.sync(options.force);
      if (!result.success) {
        process.exit(1);
      }
    }
  });

program
  .command('update')
  .description('Check for and install data updates (alias for sync)')
  .action(async () => {
    const dataSync = new DataSync();
    await dataSync.sync(false);
  });

program.parse();
