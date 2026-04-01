# MyRevisor

**DevOps Interview Study Application** - Master your Kubernetes, AWS, Docker, Jenkins, Git, and Shell Scripting knowledge through interactive study modes and quizzes.

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

## Usage

After installation, you get **both CLI and Web** in one package!

### Launch Web App

```bash
myrevisor web
```

This opens the beautiful web interface in your browser with:

- Study Mode with flashcards
- Quiz Mode with MCQ testing
- AI Chatbot support
- Progress tracking
- PWA support (install as app)

### CLI Commands

| Command                            | Description                      |
| ---------------------------------- | -------------------------------- |
| `myrevisor` or `myrevisor study`   | Start interactive study mode     |
| `myrevisor test [subject]`         | Start quiz mode                  |
| `myrevisor test --timed [subject]` | Timed quiz (30 seconds/question) |
| `myrevisor test --mcq [subject]`   | Multiple choice quiz             |
| `myrevisor scores`                 | View your score history          |
| `myrevisor list`                   | List all available subjects      |
| `myrevisor reset`                  | Reset all scores                 |
| `myrevisor help`                   | Show help information            |
| `myrevisor web`                    | Launch the web application       |

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
# Launch the web app (recommended)
myrevisor web

# Or use CLI directly
myrevisor study kubernetes
myrevisor test aws --timed --number 10
myrevisor test docker --mcq
myrevisor scores
myrevisor list
```

---

## Available Subjects

| Subject    | Description                             |
| ---------- | --------------------------------------- |
| kubernetes | Container orchestration and management  |
| docker     | Container technology and best practices |
| aws        | Amazon Web Services cloud platform      |
| jenkins    | CI/CD automation and pipelines          |
| git        | Version control system fundamentals     |
| shell      | Bash scripting and command line         |

---

## Web Application Features

When you run `myrevisor web`:

- **Dashboard** - Overview with progress cards for each subject
- **Study Mode** - Flashcard-style review with keyboard shortcuts (Space to reveal, K for Known, R for Review)
- **Quiz Mode** - MCQ testing with immediate feedback
- **AI Chatbot** - Ask questions using OpenRouter API (bring your own key)
- **Progress Tracking** - Track known/review questions per subject
- **PWA Support** - Install as an app on your device for offline use

### Web Routes

| Route               | Description                  |
| ------------------- | ---------------------------- |
| `/`                 | Dashboard with subject cards |
| `/study/:subjectId` | Study mode for a subject     |
| `/quiz`             | Quiz configuration           |
| `/chat`             | AI chatbot                   |
| `/progress`         | Progress and statistics      |
| `/settings`         | App settings                 |

---

## Development

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/myrevisor.git
cd myrevisor

# Install root dependencies (CLI)
npm install

# Build the web app
npm run build
```

### Development Commands

```bash
# Run CLI
npm start

# Launch web app
npm run web

# Build web app
npm run build:web

# Lint code
npm run lint

# Format code
npm run format
```

### Project Structure

```
myrevisor/
├── bin/
│   └── myrevisor.js      # CLI entry point
├── src/
│   ├── app.js            # Main CLI app
│   ├── commands/         # CLI commands
│   │   ├── study.js
│   │   ├── test.js
│   │   ├── scores.js
│   │   ├── list.js
│   │   ├── reset.js
│   │   ├── help.js
│   │   └── web.js        # Web server command
│   ├── config/
│   ├── data/
│   ├── ui/
│   └── utils/
├── web/                   # Web application (React + TypeScript)
│   ├── src/
│   └── public/
├── dist/                  # Built web app (generated)
├── docs/
├── package.json
└── README.md
```

---

## Configuration

### CLI App

Scores and settings are stored in:

- **macOS**: `~/.config/myrevisor/`
- **Linux**: `~/.config/myrevisor/`
- **Windows**: `%APPDATA%/myrevisor/`

### Web App

Data is stored in your browser's localStorage:

- Progress (known/review questions)
- Settings
- Quiz history
- Chat conversations

---

## License

MIT
