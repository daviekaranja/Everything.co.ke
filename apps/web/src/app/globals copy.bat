@import "tailwindcss";

@theme {
  /* --- 1. Font Configuration (Next.js Compatible) --- */
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  /* --- 2. Brand Colors --- */
  --color-brand-dark: #0f172a;
  --color-brand-bg: #f8fafc;
  --color-card-bg: #ffffff;
  --color-card-border: var(--color-slate-100);
  --color-text-main: var(--color-slate-900);
  --color-text-muted: var(--color-slate-500);
  --color-text-header: var(--color-slate-400);

  --color-accent: var(--color-orange-500);
  --color-accent-hover: var(--color-orange-600);
  --color-accent-soft: var(--color-orange-100);
  --color-accent-text: var(--color-orange-700);

  /* --- 3. Fluid Typography (Zero Media Queries Needed) --- */
  /* h1: 32px -> 56px */
  --text-h1: clamp(2rem, 5vw, 3.5rem);
  --text-h1--font-weight: 800;
  --text-h1--letter-spacing: -0.04em;
  --text-h1--line-height: 1.1;

  /* h2: 24px -> 40px */
  --text-h2: clamp(1.5rem, 4vw, 2.5rem);
  --text-h2--font-weight: 700;
  --text-h2--letter-spacing: -0.02em;
  --text-h2--line-height: 1.2;

  /* h3: 20px -> 28px */
  --text-h3: clamp(1.25rem, 3vw, 1.75rem);
  --text-h3--font-weight: 600;

  /* Body text */
  --text-base: 1rem;
  --text-base--line-height: 1.6;
}

/* --- 4. Dark Mode Variable Overrides --- */
@variant dark (&:where(.dark, [data-theme="dark"], @media (prefers-color-scheme: dark)));

.dark {
  --color-brand-dark: #020617;
  --color-brand-bg: #0f172a;
  --color-card-bg: #1e293b;
  --color-card-border: #334155;
  --color-text-main: #f1f5f9;
  --color-text-muted: #94a3b8;
  --color-text-header: #cbd5e1;
  --color-accent-soft: rgba(251, 146, 60, 0.15);
  --color-accent-text: var(--color-orange-400);
}

/* --- 5. Base Styles (Global Reset) --- */
@layer base {
  html {
    @apply scroll-smooth antialiased;
    font-feature-settings:
      "cv02", "cv03", "cv04", "tnum"; /* Inter-specific legibility */
  }

  body {
    @apply bg-brand-bg text-text-main font-sans min-h-screen;
  }

  h1 {
    @apply text-h1 mb-6;
  }
  h2 {
    @apply text-h2 mb-4;
  }
  h3 {
    @apply text-h3 mb-3;
  }

  p {
    @apply text-base text-text-muted mb-4;
  }
}

/* --- 6. Robust Utilities --- */

@utility container-center {
  @apply mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8;
}

@utility service-card {
  @apply bg-card-bg border border-card-border p-6 rounded-2xl
         hover:border-accent/50 hover:shadow-xl hover:shadow-orange-500/5
         transition-all duration-300 flex flex-col h-full cursor-pointer;
}

@utility badge-provider {
  /* Refined for Inter: wider tracking looks better on tiny caps */
  @apply bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400
         text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider;
}

@utility search-input {
  @apply w-full p-4 pl-12 bg-white dark:bg-slate-900
         border border-slate-200 dark:border-slate-800
         rounded-2xl shadow-sm focus:ring-2 focus:ring-accent focus:border-accent
         outline-none text-text-main transition-all;
}

@utility highlight-mark {
  @apply bg-accent-soft text-accent-text font-semibold rounded-md px-1.5 py-0.5;
}

@utility no-scrollbar {
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
