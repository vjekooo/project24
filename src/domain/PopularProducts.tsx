import { $fetch } from '../utils/fetch'
import { Product } from '../types'
import { createResource } from 'solid-js'
import { Stack } from '../ui/Stack'
import { ProductCard } from '../components/cards/productCard/ProductCard'

const urlLatestProducts = 'product/popular'

const fetchPopularProducts = async () => {
  return await $fetch<any, Product[]>(urlLatestProducts).get()
}

export const PopularProducts = () => {
  const [products] = createResource(fetchPopularProducts)
  return (
    <Stack size="md">
      <h3 class="h3 uppercase">Popular products</h3>
      {products() && (
        <div class="default-grid">
          {products()?.data?.map((product) => (
            <ProductCard product={product} action={null} />
          ))}
        </div>
      )}
    </Stack>
  )
}
