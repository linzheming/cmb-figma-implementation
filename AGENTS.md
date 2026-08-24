# AGENTS.md

## Project

This is a standalone React + Vite + Tailwind implementation of a China Merchants Bank app prototype extracted from a Figma Make design.

Primary files:

- `src/main.tsx`: React entry point
- `src/app/App.tsx`: main app UI
- `src/styles/index.css`: global imports and responsive shell styles
- `public/manifest.webmanifest`: PWA manifest
- `public/service-worker.js`: production service worker
- `public/icons/`: PWA icons

## Package Manager

Use pnpm for all dependency and script commands.

```bash
pnpm install
pnpm dev
pnpm build
```

Do not add npm, yarn, or bun lockfiles. Keep `pnpm-lock.yaml` authoritative.

## Local Development

Desktop/local preview:

```bash
pnpm dev
```

Android phone on the same Wi-Fi:

```bash
pnpm dev:lan
```

Use the network URL printed by Vite, usually like:

```text
http://192.168.x.x:5173/
```

If the phone cannot connect, check that Windows Firewall allows Node.js/Vite on the private network.

## Build And Preview

Production build:

```bash
pnpm build
```

Deploy to Cloudflare Pages:

```bash
pnpm deploy
```

Cloudflare Pages project:

- Project: `cmb-figma-implementation`
- Default URL: `https://cmb-figma-implementation.pages.dev/`
- Custom domain: `https://cmb.wxlhc.top/`
- DNS record required if not already present: proxied CNAME `cmb` -> `cmb-figma-implementation.pages.dev`

Production preview:

```bash
pnpm preview
```

LAN production preview:

```bash
pnpm preview:lan
```

Always run `pnpm build` after changes that touch TypeScript, React, CSS, PWA files, or package metadata.

## PWA Notes

The app is configured as a PWA with:

- `display: fullscreen`
- Android icons at `192x192` and `512x512`
- a service worker registered only in production builds

Important Android behavior:

- Opening a normal browser URL cannot automatically hide the browser frame.
- A full no-browser-frame launch requires installing the app from Android Chrome.
- For a real PWA install, serve the production app from HTTPS. A LAN HTTP URL such as `http://192.168.x.x:5173/` is commonly installed as a normal shortcut, not a full PWA.
- After changing the manifest or icons, remove the old Android home-screen shortcut/app and install it again.

## UI Shell Behavior

The app intentionally behaves differently by viewport:

- Desktop: show the prototype inside a fixed 390x844 phone frame.
- Mobile or installed PWA: remove the phone frame, notch, shadow, and radius; fill the entire viewport using `100dvh`.

Keep this distinction when editing `src/app/App.tsx` or `src/styles/index.css`.

## Styling Guidance

- Prefer existing Tailwind utility patterns and inline style conventions already used in `src/app/App.tsx`.
- Keep mobile layouts full-screen and avoid adding desktop-only wrappers that affect installed PWA mode.
- Avoid changing the imported Tailwind and theme setup unless the build requires it.

## Dependency Notes

`tw-animate-css` is required by `src/styles/tailwind.css`. Keep it declared in `devDependencies`.

`pnpm-workspace.yaml` contains pnpm build-script allow rules for native packages:

- `@tailwindcss/oxide`
- `esbuild`

Do not remove these unless pnpm install/build behavior is verified afterward.
