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
  get: <TResponse>() => Promise<TResponse>
  post: <TResponse>(body: any) => Promise<TResponse>
}

export const $fetch = <TResponse>(url: string) => {
  const apiDomain = import.meta.env.API_DOMAIN
  const completeUrl = apiDomain + url
  return {
    get: () => fetch(completeUrl) as Promise<TResponse>,
    post: <TBody extends BodyInit>(body: TBody) =>
      fetch(url, {
        ...config('POST'),
        body: JSON.stringify(body),
      }) as Promise<TResponse>,
  }
}
