import { Title } from '@solidjs/meta'
import { createAsync, query } from '@solidjs/router'
import { ErrorBoundary, Suspense } from 'solid-js'

import { Category } from '~/types'
import { getApiDomain } from '~/lib/getApiDomain'
import { headers } from '~/utils/headers'
import { Content } from '~/layout/Content'
import { Error } from '~/layout/Error'
import { Categories } from '~/domain/Categories'

const url = 'category'

interface Response {
  data?: Category[]
  error?: number
}

const getCategories = query(async () => {
  const fullUrl = getApiDomain() + url
  const response = await fetch(fullUrl, headers())
  if (!response.ok) {
    return { error: response.status, data: undefined }
  }
  return { data: (await response.json()) as Category[], error: undefined }
}, 'category')

export default function CategoryPage() {
  const response = createAsync<Response>(() => getCategories())
  const categories = () => response()?.data

  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback="Loading...">
        <main>
          <Title>Local Link - Category Page</Title>
          {categories() && <Categories categories={categories()} />}
          <Content>
            {response()?.error && <div>Error: {response()?.error}</div>}
          </Content>
        </main>
      </Suspense>
    </ErrorBoundary>
  )
}
