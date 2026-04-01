# MyRevisor - Design Document

## 1. Architecture Overview

### 1.1 Application Type
Node.js CLI (Command-Line Interface) application

### 1.2 Architecture Pattern
```
┌─────────────────────────────────────────────────────────┐
│                    CLI Entry Point                       │
│                      (bin/)                             │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Application Core                       │
│                      (src/)                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  Router  │──│  Menu    │──│  Study   │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│       │            │            │                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  Scores  │  │  Quiz    │  │  Data    │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Data Layer                           │
│  ┌────────────────────┐  ┌────────────────────┐        │
│  │   JSON Data Files │  │   Config Store     │        │
│  │     (data/)       │  │    (conf)          │        │
│  └────────────────────┘  └────────────────────┘        │
└─────────────────────────────────────────────────────────┘
```

### 1.3 Directory Structure
```
myrevisor/
├── bin/
│   └── myrevisor.js          # CLI entry point (shebang)
├── src/
│   ├── index.js              # Main application router
│   ├── app.js                # App initialization
│   ├── commands/
│   │   ├── study.js          # Study mode command
│   │   ├── test.js           # Quiz mode command
│   │   └── scores.js         # Scores command
│   ├── data/
│   │   ├── loader.js         # JSON data loader
│   │   └── kubernetes.json   # Subject data files
│   ├── config/
│   │   └── store.js          # Persistent config (conf)
│   ├── utils/
│   │   ├── logger.js         # Logging utility
│   │   └── validator.js      # Data validation
│   └── ui/
│       ├── menu.js           # Main menu UI
│       ├── study.js          # Study mode UI
│       ├── quiz.js           # Quiz mode UI
│       ├── scores.js         # Scores display
│       ├── spinner.js        # Loading spinner
│       └── box.js            # Box/styling helpers
├── data/                     # Subject JSON files
├── package.json
├── README.md
└── CHANGELOG.md
```

---

## 2. UI/UX Design

### 2.1 Visual Identity

#### Logo/Branding
```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     ███╗   ███╗███████╗███████╗ ██████╗ ██████╗ ██╗   ║
║     ████╗ ████║██╔════╝██╔════╝██╔═══██╗██╔══██╗██║   ║
║     ██╔████╔██║█████╗  █████╗  ██║   ██║██████╔╝██║   ║
║     ██║╚██╔╝██║██╔══╝  ██╔══╝  ██║   ██║██╔══██╗██║   ║
║     ██║ ╚═╝ ██║███████╗███████╗╚██████╔╝██║  ██║███████╗
║     ╚═╝     ╚═╝╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
║                                                           ║
║              📚 Master Your DevOps Interviews 📚           ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

#### Color Palette
| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| Primary | Cyan | `#00D9FF` | Headings, branding |
| Secondary | Blue | `#0066FF` | Links, highlights |
| Success | Green | `#00FF88` | Correct answers, progress |
| Error | Red | `#FF4757` | Wrong answers, errors |
| Warning | Yellow | `#FFD93D` | Hints, warnings |
| Info | White | `#FFFFFF` | Body text |
| Muted | Gray | `#6B7280` | Secondary text |

#### Typography
- Headers: Bold, uppercase
- Body: Regular weight
- Code/Commands: Monospace
- Emoji: Native terminal emoji

### 2.2 Component Designs

