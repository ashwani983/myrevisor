# MyRevisor v2.0 - Requirements Document

## Project Overview

**MyRevisor** is evolving from a CLI tool to a full-featured web application with an AI-powered chatbot for DevOps interview preparation.

**Vision:** Transform interview preparation from passive reading to interactive, AI-assisted learning with instant feedback and personalized study paths.

---

## 1. Product Overview

### 1.1 Product Name

**MyRevisor Web** (myrevisor.app)

### 1.2 Product Type

Web Application - SaaS

### 1.3 Target Users

- DevOps engineers preparing for interviews
- Software developers learning cloud technologies
- IT professionals transitioning to DevOps roles
- Students learning Kubernetes, Docker, AWS, etc.

### 1.4 Core Value Proposition

AI-powered interview preparation that adapts to your knowledge gaps, provides instant feedback, and simulates real interview conversations.

---

## 2. User Stories

### 2.1 As a User, I can...

#### Authentication & Profile

- [ ] Sign up with email/password
- [ ] Sign in with email/password
- [ ] Sign in with GitHub OAuth
- [ ] Reset my password via email
- [ ] View and edit my profile
- [ ] Delete my account

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

#### Progress Tracking

- [ ] View overall progress dashboard
- [ ] See scores by topic
- [ ] Track streaks and achievements
- [ ] View quiz history
- [ ] Export progress reports

### 2.2 As an Admin, I can...

- [ ] Add new questions to the database
- [ ] Edit existing questions
- [ ] Delete outdated questions
- [ ] View user statistics
- [ ] Manage user accounts

---

## 3. Functional Requirements

### 3.1 Authentication Module

| ID      | Requirement                                  | Priority |
| ------- | -------------------------------------------- | -------- |
| AUTH-01 | User registration with email validation      | P0       |
| AUTH-02 | User login with session management           | P0       |
| AUTH-03 | JWT-based authentication for API             | P0       |
| AUTH-04 | GitHub OAuth integration                     | P1       |
| AUTH-05 | Password reset via email                     | P1       |
| AUTH-06 | Session timeout after 24 hours of inactivity | P1       |

### 3.2 Question Bank Module

| ID    | Requirement                                                            | Priority |
| ----- | ---------------------------------------------------------------------- | -------- |
| QB-01 | Store questions with structure: id, question, answer, difficulty, tags | P0       |
| QB-02 | Support for code snippets in answers (syntax highlighting)             | P0       |
| QB-03 | Tag-based categorization                                               | P0       |
| QB-04 | Search functionality                                                   | P0       |
| QB-05 | Import/export questions as JSON                                        | P2       |

### 3.3 Study Mode Module

| ID       | Requirement                     | Priority |
| -------- | ------------------------------- | -------- |
| STUDY-01 | Display questions one at a time | P0       |
| STUDY-02 | Reveal/hide answer toggle       | P0       |
| STUDY-03 | Mark as Known/Review            | P0       |
| STUDY-04 | Progress tracking               | P0       |
| STUDY-05 | Filter by topic and difficulty  | P1       |
| STUDY-06 | Spaced repetition algorithm     | P2       |

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
| CHAT-06 | Conversation history                    | P1       |

### 3.6 Progress & Gamification Module

| ID      | Requirement                   | Priority |
| ------- | ----------------------------- | -------- |
| PROG-01 | Per-topic progress percentage | P0       |
| PROG-02 | Quiz history with scores      | P0       |
| PROG-03 | Study streaks                 | P1       |
| PROG-04 | Achievement badges            | P2       |
| PROG-05 | Leaderboard (optional)        | P3       |

### 3.7 Admin Module

| ID       | Requirement              | Priority |
| -------- | ------------------------ | -------- |
| ADMIN-01 | Question CRUD operations | P0       |
| ADMIN-02 | User management          | P1       |
| ADMIN-03 | Analytics dashboard      | P2       |

---

## 4. Non-Functional Requirements

