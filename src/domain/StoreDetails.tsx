import { Suspense, createResource } from 'solid-js'

import { $fetch, FetchData } from '~/utils/fetch'
import { Hero } from '~/layout/Hero'
import { FavoriteProduct, MessageResponse, Store } from '~/types'
import { HeartIcon } from '~/icons/HeartIcon'
import { ProductCard } from '~/components/cards/productCard/ProductCard'
import { Content } from '~/layout/Content'
import { Nav } from '~/layout/Nav'
import { About } from '~/layout/About'
import { Loading } from '~/layout/Loading'
import { Map } from '~/components/map/Map'
import { Address } from '~/layout/Address'
import { StoreCard } from '~/components/cards/storeCard/StoreCard'

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
  return await $fetch<{}, Store[]>(`${url}/${id}/related`).get()
}

interface Props {
  store: Store
}

export const StoreDetails = (props: Props) => {
  const [relatedStores] = createResource(
    () => props.store.id,
    fetchRelatedStores
  )

  const [favorites, { refetch: refetchFavorites }] =
    createResource<FetchData<FavoriteProduct[]>>(fetchFavorites)

  const onFavClick = (id: string) => {
    setProductFavorite(id).then(() => {
      refetchFavorites()
    })
  }

  return (
    <Suspense fallback={<Loading />}>
      {props.store.media && (
        <Hero name={props.store.name} image={props.store.media[0]?.imageUrl} />
      )}
      <Content>
        <div class="w-full flex mb-6 flex-wrap sm:flex-nowrap gap-6">
          <div class="w-1/2">
            {props.store.address && (
              <Map address={addressToString(props.store.address)} />
            )}
          </div>
          <div class="w-1/2 bg-gray-50">
            <About
              description={props.store.description}
              address={<Address address={props.store.address} />}
            />
          </div>
        </div>

        <Nav title="Latest Products" />
        {!props.store?.products?.length && (
          <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
            This store has no products
          </div>
        )}

        <div class="default-grid">
          {props.store?.products?.map((product) => {
            const isFavorite = favorites()?.data?.some(
              (favorite) => favorite.productId === product.id
            ) as boolean

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
          <h3 class="h3 mb-12 uppercase">Related stores</h3>
          <div class="default-grid">
            {relatedStores()?.data?.map((store) => (
              <StoreCard store={store} action={null} />
            ))}
          </div>
        </section>
      </Content>
    </Suspense>
  )
}