#### Main Menu
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     📚  Welcome to MyRevisor!                            │
│     ════════════════════════════════                     │
│                                                          │
│     What would you like to do?                           │
│                                                          │
│        ▶  📖  Study a Subject                           │
│           🧪  Take a Quiz                               │
│           📊  View My Scores                             │
│           ❓  Help                                       │
│           🚪  Exit                                       │
│                                                          │
│     Use ↑↓ arrows to navigate, Enter to select          │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### Subject Selection
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     📚  Choose a Subject                                 │
│     ════════════════════════════════                     │
│                                                          │
│        ▶  ☸️  Kubernetes (150 questions)               │
│              Container orchestration platform              │
│                                                          │
│           ☁️  AWS (200 questions)                       │
│              Cloud computing services                     │
│                                                          │
│           🐳  Docker (100 questions)                     │
│              Container platform                          │
│                                                          │
│           🔧  Jenkins (80 questions)                     │
│              CI/CD automation                            │
│                                                          │
│           📦  Git & GitHub (60 questions)               │
│              Version control system                      │
│                                                          │
│           💻  Shell Scripting (70 questions)             │
│              Linux shell programming                     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### Study Mode
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     📖  Kubernetes - Study Mode                          │
│     ───────────────────────────────────────              │
│                                                          │
│     Question 15 of 50                                    │
│     [████████████████░░░░░░░░░░░░░] 30%                │
│                                                          │
│     ┌────────────────────────────────────────────────┐   │
│     │                                                  │   │
│     │  Q15. Explain the concept of Container          │   │
│     │       Orchestration.                            │   │
│     │                                                  │   │
│     │  Difficulty: Medium | Tags: orchestration      │   │
│     │                                                  │   │
│     └────────────────────────────────────────────────┘   │
│                                                          │
│     ┌────────────────────────────────────────────────┐   │
│     │                                                  │   │
│     │  [Press SPACE to reveal answer]                 │   │
│     │                                                  │   │
│     └────────────────────────────────────────────────┘   │
│                                                          │
│     [K] Known  [R] Review Again  [S] Skip  [Q] Quit   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### Study Mode - Answer Revealed
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     📖  Kubernetes - Study Mode                          │
│     ───────────────────────────────────────              │
│                                                          │
│     Question 15 of 50                                    │
│     [████████████████░░░░░░░░░░░░░] 30%                │
│                                                          │
│     ┌────────────────────────────────────────────────┐   │
│     │                                                  │   │
│     │  Q15. Explain the concept of Container          │   │
│     │       Orchestration.                            │   │
│     │                                                  │   │
│     │  Difficulty: Medium | Tags: orchestration      │   │
│     │                                                  │   │
│     └────────────────────────────────────────────────┘   │
│                                                          │
│     ┌────────────────────────────────────────────────┐   │
│     │                                                  │   │
│     │  ✓ Container orchestration is the automated     │   │
│     │    process of managing the lifecycle of         │   │
│     │    software containers...                       │   │
│     │                                                  │   │
│     └────────────────────────────────────────────────┘   │
│                                                          │
│     [K] Known  [R] Review Again  [S] Skip  [Q] Quit   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### Quiz Mode
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     🧪  Kubernetes - Quiz Mode                          │
│     ───────────────────────────────────────              │
│                                                          │
│     Question 5 of 10           ⏱️  02:34                │
│     [██████████░░░░░░░░░░░░░░░░░] 50%                  │
│                                                          │
│     ┌────────────────────────────────────────────────┐   │
│     │                                                  │   │
│     │  Q5. What is the main function of kube-proxy?  │   │
│     │                                                  │   │
│     │    A) Container runtime management              │   │
│     │    B) Network rules for pod communication  ✓   │   │
│     │    C) Scheduling pods to nodes                 │   │
│     │    D) Storing cluster state                   │   │
│     │                                                  │   │
│     └────────────────────────────────────────────────┘   │
│                                                          │
│     [A] [B] [C] [D]              [S] Skip               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### Quiz Results
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     🎯  Quiz Complete!                                   │
│     ════════════════════════════════                     │
│                                                          │
│     Subject: Kubernetes                                  │
│     Questions: 10                                        │
│     Time: 4m 23s                                       │
│                                                          │
│     ┌────────────────────────────────────────────────┐  │
│     │                                                  │  │
│     │    ████████████████████░░░░░░░  80%            │  │
│     │                                                  │  │
│     │    ✓  Correct:    8  (80%)                    │  │
│     │    ✗  Incorrect:   2  (20%)                    │  │
│     │                                                  │  │
│     │    🏆  High Score: 90%                         │  │
│     │    🔥  Streak: 5                                │  │
│     │                                                  │  │
│     └────────────────────────────────────────────────┘  │
│                                                          │
│     [R] Review Answers  [S] Study Wrong  [M] Menu      │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

#### Scores Screen
```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│     📊  Your Progress                                    │
│     ════════════════════════════════                     │
│                                                          │
│     ┌────────────────────────────────────────────────┐  │
│     │  Subject        | High | Avg   | Quizzes | Streak│  │
│     │  ────────────────────────────────────────────── │  │
│     │  Kubernetes     | 95%  | 78%   |    12   |   🔥5 │  │
│     │  AWS            | 88%  | 72%   |     8   |   🔥3 │  │
│     │  Docker         | 100% | 85%   |     5   |   🔥7 │  │
│     │  Jenkins        | 75%  | 65%   │     3   |   🔥1 │  │
│     │  Git & GitHub   | 92%  | 80%   |     6   |   🔥4 │  │
│     │  Shell Scripting| 70%  | 60%   |     2   |   🔥0 │  │
│     └────────────────────────────────────────────────┘  │
│                                                          │
│     Total Quizzes: 36  |  Overall Mastery: 73%          │
│                                                          │
│     [R] Reset Progress  [M] Main Menu                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## 3. Data Design

### 3.1 JSON Data Schema

#### Subject File (e.g., kubernetes.json)
```json
{
  "subject": "string (required)",
  "description": "string (required)",
  "totalQuestions": "number (required)",
  "lastUpdated": "string YYYY-MM-DD (required)",
  "questions": [
    {
      "id": "string (required, unique)",
      "question": "string (required)",
      "answer": "string (required)",
      "difficulty": "enum: easy|medium|hard (required)",
      "tags": "string[] (optional)"
    }
  ]
}
```

### 3.2 Config Store Schema
```json
{
  "scores": {
    "<subject-name>": {
      "quizzesTaken": "number",
      "averageScore": "number",
      "highScore": "number",
      "totalQuestions": "number",
      "correctAnswers": "number",
      "streak": "number",
      "lastStudied": "ISO date string",
      "questionStats": {
        "<question-id>": {
          "asked": "number",
          "correct": "number"
        }
      }
    }
  },
  "settings": {
    "defaultQuizCount": "number (default: 10)",
    "showTimer": "boolean (default: true)",
    "darkMode": "boolean (default: true)"
  }
}
```

### 3.3 Data Flow
```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  JSON Files │ ───► │   Loader    │ ───► │   In-Memory  │
│   (data/)   │      │  (loader.js)│      │   Dataset    │
└──────────────┘      └──────────────┘      └──────────────┘
                                                  │
                                                  ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  Config     │ ◄─── │    Store     │ ◄─── │   Quiz/      │
