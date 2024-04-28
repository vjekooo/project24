const config = (method = 'GET') => ({
  method,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

interface Fetch {
  get: () => Promise<Response>
  post: () => Promise<Response>
}

export const $fetch = (url: string, body: any): Fetch => {
  return {
    get: () => fetch(url, body),
    post: () =>
      fetch(url, {
        ...config('POST'),
        body: JSON.stringify(body),
      }),
  }
}
