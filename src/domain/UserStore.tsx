import { Suspense, createResource, createSignal } from 'solid-js'

import { $fetch } from '~/utils/fetch'
import { Hero } from '~/layout/Hero'
import { Category, MessageResponse, Product, Store } from '~/types'
import { ProductForm } from '~/components/forms/productForm/ProductForm'
import { Modal } from '~/components/modal/Modal'
import { ProductCard } from '~/components/cards/productCard/ProductCard'
import { Stack } from '~/ui/Stack'
import { EditIcon } from '~/icons/EditIcon'
import { DeleteIcon } from '~/icons/DeleteIcon'
import { Content } from '~/layout/Content'
import { Nav } from '~/layout/Nav'
import { About } from '~/layout/About'
import { Loading } from '~/layout/Loading'
import { Toast } from '~/lib/Toast'
import { StoreForm } from '~/components/forms/storeForm/StoreForm'

const productUrl = 'product'
const categoryUrl = 'category'

const fetchProducts = async (id: string) => {
  return await $fetch<{}, Product[]>(`${productUrl}/store/${id}`).get()
}

async function fetchCategories() {
  return await $fetch<any, Category[]>(categoryUrl).get()
}

interface Props {
  store?: Store
}

export const UserStore = (props: Props) => {
  if (!props.store) {
    return <Content>No Data</Content>
  }

  const [productToEdit, setProductToEdit] = createSignal<Product | null>(null)

  const [category] = createResource(fetchCategories)

  const { ToastComponent, showToast } = Toast()

  const [products, { refetch }] = createResource(() =>
    fetchProducts(props.store.id)
  )

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
      {props.store.media && (
        <div class="relative">
          <Hero
            name={props.store.name}
            image={props.store.media[0]?.imageUrl}
          />
        </div>
      )}
      <Content>
        <div class="w-full flex justify-end mb-6">
          <div
            class="cursor-pointer flex gap-2 items-center bg-white p-2 rounded-md"
            onClick={() => {
              setPresentStoreForm(true)
              document.body.style.overflow = 'hidden'
            }}
          >
            <EditIcon />
            <span>Edit store</span>
          </div>
        </div>

        <ToastComponent />
        <Nav title="Your products" />

        {props.store && (
          <Modal
            isOpen={presentStoreForm()}
            onClose={() => {
              setPresentStoreForm(false)
              document.body.style.overflow = 'auto'
            }}
            title={props.store.id ? 'Edit store' : 'Create store'}
          >
            <StoreForm
              store={props.store}
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
          {props.store && (
            <ProductForm
              store={props.store}
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

        {props.store?.description && (
          <About description={props.store.description} address={null} />
        )}
      </Content>
    </Suspense>
  )
}
