# MyRevisor v2.0 - Requirements Document

## Project Overview

**MyRevisor Web** - A privacy-first, offline-capable web application with AI chatbot for DevOps interview preparation.

**Vision:** A free, cloud-free interview preparation tool that puts users in complete control of their data while providing AI-powered learning assistance.

### 1.1 Product Type

Web Application (Static Site - can run offline)

### 1.2 Target Users

- DevOps engineers preparing for interviews
- Software developers learning cloud technologies
- IT professionals transitioning to DevOps roles
- Privacy-conscious users who don't want cloud accounts

### 1.3 Core Value Proposition

- **100% Free** - No accounts, no subscriptions, no data collection
- **Privacy First** - All data stays in your browser (localStorage/IndexedDB)
- **AI-Powered** - Chatbot for instant answers from the question database
- **Offline Capable** - Works without internet after initial load

---

## 2. User Stories

### 2.1 As a User, I can...

#### Profile (Optional - Local Only)

- [ ] Set my display name (stored locally in browser)
- [ ] Set my target role/industry (stored locally)
- [ ] Customize study preferences (stored locally)
- [ ] Export/import my profile data
- [ ] Clear all local data anytime

#### Study Mode

- [ ] Browse questions by topic
- [ ] Filter questions by difficulty
- [ ] Mark questions as "Known" or "Need Review"
- [ ] Track my progress through topics
- [ ] Review questions I've marked for later
- [ ] Search questions by keyword

#### Quiz Mode

- [ ] Take timed quizzes (selectable duration)
- [ ] Take multiple-choice quizzes
- [ ] Take flashcard-style quizzes
- [ ] See real-time score during quiz
- [ ] Review incorrect answers after quiz
- [ ] Re-take quizzes on missed questions

#### AI Chatbot

- [ ] Ask questions in natural language
- [ ] Get instant answers from the question database
- [ ] Start a simulated interview conversation
- [ ] Get explanations for complex topics
- [ ] Receive hints when stuck on a question
- [ ] Get suggested follow-up questions

#### Progress Tracking (Local Only)

- [ ] View overall progress dashboard
- [ ] See scores by topic
- [ ] Track streaks and achievements
- [ ] View quiz history
- [ ] Export progress reports (JSON file)

---

## 3. Functional Requirements

### 3.1 Profile Module (Local Storage - localStorage/IndexedDB)

| ID         | Requirement                 | Priority |
| ---------- | --------------------------- | -------- |
| PROFILE-01 | Set display name            | P1       |
| PROFILE-02 | Set target role/industry    | P1       |
| PROFILE-03 | Customize study preferences | P1       |
| PROFILE-04 | Export profile as JSON      | P2       |
| PROFILE-05 | Import profile from JSON    | P2       |
| PROFILE-06 | Clear all local data        | P0       |

### 3.2 Question Bank Module (SQLite via SQL.js)

| ID    | Requirement                                                            | Priority |
| ----- | ---------------------------------------------------------------------- | -------- |
| QB-01 | Store questions with structure: id, question, answer, difficulty, tags | P0       |
| QB-02 | Support for code snippets in answers (syntax highlighting)             | P0       |
| QB-03 | Tag-based categorization                                               | P0       |
| QB-04 | Search functionality                                                   | P0       |
| QB-05 | Import/export questions as JSON                                        | P1       |

### 3.3 Study Mode Module

| ID       | Requirement                       | Priority |
| -------- | --------------------------------- | -------- |
| STUDY-01 | Display questions one at a time   | P0       |
| STUDY-02 | Reveal/hide answer toggle         | P0       |
| STUDY-03 | Mark as Known/Review              | P0       |
| STUDY-04 | Progress tracking (local storage) | P0       |
| STUDY-05 | Filter by topic and difficulty    | P1       |
| STUDY-06 | Spaced repetition algorithm       | P2       |

### 3.4 Quiz Module

| ID      | Requirement                    | Priority |
| ------- | ------------------------------ | -------- |
| QUIZ-01 | Multiple choice (4 options)    | P0       |
| QUIZ-02 | Timed quiz mode                | P0       |
| QUIZ-03 | Flashcard mode (self-graded)   | P0       |
| QUIZ-04 | Question count selection       | P0       |
| QUIZ-05 | Results summary with breakdown | P0       |
| QUIZ-06 | Review incorrect answers       | P1       |

