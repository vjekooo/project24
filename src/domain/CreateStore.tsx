import { createResource, createSignal } from 'solid-js'

import { StoreForm } from '~/components/forms/storeForm/StoreForm'
import { AddressForm } from '~/components/forms/addressForm/AddressForm'
import { $fetch } from '~/utils/fetch'
import { Category } from '~/types'

const categoryUrl = 'category'

async function fetchCategories() {
  return await $fetch<any, Category[]>(categoryUrl).get()
}

interface Props {
  onComplete: () => void
}

export const CreateStore = (props: Props) => {
  const [category] = createResource(fetchCategories)

  const [state, setState] = createSignal(1)

  const onStoreComplete = () => {
    setState(2)
  }

  const onComplete = () => {
    props.onComplete()
  }

  return (
    <div class="flex flex-col gap-4">
      <div class="flex gap-2">
        <p class={state() === 1 ? 'text-black underline' : 'text-gray-500'}>
          Store
        </p>
        <p class={state() === 2 ? 'text-black underline' : 'text-gray-500'}>
          Address
        </p>
      </div>
      {state() === 1 && (
        <StoreForm categories={category()?.data} onComplete={onStoreComplete} />
      )}
      {state() === 2 && <AddressForm onComplete={onComplete} />}
    </div>
  )
}
