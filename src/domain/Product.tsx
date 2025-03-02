import { useParams } from '@solidjs/router'
import { $fetch } from '../utils/fetch'
import { Suspense, createResource } from 'solid-js'
import { Product as ProductType } from '../types'
import { Stack } from '../ui/Stack'
import { ProductCard } from '../components/cards/productCard/ProductCard'
import { Content } from '../layout/Content'
import { Loading } from '../layout/Loading'

const url = 'product'

const fetchProduct = async (id: string) => {
  return await $fetch<{}, ProductType>(`${url}/${id}`).get()
}

const fetchRelatedProducts = async (id: string) => {
  return await $fetch<{}, ProductType[]>(`${url}/${id}/related`).get()
}

export const Product = () => {
  const params = useParams()
  if (!params.id) {
    throw new Error('No product id provided')
  }

  const [product] = createResource(() => params.id, fetchProduct)
  const [relatedProducts] = createResource(
    () => params.id,
    fetchRelatedProducts
  )

  return (
    <Suspense fallback={<Loading />}>
      <Content>
        <div
          class="font-semibold underline cursor-pointer mb-8"
          onClick={() => window.history.back()}
        >
          Go back
        </div>
        <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12 gap-6">
          <div class="flex-1">
            <img src={product()?.data.media[0]?.imageUrl} />
          </div>
          <div class="flex-1">
            <Stack>
              <h1 class="text-2xl font-semibold">{product()?.data.name}</h1>
              <p class="text-gray-700 text-base">
                {product()?.data.description}
              </p>
              <p class="text-gray-700 text-base">
                Price: {product()?.data.price}
              </p>
            </Stack>
          </div>
        </div>

        <section>
          <h3 class="h3 mb-8">Related products</h3>
          <div class="default-grid">
            {relatedProducts()?.data.map((product) => (
              <ProductCard product={product} action={null} />
            ))}
          </div>
        </section>
      </Content>
    </Suspense>
  )
}
