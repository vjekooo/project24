import { createSignal } from 'solid-js'

export enum RequestMethod {
  'POST' = 'POST',
  'PUT' = 'PUT',
  'DELETE' = 'DELETE',
}

export const useMultipart = async (
  url: string,
  formData: FormData,
  method = RequestMethod.POST
) => {
  const [data, setData] = createSignal<any>()
  const [error, setError] = createSignal<any>()

  const token = localStorage.getItem('token')
  const authHeader = token ? { Authorization: `Bearer ${token}` } : ''

  const headers = {
    'Access-Control-Allow-Origin': '*',
    ...authHeader,
  }

  const apiDomain = import.meta.env.VITE_API_DOMAIN
  const completeUrl = apiDomain + url

  try {
    const res = await fetch(completeUrl, {
      method: method,
      headers: {
        ...headers,
      },
      body: formData,
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.message)
    }
    setData(await res.json())
  } catch (err) {
    setError(err)
  }

  return { data: data(), error: error() }
}
