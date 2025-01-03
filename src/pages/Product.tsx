import { useParams } from '@solidjs/router'
import { $fetch, FetchData } from '../utils/fetch'
import { createResource } from 'solid-js'
import { Product as ProductType } from '../types'
import { Container } from '../layout/Container'
import { Stack } from '../ui/Stack'
import { ProductCard } from '../components/cards/productCard/ProductCard'
import { Content } from '../layout/Content'

const url = 'product'

const fetchProduct = async () => {
  const params = useParams()
  if (!params.id) throw new Error('Missing product id')
  return await $fetch<{}, ProductType>(`${url}/${params.id}`).get()
}

const fetchRelatedProducts = async () => {
  const params = useParams()
  if (!params.id) throw new Error('Missing product id')
  return await $fetch<{}, ProductType[]>(
    `${url}/${params.id}/related-products`
  ).get()
}

export const Product = () => {
  const [product] = createResource<FetchData<ProductType>>(fetchProduct)
  const [relatedProducts] =
    createResource<FetchData<ProductType[]>>(fetchRelatedProducts)

  return (
    <Content>
      <section class="bg-white py-8">
        <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12"></div>
      </section>

      <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12 gap-6">
        <div class="flex-1">
          <img src={product()?.data.media[0]?.imageUrl} />
        </div>
        <div class="flex-1">
          <Stack gap={3}>
            <h1 class="text-2xl font-semibold">{product()?.data.name}</h1>
            <p class="text-gray-700 text-base">{product()?.data.description}</p>
            <p class="text-gray-700 text-base">
              Price: {product()?.data.price}
            </p>
          </Stack>
        </div>
      </div>

      <section>
        <h3 class="h3 mb-8">Related products</h3>
        <div class="grid gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {relatedProducts()?.data.map((product) => (
            <ProductCard product={product} action={null} />
          ))}
        </div>
      </section>
    </Content>
  )
}
