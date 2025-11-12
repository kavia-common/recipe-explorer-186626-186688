<template>
  <section class="home">
    <div class="hero card">
      <div class="hero-inner">
        <div class="hero-text">
          <h1 class="h-title">Discover delicious recipes</h1>
          <p class="h-sub">Browse and search meals with an elegant, modern interface.</p>
          <form class="search" @submit.prevent="onSearch">
            <input
              v-model="store.q.value"
              class="input"
              type="search"
              placeholder="Search recipes, ingredients..."
              aria-label="Search recipes"
            />
            <button class="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>

    <div class="results-head">
      <h2 class="results-title">Recipes</h2>
      <span v-if="store.loading.value" class="muted">Loading…</span>
      <span v-else-if="store.error.value" class="error">{{ store.error.value }}</span>
      <span v-else class="muted">{{ store.recipes.value.length }} found</span>
    </div>

    <div class="grid">
      <RecipeCard
        v-for="r in store.recipes.value"
        :key="r.id"
        :title="r.title"
        :description="r.summary"
        :image="r.image"
        :duration="r.readyInMinutes"
        :tags="r.tags || r.cuisines || []"
        @open="goTo(r.id)"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import RecipeCard from '~/components/RecipeCard.vue'
import { useApi, useRecipeStore } from '~/composables/useApi'

const { apiFetch, base } = useApi()
const store = useRecipeStore()

/**
 * Load initial recipes on page enter; if API base is not configured, use sample data.
 */
const route = useRoute()
const router = useRouter()

async function fetchRecipes(query?: string) {
  store.loading.value = true
  store.error.value = null
  try {
    let data: any[] = []
    if (base) {
      const path = query ? `/recipes?search=${encodeURIComponent(query)}` : '/recipes'
      data = await apiFetch<any[]>(path)
    } else {
      // fallback demo data
      data = SAMPLE_RECIPES.filter((r) =>
        query ? (r.title + r.summary).toLowerCase().includes(query.toLowerCase()) : true
      )
    }
    store.recipes.value = data
  } catch (e: any) {
    console.error(e)
    store.error.value = 'Unable to load recipes.'
  } finally {
    store.loading.value = false
  }
}

// search handling
function onSearch() {
  fetchRecipes(store.q.value)
  // update query string without full reload
  router.replace({ query: { q: store.q.value || undefined } })
}

function goTo(id: string | number) {
  router.push(`/recipes/${id}`)
}

onMounted(() => {
  const q = (route.query.q as string) || ''
  store.q.value = q
  fetchRecipes(q)
})

const SAMPLE_RECIPES = [
  {
    id: '1',
    title: 'Lemon Herb Chicken',
    summary: 'Zesty, juicy chicken with fresh herbs and a splash of lemon.',
    image:
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1200&auto=format&fit=crop',
    readyInMinutes: 35,
    tags: ['chicken', 'herb', 'dinner'],
  },
  {
    id: '2',
    title: 'Pasta Primavera',
    summary: 'A vibrant mix of seasonal veggies tossed with al dente pasta.',
    image:
      'https://images.unsplash.com/photo-1523986371872-9d3ba2e2f642?q=80&w=1200&auto=format&fit=crop',
    readyInMinutes: 25,
    tags: ['pasta', 'vegetarian', 'italian'],
  },
  {
    id: '3',
    title: 'Avocado Toast Deluxe',
    summary: 'Creamy avocado, microgreens, and a drizzle of chili oil.',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop',
    readyInMinutes: 10,
    tags: ['breakfast', 'quick', 'toast'],
  },
]
</script>

<style scoped>
.home {
  display: grid;
  gap: 1.25rem;
}

.hero {
  padding: 1rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
}

.hero-inner {
  padding: 1.25rem;
}

.h-title {
  margin: .25rem 0 .35rem 0;
  font-size: clamp(1.4rem, 2.2vw + 1rem, 2rem);
}

.h-sub {
  margin: 0 0 1rem 0;
  color: color-mix(in oklab, var(--color-text), transparent 35%);
}

.search {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: .6rem;
  align-items: center;
  margin-top: .25rem;
}

.results-head {
  display: flex;
  align-items: baseline;
  gap: .75rem;
  margin-top: .25rem;
}

.results-title { margin: 0; font-size: 1.1rem; }

.muted { color: color-mix(in oklab, var(--color-text), transparent 45%); }
.error { color: var(--color-error); }

.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(12, 1fr);
}

.grid > * {
  grid-column: span 12;
}

@media (min-width: 520px) {
  .grid > * { grid-column: span 6; }
}
@media (min-width: 880px) {
  .grid > * { grid-column: span 4; }
}
@media (min-width: 1180px) {
  .grid > * { grid-column: span 3; }
}
</style>
