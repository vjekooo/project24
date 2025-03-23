import { Title } from '@solidjs/meta'
import { createAsync, query, useParams } from '@solidjs/router'

import { Store } from '~/types'
import { getApiDomain } from '~/lib/getApiDomain'
import { SingleStorePage } from '~/pages/StorePage'
import { headers } from '~/utils/headers'

const url = 'store/'

interface Response {
  data?: Store
  error?: number
}

const getStore = query(async (id: string) => {
  const fullUrl = getApiDomain() + url + id
  const response = await fetch(fullUrl, headers())
  if (!response.ok) {
    return { error: response.status, data: undefined }
  }
  return { data: (await response.json()) as Store, error: undefined }
}, 'stores')

export default function StorePage() {
  const params = useParams()
  const response = createAsync<Response>(() => getStore(params.id as string))

  const store = response()?.data

  return (
    <main>
      <Title>Local Link - Store Page</Title>
      {store && <SingleStorePage store={store} />}
    </main>
  )
}
