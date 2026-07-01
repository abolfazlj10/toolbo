# ToolBo Migration Review

## Existing Project

- Vue 3 app bootstrapped with Vite.
- Routing is handled by `vue-router` with one home route, nine category routes, and 45 tool routes.
- Styling is mostly hand-written CSS in `src/assets/base.css` and component-scoped Vue styles.
- Data for category navigation and the home page lives in `src/data/db.json`.
- The app is Persian and RTL-first, with local Persian fonts and icon fonts under `src/assets`.
- User preferences currently use `localStorage` for dark mode and favorite tools.

## Migration Direction

- Replace Vite and Vue with a React app on Next.js App Router.
- Use Tailwind CSS for layout and visual system.
- Use shadcn/ui primitives for common UI controls and surfaces.
- Keep the current route structure and Persian content where possible.
- Preserve local static assets in `public`.

## Commit Plan

1. Add this review and migration plan.
2. Scaffold the React/Next/Tailwind/shadcn foundation and remove Vite/Vue entry points.
3. Port the shared app shell: RTL layout, theme handling, navigation, search, favorites, home page, category pages.
4. Port the calculator and converter tools.
5. Run build/verification and commit final cleanup.
