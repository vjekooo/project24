import { createEffect, createResource, createSignal } from 'solid-js'
import { AddressForm } from '../components/forms/addressForm/AddressForm'
import { User } from '../types'
import { $fetch, FetchData } from '../utils/fetch'
import { StoreForm } from '../components/forms/storeForm/StoreForm'
import { Content } from '../layout/Content'
import { Stack } from '../ui/Stack'

const userUrl = 'user'

async function fetchData(source, { value, refetching }) {
  const token = localStorage.getItem('token')
  if (!token) return
  return await $fetch<any, User>(userUrl).get()
}

export const Account = () => {
  // const { state } = useContext(AppContext)
  const [user, setUser] = createSignal<User>()

  const [data, { mutate, refetch }] = createResource<FetchData<User>>(fetchData)

  createEffect(() => {
    if (data()) {
      setUser(data().data)
    }
  }, [data()])

  const content = data.loading ? (
    <div>Loading...</div>
  ) : (
    <div class="flex flex-col gap-3">
      {user()?.firstName && (
        <p>
          Hello {user().firstName} this is your Account page, where you can edit
          your account details
        </p>
      )}
      {!user()?.address && (
        <div class="flex flex-row gap-3">
          <p>You have no address on file</p>
          <AddressForm />
        </div>
      )}
      {!user()?.store?.length && (
        <div class="flex flex-row gap-3">
          <p>You have no store on file</p>
          <StoreForm />
        </div>
      )}
    </div>
  )

  return (
    <Content>
      <Stack gap={6}>
        <h1>Account</h1>
        {content}
      </Stack>
    </Content>
  )
}
