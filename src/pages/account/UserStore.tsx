import { createResource, createSignal } from 'solid-js'
import { useParams } from '@solidjs/router'
import { $fetch, FetchData } from '../../utils/fetch'
import { Hero } from '../../layout/Hero'
import { MessageResponse, Product, Store } from '../../types'
import { ProductForm } from '../../components/forms/productForm/ProductForm'
import { Modal } from '../../components/modal/Modal'
import { ProductCard } from '../../components/cards/productCard/ProductCard'
import { Stack } from '../../ui/Stack'
import { EditIcon } from '../../icons/EditIcon'
import { DeleteIcon } from '../../icons/DeleteIcon'
import { Content } from '../../layout/Content'
import { Nav } from '../../layout/Nav'
import { About } from '../../layout/About'

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
      <Content>
        <Nav title="Your products" />
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

        <div class="grid gap-6 mb-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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

        <div class="mb-32 mt-16">
          <button
            class="btn-primary"
            onClick={() => setPresentProductForm(true)}
          >
            Add a product
          </button>
        </div>

        {store()?.data.description && (
          <About description={store()?.data.description} />
        )}
      </Content>
    </div>
  )
}