│  (conf)     │      │  (store.js)  │      │   Study      │
└──────────────┘      └──────────────┘      └──────────────┘
```

---

## 4. Interaction Design

### 4.1 Keyboard Shortcuts

#### Global
| Key | Action |
|-----|--------|
| `↑` / `↓` | Navigate menu up/down |
| `Enter` | Select option |
| `←` / `→` | Navigate between sections |
| `q` / `Q` | Quit current screen |
| `Esc` | Go back / Cancel |

#### Study Mode
| Key | Action |
|-----|--------|
| `Space` / `Enter` | Reveal/Hide answer |
| `k` / `K` | Mark as Known |
| `r` / `R` | Mark for Review |
| `s` / `S` | Skip question |
| `n` / `N` | Next question |

#### Quiz Mode
| Key | Action |
|-----|--------|
| `a` / `A` | Select option A |
| `b` / `B` | Select option B |
| `c` / `C` | Select option C |
| `d` / `D` | Select option D |
| `s` / `S` | Skip question |
| `t` / `T` | Toggle timer |

### 4.2 Command Line Arguments
```
myrevisor                    # Interactive menu
myrevisor study <subject>    # Start study mode
myrevisor test <subject>     # Start quiz
myrevisor test <subject> -n 20    # 20 questions
myrevisor test <subject> -t 5      # 5 minute timed
myrevisor scores             # View all scores
myrevisor scores <subject>   # View subject scores
myrevisor list               # List subjects
myrevisor reset <subject>    # Reset progress
myrevisor --version          # Show version
myrevisor --help             # Show help
```

---

## 5. Technical Design

### 5.1 Dependencies
```json
{
  "dependencies": {
    "commander": "^12.0.0",      // CLI argument parsing
    "chalk": "^5.3.0",           // Terminal colors
    "boxen": "^7.1.1",           // ASCII boxes
    "inquirer": "^10.0.0",       // Interactive prompts
    "ora": "^8.0.0",             // Loading spinners
    "conf": "^14.0.0",           // Config persistence
    "figlet": "^0.3.0",          // ASCII art
    "gradient-string": "^3.0.0"  // Gradient text
  }
}
```

### 5.2 Key Module Responsibilities

#### bin/myrevisor.js
- Entry point with shebang
- Parse CLI arguments
- Delegate to appropriate command

#### src/app.js
- Initialize application
- Load data files
- Configure chalk/colors

#### src/data/loader.js
- Read and parse JSON files
- Validate data structure
- Provide data access methods

#### src/config/store.js
- Initialize conf store
- Read/write user progress
- Manage settings

#### src/commands/study.js
- Study session logic
- Question progression
- Track known/review status

#### src/commands/test.js
- Quiz session logic
- Generate MCQ options
- Calculate scores

#### src/ui/menu.js
- Main menu rendering
- Subject selection
- Navigation handling

### 5.3 Error Handling Strategy
```javascript
// Error types
AppError          // General app errors
DataLoadError     // Failed to load data
ValidationError   // Invalid data
UserCancelError   // User cancelled operation

// Error display
┌──────────────────────────────────────┐
│  ❌  Error: Data file not found       │
│                                      │
│  Could not load kubernetes.json       │
│                                      │
│  [R] Retry   [M] Main Menu          │
└──────────────────────────────────────┘
```

---

## 6. Responsive Design

### 6.1 Terminal Width Handling
| Width | Behavior |
|-------|----------|
| < 60 cols | Display warning, minimal UI |
| 60-80 cols | Compact layout |
| > 80 cols | Full layout |

### 6.2 Content Wrapping
- Long answers wrap at 80 characters
- Code blocks indented and preserved
- Lists formatted with bullets

---

## 7. Accessibility Considerations

### 7.1 Color Blindness
- Use symbols alongside colors (✓/✗ not just red/green)
- High contrast text
- Avoid relying solely on color

### 7.2 Screen Readers
- Clear text descriptions
- No ASCII art without text fallback
- Logical focus order

---

## 8. Future Considerations

### 8.1 Extensibility
- Plugin system for custom subjects
- Theme system for UI customization
- Export/import progress

### 8.2 Performance
- Lazy load subject data
- Cache parsed JSON
- Background data loading
