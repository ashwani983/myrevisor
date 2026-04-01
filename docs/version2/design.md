# MyRevisor v2.0 - Design Document

## 1. Architecture Overview

### 1.1 System Architecture (Client-Side Only)

```
┌─────────────────────────────────────────────────────────────────┐
│                          BROWSER                                  │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    React Application                        ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   ││
│  │  │   React     │  │   Study     │  │    Quiz Module  │   ││
│  │  │   Router    │  │   Mode      │  │                 │   ││
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   ││
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   ││
│  │  │   Chatbot   │  │  Progress   │  │    Profile      │   ││
│  │  │   Module    │  │   Display   │  │    (Local)      │   ││
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   ││
│  └─────────────────────────────────────────────────────────────┘│
│                              │                                   │
│  ┌──────────────────────────┴───────────────────────────────┐  │
│  │                     LOCAL DATA LAYER                       │  │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐   │  │
│  │  │ localStorage│  │ IndexedDB   │  │   SQL.js        │   │  │
│  │  │ (Profile,   │  │ (Quiz       │  │   (Questions   │   │  │
│  │  │ Progress)   │  │  History,   │  │    Database)   │   │  │
│  │  │             │  │  Chat)      │  │                 │   │  │
│  │  └─────────────┘  └─────────────┘  └─────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              │                                   │
│  ┌──────────────────────────┴───────────────────────────────┐  │
│  │                    EXTERNAL SERVICES                       │  │
│  │  ┌─────────────────────────────────────────────────┐     │  │
│  │  │            OpenAI API (Optional)                 │     │  │
│  │  │  - User provides their own API key               │     │  │
│  │  │  - Direct browser → OpenAI (no server)          │     │  │
│  │  └─────────────────────────────────────────────────┘     │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Tech Stack

#### Frontend Only (No Backend)

- **Framework:** React 18+ with TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **State Management:** Zustand (lightweight)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui or Radix UI
- **Forms:** React Hook Form + Zod
- **SQLite:** SQL.js (client-side SQLite)
- **Local Storage:** localStorage + IndexedDB

#### AI Integration (Optional)

- **LLM Provider:** OpenAI GPT-4 (user provides own API key)
- **Direct browser calls** - no backend server needed

---

## 2. Page Structure

### 2.1 All Public (No Auth Required)

```
/                     - Landing page / Dashboard
/study                - Study mode
/study/:subject       - Study specific subject
/quiz                - Quiz mode
/quiz/:subject        - Quiz specific subject
/chat                - AI Chatbot
/progress             - Progress tracking
/profile              - User profile (local)
/settings             - App settings
```

---

## 3. UI/UX Design

### 3.1 Design System

#### Color Palette

```css
:root {
  /* Primary - Blue */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;

  /* Secondary - Purple */
  --secondary-500: #8b5cf6;
  --secondary-600: #7c3aed;

  /* Success */
  --success-500: #22c55e;

  /* Warning */
  --warning-500: #f59e0b;

  /* Error */
  --error-500: #ef4444;

  /* Neutrals */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-500: #6b7280;
  --gray-700: #374151;
  --gray-900: #111827;
}
```

#### Typography

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

#### Border Radius

```css
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
```

### 3.2 Layout System

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER (64px)                           │
│  Logo          Navigation                    Settings Icon       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                                                         │  │
│  │                    MAIN CONTENT                          │  │
│  │                                                         │  │
│  │                                                         │  │
│  │                                                         │  │
│  │                                                         │  │
│  │                                                         │  │
│  └─────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.3 Responsive Breakpoints

```css
@media (min-width: 640px) {
  /* sm */
}
@media (min-width: 768px) {
  /* md */
}
@media (min-width: 1024px) {
  /* lg */
}
@media (min-width: 1280px) {
  /* xl */
}
```

---

## 4. Feature Wireframes

### 4.1 Dashboard (Home)

```
┌─────────────────────────────────────────────────────────────────┐
│  MyRevisor                    [Chat] [Profile] [Settings]       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Welcome! Ready to study?                                       │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐              │
│  │ 📚 Study            │  │ 🎯 Quiz             │              │
│  │                     │  │                     │              │
│  │ Pick a topic and    │  │ Test your knowledge  │              │
│  │ learn at your pace   │  │                     │              │
│  │                     │  │ [Start Quiz →]      │              │
│  │ [Start Study →]     │  │                     │              │
│  └─────────────────────┘  └─────────────────────┘              │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📊 Your Progress                                        │  │
│  │                                                          │  │
│  │  Kubernetes    ████████████░░░░░░░░░░░  75%           │  │
│  │  Docker        ██████████░░░░░░░░░░░░░░  55%           │  │
│  │  AWS           ████░░░░░░░░░░░░░░░░░░░░  20%           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🤖 AI Assistant                                        │  │
│  │  Ask anything about DevOps topics!                      │  │
│  │                                                          │  │
│  │  [Try the Chatbot →]                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Study Mode

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back              Study: Kubernetes           [1/50]         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │  Q1. Explain Kubernetes Architecture...                   │  │
│  │                                                          │  │
│  │  Difficulty: Medium  │  Tags: architecture, core-concepts│  │
│  │                                                          │  │
│  │  ─────────────────────────────────────────────────────── │  │
│  │                                                          │  │
│  │  [                    ANSWER HIDDEN                     ] │  │
│  │                                                          │  │
│  │              [👁 Reveal Answer]                         │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  [✓ Known]  [🔄 Review]  [→ Skip]  [💡 Hint]          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  Progress: 2%                              1 of 50 completed   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 AI Chatbot

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back                        AI Interview Assistant            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ 🤖 AI Assistant                                          │  │
│  │ Ask me anything about DevOps topics!                      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ 👤 You                                       10:30  │ │  │
│  │  │ What is a Kubernetes Pod?                           │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ 🤖 Assistant                               10:30  │ │  │
│  │  │ A Pod is the smallest deployable unit in K8s...     │ │  │
│  │  │                                                     │ │  │
│  │  │ 📚 Source: kubernetes.json                          │ │  │
│  │  │ [Study this topic →]                                │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ [💬 Type your question...                      ] [Send ➤] │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  🔑 OpenAI API Key: [•••••••••••••••••••] [Save]              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.4 Quiz Mode

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back              Quiz: Kubernetes              ⏱️ 14:32      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  Question 5 of 20                                          25%  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                                                           │  │
│  │  Q5. What is the purpose of a Kubernetes Service?         │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  ○  A) To store configuration data                        │  │
│  │  ●  B) To expose applications to network                  │  │
│  │  ○  C) To manage container storage                        │  │
│  │  ○  D) To monitor application health                     │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│                              [Submit Answer →]                  │
│                                                                 │
│  Score: 4/5 (80%)                           Streak: 🔥 4       │
└─────────────────────────────────────────────────────────────────┘
```

### 4.5 Profile Page

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back                         Your Profile                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  👤 Profile (Stored Locally)                             │  │
│  │                                                          │  │
│  │  Display Name:                                           │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │ Ashwani                                           │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │                                                          │  │
│  │  Target Role:                                            │  │
│  │  ┌──────────────────────────────────────────────────┐   │  │
│  │  │ DevOps Engineer                                   │   │  │
│  │  └──────────────────────────────────────────────────┘   │  │
│  │                                                          │  │
│  │  [💾 Save Profile]                                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📤 Export Your Data                                    │  │
│  │                                                          │  │
│  │  [Export Progress as JSON]  [Import Progress]           │  │
│  │                                                          │  │
│  │  [🗑️ Clear All Local Data]                             │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  🔒 Your data never leaves your browser.                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5. Component Specifications

### 5.1 Question Card Component

```typescript
interface QuestionCardProps {
  question: Question;
  showAnswer: boolean;
  onReveal: () => void;
  onKnown: () => void;
  onReview: () => void;
  difficulty?: 'easy' | 'medium' | 'hard';
}
```

### 5.2 Chat Message Component

```typescript
interface ChatMessageProps {
  message: ChatMessage;
  onSuggestionClick?: (suggestion: string) => void;
}
```

### 5.3 Quiz Question Component

```typescript
interface QuizQuestionProps {
  question: Question;
  options?: string[]; // For MCQ
  onAnswer: (answer: string) => void;
  selectedAnswer?: string;
}
```

---

## 6. Data Flow

### 6.1 Question Database (SQL.js)

```
┌─────────────────┐
│   questions.db   │
│   (embedded)    │
│                 │
│  - Kubernetes   │
│  - Docker       │
│  - AWS          │
│  - Jenkins      │
│  - Git          │
│  - Shell        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│   SQL.js       │────▶│   Browser       │
│ (WASM SQLite)  │     │   Runtime       │
└─────────────────┘     └────────┬────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   React App    │
                        │   Queries      │
                        └─────────────────┘
