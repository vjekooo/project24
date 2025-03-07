const originalFetch = window.fetch

const TOKEN_EXPIRED = 'Token expired'
const TOKEN_KEY = 'token'

window.fetch = async (...args) => {
  let [resource, config] = args
  const response = await originalFetch(resource, config)
  if (response.status === 401) {
    const responseText = await response.text()
    const message = JSON.parse(responseText).message
    if (message === TOKEN_EXPIRED && localStorage.getItem(TOKEN_KEY)) {
      localStorage.removeItem(TOKEN_KEY)
    }
  }
  return response
}

const headers = () => {
  const token = localStorage.getItem(TOKEN_KEY)
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

export interface FetchData<R> {
  data: R
  err?: Error
}

interface Error {
  message: string
}

interface FetchMethods<T, R> {
  get: () => Promise<FetchData<R>>
  post: (body: T) => Promise<FetchData<R>>
  put: (body: T) => Promise<FetchData<R>>
  patch: (body: T) => Promise<FetchData<R>>
  delete: () => Promise<FetchData<R>>
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

          throw { status: res.status, message: data.message }
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
    put: async (body) => {
      try {
        const res = await fetch(completeUrl, {
          method: 'PUT',
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
    delete: async () => {
      try {
        const res = await fetch(completeUrl, {
          method: 'DELETE',
          ...headers(),
        })
        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.message)
        }
        return { data: await res.json() }
      } catch (err) {
        return { err: err }
      }
    },
  }
}
