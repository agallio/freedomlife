# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**freedomlife** is a cross-platform Indonesian Bible reading application built as a Turborepo monorepo. The app features guided daily reading plans, multiple Bible translations, offline support, and verse highlighting/bookmarking capabilities.

## Architecture & Structure

### Monorepo Organization
- **Root**: Turborepo configuration with shared tooling (Prettier, ESLint, Husky)
- **apps/mobile**: React Native app using Expo 54 for iOS and Android
- **apps/web**: Next.js 15 web application with React Native Web
- **packages/app**: Shared UI components and business logic (`@repo/app`)
- **packages/typescript-config**: Shared TypeScript configurations

### Key Design Patterns
- **Universal Components**: Components have platform-specific implementations (`.tsx` for mobile, `.web.tsx` for web)
- **Shared State**: Zustand stores in `packages/app` for cross-platform state management
- **Context Providers**: Feature-specific contexts (guide, read, modals, saved) for state isolation
- **Local-First Architecture**: SQLite (mobile) + Dexie.js (web) for offline Bible storage
- **WatermelonDB**: Reactive database layer for verse highlighting and bookmarking with cross-platform support

## Development Commands

### Root Level
```bash
pnpm install          # Install all dependencies
pnpm build            # Build all apps using Turborepo
pnpm lint             # Lint all projects
pnpm format           # Format code with Prettier
pnpm clean            # Clean builds and node_modules
```

### Mobile Development (apps/mobile)
```bash
cd apps/mobile
pnpm start            # Start Expo dev server with cache clear
pnpm ios              # Run on iOS simulator
pnpm android          # Run on Android emulator
pnpm lint             # Lint mobile-specific code
```

### Web Development (apps/web)
```bash
cd apps/web
pnpm dev              # Start Next.js dev server on port 2019
pnpm build            # Build for production
pnpm start            # Start production server on port 2019
pnpm lint             # Lint web-specific code
```

## Technology Stack

- **Mobile**: Expo 54, React Native 0.81.5, React 19.1, Expo Router, SQLite
- **Web**: Next.js 15.5, React 19.1, React Native Web, Dexie.js, Supabase
- **Database**: WatermelonDB for reactive local storage (verses, highlights, bookmarks)
- **Styling**: TailwindCSS 3.4.17 with NativeWind 4.2.1
- **State**: Zustand 5.0.8, React Query (@tanstack/react-query 5.90.10)
- **Build**: Turborepo 2.6.1, pnpm 10.23.0

## Code Organization Patterns

### Shared Components (`packages/app/components/`)
Components follow platform-specific naming:
- `component.tsx` - Universal/mobile implementation
- `component.web.tsx` - Web-specific implementation
- `index.tsx` - Exports and platform selection logic

### Feature Structure (`packages/app/features/`)
Each feature contains:
- `components/` - Feature-specific UI components
- `contexts/` - State management and providers
- `modals/` - Modal implementations (platform-specific)

### Key Features

