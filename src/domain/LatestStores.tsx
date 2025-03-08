import { Stack } from '../ui/Stack'
import { HeartIcon } from '../icons/HeartIcon'
import { $fetch } from '../utils/fetch'
import { FavoriteStore, Store } from '../types'
import { createResource } from 'solid-js'
import { StoreCard } from '../components/cards/storeCard/StoreCard'

const url = 'store/all'

const fetchStores = async () => {
  return await $fetch<any, Store[]>(url).get()
}

interface Props {
  favorites: FavoriteStore[]
  onFavClick: (id: string) => void
}

export const LatestStores = (props: Props) => {
  const favorites = props.favorites
  const onFavClick = props.onFavClick

  const [stores] = createResource(fetchStores)

  return (
    <Stack size="md">
      <h3 class="h3 uppercase">Popular products</h3>
      <div class="default-grid pb-16">
        {stores()?.data?.map((store) => (
          <StoreCard
            store={store}
            action={
              <HeartIcon
                isFilled={() =>
                  favorites?.some((favorite) => favorite.storeId === store.id)
                }
                onClick={() => onFavClick(store.id)}
              />
            }
          />
        ))}
      </div>
    </Stack>
  )
}
