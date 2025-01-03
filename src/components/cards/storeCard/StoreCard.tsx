import { Product, Store } from '../../../types'
import { JSX } from 'solid-js'
import { HeartIcon } from '../../../icons/HeartIcon'

interface Props {
  store: Store
  action: JSX.Element
}

export const StoreCard = ({ store, action }: Props) => {
  return (
    <div class="flex flex-col">
      <a href={`/store/${store.id}`}>
        <div class="relative w-full pt-[100%]">
          <img
            class="absolute top-0 left-0 w-full h-full object-cover hover:grow hover:shadow-lg"
            src={store.media[0].imageUrl}
            alt="product image"
          />
        </div>
      </a>
      <div class="pt-3 flex items-center justify-between">
        <p class="">{store.name}</p>
        {action && <div>{action}</div>}
      </div>
    </div>
  )
}
