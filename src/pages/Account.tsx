import {
  createEffect,
  createResource,
  createSignal,
  useContext,
} from 'solid-js'
import { AddressForm } from '../components/forms/addressForm/AddressForm'
import { User } from '../types'
import { $fetch } from '../utils/fetch'
import { StoreForm } from '../components/forms/storeForm/StoreForm'
import { AppContext } from '../index'
import { Content } from '../layout/Content'

const userUrl = 'user'

async function fetchData(source, { value, refetching }): Promise<User> {
  const token = localStorage.getItem('token')
  if (!token) return
  const { data } = await $fetch<any, User>(userUrl).get()
  return data
}

export const Account = () => {
  const { state } = useContext(AppContext)

  const [user, setUser] = createSignal<User>()

  createEffect(() => {
    setUser(state.user)
  }, [state.user])

  return (
    <Content>
      <div class="flex flex-col gap-3">
        {user()?.firstName && (
          <p>
            Hello {user().firstName} this is your Account page, where you can
            edit your account details
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
    </Content>
  )
}
