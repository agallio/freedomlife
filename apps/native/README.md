# freedomlife-native

This directory is to handle the native version (iOS & Android).

## ⚙️ Requirements

| Technology | Version              |
| ---------- | -------------------- |
| node       | LTS (18 recommended) |
| yarn       | 1.22.19 or Higher    |

## 📦 Included Packages

| Included Packages                                                               |
| ------------------------------------------------------------------------------- |
| [Expo](https://expo.dev)                                                        |
| [React Native](https://reactnative.dev/)                                        |
| [TypeScript](https://www.typescriptlang.org/)                                   |
| [Solito](https://solito.dev)                                                    |
| [TailwindCSS](https://tailwindcss.com/) + [NativeWind](https://nativewind.dev/) |
| [Moti](https://moti.fyi/)                                                       |
| [SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite-next/)                |
| [Aptabase](https://aptabase.com/)                                               |

## 🗂 Folder Layout

- `apps/native`: expo entrypoint (iOS & Android). It contains all of the expo router layouts (stacks, tabs).

- `packages`: shared packages that used across apps (web + native)
  - `app`: most of the code are inside this folder. We organize all the code according to their features and uses.

## 🏁 Start The App

### Environment Variables

**First, clone this repository,**, go to `apps/native` directory, and you need to make an environment variable file, or just copy the environment variables example using this command below.

```bash
# copy the .env.example into .env file
$ cp .env.example .env
```

After that you need some API keys. For that, you can contact me (see contact links in the root README).

### Running The Project

After you get the API keys you can follow these steps below.

- Install dependencies from the root directory: `yarn`
- Go to `apps/native`
- Run `yarn ios` or `yarn android`.

Sometimes, NativeWind styles are not generated properly. If that happens, run `yarn run:ios` or `yarn run:android` to clear the cache and regenerate the styles.
