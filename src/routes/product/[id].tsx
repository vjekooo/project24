import { Title } from '@solidjs/meta'
import { createAsync, query, useParams } from '@solidjs/router'
import { createSignal, createEffect, ErrorBoundary, Suspense } from 'solid-js'

import { Product as ProductType } from '~/types'
import { getApiDomain } from '~/lib/getApiDomain'
import { headers } from '~/utils/headers'
import { Content } from '~/layout/Content'
import { ProductDetails } from '~/domain/ProductDetails'
import { Error } from '~/layout/Error'

const url = 'product/'

interface Response {
  data?: ProductType
  error?: number
}

const getProduct = query(async (id: string) => {
  const fullUrl = getApiDomain() + url + id
  const response = await fetch(fullUrl, headers())
  if (!response.ok) {
    return { error: response.status, data: undefined }
  }
  return { data: (await response.json()) as ProductType, error: undefined }
}, 'product')

export default function ProductPage() {
  const params = useParams()
  const [currentId, setCurrentId] = createSignal(params.id as string)

  createEffect(() => {
    if (params.id !== currentId()) {
      setCurrentId(params.id as string)
    }
  })

  const response = createAsync<Response>(() => getProduct(currentId()))

  const product = () => response()?.data

  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback="Loading...">
        <main>
          <Title>Local Link - Product Page</Title>
          {product() && <ProductDetails product={product()} />}
          <Content>
            {response()?.error && <div>Error: {response()?.error}</div>}
          </Content>
        </main>
      </Suspense>
    </ErrorBoundary>
  )
}
