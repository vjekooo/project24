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

interface FetchMethods<T, R> {
  get: () => Promise<R>
  post: (body: T) => Promise<R>
}

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null
  }
  return null
}

export const $fetch: Fetch = (url: string) => {
  const apiDomain = import.meta.env.VITE_API_DOMAIN
  const completeUrl = apiDomain + url
  return {
    get: () =>
      fetch(completeUrl, headers())
        .then((res) => res.json())
        .catch((err) => console.error('GET error:', err)),
    post: (body) =>
      fetch(completeUrl, {
        method: 'POST',
        ...headers(),
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .catch((err) => console.error('POST error:', err)),
  }
}
