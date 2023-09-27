# freedomlife-app

This directory is to handle iOS & Android.

## ⚙️ Requirements

| Technology | Version              |
| ---------- | -------------------- |
| node       | LTS (16 recommended) |
| yarn       | 3.14 or Higher       |

## 🔦 About

Coming from the [Solito](https://solito.dev)'s blank starter boilerplate.

## 📦 Included Packages

| Included Packages                                  |
| -------------------------------------------------- |
| [Expo](https://expo.dev) SDK 49                    |
| [Solito](https://solito.dev) (routing)             |
| [Moti](https://moti.fyi/) (animations)             |
| [Dripsy](https://dripsy.xyz/) (theming/styling)    |
| [React Navigation 6](https://reactnavigation.org/) |
| [React Query](https://tanstack.com/query/latest)   |

And other smaller packages that is used to smoothen the UX.

## 🗂 Folder Layout

- `apps/expo` entry points for the mobile app

- `packages` shared packages across apps
  - `app` you'll be importing most files from `app/`
    - `components`
    - `features` (don't use a `screens` folder. organize by feature.)
    - `provider` (all the providers that wrap the app, and some no-ops for Web.)
    - `navigation` Next.js has a `pages/` folder. React Native doesn't. This folder contains navigation-related code for RN. You may use it for any navigation code, such as custom links.
    - `fonts` (all the custom font files needed for the mobile app)
    - `utils` (all utility functions)

## 🏁 Start The App

- Install dependencies from the root directory: `yarn`

- Expo local dev:
  - First, build a dev client onto your device or simulator
    - `cd apps/expo`
    - Then, either `npx expo run:ios`, or `eas build`
  - After building the dev client, from the root of the monorepo...
    - `yarn native` (This runs `expo start --dev-client`)

## 🆕 Add New Dependencies

### Pure JS dependencies

If you're installing a JavaScript-only dependency that will be used across platforms, install it in `packages/app`:

```sh
cd packages/app
yarn add date-fns
cd ../..
yarn
```

### Native dependencies

If you're installing a library with any native code, you must install it in `apps/expo`:

```sh
cd apps/expo
yarn add react-native-reanimated

cd ../..
yarn
```

You can also install the native library inside of `packages/app` if you want to get autoimport for that package inside of the `app` folder. However, you need to be careful and install the _exact_ same version in both packages. If the versions mismatch at all, you'll potentially get terrible bugs. This is a classic monorepo issue. I use `lerna-update-wizard` to help with this (you don't need to use Lerna to use that lib).
