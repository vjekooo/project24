import { createSignal, onCleanup, For } from 'solid-js'
import { Stack } from '../ui/Stack'
import { Store } from '../types'

interface HeroActionProps {
  storeId: string
}

const HeroAction = ({ storeId }: HeroActionProps) => (
  <a
    class="text-xl inline-block underline leading-relaxed hover:text-black hover:border-black"
    href={`/store/${storeId}`}
  >
    go to store
  </a>
)

interface Props {
  stores: Store[]
  interval?: number
}

export const HomeHero = (props: Props) => {
  const [currentIndex, setCurrentIndex] = createSignal(0)
  const interval = props.interval || 10000

  const slideInterval = setInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % props.stores.length)
  }, interval)

  onCleanup(() => clearInterval(slideInterval))

  const currentStore = () => props.stores[currentIndex()]

  return (
    <section
      class="w-full mx-auto bg-nordic-gray-light flex p-12 md:pt-0 items-end bg-cover bg-right relative overflow-hidden"
      style={{
        'max-width': '1600px',
        height: '32rem',
      }}
    >
      <For each={props.stores}>
        {(store, index) => (
          <div
            class={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index() === currentIndex() ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              'background-image': `url('${store.media[0]?.imageUrl}')`,
              'background-size': 'cover',
              'background-position': 'right',
            }}
          ></div>
        )}
      </For>

      <div class="flex flex-col justify-center items-start p-6 tracking-wide bg-white opacity-70 z-10 relative">
        <Stack>
          <h1 class="text-black h1">{currentStore().name}</h1>
          <HeroAction storeId={currentStore().id} />
        </Stack>
      </div>

      <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        <For each={props.stores}>
          {(_, index) => (
            <button
              class={`w-3 h-3 rounded-full ${
                currentIndex() === index() ? 'bg-black' : 'bg-gray-400'
              }`}
              onclick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index() + 1}`}
            ></button>
          )}
        </For>
      </div>
    </section>
  )
}
