import { createResource } from 'solid-js'
import { Container } from '../layout/Container'
import { Hero } from '../layout/Hero'
import { $fetch, FetchData } from '../utils/fetch'
import { FavoriteStore, MessageResponse, Store } from '../types'
import { HeartIcon } from '../icons/HeartIcon'
import { Nav } from '../layout/Nav'
import { Content } from '../layout/Content'
import { StoreCard } from '../components/cards/storeCard/StoreCard'

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

const fetchData = async () => {
  return await $fetch<any, Store[]>(url).get()
}

const setStoreFavorite = async (id: string) => {
  const fullUrl = 'store/toggle-favorite'
  const { data, error } = await $fetch<{}, MessageResponse>(fullUrl).post({
    storeId: id,
  })
  console.log({ data, error })
}

const fetchFavorites = async () => {
  const fullUrl = 'store/favorites'
  return await $fetch<{}, FavoriteStore[]>(fullUrl).get()
}

export const Home = () => {
  const [stores] = createResource(fetchData)

  const [favorites, { refetch }] =
    createResource<FetchData<FavoriteStore[]>>(fetchFavorites)

  const onFavClick = (id: string) => {
    setStoreFavorite(id).then(() => {
      refetch()
    })
  }

  return (
    <div>
      {stores()?.data.length && (
        <Hero
          name={stores().data[0].name}
          image={stores().data[0].media[0]?.imageUrl}
          action={<HeroAction storeId={stores().data[0].id} />}
        />
      )}
      <Content>
        <section class="bg-white py-8">
          <Nav title="Latest Stores" />

          <div class="grid gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {stores()?.data.map((store) => (
              <StoreCard
                store={store}
                action={
                  <div
                    class="cursor-pointer"
                    onClick={() => onFavClick(store.id)}
                  >
                    <HeartIcon
                      isFilled={() =>
                        favorites()?.data?.some(
                          (favorite) => favorite.storeId === store.id
                        )
                      }
                    />
                  </div>
                }
              />
            ))}
          </div>
        </section>
      </Content>
    </div>
  )
}
