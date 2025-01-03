import { useParams } from '@solidjs/router'
import { $fetch, FetchData } from '../utils/fetch'
import { createResource } from 'solid-js'
import { Product as ProductType } from '../types'
import { Container } from '../layout/Container'
import { Stack } from '../ui/Stack'

const url = 'product'

const fetchProduct = async () => {
  const params = useParams()

  if (!params.id) throw new Error('Missing product id')

  return await $fetch<{}, ProductType>(`${url}/${params.id}`).get()
}

export const Product = () => {
  const [product] = createResource<FetchData<ProductType>>(fetchProduct)

  return (
    <Container>
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
        <div class="container py-8 px-6 mx-auto">
          <h3 class="h3">Related products</h3>
        </div>
      </section>
    </Container>
  )
}
