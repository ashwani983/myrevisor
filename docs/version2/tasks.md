# MyRevisor v2.0 - Task List

## Project Overview

**MyRevisor Web** - A privacy-first, offline-capable web application with AI chatbot for DevOps interview preparation.

**Key Principles:**

- No authentication required
- All data stored locally (localStorage/IndexedDB)
- SQLite (SQL.js) for question database
- Optional AI via user's own OpenAI API key
- No backend, no cloud storage

---

## Phase 1: Project Foundation

### T1: Project Setup

- [ ] T1.1: Initialize React project with Vite + TypeScript
- [ ] T1.2: Install dependencies (React Router, Zustand, Tailwind)
- [ ] T1.3: Configure Tailwind CSS
- [ ] T1.4: Set up ESLint and Prettier
- [ ] T1.5: Configure path aliases
- [ ] T1.6: Set up SQL.js for SQLite
- [ ] T1.7: Configure PWA (Vite PWA plugin)
- [ ] T1.8: Create basic folder structure

### T2: Database Setup

- [ ] T2.1: Convert existing JSON questions to SQLite schema
- [ ] T2.2: Create SQL.js initialization
- [ ] T2.3: Create question query functions
- [ ] T2.4: Add search functionality
- [ ] T2.5: Test offline database access

### T3: Layout Components

- [ ] T3.1: Create main layout component
- [ ] T3.2: Create header with navigation
- [ ] T3.3: Create responsive sidebar (optional)
- [ ] T3.4: Add dark mode toggle
- [ ] T3.5: Create footer
- [ ] T3.6: Add loading states
- [ ] T3.7: Create error boundary

---

## Phase 2: Question Bank

### T4: Question Components

- [ ] T4.1: Create question card component
- [ ] T4.2: Add syntax highlighting for code (Prism.js)
- [ ] T4.3: Create markdown rendering for answers
- [ ] T4.4: Add difficulty badge
- [ ] T4.5: Add tag display
- [ ] T4.6: Create question list view

### T5: Question Display Features

- [ ] T5.1: Implement subject filtering
- [ ] T5.2: Implement difficulty filtering
- [ ] T5.3: Implement search by keyword
- [ ] T5.4: Add pagination or infinite scroll
- [ ] T5.5: Create subject selector component

---

## Phase 3: Study Mode

### T6: Study Mode UI

- [ ] T6.1: Create study page layout
- [ ] T6.2: Implement question display
- [ ] T6.3: Add answer reveal animation
- [ ] T6.4: Create progress bar
- [ ] T6.5: Add navigation buttons (prev/next)
- [ ] T6.6: Implement keyboard shortcuts
- [ ] T6.7: Add "Known" action
- [ ] T6.8: Add "Review" action

### T7: Study Progress

- [ ] T7.1: Create progress tracking system (localStorage)
- [ ] T7.2: Store study history
- [ ] T7.3: Add filter for "Review" questions
- [ ] T7.4: Implement progress display

---

## Phase 4: Quiz Mode

### T8: Quiz Mode UI

- [ ] T8.1: Create quiz selection page
- [ ] T8.2: Create quiz configuration options
- [ ] T8.3: Implement quiz question display
- [ ] T8.4: Add MCQ answer selection
- [ ] T8.5: Create flashcard mode
- [ ] T8.6: Add timer display
- [ ] T8.7: Implement score tracking
- [ ] T8.8: Create results page

### T9: Quiz Features

- [ ] T9.1: Random question selection
- [ ] T9.2: Answer validation
- [ ] T9.3: Results summary with breakdown
- [ ] T9.4: Show incorrect answers
- [ ] T9.5: Add retry option
- [ ] T9.6: Store quiz history (IndexedDB)

---

## Phase 5: AI Chatbot

### T10: Chatbot UI

- [ ] T10.1: Create chat page layout
- [ ] T10.2: Implement message list
- [ ] T10.3: Add message input
- [ ] T10.4: Create user message bubble
- [ ] T10.5: Create AI message bubble
- [ ] T10.6: Add typing indicator
- [ ] T10.7: Implement scroll to bottom
- [ ] T10.8: Add quick topic buttons

### T11: Chatbot Backend (Local)

- [ ] T11.1: Create OpenAI API integration
- [ ] T11.2: Add API key input/storage
- [ ] T11.3: Implement question database search
- [ ] T11.4: Create context injection
- [ ] T11.5: Add source citations
- [ ] T11.6: Implement conversation history (IndexedDB)
- [ ] T11.7: Add rate limiting for API calls

### T12: Chatbot Features

- [ ] T12.1: Natural language understanding
- [ ] T12.2: Follow-up suggestions
- [ ] T12.3: Interview simulation mode
- [ ] T12.4: Hint system
- [ ] T12.5: Add feedback mechanism

---

## Phase 6: Progress & Dashboard

### T13: Dashboard UI

