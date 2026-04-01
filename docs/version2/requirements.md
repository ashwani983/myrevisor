# MyRevisor v2.0 - Requirements Document

## Project Overview

**MyRevisor Web** - A beautifully designed, privacy-first web application with AI chatbot for DevOps interview preparation.

**Vision:** Transform interview preparation into an engaging, visually stunning experience that makes learning feel rewarding and enjoyable.

---

## 1. Product Overview

### 1.1 Product Type

Web Application (Static Site - can run offline)

### 1.2 Core Principles

- **Beautiful UI** - Modern, polished, visually stunning design
- **Privacy First** - All data stays in your browser
- **AI-Powered** - Smart chatbot for instant answers
- **Study Focused** - Rich study experience with visual feedback
- **Offline Capable** - Works without internet after first load

---

## 2. User Stories

### 2.1 Dashboard

- [ ] View beautiful welcome dashboard with animated elements
- [ ] See visual progress cards with charts
- [ ] Quick access to recent study sessions
- [ ] Streak counter with celebration animations
- [ ] AI assistant quick access card

### 2.2 Study Mode

- [ ] Immersive study experience with visual feedback
- [ ] Smooth animations for answer reveal
- [ ] Progress visualization with satisfying animations
- [ ] Quick keyboard navigation
- [ ] Focus mode (hide distractions)
- [ ] Dark/Light theme toggle
- [ ] Spaced repetition suggestions

### 2.3 Quiz Mode

- [ ] Engaging quiz interface with animations
- [ ] Real-time score visualization
- [ ] Streak indicators with fire animations
- [ ] Timer with visual urgency
- [ ] Celebration on quiz completion
- [ ] Review incorrect answers with explanations

### 2.4 AI Chatbot

- [ ] Beautiful chat interface
- [ ] Typing indicators and animations
- [ ] Source citations with links
- [ ] Quick topic suggestions
- [ ] Conversation history

### 2.5 Profile & Settings

- [ ] Beautiful profile customization
- [ ] Theme preference (Dark/Light/System)
- [ ] Export/Import data
- [ ] Clear data with confirmation

---

## 3. Functional Requirements

### 3.1 UI/UX Features

#### Dashboard

| ID      | Requirement                                      | Priority |
| ------- | ------------------------------------------------ | -------- |
| DASH-01 | Animated welcome section with user greeting      | P0       |
| DASH-02 | Visual progress cards with circular/bar charts   | P0       |
| DASH-03 | Recent activity timeline                         | P1       |
| DASH-04 | Streak display with flame animation              | P1       |
| DASH-05 | Quick action buttons                             | P0       |
| DASH-06 | Subject cards with icons and progress            | P0       |
| DASH-07 | Statistics overview (total studied, quiz scores) | P1       |

#### Study Mode

| ID       | Requirement                              | Priority |
| -------- | ---------------------------------------- | -------- |
| STUDY-01 | Question card with smooth animations     | P0       |
| STUDY-02 | Reveal answer with flip/expand animation | P0       |
| STUDY-03 | Progress bar with percentage             | P0       |
| STUDY-04 | Known/Review buttons with feedback       | P0       |
| STUDY-05 | Keyboard shortcuts display               | P1       |
| STUDY-06 | Focus mode (dim background)              | P2       |
| STUDY-07 | Timer for timed study sessions           | P2       |
| STUDY-08 | Study session summary                    | P0       |
| STUDY-09 | Confetti on completion                   | P1       |
| STUDY-10 | Drag to reorder questions                | P2       |

#### Quiz Mode

| ID      | Requirement                              | Priority |
| ------- | ---------------------------------------- | -------- |
| QUIZ-01 | Beautiful MCQ options with hover effects | P0       |
| QUIZ-02 | Real-time score counter                  | P0       |
| QUIZ-03 | Timer with visual countdown              | P0       |
| QUIZ-04 | Streak indicator with fire animation     | P1       |
| QUIZ-05 | Correct/Incorrect feedback animations    | P0       |
| QUIZ-06 | Progress bar with question dots          | P0       |
| QUIZ-07 | Quiz configuration modal                 | P0       |
| QUIZ-08 | Results page with share options          | P1       |
| QUIZ-09 | Review incorrect answers                 | P0       |
| QUIZ-10 | Celebration animation on high score      | P1       |

#### AI Chatbot

| ID      | Requirement                       | Priority |
| ------- | --------------------------------- | -------- |
| CHAT-01 | Beautiful chat interface          | P0       |
| CHAT-02 | Typing indicator animation        | P0       |
| CHAT-03 | User message bubbles              | P0       |
| CHAT-04 | AI message bubbles with markdown  | P0       |
| CHAT-05 | Source citation cards             | P1       |
| CHAT-06 | Quick topic buttons               | P1       |
| CHAT-07 | Conversation history sidebar      | P2       |
| CHAT-08 | Clear conversation button         | P1       |
| CHAT-09 | API key input with secure storage | P0       |

