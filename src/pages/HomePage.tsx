import { ErrorBoundary } from 'solid-js'
import { Home } from '~/domain/Home'
import { Error } from '~/layout/Error'
import { Store } from '~/types'

interface Props {
  stores: Store[]
}

export const HomePage = (props: Props) => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Home stores={props.stores} />
    </ErrorBoundary>
  )
}
