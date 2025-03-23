import { ErrorBoundary } from 'solid-js'
import { SingleStore } from '~/domain/SingleStore'
import { Error } from '~/layout/Error'
import { Store } from '~/types'

interface Props {
  store?: Store
}

export const SingleStorePage = (props: Props) => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <SingleStore store={props.store} />
    </ErrorBoundary>
  )
}
