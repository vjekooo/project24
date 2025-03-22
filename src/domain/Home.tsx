import { Suspense, createResource } from 'solid-js'

import { $fetch } from '~/utils/fetch'
import { FavoriteProduct, FavoriteStore, MessageResponse, Store } from '~/types'
import { Content } from '~/layout/Content'
import { Featured } from '~/layout/Featured'
import { Loading } from '~/layout/Loading'
import { HomeHero } from '~/layout/HomeHero'
import { PopularProducts } from './PopularProducts'
import { LatestProducts } from './LatestProducts'
import { Stack } from '~/ui/Stack'
import { LatestStores } from './LatestStores'

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

interface Props {
  stores: Store[]
}

export const Home = (props: Props) => {
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
      {props.stores?.length && <HomeHero stores={props.stores} />}
      <Content>
        <LatestStores favorites={storeFavorites} onFavClick={onFavStoreClick} />
        {props.stores?.length > 1 && <Featured store={props.stores[1]} />}

        <Stack size="md">
          <PopularProducts />
          <LatestProducts
            onFavClick={onFavProductClick}
            favorites={productFavorites}
          />
        </Stack>
      </Content>
    </Suspense>
  )
}
