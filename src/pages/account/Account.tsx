import { createEffect, createResource, createSignal } from 'solid-js'
import { AddressForm } from '../../components/forms/addressForm/AddressForm'
import { User } from '../../types'
import { $fetch, FetchData } from '../../utils/fetch'
import { StoreForm } from '../../components/forms/storeForm/StoreForm'
import { Content } from '../../layout/Content'
import { Stack } from '../../ui/Stack'
import { Modal } from '../../components/modal/Modal'

const userUrl = 'user'

async function fetchData(source, { value, refetching }) {
  return await $fetch<any, User>(userUrl).get()
}

export const Account = () => {
  const [user, setUser] = createSignal<User | null>(null)

  const [presentAddressForm, setPresentAddressForm] = createSignal(false)
  const [presentStoreForm, setPresentStoreForm] = createSignal(false)

  const [data, { mutate, refetch }] = createResource<FetchData<User>>(fetchData)

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
            <h2>Your address is:</h2>
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
            <h2>Your store is:</h2>
            <span>{user().store[0]?.name}</span>
            <span>{user().store[0]?.description}</span>
            <a href={`/account/store/${user()?.store[0].id}`}>go to store</a>
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
