import { createResource } from 'solid-js'
import { AddressForm } from '../components/forms/addressForm/AddressForm'
import { User } from '../types'
import { $fetch } from '../utils/fetch'
import { StoreForm } from '../components/forms/storeForm/StoreForm'

const userUrl = 'user'

async function fetchData(source, { value, refetching }): Promise<User> {
  const token = localStorage.getItem('token')
  if (!token) return
  return await $fetch<any, User>(userUrl).get()
}

export const Account = () => {
  const [data, { mutate, refetch }] = createResource(fetchData)
  return (
    <div class="flex flex-col gap-3">
      {data() && (
        <p>
          Hello {data().firstName} this is your Account page, where you can edit
          your account details
        </p>
      )}
      {!data()?.address && (
        <div class="flex flex-row gap-3">
          <p>You have no address on file</p>
          <AddressForm />
        </div>
      )}
      {!data()?.store && (
        <div class="flex flex-row gap-3">
          <p>You have no store on file</p>
          <StoreForm />
        </div>
      )}
    </div>
  )
}
