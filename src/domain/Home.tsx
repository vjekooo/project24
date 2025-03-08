import { Suspense, createResource } from 'solid-js'
import { $fetch } from '../utils/fetch'
import {
  FavoriteProduct,
  FavoriteStore,
  MessageResponse,
  Store,
} from '../types'
import { HeartIcon } from '../icons/HeartIcon'
import { Nav } from '../layout/Nav'
import { Content } from '../layout/Content'
import { StoreCard } from '../components/cards/storeCard/StoreCard'
import { Featured } from '../layout/Featured'
import { Loading } from '../layout/Loading'
import { HomeHero } from '../layout/HomeHero'
import { PopularProducts } from './PopularProducts'
import { LatestProducts } from './LatestProducts'
import { Stack } from '../ui/Stack'

const url = 'store/all'

const fetchStores = async () => {
  return await $fetch<any, Store[]>(url).get()
}

const toggleStoreFavorite = async (id: string) => {
  const fullUrl = 'store/toggle-favorite'
  await $fetch<{}, MessageResponse>(fullUrl).post({
    storeId: id,
  })
}

const toggleProductFavorite = async (id: string) => {
  const fullUrl = 'product/toggle-favorite'
  await $fetch<{}, MessageResponse>(fullUrl).post({
    productId: id,
  })
}

const fetchStoreFavorites = async () => {
  const fullUrl = 'store/favorite'
  return await $fetch<{}, FavoriteStore[]>(fullUrl).get()
}

const fetchProductFavorites = async () => {
  const fullUrl = 'product/favorite'
  return await $fetch<{}, FavoriteProduct[]>(fullUrl).get()
}

export const Home = () => {
  const [stores] = createResource(fetchStores)

  const [storeFavorites, { refetch: refetchStoreFavorites }] =
    createResource(fetchStoreFavorites)
  const [productFavorites, { refetch: refetchProductFavorites }] =
    createResource(fetchProductFavorites)

  const onFavStoreClick = (id: string) => {
    toggleStoreFavorite(id).then(() => {
      refetchStoreFavorites()
    })
  }

  const onFavProductClick = (id: string) => {
    toggleProductFavorite(id).then(() => {
      refetchProductFavorites()
    })
  }

  return (
    <Suspense fallback={<Loading />}>
      {stores()?.data?.length && <HomeHero stores={stores()?.data} />}
      <Content>
        <Nav title="Latest Stores" />

        <div class="default-grid pb-16">
          {stores()?.data?.map((store) => (
            <StoreCard
              store={store}
              action={
                <HeartIcon
                  isFilled={() =>
                    storeFavorites()?.data?.some(
                      (favorite) => favorite.storeId === store.id
                    )
                  }
                  onClick={() => onFavStoreClick(store.id)}
                />
              }
            />
          ))}
        </div>
        {stores()?.data?.length > 1 && <Featured store={stores()?.data[1]} />}

        <Stack size="md">
          <PopularProducts />
          {productFavorites() && (
            <LatestProducts
              onFavClick={onFavProductClick}
              favorites={productFavorites().data}
            />
          )}
        </Stack>
      </Content>
    </Suspense>
  )
}
