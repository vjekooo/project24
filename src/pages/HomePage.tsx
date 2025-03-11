import { ErrorBoundary } from 'solid-js'
import { Home } from '../domain/Home'
import { Error } from '../layout/Error'

export const HomePage = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Home />
    </ErrorBoundary>
  )
}
