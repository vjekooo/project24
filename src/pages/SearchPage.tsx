import { useSearchParams } from '@solidjs/router'
import { createEffect, createSignal } from 'solid-js'
import { Content } from '../layout/Content'
import { $fetch } from '../utils/fetch'
import { Stack } from '../ui/Stack'
import { SearchResponse } from '../types'
import { StoreCard } from '../components/cards/storeCard/StoreCard'
import { ProductCard } from '../components/cards/productCard/ProductCard'

const fetchData = async (query: string) => {
  const queryString = new URLSearchParams({ searchTerm: query }).toString()
  return await $fetch<{}, SearchResponse>(`search?${queryString}`).get()
}

export const SearchPage = () => {
  const [searchParams] = useSearchParams()

  const [results, setResults] = createSignal<SearchResponse>()

  createEffect(async () => {
    if (searchParams.q) {
      const data = await fetchData(searchParams.q)
      setResults(data.data)
    }
  }, searchParams.q)

  return (
    <Content>
      <Stack gap={6}>
        <h1>Search Results</h1>
        <Stack gap={6}>
          <h3>Stores</h3>
          <div class="default-grid">
            {results()?.stores.map((store) => (
              <StoreCard store={store} action={null} />
            ))}
          </div>
        </Stack>
        <Stack gap={6}>
          <h3>Products</h3>
          {results()?.products.map((product) => (
            <ProductCard product={product} action={null} />
          ))}
        </Stack>
      </Stack>
    </Content>
  )
}
