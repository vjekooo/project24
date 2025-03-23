import { createAsync, query } from '@solidjs/router'

import { User } from '~/types'
import { getApiDomain } from '~/lib/getApiDomain'
import { headers } from '~/utils/headers'
import { AccountDetails } from '~/domain/AccountDetails'

const url = 'user'

interface Response {
  data?: User
  error?: number
}

const getUser = query(async () => {
  const fullUrl = getApiDomain() + url
  const response = await fetch(fullUrl, headers())
  if (!response.ok) {
    return { error: response.status, data: undefined }
  }
  return { data: (await response.json()) as User, error: undefined }
}, 'user')

export default function AccountPage() {
  const response = createAsync<Response>(() => getUser())
  const user = () => response()?.data

  return (
    <main>
      <AccountDetails user={user()} />
    </main>
  )
}
