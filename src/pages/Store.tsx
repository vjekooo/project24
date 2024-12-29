import { createEffect, createResource, createSignal } from 'solid-js'
import { $fetch, FetchData } from '../utils/fetch'
import { Hero } from '../layout/Hero'
import { Container } from '../layout/Container'
import { FavoriteProduct, MessageResponse, Store as StoreType } from '../types'
import { useParams } from '@solidjs/router'

const HeartIcon = ({ isFilled }) => {
  return (
    <svg
      class={`h-6 w-6 fill-current ${
        isFilled ? 'text-red-500' : 'text-gray-500 hover:text-black'
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M12,4.595c-1.104-1.006-2.512-1.558-3.996-1.558c-1.578,0-3.072,0.623-4.213,1.758c-2.353,2.363-2.352,6.059,0.002,8.412 l7.332,7.332c0.17,0.299,0.498,0.492,0.875,0.492c0.322,0,0.609-0.163,0.792-0.409l7.415-7.415 c2.354-2.354,2.354-6.049-0.002-8.416c-1.137-1.131-2.631-1.754-4.209-1.754C14.513,3.037,13.104,3.589,12,4.595z M18.791,6.205 c1.563,1.571,1.564,4.025,0.002,5.588L12,18.586l-6.793-6.793C3.645,10.23,3.646,7.776,5.205,6.209 c0.76-0.756,1.754-1.172,2.799-1.172s2.035,0.416,2.789,1.17l0.5,0.5c0.391,0.391,1.023,0.391,1.414,0l0.5-0.5 C14.719,4.698,17.281,4.702,18.791,6.205z" />
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
  const fullUrl = 'product/favorite'
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
  const [store, setStore] = createSignal<StoreType | null>(null)
  const [data] = createResource<FetchData<StoreType>>(fetchData)

  const [favorites] =
    createResource<FetchData<FavoriteProduct[]>>(fetchFavorites)

  const onFavClick = (id: string) => {
    setProductFavorite(id)
  }

  createEffect(() => {
    if (data()) {
      setStore(data().data)
    }
  })

  return (
    <div>
      {store()?.name && (
        <Hero name={store()?.name} image={store()?.media[0].url} />
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

            {!store()?.products.length && (
              <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
                This store has no products
              </div>
            )}

            <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
              {store()?.products.map((product) => (
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
                        isFilled={favorites()?.data.some(
                          (favorite) => favorite.productId === product.id
                        )}
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

              <p class="mb-8">{store()?.description}</p>
            </div>
          </section>
        </section>
      </Container>
    </div>
  )
}
