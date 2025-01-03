import { ErrorBoundary } from 'solid-js'
import { HomeComponent } from '../domain/HomeComponent'
import { Error } from '../layout/Error'

export const HomePage = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <HomeComponent />
    </ErrorBoundary>
  )
}
