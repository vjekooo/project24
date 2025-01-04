import { Suspense, createResource } from 'solid-js'
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
    .filter(Boolean) // Filter out any undefined or empty parts
    .join(', ') // Join the parts with a comma and space
}

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
      </Content>
    </Suspense>
  )
}