- [ ] T13.1: Create dashboard layout
- [ ] T13.2: Display welcome message
- [ ] T13.3: Show overall progress chart
- [ ] T13.4: Display recent quizzes
- [ ] T13.5: Add quick actions
- [ ] T13.6: Implement streak display
- [ ] T13.7: Add AI assistant card

### T14: Progress Tracking

- [ ] T14.1: Create progress page
- [ ] T14.2: Display per-subject progress
- [ ] T14.3: Create progress charts
- [ ] T14.4: Implement streak tracking
- [ ] T14.5: Add achievement badges
- [ ] T14.6: Add export progress feature

---

## Phase 7: Profile & Settings

### T15: Profile Page

- [ ] T15.1: Create profile page
- [ ] T15.2: Add display name input
- [ ] T15.3: Add target role input
- [ ] T15.4: Implement profile save (localStorage)
- [ ] T15.5: Add export profile feature
- [ ] T15.6: Add import profile feature

### T16: Settings Page

- [ ] T16.1: Create settings page
- [ ] T16.2: Add theme toggle (light/dark)
- [ ] T16.3: Add default quiz count setting
- [ ] T16.4: Add timer settings
- [ ] T16.5: Add API key management
- [ ] T16.6: Add data management (clear data)

---

## Phase 8: PWA & Offline

### T17: PWA Setup

- [ ] T17.1: Configure Vite PWA plugin
- [ ] T17.2: Create service worker
- [ ] T17.3: Add manifest.json
- [ ] T17.4: Create app icons
- [ ] T17.5: Test offline functionality
- [ ] T17.6: Add install prompt

---

## Phase 9: Polish & Testing

### T18: UI/UX Polish

- [ ] T18.1: Responsive design improvements
- [ ] T18.2: Animation and transitions
- [ ] T18.3: Error handling UI
- [ ] T18.4: Empty states
- [ ] T18.5: Loading skeletons

### T19: Accessibility

- [ ] T19.1: Keyboard navigation
- [ ] T19.2: ARIA labels
- [ ] T19.3: Screen reader support
- [ ] T19.4: Focus management
- [ ] T19.5: Color contrast check

### T20: Testing

- [ ] T20.1: Manual testing
- [ ] T20.2: Cross-browser testing
- [ ] T20.3: Mobile testing
- [ ] T20.4: Offline testing
- [ ] T20.5: Performance testing

---

## Phase 10: Deployment

### T21: Deployment

- [ ] T21.1: Configure build for production
- [ ] T21.2: Deploy to GitHub Pages (or Netlify/Vercel)
- [ ] T21.3: Configure custom domain (optional)
- [ ] T21.4: Test production build
- [ ] T21.5: Create documentation

---

## Task Summary

| Phase    | Tasks   | Description          |
| -------- | ------- | -------------------- |
| Phase 1  | T1-T3   | Project Foundation   |
| Phase 2  | T4-T5   | Question Bank        |
| Phase 3  | T6-T7   | Study Mode           |
| Phase 4  | T8-T9   | Quiz Mode            |
| Phase 5  | T10-T12 | AI Chatbot           |
| Phase 6  | T13-T14 | Progress & Dashboard |
| Phase 7  | T15-T16 | Profile & Settings   |
| Phase 8  | T17     | PWA & Offline        |
| Phase 9  | T18-T20 | Polish & Testing     |
| Phase 10 | T21     | Deployment           |

**Total Tasks:** 84
**Completed:** 0

---

## Priority Order

1. **Phase 1** - Foundation (Setup, Database, Layout)
2. **Phase 2** - Question Bank Display
3. **Phase 3** - Study Mode
4. **Phase 4** - Quiz Mode
5. **Phase 5** - AI Chatbot
6. **Phase 6** - Dashboard
7. **Phase 7** - Profile & Settings
8. **Phase 8-10** - Polish & Deploy

---

## Dependencies

```
Phase 1 ──▶ Phase 2 ──▶ Phase 3 ──▶ Phase 4
                            │
                            ▼
                      Phase 5 (AI Chatbot)
                            │
                            ▼
                      Phase 6 (Dashboard)
                            │
                            ▼
                      Phase 7 (Profile)
                            │
                            ▼
                      Phase 8-10 (Polish & Deploy)
```

---

## Tech Stack Summary

| Category         | Technology                      |
| ---------------- | ------------------------------- |
| Framework        | React 18 + TypeScript           |
| Build Tool       | Vite                            |
| Styling          | Tailwind CSS                    |
| UI Components    | shadcn/ui or Radix UI           |
| State Management | Zustand                         |
| Database         | SQL.js (client-side SQLite)     |
| Local Storage    | localStorage + IndexedDB        |
| AI Integration   | OpenAI API (user provides key)  |
| PWA              | Vite PWA Plugin                 |
| Deployment       | GitHub Pages / Netlify / Vercel |
