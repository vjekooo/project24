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
  post: (body: any) => Promise<Response>
}

export const $fetch = (url: string): Fetch => {
  return {
    get: () => fetch(url),
    post: (body: any) =>
      fetch(url, {
        ...config('POST'),
        body: JSON.stringify(body),
      }),
  }
}
