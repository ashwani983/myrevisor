# MyRevisor v2.0 - Design Document

## 1. Design Philosophy

### 1.1 Core Principles

- **Delightful** - Every interaction should feel satisfying
- **Focused** - Distraction-free study experience
- **Rewarding** - Visual feedback and progress celebration
- **Accessible** - WCAG 2.1 AA compliant
- **Fast** - Optimized for performance

### 1.2 Design Inspiration

- Linear.app - Clean, minimal, focused
- Notion - Beautiful cards and typography
- Duolingo - Gamification and streaks
- Vercel - Dark mode aesthetics

---

## 2. Color System

### 2.1 Light Theme

```css
:root {
  /* Primary - Indigo */
  --primary-50: #eef2ff;
  --primary-100: #e0e7ff;
  --primary-200: #c7d2fe;
  --primary-300: #a5b4fc;
  --primary-400: #818cf8;
  --primary-500: #6366f1;
  --primary-600: #4f46e5;
  --primary-700: #4338ca;
  --primary-800: #3730a3;
  --primary-900: #312e81;

  /* Secondary - Violet */
  --secondary-400: #a78bfa;
  --secondary-500: #8b5cf6;
  --secondary-600: #7c3aed;

  /* Accent - Emerald */
  --accent-400: #34d399;
  --accent-500: #10b981;
  --accent-600: #059669;

  /* Success */
  --success-50: #ecfdf5;
  --success-500: #22c55e;
  --success-600: #16a34a;

  /* Warning */
  --warning-50: #fffbeb;
  --warning-500: #f59e0b;
  --warning-600: #d97706;

  /* Error */
  --error-50: #fef2f2;
  --error-500: #ef4444;
  --error-600: #dc2626;

  /* Backgrounds */
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;
  --bg-tertiary: #f3f4f6;
  --bg-card: #ffffff;

  /* Text */
  --text-primary: #111827;
  --text-secondary: #4b5563;
  --text-tertiary: #9ca3af;
  --text-muted: #6b7280;

  /* Borders */
  --border-primary: #e5e7eb;
  --border-secondary: #d1d5db;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-glow: 0 0 20px rgb(99 102 241 / 0.3);
}
```

### 2.2 Dark Theme

```css
.dark {
  /* Primary */
  --primary-400: #818cf8;
  --primary-500: #6366f1;
  --primary-600: #4f46e5;

  /* Backgrounds */
  --bg-primary: #0f0f0f;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #262626;
  --bg-card: #1a1a1a;

  /* Text */
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-tertiary: #6b7280;
  --text-muted: #9ca3af;

  /* Borders */
  --border-primary: #2d2d2d;
  --border-secondary: #3d3d3d;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5);
  --shadow-glow: 0 0 30px rgb(99 102 241 / 0.2);
}
```

---

## 3. Typography

### 3.1 Font Stack

```css
/* Primary - Inter for UI */
--font-sans:
  'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Mono - JetBrains Mono for code */
--font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;

/* Display - For headings */
--font-display: 'Outfit', 'Inter', sans-serif;
```

### 3.2 Type Scale

