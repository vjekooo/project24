import { createResource } from 'solid-js'
import { Container } from '../layout/Container'
import { Hero } from '../layout/Hero'
import { $fetch, FetchData } from '../utils/fetch'
import { FavoriteStore, MessageResponse, Store } from '../types'
import { HeartIcon } from '../icons/HeartIcon'

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
      <Container>
        <section class="bg-white py-8">
          <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            <nav id="store" class="w-full z-30 top-0 px-6 py-1">
              <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                <a
                  class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
                  href="#"
                >
                  Latest Stores
                </a>

                <div class="flex items-center" id="store-nav-content">
                  <a
                    class="pl-3 inline-block no-underline hover:text-black"
                    href="#"
                  >
                    <svg
                      class="fill-current hover:text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
                    </svg>
                  </a>

                  <a
                    class="pl-3 inline-block no-underline hover:text-black"
                    href="#"
                  >
                    <svg
                      class="fill-current hover:text-black"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                    </svg>
                  </a>
                </div>
              </div>
            </nav>

            <section>
              <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
                {stores()?.data.map((store) => (
                  <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                    <a href={`/store/${store.id}`}>
                      <img
                        class="hover:grow hover:shadow-lg"
                        src={store.media[0]?.imageUrl}
                      />
                    </a>
                    <div class="pt-3 flex items-center justify-between">
                      <p class="">{store.name}</p>
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
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </Container>
    </div>
  )
}
