import { Suspense, createResource, createSignal } from 'solid-js'
import { useParams } from '@solidjs/router'
import { $fetch, FetchData } from '../../utils/fetch'
import { Hero } from '../../layout/Hero'
import { Category, MessageResponse, Product, Store } from '../../types'
import { ProductForm } from '../../components/forms/productForm/ProductForm'
import { Modal } from '../../components/modal/Modal'
import { ProductCard } from '../../components/cards/productCard/ProductCard'
import { Stack } from '../../ui/Stack'
import { EditIcon } from '../../icons/EditIcon'
import { DeleteIcon } from '../../icons/DeleteIcon'
import { Content } from '../../layout/Content'
import { Nav } from '../../layout/Nav'
import { About } from '../../layout/About'
import { Loading } from '../../layout/Loading'
import { Toast } from '../../lib/Toast'
import { StoreForm } from '../../components/forms/storeForm/StoreForm'

const storeUrl = 'store'
const productUrl = 'product'
const categoryUrl = 'category'

const fetchStore = async (id: string) => {
  const fullUrl = `${storeUrl}/${id}`
  return await $fetch<{}, Store>(fullUrl).get()
}

const fetchProducts = async (id: string) => {
  return await $fetch<{}, Product[]>(`${productUrl}/store/${id}`).get()
}

async function fetchCategories() {
  return await $fetch<any, Category[]>(categoryUrl).get()
}

export const UserStore = () => {
  const params = useParams()
  if (!params.id) {
    throw new Error('No id provided')
  }

  const [productToEdit, setProductToEdit] = createSignal<Product | null>(null)

  const [category] = createResource(fetchCategories)

  const { ToastComponent, showToast } = Toast()

  const [store] = createResource(() => fetchStore(params.id))

  const [products, { refetch }] = createResource(() => fetchProducts(params.id))

  const [presentProductForm, setPresentProductForm] = createSignal(false)
  const [presentStoreForm, setPresentStoreForm] = createSignal(false)

  const onModalClose = () => {
    refetch()
    setPresentProductForm(false)
  }

  const onEdit = (id: string) => {
    setProductToEdit(products().data.find((product) => product.id === id))
    setPresentProductForm(true)
    document.body.style.overflow = 'hidden'
  }

  const deleteProduct = async (id: string) => {
    const { data, error } = await $fetch<{}, MessageResponse>(
      `product/${id}`
    ).delete()
    if (data) {
      showToast(data.message)
      refetch()
    }
    if (error) {
      showToast(error.message)
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      {store()?.data.name && (
        <div class="relative">
          <Hero
            name={store().data.name}
            image={store().data.media[0]?.imageUrl}
          />
          <div
            class="absolute bottom-5 right-10 cursor-pointer"
            onClick={() => {
              setPresentStoreForm(true)
              document.body.style.overflow = 'hidden'
            }}
          >
            <EditIcon />
          </div>
        </div>
      )}
      <Content>
        <ToastComponent />
        <Nav title="Your products" />

        {store() && (
          <Modal
            isOpen={presentStoreForm()}
            onClose={() => {
              setPresentStoreForm(false)
              document.body.style.overflow = 'auto'
            }}
            title={store()?.data.id ? 'Edit store' : 'Create store'}
          >
            <StoreForm
              store={store()?.data}
              categories={category()?.data}
              onComplete={onModalClose}
            />
          </Modal>
        )}

        <Modal
          isOpen={presentProductForm()}
          onClose={() => {
            setPresentProductForm(false)
            document.body.style.overflow = 'auto'
          }}
          title={productToEdit() ? 'Edit product' : 'Add a product'}
        >
          {store() && (
            <ProductForm
              store={store()?.data}
              product={productToEdit}
              categories={category()?.data}
              onClose={onModalClose}
            />
          )}
        </Modal>

        <div class="default-grid">
          {products()?.data?.map((product) => (
            <ProductCard
              product={product}
              action={
                <Stack size="md" horizontal>
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
            onClick={() => {
              setPresentProductForm(true)
              document.body.style.overflow = 'hidden'
            }}
          >
            Add a product
          </button>
        </div>

        {store()?.data.description && (
          <About description={store()?.data.description} />
        )}
      </Content>
    </Suspense>
  )
}
