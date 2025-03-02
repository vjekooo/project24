import { Suspense, createEffect, createResource, createSignal } from 'solid-js'
import { AddressForm } from '../../components/forms/addressForm/AddressForm'
import { Category, User } from '../../types'
import { $fetch } from '../../utils/fetch'
import { StoreForm } from '../../components/forms/storeForm/StoreForm'
import { Content } from '../../layout/Content'
import { Stack } from '../../ui/Stack'
import { Modal } from '../../components/modal/Modal'
import { StoreCard } from '../../components/cards/storeCard/StoreCard'
import { EditIcon } from '../../icons/EditIcon'
import { Loading } from '../../layout/Loading'
import { ProductCard } from '../../components/cards/productCard/ProductCard'

const userUrl = 'user'
const categoryUrl = 'category'

async function fetchData() {
  return await $fetch<any, User>(userUrl).get()
}

async function fetchCategories() {
  return await $fetch<any, Category[]>(categoryUrl).get()
}

export const Account = () => {
  const [user, setUser] = createSignal<User | null>(null)

  const [presentAddressForm, setPresentAddressForm] = createSignal(false)
  const [presentStoreForm, setPresentStoreForm] = createSignal(false)

  const [data] = createResource(fetchData)

  const [category] = createResource(fetchCategories)

  createEffect(() => {
    if (data()) {
      setUser(data().data)
    }
  })

  const error = <div>Error loading data...</div>

  const content = () =>
    data.loading ? (
      <div>Loading...</div>
    ) : (
      <div class="flex flex-col gap-3">
        {user()?.firstName && (
          <p>
            Hello {user().firstName} this is your Account page, where you can
            edit your account details
          </p>
        )}
        {!user()?.address ? (
          <div class="flex flex-row gap-3">
            <p>You have no address on file</p>
            <div>
              <button
                class="btn-primary"
                onClick={() => setPresentAddressForm(true)}
              >
                Add Address
              </button>
            </div>
            <Modal
              isOpen={presentAddressForm()}
              onClose={() => setPresentAddressForm(false)}
            >
              <AddressForm />
            </Modal>
          </div>
        ) : (
          <Stack>
            <h3 class="h3">Address</h3>
            <Stack horizontal>
              <span>{user()?.address.street}</span>
              <span>{user().address.houseNumber}</span>
            </Stack>
            <span>{user().address.postalCode}</span>
            <span>{user().address.city}</span>
          </Stack>
        )}
        {!user()?.stores?.length ? (
          <div class="flex flex-row gap-3">
            <p>You have no store on file</p>
          </div>
        ) : (
          <Stack>
            <h3 class="h3">Your Store</h3>
            <div class="w-56">
              <StoreCard
                store={user()?.stores[0]}
                action={
                  <a href={`/account/store/${user()?.stores[0].id}`}>
                    <EditIcon />
                  </a>
                }
              />
            </div>
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
          title="Add a store"
        >
          <StoreForm
            store={null}
            categories={category()?.data}
            onComplete={() => setPresentStoreForm(false)}
          />
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
