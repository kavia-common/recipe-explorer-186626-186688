<template>
  <section v-if="recipe" class="detail">
    <div class="header card">
      <div class="cover" :style="{ backgroundImage: `url(${recipe.image || placeholder})` }" />
      <div class="head-content">
        <NuxtLink to="/" class="back-link">← Back</NuxtLink>
        <h1 class="title">{{ recipe.title }}</h1>
        <div class="badges">
          <span class="badge" v-if="recipe.readyInMinutes">{{ recipe.readyInMinutes }} min</span>
          <span class="badge" v-for="(t, idx) in (recipe.tags || recipe.cuisines || [])" :key="idx">#{{ t }}</span>
        </div>
      </div>
    </div>

    <div class="body grid-cols">
      <article class="card main">
        <h2>Overview</h2>
        <p class="muted" v-if="recipe.summary">{{ recipe.summary }}</p>

        <div class="section" v-if="recipe.ingredients?.length">
          <h3>Ingredients</h3>
          <ul>
            <li v-for="(ing, idx) in recipe.ingredients" :key="idx">{{ ing }}</li>
          </ul>
        </div>

        <div class="section" v-if="recipe.instructions?.length">
          <h3>Instructions</h3>
          <ol>
            <li v-for="(step, idx) in recipe.instructions" :key="idx">{{ step }}</li>
          </ol>
        </div>
      </article>

      <aside class="card side">
        <h3>Details</h3>
        <ul class="mini">
          <li><strong>Servings:</strong> {{ recipe.servings || '—' }}</li>
          <li><strong>Difficulty:</strong> {{ recipe.difficulty || '—' }}</li>
          <li><strong>Cuisine:</strong> {{ (recipe.cuisines || recipe.tags || []).join(', ') || '—' }}</li>
        </ul>
        <button class="btn btn-primary">Start Cooking</button>
      </aside>
    </div>
  </section>

  <section v-else class="detail">
    <div class="card" style="padding: 1rem;">
      <p class="muted">Loading…</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useApi } from '~/composables/useApi'

const { params } = useRoute()
const id = params.id as string
const { apiFetch, base } = useApi()
const recipe = ref<any | null>(null)
const placeholder =
  'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=1200&auto=format&fit=crop'

/**
 * Load individual recipe by ID; fallback to mocked data if API base is missing.
 */
async function load() {
  try {
    if (base) {
      recipe.value = await apiFetch<any>(`/recipes/${encodeURIComponent(id)}`)
    } else {
      const r = SAMPLE_RECIPES.find((x) => String(x.id) === String(id))
      recipe.value = r || null
    }
  } catch (e) {
    console.error(e)
    recipe.value = null
  }
}

onMounted(load)

const SAMPLE_RECIPES = [
  {
    id: '1',
    title: 'Lemon Herb Chicken',
    summary: 'Zesty, juicy chicken with fresh herbs and a splash of lemon.',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1200&auto=format&fit=crop',
    readyInMinutes: 35,
    tags: ['chicken', 'herb', 'dinner'],
    servings: 2,
    difficulty: 'Easy',
    ingredients: ['2 chicken breasts', '1 lemon', 'Fresh herbs', 'Salt', 'Pepper', 'Olive oil'],
    instructions: [
      'Season chicken with salt, pepper, and herbs.',
      'Sear in olive oil until golden.',
      'Add lemon juice and finish cooking.',
    ],
  },
  {
    id: '2',
    title: 'Pasta Primavera',
    summary: 'A vibrant mix of seasonal veggies tossed with al dente pasta.',
    image:
      'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=1200&auto=format&fit=crop',
    readyInMinutes: 25,
    tags: ['pasta', 'vegetarian', 'italian'],
    servings: 3,
    difficulty: 'Medium',
    ingredients: ['Pasta', 'Mixed vegetables', 'Garlic', 'Olive oil', 'Parmesan', 'Basil'],
    instructions: [
      'Cook pasta until al dente.',
      'Sauté vegetables and garlic.',
      'Toss with pasta and top with parmesan and basil.',
    ],
  },
  {
    id: '3',
    title: 'Avocado Toast Deluxe',
    summary: 'Creamy avocado, microgreens, and a drizzle of chili oil.',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    readyInMinutes: 10,
    tags: ['breakfast', 'quick', 'toast'],
    servings: 1-2,
    difficulty: 'Easy',
    ingredients: ['Sourdough bread', 'Avocado', 'Chili oil', 'Microgreens', 'Salt'],
    instructions: [
      'Toast bread.',
      'Mash avocado and spread.',
      'Drizzle chili oil and top with microgreens and salt.',
    ],
  },
]
</script>

<style scoped>
.detail {
  display: grid;
  gap: 1.25rem;
}

.header {
  overflow: hidden;
}

.cover {
  width: 100%;
  height: min(38vh, 320px);
  background-size: cover;
  background-position: center;
}

.head-content {
  padding: 1rem 1rem 1.25rem;
}

.back-link {
  text-decoration: none;
  color: var(--color-primary);
  font-weight: 600;
}

.title {
  margin: .35rem 0 .5rem 0;
  font-size: clamp(1.35rem, 2vw + 1rem, 1.8rem);
}

.badges {
  display: flex;
  flex-wrap: wrap;
  gap: .35rem;
}

.badge {
  font-size: .8rem;
  background: rgba(37, 99, 235, .08);
  color: var(--color-primary);
  padding: .25rem .5rem;
  border-radius: 999px;
}

.grid-cols {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.main { padding: 1rem; }
.side { padding: 1rem; }

.section { margin-top: 1rem; }
.section h3 { margin: 0 0 .4rem 0; }

ul, ol {
  padding-left: 1.1rem;
}

.mini {
  list-style: none;
  padding-left: 0;
}
.mini li { margin: .35rem 0; }
</style>
