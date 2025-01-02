import { createResource } from 'solid-js'
import { $fetch, FetchData } from '../utils/fetch'
import { Hero } from '../layout/Hero'
import { Container } from '../layout/Container'
import { FavoriteProduct, MessageResponse, Store as StoreType } from '../types'
import { useParams } from '@solidjs/router'
import { HeartIcon } from '../icons/HeartIcon'
import { ProductCard } from '../components/cards/productCard/ProductCard'

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
        <Hero
          name={store().data.name}
          image={store().data.media[0]?.imageUrl}
        />
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