### 4.1 Performance

- Page load time < 3 seconds
- API response time < 500ms
- Support for 100 concurrent users

### 4.2 Security

- HTTPS only
- Password hashing with bcrypt
- Input sanitization
- Rate limiting on API endpoints
- CORS configuration

### 4.3 Scalability

- Stateless API design
- Database indexing for search
- CDN for static assets
- Horizontal scaling ready

### 4.4 Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation
- Screen reader support
- High contrast mode

### 4.5 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

---

## 5. Data Models

### 5.1 User

```javascript
{
  id: UUID,
  email: String,
  passwordHash: String,
  name: String,
  avatarUrl: String,
  role: 'user' | 'admin',
  createdAt: Date,
  updatedAt: Date,
  preferences: {
    theme: 'light' | 'dark',
    defaultQuizCount: Number
  }
}
```

### 5.2 Question

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
  relatedQuestions: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### 5.3 QuizResult

```javascript
{
  id: UUID,
  userId: UUID,
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

### 5.4 UserProgress

```javascript
{
  userId: UUID,
  subject: String,
  questionsStudied: [String],
  questionsKnown: [String],
  questionsReview: [String],
  lastStudied: Date,
  streak: Number
}
```

### 5.5 ChatMessage

```javascript
{
  id: UUID,
  sessionId: UUID,
  userId: UUID,
  role: 'user' | 'assistant',
  content: String,
  questionRef: String | null,
  createdAt: Date
}
```

---

## 6. API Endpoints

### 6.1 Authentication

```
POST   /api/auth/register     - Register new user
POST   /api/auth/login        - Login
POST   /api/auth/logout       - Logout
POST   /api/auth/refresh      - Refresh token
POST   /api/auth/forgot       - Request password reset
POST   /api/auth/reset        - Reset password
GET    /api/auth/me           - Get current user
```

### 6.2 Questions

```
GET    /api/questions              - List all questions (with filters)
GET    /api/questions/:id          - Get single question
GET    /api/questions/subjects     - Get all subjects
GET    /api/questions/random       - Get random questions
POST   /api/questions/search       - Search questions
```

### 6.3 Quiz

```
POST   /api/quiz/start             - Start a quiz session
POST   /api/quiz/:id/submit        - Submit quiz answers
GET    /api/quiz/history           - Get quiz history
GET    /api/quiz/:id               - Get quiz details
```

### 6.4 Progress

```
GET    /api/progress               - Get overall progress
GET    /api/progress/:subject      - Get subject progress
PUT    /api/progress/:subject      - Update subject progress
```

### 6.5 Chat

```
POST   /api/chat/message            - Send message to chatbot
GET    /api/chat/history            - Get chat history
DELETE /api/chat/history            - Clear chat history
```

### 6.6 Admin

```
POST   /api/admin/questions         - Create question
PUT    /api/admin/questions/:id     - Update question
DELETE /api/admin/questions/:id     - Delete question
GET    /api/admin/users             - List users
GET    /api/admin/stats             - Get statistics
```

---

## 7. Third-Party Integrations

### 7.1 Required

- **Database:** PostgreSQL (or MongoDB)
- **Authentication:** JWT + bcrypt
- **File Storage:** S3/Cloudflare R2 (for future features)

### 7.2 Optional

- **AI/LLM:** OpenAI GPT-4 API or Anthropic Claude API
- **Email:** SendGrid or AWS SES
- **Analytics:** Google Analytics, Plausible
- **Error Tracking:** Sentry
- **Hosting:** Vercel, Railway, or AWS

---

## 8. Future Enhancements (v2.1+)

- [ ] Video explanations for questions
- [ ] Community-contributed questions
- [ ] Team/group study mode
- [ ] API access for third-party integrations
- [ ] Mobile app (React Native)
- [ ] Offline mode
- [ ] Custom quiz creator
- [ ] Integration with LinkedIn Learning/Coursera