```

### 6.2 Local Storage Structure

```javascript
localStorage:
  - myrevisor_profile: { displayName, targetRole, preferences }
  - myrevisor_progress: { [subject]: { known[], review[], streak } }
  - myrevisor_settings: { theme, quizCount }

IndexedDB:
  - quizHistory: QuizResult[]
  - chatHistory: ChatMessage[]
```

### 6.3 AI Chat Flow

```
User Message
     │
     ▼
┌─────────────┐      ┌─────────────┐
│   React    │────▶│  OpenAI     │
│   App      │◀────│  API        │
└─────────────┘      └─────────────┘
     │                     ▲
     │                     │
     ▼                     │
┌─────────────┐            │
│   Search    │────────────┘
│   Question  │
│   Database  │
└─────────────┘
```

---

## 7. Security & Privacy

### 7.1 Data Storage

- All user data stored in browser only
- No server, no cloud, no data collection
- Data persists until user clears it

### 7.2 AI API Calls

- Direct browser → OpenAI (no middleman)
- User must provide their own API key
- API key stored in localStorage (user's responsibility)

### 7.3 Privacy

- No cookies used
- No analytics/tracking
- No external requests except OpenAI (if enabled)
- Works fully offline

---

## 8. Deployment

### 8.1 Static Site

```
┌─────────────────────────────────────┐
│         GitHub Pages                 │
│         Netlify                      │
│         Vercel                       │
│         Cloudflare Pages             │
│              OR                     │
│         Any static file host         │
└─────────────────────────────────────┘
```

### 8.2 Self-Hosted Option

- Download the HTML/JS/CSS bundle
- Host on any web server
- No backend required

### 8.3 Offline Installation (PWA)

- Service Worker caches all assets
- Questions embedded in the app
- Full functionality without internet

---

## 9. Development Roadmap

### Phase 1: Foundation (1 week)

- [ ] Project setup (React + Vite + TypeScript)
- [ ] SQL.js integration for question database
- [ ] Basic layout and navigation
- [ ] Question display components

### Phase 2: Study Mode (1 week)

- [ ] Study page UI
- [ ] Answer reveal functionality
- [ ] Known/Review marking
- [ ] Progress tracking (localStorage)

### Phase 3: Quiz Mode (1 week)

- [ ] Quiz configuration
- [ ] MCQ quiz flow
- [ ] Timed quiz
- [ ] Results display
- [ ] Quiz history (IndexedDB)

### Phase 4: AI Chatbot (1 week)

- [ ] Chat UI
- [ ] OpenAI integration (user API key)
- [ ] Question database search
- [ ] Context-aware responses

### Phase 5: Profile & Settings (2 days)

- [ ] Profile page (localStorage)
- [ ] Settings page
- [ ] Data export/import

### Phase 6: Polish (3 days)

- [ ] Responsive design
- [ ] PWA setup
- [ ] Accessibility improvements
- [ ] Error handling

### Phase 7: Launch (1 day)

- [ ] Deploy to GitHub Pages/Netlify
- [ ] Documentation
- [ ] Announcement
