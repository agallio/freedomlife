# freedomlife-web

This directory is to handle the web version.

## ⚙️ Requirements

| Technology | Version           |
| ---------- | ----------------- |
| node       | LTS (>= 20)       |
| pnpm       | 10.23.0 or Higher |

## 📦 Included Packages

| Included Packages                                                               |
| ------------------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/)                                                  |
| [React Native Web](https://necolas.github.io/react-native-web/)                 |
| [TypeScript](https://www.typescriptlang.org/)                                   |
| [TailwindCSS](https://tailwindcss.com/) + [NativeWind](https://nativewind.dev/) |
| [Moti](https://moti.fyi/)                                                       |
| [Dexie.js](https://dexie.org/)                                                  |

## 🗂 Folder Layout

- `apps/web`: web entrypoint. It contains all of the pages entrypoint and backend API routes.
  - `databases/`: Local JSON files for Bible data and reading guides
  - `pages/api/`: API routes that serve data to the frontend
  - `utils/`: Utility functions including external API client

- `packages`: shared packages that used across apps (web + native)
  - `app`: most of the code are inside this folder. We organize all the code according to their features and uses.

## 🏗️ Data Sources

- **Local files** - TB Bible and 2025 reading guides
- **External API** - Other Bible translations

## 🏁 Start The App

### Environment Variables

**First, clone this repository**, go to `apps/web` directory, and create an environment variable file:

```bash
# copy the .env.example into .env file
$ cp .env.local.example .env.local
```

**Variables:**

- `HONO_API_URL` - External Bible API URL (optional, only for non-TB translations)
- `REVALIDATE_KEY` - API revalidation key (optional)

### Running The Project

- Install dependencies from the root directory: `pnpm`
- Go to `apps/web`
- Run `pnpm dev`
- Visit `http://localhost:2019`
