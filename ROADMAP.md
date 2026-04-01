# MyRevisor - Application Roadmap

## Project Overview

**MyRevisor** is an interactive CLI/TUI study application for DevOps interview preparation. Users can revise subjects, take tests, and track scores with a rich, gamified experience.

**Tech Stack:** Node.js, Commander.js, Chalk, Boxen, Inquirer, Ora, Conf

**Install Command:** `npm install -g myrevisor`  
**Run Command:** `myrevisor`
**npm Package:** https://www.npmjs.com/package/myrevisor

---

## Phase 1: Project Foundation ✅

### 1.1 Project Setup

- [x] Initialize Node.js project with `npm init`
- [x] Set up global installation with `bin` field in package.json
- [x] Create shebang entry point (`#!/usr/bin/env node`)
- [x] Configure ES modules
- [x] Set up ESLint + Prettier

### 1.2 Core Dependencies

```json
{
  "commander": "^12.x",
  "chalk": "^5.x",
  "boxen": "^7.x",
  "inquirer": "^10.x",
  "ora": "^8.x",
  "conf": "^14.x",
  "figlet": "^1.x",
  "gradient-string": "^3.x"
}
```

### 1.3 Project Structure

```
myrevisor/
├── bin/
│   └── myrevisor.js          # CLI entry point
├── src/
│   ├── index.js              # Main application
│   ├── commands/
│   │   ├── study.js          # Study mode
│   │   ├── test.js           # Quiz mode
│   │   └── scores.js         # View scores
│   ├── data/
│   │   ├── kubernetes.json   # Pre-converted data
│   │   ├── aws.json
│   │   ├── docker.json
│   │   ├── jenkins.json
│   │   ├── git-github.json
│   │   └── shell-scripting.json
│   ├── config/
│   │   └── store.js          # User progress
│   └── ui/
│       ├── menu.js
│       └── cards.js
├── package.json
└── README.md
```

---

## Phase 2: Data Source ✅

### 2.1 JSON Data Structure

Each subject has a JSON file with:

```json
{
  "subject": "Kubernetes",
  "description": "...",
  "totalQuestions": 50,
  "lastUpdated": "2026-02-04",
  "questions": [
    {
      "id": "k8s-001",
      "question": "Explain Kubernetes Architecture.",
      "answer": "...",
      "difficulty": "medium",
      "tags": ["architecture", "core-concepts"]
    }
  ]
}
```

### 2.2 Data Files Created

| File                 | Subject         | Questions | Status |
| -------------------- | --------------- | --------- | ------ |
| kubernetes.json      | Kubernetes      | 50        | ✅     |
| aws.json             | AWS             | 50        | ✅     |
| docker.json          | Docker          | 50        | ✅     |
| jenkins.json         | Jenkins         | 50        | ✅     |
| git-github.json      | Git & GitHub    | 10        | ⚠️     |
| shell-scripting.json | Shell Scripting | 10        | ⚠️     |

---

## Phase 3: Study Mode ✅

### 3.1 Features

- [x] Display questions one at a time
- [x] Show/hide answer toggle (press Enter)
- [x] Mark as "Known" or "Review Again"
- [x] Track progress through subject
- [x] Sequential and shuffle modes

### 3.2 Study UI

```
┌─────────────────────────────────────────┐
│  📚 Kubernetes - Study Mode             │
│  Progress: ████████░░░░ 65% (39/60)   │
├─────────────────────────────────────────┤
│                                         │
│  Q39. Explain the concept of Container  │
│      Orchestration.                     │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  [Press SPACE to reveal answer]         │
│                                         │
│  [K] Known  [R] Review  [S] Skip       │
└─────────────────────────────────────────┘
```

---

## Phase 4: Test/Quiz Mode ✅

### 4.1 Quiz Types

- [x] **Flashcard Mode** - Show answer, self-grade
- [x] **Multiple Choice** - 4 options
- [x] **Timed Quiz** - 30 seconds per question

### 4.2 Scoring System

```
┌─────────────────────────────────┐
│  🎯 Quiz Results                │
├─────────────────────────────────┤
│  Subject: Kubernetes            │
│  Questions: 20                  │
│  Time: 5m 23s                   │
│                                 │
│  ✓ Correct:    15 (75%)        │
│  ✗ Incorrect:   5 (25%)        │
│                                 │
│  [R] Retry Wrong  [S] Study    │
│  [M] Main Menu                  │
└─────────────────────────────────┘
```

---

## Phase 5: Progress & Persistence ✅

### 5.1 Score Storage

```javascript
{
  "scores": {
    "kubernetes": {
      "quizzesTaken": 12,
      "averageScore": 78.5,
      "highScore": 95,
      "streak": 5,
      "questionStats": {
        "k8s-001": { "asked": 5, "correct": 4 }
      }
    }
  },
  "settings": {
    "defaultQuizCount": 10,
    "showTimer": true
  }
}
```

---

## Phase 6: Commands Reference ✅

| Command                               | Description               |
| ------------------------------------- | ------------------------- |
| `myrevisor`                           | Launch interactive menu   |
| `myrevisor study <subject>`           | Start study mode          |
| `myrevisor test <subject>`            | Start quiz                |
| `myrevisor test <subject> --count 20` | Quiz with 20 questions    |
| `myrevisor test <subject> --timed`    | Timed quiz (30s/question) |
| `myrevisor test <subject> --mcq`      | Multiple choice quiz      |
| `myrevisor scores`                    | View all scores           |
| `myrevisor list`                      | List available subjects   |
| `myrevisor reset <subject>`           | Reset progress            |
| `myrevisor help`                      | Show help information     |

---

## Implementation Sprint

### Sprint 1: MVP ✅

1. Project setup + bin entry ✅
2. Load JSON data files ✅
3. Main menu UI ✅
4. Study mode (sequential) ✅
5. Basic quiz mode ✅

### Sprint 2: Features ✅

1. Multiple choice questions ✅
2. Timed quizzes ✅
3. Score persistence ✅
4. Statistics display ✅

### Sprint 3: Polish ✅

1. Enhanced UI (colors, animations) ✅
2. Keyboard navigation ✅
3. Help system ✅
4. npm publish ✅

### Sprint 4: Launch ✅

1. npm package preparation ✅
2. Documentation (README, CHANGELOG) ✅
3. Global installation testing ✅
4. Publish to npm ✅

---

## Future Enhancements

- Web UI version
- Cloud sync
- Spaced repetition
- More subjects
- Expand remaining data files (Git/GitHub, Shell Scripting)
