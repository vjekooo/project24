import { Store } from '../../../types'
import { JSX } from 'solid-js'

interface Props {
  store: Store
  action: JSX.Element
}

export const StoreCard = (props: Props) => {
  return (
    <div class="flex flex-col">
      <a href={`/store/${props.store.id}`}>
        <div class="relative w-full pt-[100%]">
          <img
            class="absolute top-0 left-0 w-full h-full object-cover hover:grow hover:shadow-lg"
            src={props.store.media[0]?.imageUrl}
            alt="Store image"
          />
        </div>
      </a>
      <div class="pt-3 flex items-center justify-between">
        <p class="">{props.store.name}</p>
        <div>{props.action || ''}</div>
      </div>
    </div>
  )
}
