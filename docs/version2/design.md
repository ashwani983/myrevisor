# MyRevisor v2.0 - Design Document

## 1. Architecture Overview

### 1.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLIENT (SPA)                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   React     │  │   Study     │  │      Quiz Module        │ │
│  │   Router    │  │   Mode      │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Chatbot   │  │  Progress   │  │     Admin Panel         │ │
│  │   Module    │  │   Dashboard │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API GATEWAY                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │   Auth      │  │   Rate      │  │       Logging           │ │
│  │   Middleware│  │   Limiter   │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   Auth Service  │ │  Quiz Service   │ │  Chat Service   │
│                 │ │                 │ │                 │
│ - JWT handling  │ │ - Quiz logic   │ │ - AI integration│
│ - OAuth         │ │ - Scoring      │ │ - NLP           │
│ - Sessions      │ │ - History      │ │ - Context       │
└─────────────────┘ └─────────────────┘ └─────────────────┘
          │                   │                   │
          └───────────────────┼───────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         DATABASE LAYER                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐ │
│  │ PostgreSQL  │  │   Redis     │  │     Question Bank       │ │
│  │  (Users,   │  │  (Cache,    │  │       (JSON/Files)       │ │
│  │   Quiz)     │  │   Sessions) │  │                         │ │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 Tech Stack

#### Frontend

- **Framework:** React 18+ with TypeScript
- **Routing:** React Router v6
- **State Management:** Zustand or Redux Toolkit
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui or Radix UI
- **Forms:** React Hook Form + Zod
- **HTTP Client:** Axios or Fetch API

#### Backend

- **Runtime:** Node.js 20+ or Bun
- **Framework:** Express.js or Fastify
- **Language:** TypeScript
- **ORM:** Prisma or Drizzle
- **Validation:** Zod

#### Database

- **Primary:** PostgreSQL
- **Cache:** Redis
- **Search:** PostgreSQL full-text search (pg_trgm)

#### AI/Chatbot

- **LLM Provider:** OpenAI GPT-4 or Anthropic Claude
- **Vector DB (optional):** Pinecone or Weaviate for semantic search

---

## 2. Page Structure

### 2.1 Public Pages

```
/                     - Landing page
/login                - Login page
/register             - Registration page
/forgot-password      - Password reset request
/reset-password/:token - Password reset
```

### 2.2 Authenticated Pages

```
/app                  - Dashboard (default)
/app/study            - Study mode
/app/study/:subject   - Study specific subject
/app/quiz             - Quiz mode
/app/quiz/:subject    - Quiz specific subject
/app/chat             - AI Chatbot
/app/progress         - Progress tracking
/app/settings         - User settings
```

### 2.3 Admin Pages

```
/admin                - Admin dashboard
/admin/questions      - Question management
/admin/users          - User management
/admin/analytics      - Analytics
```

---

## 3. UI/UX Design

### 3.1 Design System

#### Color Palette

```css
:root {
  /* Primary */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-200: #bfdbfe;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;

  /* Secondary */
  --secondary-50: #f5f3ff;
  --secondary-500: #8b5cf6;
  --secondary-600: #7c3aed;

  /* Success */
  --success-500: #22c55e;
  --success-600: #16a34a;

  /* Warning */
  --warning-500: #f59e0b;
  --warning-600: #d97706;

  /* Error */
  --error-500: #ef4444;
  --error-600: #dc2626;

  /* Neutrals */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
}
```

#### Typography

```css
/* Font Family */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Font Sizes */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
```

#### Spacing

```css
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-12: 3rem; /* 48px */
```

#### Border Radius

```css
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;
--radius-full: 9999px;
```

### 3.2 Component Library

#### Buttons

| Variant     | Use Case                          |
| ----------- | --------------------------------- |
| Primary     | Main actions (Start Quiz, Submit) |
| Secondary   | Secondary actions (Cancel, Back)  |
| Outline     | Alternative actions               |
| Ghost       | Tertiary actions                  |
| Destructive | Delete, dangerous actions         |

#### Cards

