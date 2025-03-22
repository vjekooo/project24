import { getApiDomain } from '../lib/getApiDomain'

const originalFetch = window.fetch

const TOKEN_EXPIRED = 'Token expired'

window.fetch = async (...args) => {
  let [resource, config] = args

  const response = await originalFetch(resource, config)
  if (response.status === 401) {
    const responseText = await response.text()
    const message = JSON.parse(responseText).message
    if (message === TOKEN_EXPIRED) {
      window.location.reload()
    }
  }
  return response
}

const headers = () => {
  return {
    credentials: 'include' as RequestCredentials,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }
}

type Fetch = <TBody, TResponse>(url: string) => FetchMethods<TBody, TResponse>

export interface FetchData<R> {
  data?: R
  error?: Error
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

const onResponse = async (res: Response) => {
  if (res.ok) {
    return { data: await res.json() }
  }
  return res.json().then((data) => {
    throw new Error(data.message)
  })
}

// @ts-ignore
export const $fetch: Fetch = (url: string) => {
  const apiDomain = getApiDomain()
  const completeUrl = apiDomain + url
  return {
    get: async () => {
      try {
        const res = await fetch(completeUrl, headers())
        return await onResponse(res)
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
        return await onResponse(res)
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
        return await onResponse(res)
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
        return await onResponse(res)
      } catch (err) {
        return { err: err }
      }
    },
  }
}
