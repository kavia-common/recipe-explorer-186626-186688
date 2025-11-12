<template>
  <article class="card recipe-card" @click="$emit('open')">
    <div class="thumb" :style="{ backgroundImage: `url(${image || placeholder})` }" role="img" :aria-label="title" />
    <div class="content">
      <header class="title-row">
        <h3 class="title">{{ title }}</h3>
        <span class="badge" v-if="duration">{{ duration }} min</span>
      </header>
      <p class="desc" v-if="description">{{ description }}</p>
      <div class="meta">
        <span class="chip" v-for="(t, idx) in (tags || []).slice(0,3)" :key="idx">#{{ t }}</span>
      </div>
      <button class="btn btn-primary open-btn" @click.stop="$emit('open')">View Recipe</button>
    </div>
  </article>
</template>

<script setup lang="ts">
// PUBLIC_INTERFACE
/**
 * A card preview for a recipe.
 */
defineProps<{
  title: string
  description?: string
  image?: string
  duration?: number | string
  tags?: string[]
}>()

const placeholder =
  'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=1200&auto=format&fit=crop'
</script>

<style scoped>
.recipe-card {
  display: grid;
  grid-template-rows: 180px 1fr;
  overflow: hidden;
  transition: transform .18s ease, box-shadow .2s ease;
  cursor: pointer;
}
.recipe-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.thumb {
  background-size: cover;
  background-position: center;
  background-color: #e5e7eb;
}

.content {
  padding: 1rem;
  display: grid;
  gap: .5rem;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: .75rem;
}

.title {
  font-size: 1.05rem;
  margin: 0;
}

.badge {
  font-size: .8rem;
  background: color-mix(in oklab, var(--color-secondary), white 30%);
  color: #5a3c02;
  padding: .25rem .5rem;
  border-radius: 999px;
  white-space: nowrap;
}

.desc {
  color: color-mix(in oklab, var(--color-text), transparent 35%);
  margin: 0;
  min-height: 2.2em;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem;
}

.chip {
  font-size: .78rem;
  background: rgba(37, 99, 235, .08);
  color: var(--color-primary);
  padding: .25rem .5rem;
  border-radius: 999px;
}

.open-btn {
  margin-top: .25rem;
  justify-self: start;
}
</style>