- **Question Card** - Display question with answer reveal
- **Quiz Card** - Quiz preview with stats
- **Progress Card** - Progress visualization
- **Chat Card** - Message bubble

#### Forms

- Text Input
- Select Dropdown
- Checkbox / Radio
- Toggle Switch
- Textarea
- File Upload

#### Feedback

- Toast Notifications
- Modal Dialogs
- Loading Spinners
- Progress Bars
- Badges / Tags

### 3.3 Layout System

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER (64px)                           │
│  Logo          Navigation                    User Menu          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐  ┌─────────────────────────────────────────────┐│
│  │ SIDEBAR │  │                                             ││
│  │ (240px) │  │              MAIN CONTENT                   ││
│  │         │  │                                             ││
│  │ - Home  │  │                                             ││
│  │ - Study │  │                                             ││
│  │ - Quiz  │  │                                             ││
│  │ - Chat  │  │                                             ││
│  │ - Progress│ │                                             ││
│  │         │  │                                             ││
│  └─────────┘  └─────────────────────────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 3.4 Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) {
  /* sm - Tablet */
}
@media (min-width: 768px) {
  /* md - Tablet landscape */
}
@media (min-width: 1024px) {
  /* lg - Desktop */
}
@media (min-width: 1280px) {
  /* xl - Large desktop */
}
@media (min-width: 1536px) {
  /* 2xl - Extra large */
}
```

---

## 4. Feature Wireframes

### 4.1 Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  Welcome back, Ashwani!                    [Notifications] [⚙️] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📊 Your Progress                                        │  │
│  │                                                          │  │
│  │  Kubernetes    ████████████░░░░  85%                   │  │
│  │  Docker        ██████████░░░░░░░  70%                   │  │
│  │  AWS           ██████░░░░░░░░░░░  45%                   │  │
│  │  Jenkins       ████░░░░░░░░░░░░░  25%                   │  │
│  │  Git           ██░░░░░░░░░░░░░░░░  10%                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌─────────────────────┐  ┌─────────────────────┐              │
│  │ 🎯 Continue where   │  │ 🤖 AI Assistant     │              │
│  │ you left off        │  │ Ask questions in    │              │
│  │                     │  │ natural language    │              │
│  │  [Kubernetes] 65%    │  │                     │              │
│  │  [Continue →]       │  │  [Start Chat →]     │              │
│  └─────────────────────┘  └─────────────────────┘              │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  📝 Recent Quizzes                                       │  │
│  │  ┌────────────┬────────────┬────────────┬────────────┐   │  │
│  │  │ K8s Quiz   │ 85%  ✓    │ Docker Quiz│ 70%  ✓    │   │  │
│  │  │ 2 hours ago│           │ 1 day ago  │           │   │  │
│  │  └────────────┴────────────┴────────────┴────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Study Mode

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard      Study: Kubernetes      [1/50]        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                                                            │ │
│  │  Q1. Explain Kubernetes Architecture...                     │ │
│  │                                                            │ │
│  │  Difficulty: Medium  │  Tags: architecture, core-concepts │ │
│  │                                                            │ │
│  │  ────────────────────────────────────────────────────────  │ │
│  │                                                            │ │
│  │  [                    ANSWER HIDDEN                    ]   │ │
│  │                                                            │ │
│  │  ────────────────────────────────────────────────────────  │ │
│  │                                                            │ │
│  │        [👁 Reveal Answer]                                 │ │
│  │                                                            │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  [✓ Known]  [🔄 Review]  [→ Skip]  [💡 Hint]           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  Progress: 2%                              1 of 50 completed    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 AI Chatbot

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard              AI Interview Assistant         │
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
│  │  │ 📚 Source: kubernetes.json (k8s-005)               │ │  │
│  │  │ [Study this topic →]                                │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐ │  │
│  │  │ 👤 You                                       10:31  │ │  │
│  │  │ How does it differ from a container?                │ │  │
│  │  └─────────────────────────────────────────────────────┘ │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ [💬 Type your question...                    ] [Send ➤]  │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Quick Topics: [Kubernetes] [Docker] [AWS] [Git] [Jenkins]    │
└─────────────────────────────────────────────────────────────────┘
```

