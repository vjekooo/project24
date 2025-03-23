import { createAsync, query, useParams } from '@solidjs/router'

import { Store } from '~/types'
import { getApiDomain } from '~/lib/getApiDomain'
import { headers } from '~/utils/headers'
import { createEffect, createSignal } from 'solid-js'
import { UserStore } from '~/domain/UserStore'

const url = 'store/'

interface Response {
  data?: Store
  error?: number
}

const getStore = query(async (id: string) => {
  const fullUrl = getApiDomain() + url + id
  const response = await fetch(fullUrl, headers())
  if (!response.ok) {
    return { error: response.status, data: undefined }
  }
  return { data: (await response.json()) as Store, error: undefined }
}, 'userStore')

export default function UserStorePage() {
  const params = useParams()
  const [currentId, setCurrentId] = createSignal(params.id as string)

  createEffect(() => {
    if (params.id !== currentId()) {
      setCurrentId(params.id as string)
    }
  })

  const response = createAsync<Response>(() => getStore(currentId()))
  const store = () => response()?.data

  return (
    <main>
      <UserStore store={store()} />
    </main>
  )
}
