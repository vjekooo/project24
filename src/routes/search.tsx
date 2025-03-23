import { Title } from '@solidjs/meta'
import { createAsync, query, useSearchParams } from '@solidjs/router'
import { ErrorBoundary, Suspense } from 'solid-js'

import { Search as SearchType } from '~/types'
import { getApiDomain } from '~/lib/getApiDomain'
import { headers } from '~/utils/headers'
import { Content } from '~/layout/Content'
import { Error } from '~/layout/Error'
import { Categories } from '~/domain/Categories'
import { Search } from '~/domain/Search'

const url = 'search?'

interface Response {
  data?: SearchType
  error?: number
}

const getSearch = query(async (query: Partial<URLSearchParams>) => {
  const queryString = new URLSearchParams(query as URLSearchParams).toString()
  const fullUrl = getApiDomain() + url + queryString
  const response = await fetch(fullUrl, headers())
  if (!response.ok) {
    return { error: response.status, data: undefined }
  }
  return { data: (await response.json()) as SearchType, error: undefined }
}, 'search')

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const response = createAsync<Response>(() => getSearch(searchParams))
  const search = () => response()?.data

  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback="Loading...">
        <main>
          <Title>Local Link - Category Page</Title>
          {search() && <Search search={search()} />}
          <Content>
            {response()?.error && <div>Error: {response()?.error}</div>}
          </Content>
        </main>
      </Suspense>
    </ErrorBoundary>
  )
}
