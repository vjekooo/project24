import { Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'

import { Store } from '~/types'
import { getApiDomain } from '~/lib/getApiDomain'
import { headers } from '~/utils/headers'
import { Home } from '~/domain/Home'

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
      <Home stores={stores() || []} />
    </main>
  )
}
