import { Suspense, createEffect, createResource } from 'solid-js'
import { $fetch, FetchData } from '../utils/fetch'
import { Hero } from '../layout/Hero'
import { FavoriteProduct, MessageResponse, Store as StoreType } from '../types'
import { useParams } from '@solidjs/router'
import { HeartIcon } from '../icons/HeartIcon'
import { ProductCard } from '../components/cards/productCard/ProductCard'
import { Content } from '../layout/Content'
import { Nav } from '../layout/Nav'
import { About } from '../layout/About'
import { Loading } from '../layout/Loading'
import { Map } from '../components/map/Map'
import { Address } from '../layout/Address'
import { StoreCard } from '../components/cards/storeCard/StoreCard'

const url = 'store'

function addressToString(address: {
  street?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string
}): string {
  return [
    address.street,
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ]
    .filter(Boolean)
    .join(', ')
}

const fetchStore = async (id: string) => {
  const fullUrl = `${url}/${id}`
  return await $fetch<{}, StoreType>(fullUrl).get()
}

const setProductFavorite = async (id: string) => {
  const fullUrl = 'product/toggle-favorite'
  await $fetch<{}, MessageResponse>(fullUrl).post({
    productId: id,
  })
}

const fetchFavorites = async () => {
  const fullUrl = 'product/favorite'
  return await $fetch<{}, FavoriteProduct[]>(fullUrl).get()
}

const fetchRelatedStores = async (id: string) => {
  return await $fetch<{}, StoreType[]>(`${url}/${id}/related`).get()
}

export const Store = () => {
  const params = useParams()
  if (!params.id) {
    throw new Error('No store id provided')
  }

  const [store] = createResource(() => params.id, fetchStore)

  const [relatedStores] = createResource(() => params.id, fetchRelatedStores)

  const [favorites, { refetch: refetchFavorites }] =
    createResource<FetchData<FavoriteProduct[]>>(fetchFavorites)

  const onFavClick = (id: string) => {
    setProductFavorite(id).then(() => {
      refetchFavorites()
    })
  }

  return (
    <Suspense fallback={<Loading />}>
      {store()?.data && (
        <Hero
          name={store().data.name}
          image={store().data.media[0]?.imageUrl}
        />
      )}
      <Content>
        <div class="w-full flex mb-6 flex-wrap sm:flex-nowrap gap-6">
          <div class="w-1/2">
            {store()?.data.address && (
              <Map address={addressToString(store()?.data.address)} />
            )}
          </div>
          <div class="w-1/2 bg-gray-50">
            {store()?.data.description && (
              <About
                description={store()?.data.description}
                address={<Address address={store()?.data.address} />}
              />
            )}
          </div>
        </div>

        <Nav title="Latest Products" />
        {!store()?.data.products.length && (
          <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            This store has no products
          </div>
        )}

        <div class="default-grid">
          {store()?.data.products.map((product) => {
            const isFavorite = favorites()?.data?.some(
              (favorite) => favorite.productId === product.id
            )

            return (
              <ProductCard
                product={product}
                action={
                  <HeartIcon
                    isFilled={() => isFavorite}
                    onClick={() => onFavClick(product.id)}
                  />
                }
              />
            )
          })}
        </div>

        <section>
          <h3 class="h3 mb-12">Related stores</h3>
          <div class="default-grid">
            {relatedStores()?.data.map((store) => (
              <StoreCard store={store} action={null} />
            ))}
          </div>
        </section>
      </Content>
    </Suspense>
  )
}
