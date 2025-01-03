import { createResource } from 'solid-js'
import { $fetch, FetchData } from '../utils/fetch'
import { Hero } from '../layout/Hero'
import { FavoriteProduct, MessageResponse, Store as StoreType } from '../types'
import { useParams } from '@solidjs/router'
import { HeartIcon } from '../icons/HeartIcon'
import { ProductCard } from '../components/cards/productCard/ProductCard'
import { Content } from '../layout/Content'
import { Nav } from '../layout/Nav'
import { About } from '../layout/About'

const url = 'store'

const fetchData = async () => {
  const params = useParams()
  if (!params.id) {
    throw new Error('No id provided')
  }
  const fullUrl = `${url}/${params.id}`
  return await $fetch<{}, StoreType>(fullUrl).get()
}

const setProductFavorite = async (id: string) => {
  const fullUrl = 'product/toggle-favorite'
  const { data, error } = await $fetch<{}, MessageResponse>(fullUrl).post({
    productId: id,
  })
  console.log({ data, error })
}

const fetchFavorites = async () => {
  const fullUrl = 'product/favorites'
  return await $fetch<{}, FavoriteProduct[]>(fullUrl).get()
}

export const Store = () => {
  const [store] = createResource<FetchData<StoreType>>(fetchData)

  const [favorites, { refetch }] =
    createResource<FetchData<FavoriteProduct[]>>(fetchFavorites)

  const onFavClick = (id: string) => {
    setProductFavorite(id).then(() => {
      refetch()
    })
  }

  return (
    <div>
      {store()?.data && (
        <Hero
          name={store().data.name}
          image={store().data.media[0]?.imageUrl}
        />
      )}
      <Content>
        <Nav title="Latest Products" />
        {!store()?.data.products.length && (
          <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            This store has no products
          </div>
        )}

        <div class="w-full grid gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {store()?.data.products.map((product) => (
            <ProductCard
              product={product}
              action={
                <div
                  class="cursor-pointer"
                  onClick={() => onFavClick(product.id)}
                >
                  <HeartIcon
                    isFilled={() =>
                      favorites()?.data?.some(
                        (favorite) => favorite.productId === product.id
                      )
                    }
                  />
                </div>
              }
            />
          ))}
        </div>
        <section>
          {store()?.data.description && (
            <About description={store()?.data.description} />
          )}
        </section>
      </Content>
    </div>
  )
}
