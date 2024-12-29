import { createEffect, createResource, createSignal } from 'solid-js'
import { AddressForm } from '../../components/forms/addressForm/AddressForm'
import { User } from '../../types'
import { $fetch, FetchData } from '../../utils/fetch'
import { StoreForm } from '../../components/forms/storeForm/StoreForm'
import { Content } from '../../layout/Content'
import { Stack } from '../../ui/Stack'
import { Modal } from '../../components/modal/Modal'

const userUrl = 'user'

async function fetchData() {
  return await $fetch<any, User>(userUrl).get()
}

export const Account = () => {
  const [user, setUser] = createSignal<User | null>(null)

  const [presentAddressForm, setPresentAddressForm] = createSignal(false)
  const [presentStoreForm, setPresentStoreForm] = createSignal(false)

  const [data] = createResource<FetchData<User>>(fetchData)

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
          <Stack gap={3}>
            <h3 class="h3">Address</h3>
            <Stack gap={3} horizontal>
              <span>{user()?.address.street}</span>
              <span>{user().address.houseNumber}</span>
            </Stack>
            <span>{user().address.postalCode}</span>
            <span>{user().address.city}</span>
          </Stack>
        )}
        {!user()?.store?.length ? (
          <div class="flex flex-row gap-3">
            <p>You have no store on file</p>
            <div>
              <button
                class="btn-primary"
                onClick={() => setPresentStoreForm(true)}
              >
                Add Store
              </button>
            </div>
            <Modal
              isOpen={presentStoreForm()}
              onClose={() => setPresentStoreForm(false)}
            >
              <StoreForm />
            </Modal>
          </div>
        ) : (
          <Stack gap={3}>
            <h3 class="h3">Store</h3>
            <span>{user().store[0]?.name}</span>
            <Stack gap={3} horizontal>
              <a href={`/account/store/${user()?.store[0].id}`}>
                edit your store
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
                width="24"
                height="24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 12h16m-6-6l6 6-6 6"
                />
              </svg>
            </Stack>
          </Stack>
        )}
      </div>
    )

  return (
    <Content>
      <Stack gap={6}>
        <h1 class="h1">Account</h1>
        {data()?.error ? error : content()}
      </Stack>
    </Content>
  )
}
