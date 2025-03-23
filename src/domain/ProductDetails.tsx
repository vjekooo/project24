import { $fetch } from '~/utils/fetch'
import { Suspense, createResource } from 'solid-js'
import { Product } from '~/types'
import { Stack } from '~/ui/Stack'
import { ProductCard } from '~/components/cards/productCard/ProductCard'
import { Content } from '~/layout/Content'
import { Loading } from '~/layout/Loading'

const url = 'product'

const fetchRelatedProducts = async (id: string) => {
  return await $fetch<{}, Product[]>(`${url}/${id}/related`).get()
}

interface Props {
  product?: Product
}

export const ProductDetails = (props: Props) => {
  if (!props.product) {
    return null
  }

  const [relatedProducts] = createResource(
    () => props.product?.id,
    fetchRelatedProducts
  )

  return (
    <Suspense fallback={<Loading />}>
      <Content>
        <div
          class="font-semibold underline cursor-pointer mb-8"
          onClick={() => window.history.back()}
        >
          &#8592; Go back
        </div>
        <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12 gap-6">
          <div class="flex-1">
            {props.product?.media && (
              <img src={props.product?.media[0]?.imageUrl} />
            )}
          </div>
          <div class="flex-1">
            <Stack>
              <h1 class="text-2xl font-semibold">{props.product.name}</h1>
              <p class="text-gray-700 text-base">{props.product.description}</p>
              <p class="text-gray-700 text-base">
                Price: {props.product.price}
              </p>
            </Stack>
          </div>
        </div>

        <section>
          <h3 class="h3 mb-8">Related products</h3>
          <div class="default-grid">
            {relatedProducts()?.data?.map((product) => (
              <ProductCard product={product} action={null} />
            ))}
          </div>
        </section>
      </Content>
    </Suspense>
  )
}
