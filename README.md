# ToolBo

Persian RTL toolbox rebuilt with React, Next.js, Tailwind CSS, and shadcn/ui.

## Development

```sh
npm install
npm run dev
```

The app runs at:

```sh
http://localhost:3009
```

## Interface

The responsive Persian interface uses locally hosted Vazirmatn fonts, a forest-green and lime palette, and light/dark themes. Shared design tokens and discovery layouts live in `src/app/globals.css`; calculator, conversion, calendar, and result layouts live in `src/app/tool-workspace.css`.

Search tools with `⌘K` / `Ctrl+K`, use the category filters, or save favorites for quick access. Existing tool URLs and browser storage keys are preserved.

## Build

```sh
npm run build
```
