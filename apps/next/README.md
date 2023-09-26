# freedomlife-web

This directory is to handle the web version.

## ⚙️ Requirements

| Technology | Version              |
| ---------- | -------------------- |
| node       | LTS (16 recommended) |
| yarn       | 3.14 or Higher       |

## 📦 Included Packages

| Included Packages                                          |
| ---------------------------------------------------------- |
| [Next.js](https://nextjs.org/)                             |
| [Preact](https://preactjs.com/)                            |
| [TypeScript](https://www.typescriptlang.org/)              |
| [TailwindCSS](https://tailwindcss.com/)                    |
| [Framer Motion](https://www.framer.com/motion/)            |
| [React Query](https://tanstack.com/query/latest)           |
| [Supabase](https://www.supabase.io/)                       |
| [Workbox](https://developers.google.com/web/tools/workbox) |
| [Vercel](https://vercel.com/)                              |

## 🗂 Folder Layout

- `apps/next` entry points for the web app

For the web app, it is fully built inside this `apps/next` directory. For now, we are not using any `react-native` component here. We adopt an incremental migration process, so this might be changed.

## 🏁 Start The App

### Environment Variables

**First, clone this repository,**, go to `apps/next` directory, and you need to make an environment variable file, or just copy the environment variables example using this command below.

```bash
# copy the .env.example into .env file
$ cp .env.example .env
```

After that you need some API keys. For that, you can contact me at the contact section below.

### Running The Project

After you get the API keys you can follow these steps below.

- Install dependencies from the root directory: `yarn`
- Run the app: `yarn web`