#### General UI

| ID    | Requirement             | Priority |
| ----- | ----------------------- | -------- |
| UI-01 | Smooth page transitions | P0       |
| UI-02 | Loading skeletons       | P0       |
| UI-03 | Toast notifications     | P0       |
| UI-04 | Modal dialogs           | P0       |
| UI-05 | Dark/Light theme toggle | P0       |
| UI-06 | Responsive design       | P0       |
| UI-07 | Keyboard navigation     | P1       |
| UI-08 | Back to top button      | P2       |

### 3.2 Profile Module (Local Storage)

| ID         | Requirement               | Priority |
| ---------- | ------------------------- | -------- |
| PROFILE-01 | Set display name          | P1       |
| PROFILE-02 | Set avatar (emoji picker) | P1       |
| PROFILE-03 | Set target role           | P1       |
| PROFILE-04 | Customize theme           | P1       |
| PROFILE-05 | Export profile as JSON    | P2       |
| PROFILE-06 | Import profile from JSON  | P2       |
| PROFILE-07 | Clear all local data      | P0       |

### 3.3 Question Bank Module

| ID    | Requirement                        | Priority |
| ----- | ---------------------------------- | -------- |
| QB-01 | Store questions with full metadata | P0       |
| QB-02 | Syntax highlighting for code       | P0       |
| QB-03 | Markdown support for answers       | P0       |
| QB-04 | Tag-based filtering                | P0       |
| QB-05 | Search functionality               | P0       |
| QB-06 | Import/export questions            | P2       |

---

## 4. Visual Design Requirements

### 4.1 Color System

- Consistent color palette with primary, secondary, accent colors
- Semantic colors for success, warning, error states
- Proper contrast ratios for accessibility
- Dark mode color palette

### 4.2 Typography

- Readable font sizes and line heights
- Proper heading hierarchy
- Monospace font for code snippets
- Responsive font scaling

### 4.3 Spacing & Layout

- Consistent spacing scale (4px base)
- Card-based layouts
- Proper visual hierarchy
- Responsive breakpoints

### 4.4 Animation & Motion

- Smooth transitions (200-300ms)
- Micro-interactions on buttons
- Page transition animations
- Loading states
- Celebration effects

### 4.5 Icons & Graphics

- Consistent icon library (Lucide, Heroicons)
- Subject-specific icons/emojis
- Progress visualizations
- Achievement badges

---

## 5. Gamification Features

### 5.1 Progress Tracking

- Visual progress bars and circles
- Percentage completion per subject
- Total questions mastered count
- Daily/weekly study time

### 5.2 Streaks

- Daily streak counter
- Streak freeze (optional)
- Streak milestone celebrations
- Streak restoration

### 5.3 Achievements

- First question answered
- First quiz completed
- Subject mastery badges
- Streak badges
- Quiz score badges

### 5.4 Motivation

- Celebration animations
- Encouraging messages
- Progress milestones
- Completion certificates (downloadable)

---

## 6. Data Models

### 6.1 Profile (localStorage)

```javascript
{
  displayName: String,
  avatar: String,  // emoji
  targetRole: String,
  theme: 'light' | 'dark' | 'system',
  openaiApiKey: String,  // encrypted
  createdAt: Date
}
```

### 6.2 Progress (localStorage)

```javascript
{
  subjects: {
    [subjectName]: {
      questionsKnown: [String],
      questionsReview: [String],
      lastStudied: Date,
      totalTimeSpent: Number  // seconds
    }
  },
  streaks: {
    current: Number,
    longest: Number,
    lastStudyDate: Date
  },
  achievements: [String]
}
```

### 6.3 Question (SQL.js)

```javascript
{
  id: String,
  subject: String,
  topic: String,
  question: String,
  answer: String,
  difficulty: 'easy' | 'medium' | 'hard',
  tags: [String],
  hints: [String],
  relatedQuestions: [String]
}
```

### 6.4 Quiz Result (IndexedDB)

```javascript
{
  id: String,
  subject: String,
  mode: String,
  totalQuestions: Number,
  correctAnswers: Number,
  score: Number,
  duration: Number,
  answers: [{ questionId, userAnswer, correct }],
  createdAt: Date
}
```

---

## 7. Third-Party Libraries

### 7.1 UI Libraries

- **Tailwind CSS** - Styling
- **shadcn/ui** or **Radix UI** - Components
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **clsx/tailwind-merge** - Class utilities

### 7.2 Functionality

- **SQL.js** - SQLite in browser
- **localStorage** - Profile & settings
- **IndexedDB** - Quiz & chat history
- **Vite PWA** - Offline support

### 7.3 AI (Optional)

- **OpenAI SDK** - AI chatbot
- User provides their own API key

---

## 8. Future Enhancements

- [ ] Video explanations
- [ ] Community question sharing
- [ ] Custom quiz creator
- [ ] Study groups
- [ ] Mobile app (React Native)
