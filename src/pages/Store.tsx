import { createEffect, createResource, createSignal } from 'solid-js'
import { $fetch, FetchData } from '../utils/fetch'
import { Hero } from '../layout/Hero'
import { Container } from '../layout/Container'
import { FavoriteProduct, MessageResponse, Store as StoreType } from '../types'
import { useParams } from '@solidjs/router'

const HeartIcon = ({ isFilled }: { isFilled: () => boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="h-5 w-5 transition-all duration-200 ease-in-out cursor-pointer transform hover:scale-110" // Add hover scale effect
      fill={isFilled() ? 'red' : 'white'}
      stroke={isFilled() ? 'red' : 'gray'}
      stroke-width="1.5"
      classList={{
        'hover:stroke-black': !isFilled(),
      }}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

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
        <Hero name={store().data.name} image={store().data.media[0].url} />
      )}
      <Container>
        <section class="bg-white py-8">
          <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            <nav id="store" class="w-full z-30 top-0 px-6 py-1">
              <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                <span class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl ">
                  Latest Products
                </span>

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

            {!store()?.data.products.length && (
              <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                This store has no products
              </div>
            )}

            <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
              {store()?.data.products.map((product) => (
                <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                  <a href="#">
                    <img
                      class="hover:grow hover:shadow-lg"
                      src={product.image[0]}
                      alt="store image"
                    />
                  </a>
                  <div class="pt-3 flex items-center justify-between">
                    <p class="">{product.name}</p>
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
                  </div>
                  <p class="pt-1 text-gray-900">£9.99</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section>
          <section class="bg-white py-8">
            <div class="container py-8 px-6 mx-auto">
              <a
                class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl mb-8"
                href="#"
              >
                About
              </a>

              <p class="mt-8 mb-8"></p>

              <p class="mb-8">{store()?.data.description}</p>
            </div>
          </section>
        </section>
      </Container>
    </div>
  )
}
