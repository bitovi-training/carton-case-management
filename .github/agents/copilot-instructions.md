# carton-case-management Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-12-24

## Active Technologies

- TypeScript 5.x (via Node.js runtime in devcontainer) + React 18, Vite, tRPC, React Query, Shadcn UI, Tailwind CSS (002-header-menu-components)
- N/A (UI components only, no data persistence required) (002-header-menu-components)

- TypeScript 5.x / Node.js 22+ + React 18, tRPC 11, @tanstack/react-query 5, Vite 6, Prisma (ORM) (001-trpc-react-query)

## Project Structure

```text
src/
tests/
```

## Commands

npm test && npm run lint

## Code Style

TypeScript 5.x / Node.js 22+: Follow standard conventions

## Coding Standards

- When creating new React files ensure to follow the details specified in .github/prompts/modlet.prompt.md.
- No tsx or ts files should have inline comments.
- All styling should be done using Tailwind CSS classes in an external CSS file.
- Responsive designing should be implemented using Tailwind CSS utilities.
- **Always prioritize using Shadcn UI components over native HTML elements** (e.g., use Shadcn Select instead of `<select>`, Shadcn Input instead of `<input>`, etc.). Install new Shadcn components as needed using `npx shadcn@latest add [component-name]`.
- Shadcn components should be installed to `packages/client/src/ui/` directory and exported via `packages/client/src/ui/index.ts`.

## Recent Changes

- 002-header-menu-components: Added TypeScript 5.x (via Node.js runtime in devcontainer) + React 18, Vite, tRPC, React Query, Shadcn UI, Tailwind CSS

- 001-trpc-react-query: Added TypeScript 5.x / Node.js 22+ + React 18, tRPC 11, @tanstack/react-query 5, Vite 6, Prisma (ORM)

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
