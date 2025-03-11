import { Suspense, createEffect, createResource, createSignal } from 'solid-js'
import { MessageResponse, User } from '../../types'
import { $fetch } from '../../utils/fetch'
import { Content } from '../../layout/Content'
import { Stack } from '../../ui/Stack'
import { Modal } from '../../components/modal/Modal'
import { StoreCard } from '../../components/cards/storeCard/StoreCard'
import { EditIcon } from '../../icons/EditIcon'
import { Loading } from '../../layout/Loading'
import { ProductCard } from '../../components/cards/productCard/ProductCard'
import { CreateStore } from './CreateStore'
import { DeleteIcon } from '../../icons/DeleteIcon'
import { Toast } from '../../lib/Toast'

const userUrl = 'user'

async function fetchData() {
  return await $fetch<any, User>(userUrl).get()
}

const deleteStore = async (id: string) => {
  const fullUrl = `store/${id}`
  return await $fetch<{}, MessageResponse>(fullUrl).delete()
}

export const Account = () => {
  const { ToastComponent, showToast } = Toast()

  const [user, setUser] = createSignal<User | null>(null)

  const [presentStoreForm, setPresentStoreForm] = createSignal(false)

  const [data, { refetch }] = createResource(fetchData)

  createEffect(() => {
    if (data()) {
      setUser(data().data)
    }
  })

  const onDelete = async (id: string) => {
    const { data, error } = await deleteStore(id)
    if (data) {
      showToast(data.message)
      refetch()
    } else {
      showToast(error.message)
    }
  }

  const onComplete = () => {
    refetch()
    setPresentStoreForm(false)
  }

  const error = <div>Error loading data...</div>

  const content = () =>
    data.loading ? (
      <div>Loading...</div>
    ) : (
      <div class="flex flex-col gap-3">
        <ToastComponent />
        {user()?.firstName && (
          <p>
            Hello {user().firstName} this is your Account page, where you can
            edit your account details
          </p>
        )}
        {!user()?.stores?.length ? (
          <div class="flex flex-row gap-3">
            <p>You have no store on file</p>
          </div>
        ) : (
          <Stack>
            <h3 class="h3">Your Store</h3>
            {user()?.stores && (
              <div class="default-grid">
                {user()?.stores.map((store) => (
                  <StoreCard
                    store={store}
                    action={
                      <div class="flex gap-4">
                        <a href={`/account/store/${store.id}`}>
                          <EditIcon />
                        </a>
                        <div
                          class="cursor-pointer"
                          onClick={() => onDelete(store.id)}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    }
                  />
                ))}
              </div>
            )}
          </Stack>
        )}
        <div class="mb-8 mt-16">
          <button class="btn-primary" onClick={() => setPresentStoreForm(true)}>
            Add Store
          </button>
        </div>
        {user()?.favoriteStores && (
          <Stack size="md">
            <h3 class="h4">Your Favorite Stores</h3>
            <div class="default-grid">
              {user()?.favoriteStores?.map((store) => (
                <StoreCard store={store} action={null} />
              ))}
            </div>
          </Stack>
        )}
        {user()?.favoriteProducts && (
          <Stack size="md">
            <h3 class="h4">Your Favorite Products</h3>
            <div class="default-grid">
              {user()?.favoriteProducts?.map((product) => (
                <ProductCard product={product} action={null} />
              ))}
            </div>
          </Stack>
        )}
        <Modal
          isOpen={presentStoreForm()}
          onClose={() => setPresentStoreForm(false)}
          title="Create a store"
        >
          <CreateStore onComplete={onComplete} />
        </Modal>
      </div>
    )

  return (
    <Suspense fallback={<Loading />}>
      <Content>
        <Stack size="md">
          <h1 class="h1">Account</h1>
          {data()?.error ? error : content()}
        </Stack>
      </Content>
    </Suspense>
  )
}
