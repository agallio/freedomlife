# freedomlife-web

This directory is to handle the web version.

## ⚙️ Requirements

| Technology | Version              |
| ---------- | -------------------- |
| node       | LTS (18 recommended) |
| yarn       | 4.1 or Higher        |

## 📦 Included Packages

| Included Packages                                                               |
| ------------------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/)                                                  |
| [React Native Web](https://necolas.github.io/react-native-web/)                 |
| [TypeScript](https://www.typescriptlang.org/)                                   |
| [Solito](https://solito.dev)                                                    |
| [TailwindCSS](https://tailwindcss.com/) + [NativeWind](https://nativewind.dev/) |
| [Moti](https://moti.fyi/)                                                       |
| [Supabase](https://www.supabase.io/)                                            |
| [Dexie.js](https://dexie.org/)                                                  |
| [Workbox](https://developers.google.com/web/tools/workbox)                      |

## 🗂 Folder Layout

- `apps/web`: web entrypoint. It contains all of the pages entrypoint and backend API routes.

- `packages`: shared packages that used across apps (web + native)
  - `app`: most of the code are inside this folder. We organize all the code according to their features and uses.

## 🏁 Start The App

### Environment Variables

**First, clone this repository,**, go to `apps/web` directory, and you need to make an environment variable file, or just copy the environment variables example using this command below.

```bash
# copy the .env.example into .env file
$ cp .env.local.example .env.local
```

After that you need some API keys. For that, you can contact me (see contact links in the root README).

### Running The Project

After you get the API keys you can follow these steps below.

- Install dependencies from the root directory: `yarn`
- Go to `apps/web`
- Run `yarn dev`
