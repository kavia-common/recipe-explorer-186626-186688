import { useRuntimeConfig } from '#app'

type FetchOptions = Parameters<typeof $fetch>[1]

/**
 * PUBLIC_INTERFACE
 * Returns helper functions to call the backend API using the public runtime base URL.
 * Uses NUXT_PUBLIC_API_BASE if provided; falls back to NUXT_PUBLIC_BACKEND_URL.
 */
export function useApi() {
  const config = useRuntimeConfig()
  const base =
    (config.public as any).apiBase ||
    (config.public as any).backendUrl ||
    ''

  // PUBLIC_INTERFACE
  /** Build a full API URL for a path (handles leading slashes). */
  function url(path: string) {
    const cleanBase = base?.replace(/\/+$/, '') ?? ''
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${cleanBase}${cleanPath}`
  }

  // PUBLIC_INTERFACE
  /** Wrapper around $fetch that prefixes the API base and returns typed data. */
  async function apiFetch<T>(path: string, options?: FetchOptions): Promise<T> {
    const full = url(path)
    return await $fetch<T>(full, {
      ...options,
      headers: {
        ...(options?.headers || {}),
        'Content-Type': 'application/json',
      },
    })
  }

  return { url, apiFetch, base }
}

/**
 * PUBLIC_INTERFACE
 * Simple reactive store for recipes and search state.
 */
export function useRecipeStore() {
  const q = useState<string>('q', () => '')
  const recipes = useState<any[]>('recipes', () => [])
  const loading = useState<boolean>('loading', () => false)
  const error = useState<string | null>('error', () => null)

  return { q, recipes, loading, error }
}
