<template>
  <div id="app" class="min-h-screen bg-app">
    <header class="app-header">
      <NuxtLink to="/" class="brand">
        <span class="brand-primary">Recipe</span><span class="brand-accent">Explorer</span>
      </NuxtLink>
      <nav class="nav">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
      </nav>
    </header>

    <main class="container">
      <NuxtPage />
    </main>

    <footer class="app-footer">
      <p>© {{ new Date().getFullYear() }} Recipe Explorer • Built with Nuxt</p>
    </footer>

    <NuxtRouteAnnouncer />
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * Root application shell applying Ocean Professional theme and layout.
 * Provides header, container, and footer wrappers for pages.
 */
</script>

<style>
:root {
  /* Ocean Professional Theme */
  --color-primary: #2563EB; /* Blue 600 */
  --color-secondary: #F59E0B; /* Amber 500 */
  --color-error: #EF4444; /* Red 500 */
  --color-text: #111827; /* Gray 900 */
  --color-bg: #f9fafb; /* Gray 50 */
  --color-surface: #ffffff;
  --gradient-start: rgba(59, 130, 246, 0.10); /* blue-500/10 */
  --gradient-end: #f9fafb;

  --radius-lg: 14px;
  --radius-md: 10px;
  --radius-sm: 8px;

  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 8px 24px rgba(17, 24, 39, 0.08);
  --shadow-lg: 0 16px 40px rgba(17, 24, 39, 0.12);

  --container-w: 1120px;
}

* { box-sizing: border-box; }

html, body, #__nuxt, #app {
  height: 100%;
}

body {
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
  color: var(--color-text);
  background: var(--color-bg);
}

.bg-app {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
}

/* Layout */
.container {
  width: 100%;
  max-width: var(--container-w);
  margin: 0 auto;
  padding: 1.25rem;
}

.app-header {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(8px);
  background: color-mix(in oklab, var(--color-surface) 75%, transparent);
  border-bottom: 1px solid color-mix(in oklab, var(--color-text) 10%, transparent);
}

.app-header .brand {
  display: inline-flex;
  align-items: center;
  gap: .4rem;
  padding: 1rem 1.25rem;
  border-radius: var(--radius-md);
  text-decoration: none;
  font-weight: 800;
  letter-spacing: .2px;
  transition: transform .2s ease, box-shadow .2s ease;
  box-shadow: var(--shadow-sm);
  margin: .5rem 1rem;
}

.brand-primary { color: var(--color-primary); }
.brand-accent { color: var(--color-secondary); }

.app-header .brand:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.nav {
  display: inline-flex;
  gap: .5rem;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  padding: .75rem 1rem;
  border-radius: var(--radius-sm);
  opacity: .85;
  transition: background .2s ease, opacity .2s ease;
}

.nav-link:hover { background: rgba(37, 99, 235, 0.08); opacity: 1; }

.app-footer {
  margin-top: 2rem;
  padding: 2rem 1rem 3rem;
  text-align: center;
  color: color-mix(in oklab, var(--color-text), transparent 35%);
}

/* Utility */
.card {
  background: var(--color-surface);
  border: 1px solid color-mix(in oklab, var(--color-text) 8%, transparent);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.btn {
  appearance: none;
  border: none;
  cursor: pointer;
  border-radius: 9999px;
  padding: .65rem 1rem;
  font-weight: 600;
  transition: transform .15s ease, box-shadow .2s ease, background .2s ease;
}

.btn-primary {
  background: var(--color-primary);
  color: white;
  box-shadow: 0 8px 18px rgba(37, 99, 235, 0.25);
}
.btn-primary:hover { transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0); }

.input {
  width: 100%;
  padding: .85rem 1rem;
  border-radius: 12px;
  border: 1px solid color-mix(in oklab, var(--color-text) 12%, transparent);
  background: #fff;
  box-shadow: inset 0 1px 0 rgba(255,255,255,.25);
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease, transform .06s ease;
}
.input:focus {
  border-color: color-mix(in oklab, var(--color-primary), white 40%);
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
}

/* Responsive */
@media (max-width: 768px) {
  .container { padding: 1rem; }
  .app-header { position: sticky; }
}
</style>
