# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0] - 2026-04-02

### Added

- **Core Application**
  - Interactive CLI study and quiz modes
  - Support for multiple DevOps topics (Kubernetes, Docker, AWS, Jenkins, Git, Shell Scripting)
  - Score tracking and persistence
  - Beautiful gradient UI with colors and boxes

- **Commands**
  - `study` - Interactive study mode with detailed explanations
  - `test` - Quiz mode with multiple difficulty levels
  - `scores` - View score history and statistics
  - `list` - Display all available subjects
  - `reset` - Clear all stored scores
  - `help` - Comprehensive help documentation

- **Features**
  - Timed quiz mode (30 seconds per question)
  - MCQ (Multiple Choice Question) quiz mode
  - Question count option (`-n, --number`)
  - Progress tracking across sessions
  - Error handling with user-friendly messages

- **Data**
  - Kubernetes questions (50)
  - Docker questions (50)
  - AWS questions (50)
  - Jenkins questions (10)
  - Git/GitHub questions (10)
  - Shell Scripting questions (10)

### Technical

- Built with Node.js (ES Modules)
- Dependencies: Commander.js, Inquirer, Chalk, Ora, Figlet, Gradient-string
- Configurable via Conf package
- Cross-platform support (macOS, Linux, Windows)
