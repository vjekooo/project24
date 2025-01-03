import { Stack } from '../ui/Stack'
import { Store } from '../types'

interface Props {
  store: Store
}

export const Featured = ({ store }: Props) => {
  return (
    <a href={`/store/${store.id}`}>
      <div
        class="w-full mx-auto flex items-start p-12 md:pt-0 bg-cover bg-right relative mb-52"
        style={`max-width:1600px; height: 32rem; background-image: url('${store.media[0].imageUrl}');`}
      >
        <div class="flex flex-col justify-center p-6 tracking-wide bg-white opacity-90">
          <Stack gap={3}>
            <h1 class="text-black h1">{store.name}</h1>
          </Stack>
        </div>
        <div class="absolute sm mx-12 sm:mx-0 sm:w-80 tracking-wide bg-white top-52 sm:top-44 shadow-lg right-0 sm:right-24 p-5">
          {store.description}
        </div>
      </div>
    </a>
  )
}
