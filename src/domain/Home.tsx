import { Suspense, createResource } from 'solid-js'
import { Hero } from '../layout/Hero'
import { $fetch } from '../utils/fetch'
import { FavoriteStore, MessageResponse, Product, Store } from '../types'
import { HeartIcon } from '../icons/HeartIcon'
import { Nav } from '../layout/Nav'
import { Content } from '../layout/Content'
import { StoreCard } from '../components/cards/storeCard/StoreCard'
import { Featured } from '../layout/Featured'
import { Loading } from '../layout/Loading'
import { ProductCard } from '../components/cards/productCard/ProductCard'

interface HeroActionProps {
  storeId: string
}

const HeroAction = ({ storeId }: HeroActionProps) => (
  <a
    class="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
    href={`/store/${storeId}`}
  >
    go to store
  </a>
)

const url = 'store/all'
const urlLatestProducts = 'product/latest'

const fetchStores = async () => {
  return await $fetch<any, Store[]>(url).get()
}

const fetchLatestProducts = async () => {
  return await $fetch<any, Product[]>(urlLatestProducts).get()
}

const toggleStoreFavorite = async (id: string) => {
  const fullUrl = 'store/toggle-favorite'
  await $fetch<{}, MessageResponse>(fullUrl).post({
    storeId: id,
  })
}

const fetchFavorites = async () => {
  const fullUrl = 'store/favorite'
  return await $fetch<{}, FavoriteStore[]>(fullUrl).get()
}

export const Home = () => {
  const [stores] = createResource(fetchStores)
  const [products] = createResource(fetchLatestProducts)

  const [favorites, { refetch }] = createResource(fetchFavorites)

  const onFavClick = (id: string) => {
    toggleStoreFavorite(id).then(() => {
      refetch()
    })
  }

  return (
    <Suspense fallback={<Loading />}>
      {stores()?.data.length && (
        <Hero
          name={stores().data[0].name}
          image={stores().data[0].media[0]?.imageUrl}
          action={<HeroAction storeId={stores().data[0].id} />}
        />
      )}
      <Content>
        <Nav title="Latest Stores" />

        <div class="default-grid pb-16">
          {stores()?.data.map((store) => (
            <StoreCard
              store={store}
              action={
                <HeartIcon
                  isFilled={() =>
                    favorites()?.data?.some(
                      (favorite) => favorite.storeId === store.id
                    )
                  }
                  onClick={() => onFavClick(store.id)}
                />
              }
            />
          ))}
        </div>
        {stores()?.data?.length > 1 && <Featured store={stores()?.data[1]} />}

        <div class="h3 uppercase mb-12">Latest Products</div>

        <div class="default-grid pb-16">
          {products()?.data.map((product) => (
            <ProductCard
              product={product}
              action={
                <HeartIcon
                  isFilled={() =>
                    favorites()?.data?.some(
                      (favorite) => favorite.storeId === product.id
                    )
                  }
                  onClick={() => onFavClick(product.id)}
                />
              }
            />
          ))}
        </div>
      </Content>
    </Suspense>
  )
}