### 3.5 AI Chatbot Module

| ID      | Requirement                             | Priority |
| ------- | --------------------------------------- | -------- |
| CHAT-01 | Natural language question understanding | P0       |
| CHAT-02 | Query the question database             | P0       |
| CHAT-03 | Provide explanations with context       | P0       |
| CHAT-04 | Simulate interview Q&A flow             | P1       |
| CHAT-05 | Suggest related questions               | P1       |
| CHAT-06 | Conversation history (local storage)    | P1       |

---

## 4. Non-Functional Requirements

### 4.1 Performance

- Page load time < 3 seconds
- Initial bundle size < 500KB (gzipped)
- Lazy load routes for faster initial load

### 4.2 Privacy & Security

- No data sent to any server (except AI API if user enables)
- All progress stored in browser localStorage/IndexedDB
- No cookies, no tracking, no analytics
- HTTPS only (for AI API calls)

### 4.3 Offline Capability

- Service Worker for offline access
- Questions embedded in the app (SQLite/SQL.js)
- Works without internet after first load

### 4.4 Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support

### 4.5 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

---

## 5. Data Models

### 5.1 Profile (localStorage)

```javascript
{
  displayName: String,
  targetRole: String,
  preferences: {
    defaultQuizCount: Number,
    showTimer: Boolean,
    theme: 'light' | 'dark'
  }
}
```

### 5.2 Question (SQLite/SQL.js)

```javascript
{
  id: String,           // e.g., "k8s-001"
  subject: String,      // e.g., "Kubernetes"
  topic: String,        // e.g., "Architecture"
  question: String,
  answer: String,       // Supports markdown
  difficulty: 'easy' | 'medium' | 'hard',
  tags: [String],
  hints: [String],
  relatedQuestions: [String]
}
```

### 5.3 QuizResult (localStorage)

```javascript
{
  id: UUID,
  subject: String,
  mode: 'mcq' | 'flashcard' | 'timed',
  totalQuestions: Number,
  correctAnswers: Number,
  score: Number,
  duration: Number,     // seconds
  answers: [{
    questionId: String,
    userAnswer: String,
    correct: Boolean
  }],
  createdAt: Date
}
```

### 5.4 UserProgress (localStorage)

```javascript
{
  subject: String,
  questionsStudied: [String],
  questionsKnown: [String],
  questionsReview: [String],
  lastStudied: Date,
  streak: Number
}
```

### 5.5 ChatMessage (localStorage)

```javascript
{
  sessionId: UUID,
  role: 'user' | 'assistant',
  content: String,
  questionRef: String | null,
  createdAt: Date
}
```

---

## 6. API Endpoints (Local - SQL.js)

Since this is a client-side app with SQLite (via SQL.js), no traditional API endpoints exist. Instead, we use local functions:

### 6.1 Questions (SQL.js queries)

```javascript
// Get all questions
db.query('SELECT * FROM questions WHERE subject = ?', [subject]);

// Search questions
db.query('SELECT * FROM questions WHERE question LIKE ?', [`%${query}%`]);

// Get random questions
db.query('SELECT * FROM questions ORDER BY RANDOM() LIMIT ?', [count]);
```

### 6.2 Local Storage Operations

```javascript
// Profile
localStorage.getItem('myrevisor_profile')
localStorage.setItem('myrevisor_profile', JSON.stringify(profile))

// Progress
localStorage.getItem('myrevisor_progress')
localStorage.setItem('myrevisor_progress', JSON.stringify(progress))

// Quiz History
IndexedDB.open('myrevisor', { quizHistory: [...] })

// Chat History
IndexedDB.open('myrevisor', { chatHistory: [...] })
```

---

## 7. Third-Party Integrations

### 7.1 Required

- **SQLite:** SQL.js (client-side SQLite)
- **AI:** OpenAI GPT-4 API (user provides their own API key)

### 7.2 Optional

- **Syntax Highlighting:** Prism.js or Highlight.js
- **Markdown:** marked.js
- **Icons:** Lucide React or Heroicons
- **Storage:** localStorage + IndexedDB

---

## 8. Future Enhancements (v2.1+)

- [ ] Video explanations for questions
- [ ] Import custom question sets
- [ ] Custom quiz creator
- [ ] Dark mode toggle
- [ ] Keyboard shortcuts
- [ ] Mobile app (Electron/Tauri)
- [ ] Self-hosted option
