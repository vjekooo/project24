import { Suspense, createSignal } from 'solid-js'
import { MessageResponse, User } from '~/types'
import { $fetch } from '~/utils/fetch'
import { Content } from '~/layout/Content'
import { Stack } from '~/ui/Stack'
import { Modal } from '~/components/modal/Modal'
import { StoreCard } from '~/components/cards/storeCard/StoreCard'
import { EditIcon } from '~/icons/EditIcon'
import { Loading } from '~/layout/Loading'
import { ProductCard } from '~/components/cards/productCard/ProductCard'
import { CreateStore } from './CreateStore'
import { DeleteIcon } from '~/icons/DeleteIcon'
import { Toast } from '~/lib/Toast'

const deleteStore = async (id: string) => {
  const fullUrl = `store/${id}`
  return await $fetch<{}, MessageResponse>(fullUrl).delete()
}

interface Props {
  user?: User
}

export const AccountDetails = (props: Props) => {
  if (!props.user) {
    return <Content>No data</Content>
  }

  const { ToastComponent, showToast } = Toast()

  const [presentStoreForm, setPresentStoreForm] = createSignal(false)

  const onDelete = async (id: string) => {
    const { data, error } = await deleteStore(id)
    if (data) {
      showToast(data.message)
    } else {
      // showToast(error.message)
    }
  }

  const onComplete = () => {
    setPresentStoreForm(false)
  }

  return (
    <Suspense fallback={<Loading />}>
      <Content>
        <Stack size="md">
          <h1 class="h1">Account</h1>
          <div class="flex flex-col gap-3">
            <ToastComponent />
            {props.user?.firstName && (
              <p>
                Hello {props.user.firstName} this is your Account page, where
                you can edit your account details
              </p>
            )}
            {!props.user?.stores?.length ? (
              <div class="flex flex-row gap-3">
                <p>You have no store on file</p>
              </div>
            ) : (
              <Stack>
                <h3 class="h3">Your Store</h3>
                {props.user?.stores && (
                  <div class="default-grid">
                    {props.user?.stores.map((store) => (
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
              <button
                class="btn-primary"
                onClick={() => setPresentStoreForm(true)}
              >
                Add Store
              </button>
            </div>
            {props.user?.favoriteStores && (
              <Stack size="md">
                <h3 class="h4">Your Favorite Stores</h3>
                <div class="default-grid">
                  {props.user?.favoriteStores?.map((store) => (
                    <StoreCard store={store} action={null} />
                  ))}
                </div>
              </Stack>
            )}
            {props.user?.favoriteProducts && (
              <Stack size="md">
                <h3 class="h4">Your Favorite Products</h3>
                <div class="default-grid">
                  {props.user?.favoriteProducts?.map((product) => (
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
        </Stack>
      </Content>
    </Suspense>
  )
}
