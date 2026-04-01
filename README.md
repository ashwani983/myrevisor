# MyRevisor

**DevOps Interview Study Application** - Master your Kubernetes, AWS, Docker, Jenkins, Git, and Shell Scripting knowledge through interactive CLI quizzes.

[![npm version](https://badge.fury.io/js/myrevisor.svg)](https://badge.fury.io/js/myrevisor)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│     ███╗   ███╗██╗██████╗ ███╗   ██╗███████╗██████╗ ██████╗  │
│     ████╗ ████║██║██╔══██╗████╗  ██║██╔════╝██╔══██╗██╔══██╗ │
│     ██╔████╔██║██║██║  ██║██╔██╗ ██║█████╗  ██████╔╝██║  ██║ │
│     ██║╚██╔╝██║██║██║  ██║██║╚██╗██║██╔══╝  ██╔══██╗██║  ██║ │
│     ██║ ╚═╝ ██║██║██████╔╝██║ ╚████║███████╗██║  ██║██████╔╝ │
│     ╚═╝     ╚═╝╚═╝╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═════╝  │
│                                                             │
│         [ Your DevOps Interview Preparation Tool ]           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Quick Install

```bash
npm install -g myrevisor
```

## Features

- **Interactive Study Mode** - Learn concepts with detailed explanations
- **Timed Quiz Mode** - Test your knowledge with time constraints
- **MCQ Quizzes** - Multiple choice questions for quick assessments
- **Progress Tracking** - Track your scores and performance history
- **Multiple Topics** - Kubernetes, AWS, Docker, Jenkins, Git, Shell Scripting
- **Persistent Scores** - Your progress is saved between sessions

## Installation

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Global Installation

```bash
npm install -g myrevisor
```

### Local Development

```bash
git clone <repository-url>
cd myrevisor
npm install
npm start
```

## Usage

### Commands

| Command                            | Description                      |
| ---------------------------------- | -------------------------------- |
| `myrevisor` or `myrevisor study`   | Start study mode                 |
| `myrevisor test [subject]`         | Start quiz mode                  |
| `myrevisor test --timed [subject]` | Timed quiz (30 seconds/question) |
| `myrevisor test --mcq [subject]`   | Multiple choice quiz             |
| `myrevisor scores`                 | View your score history          |
| `myrevisor list`                   | List all available subjects      |
| `myrevisor reset`                  | Reset all scores                 |
| `myrevisor help`                   | Show help information            |

### Options

| Option                 | Description                          |
| ---------------------- | ------------------------------------ |
| `-n, --number <count>` | Number of questions to answer        |
| `-t, --timed`          | Enable timed mode (30s per question) |
| `-m, --mcq`            | Multiple choice questions            |
| `-h, --help`           | Show help information                |
| `-v, --version`        | Show version number                  |

### Examples

```bash
# Study all topics
myrevisor study

# Test specific subject
myrevisor test kubernetes

# Timed quiz with 10 questions
myrevisor test aws --timed --number 10

# MCQ quiz on Docker
myrevisor test docker --mcq

# View your scores
myrevisor scores

# List available subjects
myrevisor list
```

## Available Subjects

| Subject    | Description                             |
| ---------- | --------------------------------------- |
| kubernetes | Container orchestration and management  |
| docker     | Container technology and best practices |
| aws        | Amazon Web Services cloud platform      |
| jenkins    | CI/CD automation and pipelines          |
| git        | Version control system fundamentals     |
| shell      | Bash scripting and command line         |

## Quiz Modes

### Study Mode

- Browse questions at your own pace
- Read detailed explanations
- Navigate with arrow keys
- Press Enter to continue

### Timed Quiz

- 30 seconds per question
- Score based on correct answers and time remaining
- Instant feedback after each question
- Final score summary

### MCQ Quiz

- 4 options per question
- Select the correct answer
- Instant feedback
- Good for quick assessments

## Configuration

Scores and settings are stored in:

- **macOS**: `~/.config/myrevisor/`
- **Linux**: `~/.config/myrevisor/`
- **Windows**: `%APPDATA%/myrevisor/`

## Development

```bash
# Install dependencies
npm install

# Run locally
npm start

# Lint code
npm run lint

# Format code
npm run format
```

## License

MIT