### 4.4 Quiz Mode

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard      Quiz: Kubernetes      ⏱️ 14:32       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
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
│  │  ●  B) To expose applications to network                   │  │
│  │  ○  C) To manage container storage                        │  │
│  │  ○  D) To monitor application health                      │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  [A]    [B ✓]    [C]    [D]                            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
│                              [Submit Answer →]                  │
│                                                                 │
│  Score: 4/5 (80%)                           Streak: 🔥 4      │
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

## 6. API Design

### 6.1 Request/Response Format

**Request Headers:**

```http
Content-Type: application/json
Authorization: Bearer <jwt_token>
```

**Success Response:**

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 100
  }
}
```

**Error Response:**

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": { ... }
  }
}
```

### 6.2 Authentication Flow

```
┌─────────┐      ┌─────────┐      ┌─────────┐
│  User   │ ──▶ │  React  │ ──▶ │ Express │
│ Browser │ ◀── │   App   │ ◀── │   API   │
└─────────┘      └─────────┘      └─────────┘
                                  │       │
                                  ▼       ▼
                              ┌───────┐ ┌───────┐
                              │Redis  │ │ Postgres│
                              │Session│ │  DB    │
                              └───────┘ └───────┘
```

### 6.3 Chat Flow with AI

```
User Message
     │
     ▼
┌─────────┐      ┌─────────┐      ┌─────────┐
│  API    │ ──▶ │  OpenAI │ ──▶ │  Parse  │
│ Handler │ ◀── │   GPT    │ ◀── │ Response│
└─────────┘      └─────────┘      └─────────┘
     │
     ▼
┌─────────┐
│ Question│
│  Bank   │
│ Search  │
└─────────┘
```

---

## 7. Security Considerations

### 7.1 Authentication

- JWT tokens with 15-minute expiry
- Refresh tokens with 7-day expiry
- Rate limiting: 5 login attempts per minute
- Password requirements: 8+ chars, mixed case, number

### 7.2 API Security

- Input validation on all endpoints (Zod)
- SQL injection prevention (parameterized queries)
- XSS prevention (React's built-in escaping)
- CORS configuration for allowed origins
- Helmet.js for security headers

### 7.3 Data Protection

- Passwords hashed with bcrypt (10 rounds)
- Sensitive data encrypted at rest
- HTTPS only (TLS 1.3)
- Secure cookie settings (httpOnly, secure, sameSite)

---

## 8. Deployment Architecture

### 8.1 Production Environment

```
                    ┌─────────────────┐
                    │   Cloudflare    │
                    │   (CDN + SSL)   │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │    Vercel       │
                    │  (Frontend)     │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   Railway       │
                    │  (Backend API)  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
       ┌──────▼─────┐ ┌─────▼─────┐ ┌─────▼─────┐
       │ PostgreSQL  │ │   Redis   │ │    AI     │
       │ (Neon)     │ │ (Upstash) │ │ (OpenAI)  │
       └────────────┘ └───────────┘ └───────────┘
```

### 8.2 Environment Variables

```
# Database
DATABASE_URL=
REDIS_URL=

# Auth
JWT_SECRET=
JWT_REFRESH_SECRET=

# OAuth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# AI
OPENAI_API_KEY=

# App
APP_URL=
NODE_ENV=production
```

---

## 9. Development Roadmap

### Phase 1: Foundation (4 weeks)

- [ ] Project setup (monorepo)
- [ ] Database schema design
- [ ] Authentication system
- [ ] Basic layout and navigation

### Phase 2: Core Features (6 weeks)

- [ ] Question bank display
- [ ] Study mode
- [ ] Quiz mode
- [ ] Progress tracking

### Phase 3: AI Integration (4 weeks)

- [ ] Chatbot UI
- [ ] OpenAI integration
- [ ] Question database search
- [ ] Context-aware responses

### Phase 4: Polish (2 weeks)

- [ ] UI/UX refinements
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Testing

### Phase 5: Launch (2 weeks)

- [ ] Deployment setup
- [ ] Monitoring & logging
- [ ] Documentation
- [ ] Marketing
