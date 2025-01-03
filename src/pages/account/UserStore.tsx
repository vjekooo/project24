import { createResource, createSignal } from 'solid-js'
import { useParams } from '@solidjs/router'
import { $fetch, FetchData } from '../../utils/fetch'
import { Hero } from '../../layout/Hero'
import { MessageResponse, Product, Store } from '../../types'
import { Container } from '../../layout/Container'
import { ProductForm } from '../../components/forms/productForm/ProductForm'
import { Modal } from '../../components/modal/Modal'
import { ProductCard } from '../../components/cards/productCard/ProductCard'
import { Stack } from '../../ui/Stack'
import { EditIcon } from '../../icons/EditIcon'
import { DeleteIcon } from '../../icons/DeleteIcon'

const storeUrl = 'store'
const productUrl = 'product'

const fetchData = async () => {
  const params = useParams()
  if (!params.id) {
    throw new Error('No id provided')
  }
  const fullUrl = `${storeUrl}/${params.id}`
  return await $fetch<{}, Store>(fullUrl).get()
}

const fetchProducts = async () => {
  const params = useParams()
  if (!params.id) {
    throw new Error('No id provided')
  }
  return await $fetch<{}, Product[]>(`${productUrl}/store/${params.id}`).get()
}

export const UserStore = () => {
  const [productToEdit, setProductToEdit] = createSignal<Product | null>(null)

  const [store] = createResource<FetchData<Store>>(fetchData)

  const [products, { refetch }] =
    createResource<FetchData<Product[]>>(fetchProducts)

  const [presentProductForm, setPresentProductForm] = createSignal(false)

  const onModalClose = () => {
    refetch()
    setPresentProductForm(false)
  }

  const onEdit = (id: string) => {
    setProductToEdit(products().data.find((product) => product.id === id))
    setPresentProductForm(true)
  }

  const deleteProduct = async (id: string) => {
    return await $fetch<{}, MessageResponse>(`product/${id}`).delete()
  }

  return (
    <div>
      {store()?.data.name && (
        <Hero name={store().data.name} image={store().data.media[0].imageUrl} />
      )}
      <Container>
        <section class="bg-white py-8">
          <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            <nav id="store" class="w-full z-30 top-0 px-6 py-1">
              <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
                <span class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl ">
                  Your products
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
          </div>
        </section>

        <Modal
          isOpen={presentProductForm()}
          onClose={() => setPresentProductForm(false)}
          title="Add a product"
        >
          {store() && (
            <ProductForm
              store={store()?.data}
              product={productToEdit}
              onClose={onModalClose}
            />
          )}
        </Modal>

        <section class="bg-white py-8">
          <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">
            {products()?.data?.map((product) => (
              <ProductCard
                product={product}
                action={
                  <Stack gap={3} horizontal>
                    <div
                      onClick={() => onEdit(product.id)}
                      class="cursor-pointer"
                    >
                      <EditIcon />
                    </div>
                    <div
                      onClick={() => deleteProduct(product.id)}
                      class="cursor-pointer"
                    >
                      <DeleteIcon />
                    </div>
                  </Stack>
                }
              />
            ))}
          </div>
          <section class="bg-white py-8">
            <div class="container py-8 px-6 mx-auto">
              <button
                class="btn-primary"
                onClick={() => setPresentProductForm(true)}
              >
                Add a product
              </button>
            </div>
          </section>
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
