import { Title } from '@solidjs/meta'
import { createAsync, query, RouteDefinition, useParams } from '@solidjs/router'
import { createEffect, createSignal, ErrorBoundary, Suspense } from 'solid-js'

import { Store } from '~/types'
import { getApiDomain } from '~/lib/getApiDomain'
import { headers } from '~/utils/headers'
import { StoreDetails } from '~/domain/StoreDetails'
import { Content } from '~/layout/Content'
import { Error } from '~/layout/Error'

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
}, 'store')

export const route = {
  preload: ({ params }) => getStore(params.id),
} satisfies RouteDefinition

export default function StorePage() {
  const params = useParams()
  const [currentId, setCurrentId] = createSignal(params.id as string)

  createEffect(() => {
    if (params.id !== currentId()) {
      setCurrentId(params.id as string)
    }
  })

  const response = createAsync<Response>(() => getStore(currentId()))
  const store = () => response()?.data

  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback="Loading...">
        <main>
          <Title>Local Link - Store Page</Title>
          {store() && <StoreDetails store={store() as Store} />}
          <Content>
            {response()?.error && <div>Error: {response()?.error}</div>}
          </Content>
        </main>
      </Suspense>
    </ErrorBoundary>
  )
}
