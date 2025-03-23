import { Content } from '~/layout/Content'
import { Stack } from '~/ui/Stack'
import { StoreCard } from '~/components/cards/storeCard/StoreCard'
import { ProductCard } from '~/components/cards/productCard/ProductCard'
import { Search as SearchType } from '~/types'

interface Props {
  search?: SearchType
}

export const Search = (props: Props) => {
  return (
    <Content>
      <Stack size="md">
        <h1>Search Results</h1>
        <Stack size="md">
          <h3>Stores</h3>
          <div class="default-grid">
            {props.search?.stores.map((store) => (
              <StoreCard store={store} action={null} />
            ))}
          </div>
        </Stack>
        <Stack size="md">
          <h3>Products</h3>
          <div class="default-grid">
            {props.search?.products.map((product) => (
              <ProductCard product={product} action={null} />
            ))}
          </div>
        </Stack>
      </Stack>
    </Content>
  )
}
