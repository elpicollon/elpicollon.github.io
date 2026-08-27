# Developer & Agent Guidelines

This document establishes the architecture, design system conventions, code quality standards, and development rules for this repository. All code edits, refactors, feature additions, and AI agent actions must strictly adhere to these guidelines.

---

## 1. Visual & Design System Integrity (Tactile CRT Hybrid Aesthetic)

The portfolio blends a modern digital product design aesthetic with tactile, mechanical hardware controls and subtle CRT retro-futuristic nuances (scanlines, subtle noise, LED indicators, and beveled cuts).

### 1.1 UI Metaphors & Copywriting

* **No Television / Broadcast Metaphors in Copy**: Strictly avoid television broadcasting labels in user-facing UI text.
  * **Prohibited**: `CH 03`, `Canais`, `Channels`, `Tune in`, `Sintonize`, `TV Guide`, `Broadcasting`.
  * **Allowed / Standard**: `Home`, `Início`, `Projetos`, `Sitemap`, `Navegação`, `Guia`, `Sobre Rodrigo`, `Product Design AI-First`.

### 1.2 Physical & Mechanical Controls

* **Tactile Language Switcher**: The language toggle must be a physical sliding switch (`.lang-switch`) with an animated indicator block highlighting the active language (`PT` vs `EN`). Never replace it with plain text links or standard flat dropdowns.
* **Beveled / Chamfered Geometry**: Interactive components (buttons, badges, toggle frames, card borders, guide overlays) should use geometrical polygon bevel cuts (`clip-path: polygon(...)`, `--cut`, `.btn-bevel`, `.guide-btn`, `.nav-btn`) rather than generic `border-radius`.
* **Hardware Details**: Subtle tactile details like LED status lights (`.led-online`), scanline overlays, and monospace telemetry readouts reinforce the physical console feel.

### 1.3 Project-Specific Dynamic Theming

* Each case study dynamically drives its accent color via `ProjectThemeProvider` and semantic CSS variables (`--color-primary`, `--green`):
  * `transcricoes` (`#0D9488` / Teal)
  * `notetaker` (`#6BBF80` / Neon Sage Green)
  * `medical` (`#0B73D9` / Electric Blue)
  * `importacao` (`#02376D` / Deep Navy & Emerald)
* Always use CSS variables (`var(--color-primary)`, `var(--green)`, `var(--ink)`, `var(--muted)`) rather than hardcoding hex codes.

### 1.4 Typography & Fonts

* **Display Font**: `Schibsted Grotesk` (Headings, hero titles, major calls to action).
* **Body Font**: `Hanken Grotesk` (Case study copy, descriptions, narrative text).
* **Monospace Font**: `IBM Plex Mono` (Tags, step counters, dates, technical metrics, readouts).

---

## 2. Architecture & Modular Case Study Structure

The codebase is organized modularly to prevent duplication and maximize consistency:

### 2.1 Directory Layout

* `src/components/crt/`: Tactile TopBar navigation, `HomeChannel`, `Guide` (sitemap overlay), `PicoloTV` shell, and channel routing definitions (`channels.ts`).
* `src/components/layout/`: `ProjectLayout.tsx` — Standard layout wrapper for all case study pages (injects theme context, hero section, container, copyright, adjacent project navigation, and contact section).
* `src/components/projects/`: Individual case study pages (`IANotetakerApp.tsx`, `MedicalOffice.tsx`, `ImportacaoEmpresas.tsx`, `TranscricoesInsightsIA.tsx`).
* `src/components/projects/shared/`: Reusable, standardized case study components:
  * `ProjectHeroSection`: Project title, subtitle breakdown, tags, and responsive hardware mockups (`RealisticMacBook`, `RealisticIphone`, or dual layout).
  * `ProjectOverviewSection`: Section 01 — Overview, Objective, and Challenge.
  * `ProjectCardGridSection`: Modular card grids for Role, Results/Impact, Lessons Learned, Tools, etc.
  * `ProjectPrototypeSection`: Section 03 — Interactive prototype views with tabbed navigation and responsive device frames.
  * `ProjectHandoffSection`: Design-Dev Handoff workflows, visual media (GIFs/WebP), and engineering collaboration bullets.
  * `ProjectProcessSection` & `ProjectProductVisionSection`: Research processes, discovery pillars, and product vision statements.
  * `ProjectCopyrightSection` & `NextProjectSection`: Footer navigation and legal copyright notes.
* `src/components/pages/`: Main secondary pages (e.g., `AboutPage.tsx`).
* `src/components/ui/`: Atomic primitives, buttons, modals, carousel, and particle background.
* `src/contexts/`: `LanguageContext`, `ProjectThemeContext`, `ContactModalContext`.
* `src/hooks/`: `useProjectPageData`, `useAboutPageData`, `useAppNavigation`, `useTranslation`, `useTypewriter`.
* `src/locales/`: Bilingual dictionaries (`pt-BR.json`, `en-US.json`).

### 2.2 Case Study Standardization

* Never reinvent or duplicate section layouts inside project files.
* Always assemble case studies using the modular shared components in `src/components/projects/shared/`.
* Maintain comprehensive `FALLBACK_DATA` objects in each project file to ensure resilient fallback rendering and SSR/prerendering stability.

---

## 3. Internationalization (i18n) Rules

* **Full Bilingual Parity**: Every piece of user-facing text must be available in both Brazilian Portuguese (`pt-BR`) and English (`en-US`).
* **Synchronized Locales**: When adding or updating strings in `src/locales/pt-BR.json`, immediately make the equivalent update in `src/locales/en-US.json`.
* **Data Hydration via Hooks**:
  * Use `useProjectPageData` to hydrate case studies from the locale files while preserving prototype images and fallback structures.
  * Use `useTranslation` or `useLanguage` for UI labels and contextual strings.

---

## 4. Code Quality, Styling & Development Standards

### 4.1 Strict Prohibition of Inline CSS

* **No Inline Styles**: Never use inline CSS (`style={{ ... }}`) for static styling (colors, padding, font-size, layout margins, borders, shadows).
* **Allowed Exceptions Only**: Dynamically calculated runtime values (e.g., CSS custom property overrides like `--color-primary`, Framer Motion layout positions, or HTML Canvas dimensions).
* **Styling Source of Truth**: Use Tailwind CSS utility classes or centralized semantic rules in `src/index.css`.

### 4.2 Clean File Hygiene & No Redundant Files

* **No Duplicate or Temporary Files**: Do NOT generate copies or throwaway files (e.g., `Guidelines copy.md`, `temp.tsx`, duplicate context files). Always edit existing files in-place.
* **No Markdown Artifact Spoilage**: Do not generate unrequested markdown task/status files in the root or documentation folders unless explicitly instructed.

### 4.3 Responsive Design & Mobile Usability

* **Mobile-First Responsiveness**: Every component must look pristine across mobile (<768px), tablet (768px–1024px), and desktop (>1024px).
* **Persistent Header Controls**: The TopBar navigation header, the **Guide / Sitemap** button, and the **Language Switcher** must remain fully functional and visible across all screen sizes.

### 4.4 Type Safety & Code Integrity

* Maintain strict TypeScript types across props, hooks, and context providers.
* Preserve existing comments, docstrings, and architectural rationale.
* Avoid quick hacks or workarounds ("gambiarras"); favor clean refactoring and solid engineering best practices.
