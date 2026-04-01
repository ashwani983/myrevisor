# MyRevisor - Requirements Document

## 1. Project Overview

### 1.1 Project Name
**MyRevisor** - DevOps Interview Study Application

### 1.2 Project Type
Command-line Interface (CLI) application for interactive study and testing.

### 1.3 Core Functionality
An interactive CLI tool that helps users prepare for DevOps interviews by:
- Studying interview questions and answers from pre-loaded JSON data
- Taking quizzes/tests to assess knowledge
- Tracking scores and progress over time
- Providing rich, gamified terminal UI experience

### 1.4 Target Users
- DevOps engineers preparing for interviews
- Software developers learning DevOps concepts
- IT professionals seeking certification
- Students learning cloud technologies

---

## 2. Functional Requirements

### 2.1 Core Features

#### F1: Subject Management
- Load and display available subjects from JSON data files
- Show subject description and question count
- Support the following subjects:
  - Kubernetes (kubernetes.json)
  - AWS (aws.json)
  - Docker (docker.json)
  - Jenkins (jenkins.json)
  - Git and GitHub (git-github.json)
  - Shell Scripting (shell-scripting.json)

#### F2: Study Mode
- **F2.1** Display questions one at a time
- **F2.2** Show/hide answer toggle (press Enter or Space)
- **F2.3** Mark question as "Known" (k) or "Review Again" (r)
- **F2.4** Skip question (s)
- **F2.5** Display progress bar showing completion percentage
- **F2.6** Support sequential and shuffle modes
- **F2.7** Filter by difficulty level (easy/medium/hard)

#### F3: Test/Quiz Mode
- **F3.1** Multiple quiz types:
  - Flashcard Mode: Show question, user self-grades
  - Multiple Choice: 4 options, randomize correct position
  - Timed Quiz: X questions in Y minutes
- **F3.2** Configurable question count (5, 10, 20, all)
- **F3.3** Immediate feedback mode or end-of-quiz reveal
- **F3.4** Detailed answer review with explanations
- **F3.5** Question randomization (no repeats in session)

#### F4: Scoring System
- **F4.1** Calculate score percentage (correct/total)
- **F4.2** Track high scores per subject
- **F4.3** Display streak (consecutive correct answers)
- **F4.4** Show time taken per quiz
- **F4.5** Persist scores across sessions

#### F5: Progress Tracking
- **F5.1** Track questions answered correctly/incorrectly
- **F5.2** Identify weak areas (questions answered wrong multiple times)
- **F5.3** Show study streak calendar
- **F5.4** Display overall mastery percentage per subject

#### F6: Command Line Interface
- **F6.1** Global installation via npm (`npm install -g`)
- **F6.2** Interactive menu-driven navigation
- **F6.3** Command arguments for quick actions
- **F6.4** Keyboard shortcuts for navigation

---

## 3. Data Requirements

### 3.1 JSON Data Schema
```json
{
  "subject": "string",
  "description": "string",
  "totalQuestions": "number",
  "lastUpdated": "YYYY-MM-DD",
  "questions": [
    {
      "id": "string",
      "question": "string",
      "answer": "string",
      "difficulty": "easy | medium | hard",
      "tags": ["string"]
    }
  ]
}
```

### 3.2 Data Files
| File | Subject | Est. Questions |
|------|---------|----------------|
| kubernetes.json | Kubernetes | 150 |
| aws.json | AWS | 200 |
| docker.json | Docker | 100 |
| jenkins.json | Jenkins | 80 |
| git-github.json | Git & GitHub | 60 |
| shell-scripting.json | Shell Scripting | 70 |

### 3.3 Data Validation
- Validate JSON structure on load
- Ensure unique question IDs within subject
- Validate difficulty levels are one of: easy, medium, hard

---

## 4. User Interface Requirements

### 4.1 Terminal UI
- **U4.1** ASCII art logo on startup
- **U4.2** Gradient-colored headers
- **U4.3** Unicode emoji support (📚 ✓ ✗ 🎯 🏆)
- **U4.4** Loading spinners during operations
- **U4.5** Animated progress bars
- **U4.6** Boxen-styled containers for content

### 4.2 Color Scheme
- Primary: Cyan/Blue for headings
- Success: Green for correct answers
- Error: Red for incorrect answers
- Warning: Yellow for hints
- Info: White/Gray for body text

### 4.3 Navigation
- Arrow keys (↑↓) for menu navigation
- Enter to select
- Space to reveal answer
- q to quit
- Keyboard shortcuts (k, r, s) for actions

---

## 5. Non-Functional Requirements

### 5.1 Performance
- App should start within 2 seconds
- Question transitions should be instant
- Score calculations should be immediate

### 5.2 Compatibility
- **N5.1** Node.js 18+ required
- **N5.2** Works on Linux, macOS, Windows
- **N5.3** Terminal width: minimum 80 columns
- **N5.4** Supports ANSI color codes

### 5.3 Installation
- Global npm installation
- Run with `myrevisor` command
- No additional dependencies required at runtime

### 5.4 Error Handling
- Graceful handling of missing data files
- User-friendly error messages
- Recovery suggestions
- Auto-save progress on exit

---

## 6. Acceptance Criteria

### AC1: Installation
- [ ] Can install with `npm install -g myrevisor`
- [ ] Can run with `myrevisor` command

### AC2: Main Menu
- [ ] Shows list of all available subjects
- [ ] Shows description and question count for each
- [ ] Allows navigation with arrow keys

### AC3: Study Mode
- [ ] Can start study session for any subject
- [ ] Questions display clearly
- [ ] Can reveal/hide answers
- [ ] Can mark questions
- [ ] Progress is tracked

### AC4: Quiz Mode
- [ ] Can start quiz with configurable question count
- [ ] Questions display with options (for MCQ)
- [ ] Score is calculated and displayed
- [ ] Results screen shows performance

### AC5: Persistence
- [ ] Scores persist after app restart
- [ ] Progress is saved automatically

---

## 7. Future Enhancements (Out of Scope for v1)
- Web UI version (Electron/Tauri)
- Cloud sync across devices
- Spaced repetition algorithm
- Anki integration
- AI-generated questions
- Mobile companion app
- Multiplayer study sessions