#### Core Reading Experience
- **read/**: Main Bible reading interface with advanced typography and navigation
  - **read-typography/**: Verse-by-verse reading with text selection capabilities
  - **read-navbar/**: Context-aware navigation with passage information
  - **read-settings/**: Reading preferences and display settings
  - **passage-jump-detector**: Smart navigation between Bible passages

#### Bible Translation Management
- **read/modals/translate/**: Bible version management system
  - Download and manage multiple Indonesian Bible translations
  - Offline translation storage (SQLite on mobile, Dexie on web)
  - Translation selection with download progress tracking
  - Cross-platform translation synchronization

#### Daily Reading Guides
- **guide/**: Structured daily Bible reading plans
  - **guide-list/**: Daily reading guide with 3-passage system (Old Testament, Gospels, Epistles)
  - **guide-month-list/**: Monthly reading guide navigation
  - Date-based reading recommendations
  - Progress tracking and guided reading experience

#### Verse Highlighting & Bookmarking
- **saved/**: Comprehensive verse saving system with filtering
  - Multi-color highlighting with 5 color options (yellow, green, blue, purple, bookmark)
  - Bookmark functionality for verse tracking
  - Advanced filtering by type (highlight/bookmark) and color
  - Cross-platform reactive updates using WatermelonDB
- **read/modals/saver/**: Verse selection and saving interface
  - Color picker for highlight selection
  - Bookmark toggle functionality  
  - Copy verse functionality
  - Real-time state updates across selected verses

#### Navigation & Passage Selection
- **read/modals/passage/**: Bible navigation system
  - **passage-bible/**: Book and chapter selection interface
  - **passage-chapter/**: Chapter navigation within books
  - **passage-guide/**: Guide-based passage selection
  - Search functionality for quick passage lookup

#### Home Dashboard
- **home/**: Welcome screen and daily reading entry point
  - **passage-card**: Today's reading guide display
  - **new-user-card**: Onboarding for first-time users
  - **app-download** (web): Mobile app promotion
  - **footer-credits** (web): Attribution and credits

#### Shared Components
- **[shared]/**: Reusable components across features
  - **shared-passage-list/**: Book and chapter listing components
  - **shared-translate-list/**: Bible translation management
  - **shared-passage-search-input**: Passage search functionality

### Platform-Specific Files
- Mobile: `*.mobile.tsx` (React Native specific)
- Web: `*.web.tsx` (Next.js/React DOM specific)
- Universal: `*.tsx` (works on both platforms)

## Important Configuration

### Metro Config (apps/mobile/metro.config.js)
- Configured for monorepo with `watchFolders: [path.resolve(__dirname, '../..')]`
- NativeWind integration with CSS input
- Sentry integration for error tracking

### Next.js Config (apps/web/next.config.mjs)
- PWA support with next-pwa
- MDX support for documentation pages
- Security headers (CSP, HSTS)
- PostHog analytics proxy
- React Native Web transpilation

### Environment Variables
Mobile (`.env.example`):
- `EXPO_PUBLIC_POSTHOG_KEY` - Analytics tracking
- `SENTRY_*` - Error tracking configuration

Web (`.env.local.example`):
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` - Backend API
- `REVALIDATE_KEY` - API revalidation

## Build & Deployment

### Turborepo Configuration
- Global dependencies track `.env.*local` files
- Build task has proper dependency graph (`dependsOn: ["^build"]`)
- Dev tasks marked as persistent and non-cached
- Output caching configured for `.next/**` (excluding cache)

### Key Build Notes
- Mobile uses Expo's build system with EAS
- Both apps version together (currently 2.5.0)
- Project uses pnpm workspaces for monorepo management

## Testing & Code Quality

### Linting
- ESLint with platform-specific configs
- Mobile: `eslint-config-expo` with TypeScript adjustments
- Web: `eslint-config-next` with Prettier integration
- Shared: Common rules across packages

### Git Hooks (Husky)
- Pre-commit: Runs `lint-staged` on all staged files
- Formatting: Prettier with Tailwind class sorting

## Data Management

### WatermelonDB (Cross-platform)
- Reactive database layer for verse highlighting and bookmarking
- Models: `SavedVerseModel` with support for highlights (with colors) and bookmarks
- Database schema and migrations in `packages/app/database/`
- Contexts for reactive state management in `packages/app/features/saved/contexts/`

### Mobile (SQLite)
- Expo SQLite for local storage
- Database operations in `packages/app/features/read/local-databases/mobile/`
- Stores downloaded Bible translations for offline reading

### Web (Dexie + Supabase)
- Dexie.js for IndexedDB abstraction to store downloaded Bible data
- Supabase for backend API and content delivery
- Rate limiting utilities in `apps/web/utils/rate-limit.ts`

## Common Development Tasks

When adding new features:
1. Create components in `packages/app/features/[feature]/components/`
2. Add contexts/stores in `packages/app/features/[feature]/contexts/`
3. Implement platform-specific modals if needed
4. Add shared types in `packages/app/types/`
5. For database features, add models to `packages/app/database/models/`
6. Update database schema and migrations in `packages/app/database/`
7. Export from appropriate index files (but not main `packages/app/index.ts`)

When working with saved verses:
1. Use `SavedVersesProvider` for reactive state management
2. Access through `useSavedVersesContext` for state and `useSavedVersesActionContext` for actions
3. Highlight colors defined in `packages/app/utils/constants.ts`
4. Database operations are batched and reactive across components

When adding new shared utilities:
1. Add to `packages/app/utils/` or `packages/app/hooks/`
2. Create platform-specific implementations if needed
3. Update TypeScript configurations if adding new paths