```css
/* Font Sizes */
--text-xs: 0.75rem; /* 12px */
--text-sm: 0.875rem; /* 14px */
--text-base: 1rem; /* 16px */
--text-lg: 1.125rem; /* 18px */
--text-xl: 1.25rem; /* 20px */
--text-2xl: 1.5rem; /* 24px */
--text-3xl: 1.875rem; /* 30px */
--text-4xl: 2.25rem; /* 36px */
--text-5xl: 3rem; /* 48px */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.625;

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

---

## 4. Spacing System

### 4.1 Spacing Scale

```css
--space-0: 0;
--space-1: 0.25rem; /* 4px */
--space-2: 0.5rem; /* 8px */
--space-3: 0.75rem; /* 12px */
--space-4: 1rem; /* 16px */
--space-5: 1.25rem; /* 20px */
--space-6: 1.5rem; /* 24px */
--space-8: 2rem; /* 32px */
--space-10: 2.5rem; /* 40px */
--space-12: 3rem; /* 48px */
--space-16: 4rem; /* 64px */
--space-20: 5rem; /* 80px */
```

### 4.2 Border Radius

```css
--radius-none: 0;
--radius-sm: 0.25rem; /* 4px */
--radius-md: 0.5rem; /* 8px */
--radius-lg: 0.75rem; /* 12px */
--radius-xl: 1rem; /* 16px */
--radius-2xl: 1.5rem; /* 24px */
--radius-full: 9999px;
```

---

## 5. Component Library

### 5.1 Buttons

| Variant     | Use Case          | Styling                                           |
| ----------- | ----------------- | ------------------------------------------------- |
| Primary     | Main actions      | bg-primary-600, text-white, hover:bg-primary-700  |
| Secondary   | Secondary actions | bg-tertiary, text-primary, hover:bg-border        |
| Outline     | Alternative       | border-primary, text-primary, hover:bg-primary-50 |
| Ghost       | Tertiary          | transparent, text-secondary, hover:bg-tertiary    |
| Destructive | Delete            | bg-error-500, text-white                          |

| Size | Height | Padding     |
| ---- | ------ | ----------- |
| sm   | 32px   | px-3 py-1.5 |
| md   | 40px   | px-4 py-2   |
| lg   | 48px   | px-6 py-3   |

### 5.2 Cards

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: var(--shadow-md);
  border-color: var(--border-secondary);
}

.card-interactive {
  cursor: pointer;
}

.card-interactive:hover {
  transform: translateY(-2px);
}
```

### 5.3 Inputs

```css
.input {
  height: 40px;
  padding: 0 var(--space-3);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-md);
  background: var(--bg-primary);
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-100);
}

.input-error {
  border-color: var(--error-500);
}
```

### 5.4 Badges

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: var(--text-xs);
  font-weight: 500;
  border-radius: var(--radius-full);
}

