# TaskFlow Client – Conventions

React 19 + TypeScript + Vite + Redux Toolkit. The developer is learning React:
when you refactor or add code, briefly explain WHY (which rule applied).

## Folder structure (feature-based)

```
src/
├── app/                # App.tsx, store.ts, hooks.ts, providers
├── api/                # shared HTTP client only (axios.ts with interceptors)
├── features/<name>/
│   ├── components/     # components used only by this feature (one folder each)
│   ├── pages/          # top-level screens (suffix: Page, e.g. ProjectsPage)
│   ├── hooks/          # custom hooks shared inside this feature
│   ├── <name>.api.ts   # API calls of this feature
│   ├── <name>Slice.ts
│   └── types.ts
├── components/
│   ├── ui/             # generic reusable pieces (Modal, Button, EmptyState)
│   └── layout/         # Sidebar, TopBar, page shell
├── styles/             # variables.css, global.css (the only global CSS)
├── config/
└── types/              # only types shared by 2+ features
```

Rules:
- `components/` must NEVER import from `features/`.
- A feature must not import another feature's internals; shared things move to `components/` or `types/`.
- Code used by one feature stays in that feature. Move it to `components/ui` only when a second feature needs it.

## Files & naming

- One component per file. File name = component name (PascalCase): `ProjectCard.tsx` exports `ProjectCard`.
- Every component gets its own folder containing its `.tsx` and `.module.css`
  (and its subcomponents or hook, if they're used only by it):

  ```
  features/projects/components/
  ├── ProjectCard/
  │   ├── ProjectCard.tsx
  │   └── ProjectCard.module.css
  ├── ProjectList/
  │   ├── ProjectList.tsx
  │   └── ProjectList.module.css
  └── CreateProjectModal/
      ├── CreateProjectModal.tsx
      └── CreateProjectModal.module.css
  ```

- Exception: a component with no styles of its own (e.g. a small wrapper) can be a single
  file without a folder.
- A hook used by only one component or page lives in that component's folder;
  a hook shared inside a feature goes to `features/<name>/hooks/`.
- Hooks: `useSomething.ts`. Slices: `<feature>Slice.ts`. Static data: `<Component>.data.ts`.
- Use the `@/` path alias (`@/features/projects/...`) instead of `../../../`.

## When to split a component

Soft limits (signal to review, not hard rules):
- Component file > ~150 lines, or JSX return > ~60 lines
- More than ~4 `useState` / more than 1 `useEffect`
- JSX nested more than ~4 levels deep

Split when ANY of these is true:
1. **Multiple UI states** – nested ternaries for loading / error / empty / data
   → extract each state (e.g. `EmptyState`, `ProjectList`) and use early returns.
2. **Repeated or list item markup** – `.map()` rendering more than ~5 lines of JSX
   → extract the item (`ProjectCard`).
3. **Logic mixed with rendering** – data fetching, permission checks, derived values
   → move into a custom hook (`useProjects`, `useCanCreateProject`).
4. **Distinct visual section** with its own heading or purpose
   → its own component (`ProjectsHeader`).
5. **Static data arrays** inside a component file (feature lists, steps)
   → move to a `<Component>.data.ts` file next to the component.

Do NOT split when:
- The piece is < ~10 lines of JSX and used once.
- Splitting would require passing more than ~5 props down (prop drilling) – rethink instead.

## Reusable base components (components/ui)

- Common UI patterns get ONE base component in `components/ui/`, and features build on top of it
  instead of re-implementing it.
- **Modal**: `components/ui/Modal/Modal.tsx` owns everything every modal shares:
  overlay, centering, close button, closing on Escape and the X button (NOT on overlay click), focus/scroll lock,
  and the `isOpen` / `onClose` / `title` / `children` / `footer` props.
  Feature modals (`CreateProjectModal`, `AuthModal`) only contain their own content and form logic
  and render it inside `<Modal>`. They must not have their own overlay or close logic.
- Other candidates when they repeat: `Button`, `Input`/`FormField`, `EmptyState`, `Spinner`, `Card`.
- Base components are generic: no Redux, no API calls, no feature-specific text.
  They are configured through props (`variant`, `size`, `children`).
- When you find 2+ components implementing the same pattern, propose extracting a base component.

## Styling

- Every component's styles live in its own CSS Module next to it:
  `ProjectCard.tsx` + `ProjectCard.module.css`, imported as `import styles from "./ProjectCard.module.css"`.
- A CSS class is styled in the CSS file of the component whose JSX renders that class.
  A parent must NOT style its child's elements (no `.project-list .project-card h3 { ... }`
  in the parent's CSS).
- Split of responsibility:
  - The **child** owns how it looks: colors, padding, borders, typography, its inner layout.
  - The **parent** owns where children are placed: the grid/flex container, `gap`, page sections.
- If a parent needs a child to look different, add a prop to the child (`variant="compact"`)
  instead of overriding the child's CSS from outside.
- When a component is extracted, its CSS rules move with it into its own `.module.css`.
- No inline `style={{...}}`, except for truly dynamic values (e.g. a width calculated at runtime).
- A component's styles must not be defined in another component's CSS file or in `App.css`.
- Global CSS only in `src/styles/`:
  - `variables.css` – colors, spacing, font sizes, radius, shadows as CSS variables (`--color-primary`)
  - `global.css` – reset, `body`, base typography
- Use CSS variables instead of hard-coded colors and sizes, so the look stays consistent.
- Base components expose variants through props (`<Button variant="primary">`), not by
  features overriding their CSS.

## Refactoring rules

- Behaviour and appearance must stay identical; refactors don't add features.
- Show a plan (moves, renames, splits + which rule) BEFORE editing.
- After changes, run `npm run build` and `npm run lint` and fix errors.
- Work one feature at a time.
