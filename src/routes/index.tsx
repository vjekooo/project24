import { Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import { HomePage } from '~/pages/HomePage'
import { Store } from '~/types'
import { getApiDomain } from '~/lib/getApiDomain'

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

const url = 'store/all'

const getStores = query(async () => {
  const fullUrl = getApiDomain() + url
  const response = await fetch(fullUrl, headers())
  return (await response.json()) as Store[]
}, 'stores')

export const route = {
  preload: () => getStores(),
}

export default function Page() {
  const stores = createAsync(() => getStores())

  return (
    <main>
      <Title>Local Link - Home Page</Title>
      <HomePage stores={stores() || []} />
    </main>
  )
}