.badge-easy {
  background: var(--success-100);
  color: var(--success-700);
}
.badge-medium {
  background: var(--warning-100);
  color: var(--warning-700);
}
.badge-hard {
  background: var(--error-100);
  color: var(--error-700);
}
```

---

## 6. Page Wireframes

### 6.1 Dashboard - Hero Section

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │                                                         │   │
│   │   👋 Welcome back, [Name]!                            │   │
│   │                                                         │   │
│   │   "The best time to start was yesterday.               │   │
│   │    The second best time is now."                        │   │
│   │                                                         │   │
│   │   🔥 5 day streak!                                    │   │
│   │                                                         │   │
│   └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.2 Dashboard - Subject Cards

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ┌──────────────────────┐  ┌──────────────────────┐            │
│   │  ☸️ Kubernetes     │  │  🐳 Docker           │            │
│   │  ████████░░ 78%   │  │  ██████░░░░ 55%     │            │
│   │  39/50 mastered    │  │  27/50 mastered     │            │
│   │                     │  │                      │            │
│   │  [Study →] [Quiz]  │  │  [Study →] [Quiz]  │            │
│   └──────────────────────┘  └──────────────────────┘            │
│                                                                 │
│   ┌──────────────────────┐  ┌──────────────────────┐            │
│   │  ☁️ AWS            │  │  🔧 Jenkins          │            │
│   │  ████░░░░░ 32%    │  │  ██░░░░░░░ 15%     │            │
│   │  16/50 mastered    │  │  7/50 mastered      │            │
│   │                     │  │                      │            │
│   │  [Study →] [Quiz]  │  │  [Study →] [Quiz]  │            │
│   └──────────────────────┘  └──────────────────────┘            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.3 Study Mode - Question View

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │  ☸️ Kubernetes                    1 / 50     🔥 5        │  │
│   │                                                          │  │
│   │  ████████████████████████░░░░░░░░░░░░░░░░░░░░░░░░░ 40%  │  │
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │  Q1. Explain Kubernetes Architecture...                     │  │
│   │                                                          │  │
│   │  ┌──────────────────────────────────────────────────┐   │  │
│   │  │ Medium  │  architecture, core-concepts           │   │  │
│   │  └──────────────────────────────────────────────────┘   │  │
│   │                                                          │  │
│   │  ┌──────────────────────────────────────────────────┐   │  │
│   │  │                                                    │   │  │
│   │  │                                                    │   │  │
│   │  │         Tap to reveal answer...                    │   │  │
│   │  │                                                    │   │  │
│   │  │                                                    │   │  │
│   │  └──────────────────────────────────────────────────┘   │  │
│   │                                                          │  │
│   │              ┌─────────────────────┐                   │  │
│   │              │    👁 Reveal Answer │                   │  │
│   │              └─────────────────────┘                   │  │
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │   ┌────────────┐  ┌────────────┐  ┌────────────┐       │  │
│   │   │   ✓        │  │   🔄      │  │   →        │       │  │
│   │   │   Known    │  │   Review   │  │   Skip    │       │  │
│   │   └────────────┘  └────────────┘  └────────────┘       │  │
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   💡 Press K for Known, R for Review, S for Skip              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.4 Study Mode - Answer Revealed

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │  Q1. Explain Kubernetes Architecture...                     │  │
│   │                                                          │  │
│   │  ┌──────────────────────────────────────────────────┐   │  │
│   │  │ Medium  │  architecture, core-concepts           │   │  │
│   │  └──────────────────────────────────────────────────┘   │  │
│   │                                                          │  │
│   │  ┌──────────────────────────────────────────────────┐   │  │
│   │  │                                                    │   │  │
│   │  │  Kubernetes Architecture:                          │   │  │
│   │  │                                                    │   │  │
│   │  │  • Master Node: API Server, etcd, scheduler       │   │  │
│   │  │  • Worker Nodes: Kubelet, kube-proxy, containers   │   │  │
│   │  │  • etcd: Distributed key-value store               │   │  │
│   │  │                                                    │   │  │
│   │  └──────────────────────────────────────────────────┘   │  │
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │   ┌────────────┐  ┌────────────┐  ┌────────────┐       │  │
│   │   │   ✓        │  │   🔄      │  │   →        │       │  │
│   │   │   Known    │  │   Review   │  │   Skip    │       │  │
│   │   └────────────┘  └────────────┘  └────────────┘       │  │
│   │                                                          │  │
│   │   💡 Nice! You know this one!                          │  │
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.5 Quiz Mode - Question

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │  ☸️ Kubernetes              ⏱️ 14:32        🔥 4       │  │
│   │                                                          │  │
│   │  ● ● ● ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○               │  │
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │  Q5. What is the purpose of a Kubernetes Service?        │  │
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │  ┌──────────────────────────────────────────────────┐   │  │
│   │  │  ○  A) To store configuration data               │   │  │
│   │  └──────────────────────────────────────────────────┘   │  │
│   │                                                          │  │
│   │  ┌──────────────────────────────────────────────────┐   │  │
│   │  │  ○  B) To expose applications to network          │   │  │
│   │  └──────────────────────────────────────────────────┘   │  │
│   │                                                          │  │
│   │  ┌──────────────────────────────────────────────────┐   │  │
│   │  │  ○  C) To manage container storage              │   │  │
│   │  └──────────────────────────────────────────────────┘   │  │
│   │                                                          │  │
│   │  ┌──────────────────────────────────────────────────┐   │  │
│   │  │  ○  D) To monitor application health            │   │  │
│   │  └──────────────────────────────────────────────────┘   │  │
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│              ┌─────────────────────────┐                        │
│              │    Submit Answer        │                        │
│              └─────────────────────────┘                        │
│                                                                 │
│   Score: 4/5 (80%)                                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.6 AI Chatbot

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │  🤖 AI Interview Assistant              [New Chat]      │  │
│   │  Ask me anything about DevOps!                            │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │  ┌──────────────────────────────────────────────────┐   │  │
│   │  │  👤 You                              10:30 AM   │   │  │
│   │  │                                                  │   │  │
│   │  │  What is a Kubernetes Pod?                      │   │  │
│   │  └──────────────────────────────────────────────────┘   │  │
│   │                                                          │  │
│   │  ┌──────────────────────────────────────────────────┐   │  │
│   │  │  🤖 Assistant                       10:30 AM   │   │  │
│   │  │                                                  │   │  │
│   │  │  A **Pod** is the smallest deployable unit in   │   │  │
│   │  │  Kubernetes. It represents a single instance    │   │  │
│   │  │  of a running process in your cluster.          │   │  │
│   │  │                                                  │   │  │
│   │  │  ┌──────────────────────────────────────────┐   │   │  │
│   │  │  │ 📚 Source: kubernetes.json (k8s-005)    │   │   │  │
│   │  │  │ [Study this topic →]                   │   │   │  │
│   │  │  └──────────────────────────────────────────┘   │   │  │
│   │  │                                                  │   │  │
│   │  │  💡 Want to learn more about Pods?             │   │  │
│   │  │     Try asking about Pod lifecycle or          │   │  │
│   │  │     multi-container pods!                       │   │  │
│   │  └──────────────────────────────────────────────────┘   │  │
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │  💬 Type your question...                    [Send]   │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │  Quick Topics:                                          │  │
│   │  [Kubernetes] [Docker] [AWS] [Git] [Jenkins] [Shell]   │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 6.7 Profile Page

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │                                                          │  │
│   │  👤 Profile                                              │  │
│   │                                                          │  │
│   │  ┌──────────────────────────────────────────────────┐   │  │
│   │  │                                                  │   │  │
│   │  │              🎨                                 │   │  │
│   │  │                                                  │   │  │
│   │  │          Display Name                            │   │  │
│   │  │          ┌──────────────────────────┐           │   │  │
│   │  │          │ Ashwani               │           │   │  │
│   │  │          └──────────────────────────┘           │   │  │
│   │  │                                                  │   │  │
│   │  │          Target Role                             │   │  │
│   │  │          ┌──────────────────────────┐           │   │  │
│   │  │          │ DevOps Engineer         │           │   │  │
│   │  │          └──────────────────────────┘           │   │  │
│   │  │                                                  │   │  │
│   │  │          Theme                                   │   │  │
│   │  │          [Light] [Dark] [System]                │   │  │
│   │  │                                                  │   │  │
│   │  │          [💾 Save Profile]                     │   │  │
│   │  │                                                  │   │  │
│   │  └──────────────────────────────────────────────────┘   │  │
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   ┌──────────────────────────────────────────────────────────┐  │
│   │  📤 Your Data                                           │  │
│   │                                                          │  │
│   │  [Export Progress as JSON]  [Import Progress]          │  │
│   │                                                          │  │
│   │  [🗑️ Clear All Data]                                 │  │
│   │                                                          │  │
│   └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│   🔒 Your data never leaves your browser.                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 7. Animations & Motion

### 7.1 Timing

```css
--duration-instant: 100ms;
--duration-fast: 150ms;
--duration-normal: 200ms;
--duration-slow: 300ms;
--duration-slower: 500ms;

