import { $fetch, FetchData } from '../utils/fetch'
import { FavoriteProduct, Product } from '../types'
import { createResource, Resource } from 'solid-js'
import { Stack } from '../ui/Stack'
import { ProductCard } from '../components/cards/productCard/ProductCard'
import { HeartIcon } from '../icons/HeartIcon'

const url = 'product/latest'

const fetchLatestProducts = async () => {
  return await $fetch<any, Product[]>(url).get()
}

interface Props {
  favorites?: Resource<FetchData<FavoriteProduct[]>>
  onFavClick: (id: string) => void
}

export const LatestProducts = (props: Props) => {
  const favorites = props.favorites
  const onFavClick = props.onFavClick

  const [products] = createResource(fetchLatestProducts)
  return (
    <Stack size="md">
      <h3 class="h3 uppercase">Latest products</h3>
      <div class="default-grid pb-16">
        {products()?.data?.map((product) => (
          <ProductCard
            product={product}
            action={
              <HeartIcon
                isFilled={() =>
                  favorites()?.data?.some(
                    (favorite) => favorite.productId === product.id
                  )
                }
                onClick={() => onFavClick(product.id)}
              />
            }
          />
        ))}
      </div>
    </Stack>
  )
}
