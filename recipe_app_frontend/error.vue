<template>
  <div class="container">
    <div class="card" style="padding: 1.25rem; margin-top: 2rem;">
      <h1 style="margin: 0 0 .5rem 0;">Something went wrong</h1>
      <p class="muted">{{ error?.message || 'Unknown error' }}</p>
      <NuxtLink class="btn btn-primary" to="/">Go Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * Global error boundary page for Nuxt errors/404s.
 */
const props = defineProps<{ error?: { url?: string; statusCode?: number; statusMessage?: string; message?: string } }>()
useHead({ title: props.error?.statusMessage || 'Error • Recipe Explorer' })
</script>

<style scoped>
.muted { color: color-mix(in oklab, var(--color-text), transparent 45%); }
</style>
