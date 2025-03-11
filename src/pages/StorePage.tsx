import { ErrorBoundary } from 'solid-js'
import { Store } from '../domain/Store'
import { Error } from '../layout/Error'

export const StorePage = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Store />
    </ErrorBoundary>
  )
}
