const headers = () => {
  const token = localStorage.getItem('token')
  const authHeader = token ? { Authorization: `Bearer ${token}` } : ''
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...authHeader,
    },
  }
}

type Fetch = <TBody, TResponse>(url: string) => FetchMethods<TBody, TResponse>

interface FetchData<R> {
  data: R
  error?: Error
}

interface Error {
  error: string
}

interface FetchMethods<T, R> {
  get: () => Promise<FetchData<R>>
  post: (body: T) => Promise<FetchData<R>>
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

// @ts-ignore
export const $fetch: Fetch = (url: string) => {
  const apiDomain = import.meta.env.VITE_API_DOMAIN
  const completeUrl = apiDomain + url
  return {
    get: async () => {
      try {
        const res = await fetch(completeUrl, headers())
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.message)
        }
        return { data: await res.json() }
      } catch (err) {
        return { err: err }
      }
    },
    post: async (body) => {
      try {
        const res = await fetch(completeUrl, {
          method: 'POST',
          ...headers(),
          body: JSON.stringify(body),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.message)
        }
        return { data: await res.json() }
      } catch (err) {
        return { error: err }
      }
    },
  }
}