--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### 7.2 Common Animations

- **Fade In:** opacity 0 → 1, 200ms ease-out
- **Slide Up:** translateY(10px) → 0, opacity 0 → 1, 300ms ease-out
- **Scale In:** scale(0.95) → 1, opacity 0 → 1, 200ms ease-spring
- **Pulse:** scale 1 → 1.05 → 1, 1s infinite
- **Shake:** translateX -5px → 5px, 100ms × 3

### 7.3 Micro-interactions

- Button hover: scale(1.02), shadow increase
- Button click: scale(0.98)
- Card hover: translateY(-2px), shadow increase
- Input focus: border color change, glow
- Checkbox: scale bounce, checkmark draw

---

## 8. Responsive Design

### 8.1 Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) {
  /* sm - Large phones */
}
@media (min-width: 768px) {
  /* md - Tablets */
}
@media (min-width: 1024px) {
  /* lg - Laptops */
}
@media (min-width: 1280px) {
  /* xl - Desktops */
}
```

### 8.2 Grid System

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3-4 columns

---

## 9. Accessibility

### 9.1 Focus States

```css
:focus-visible {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}
```

### 9.2 Screen Reader

- Proper ARIA labels
- Skip links
- Live regions for updates
- Alt text for images

### 9.3 Keyboard Navigation

- Tab navigation through all interactive elements
- Enter/Space to activate buttons
- Escape to close modals
- Arrow keys for lists
