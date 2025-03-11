import { ErrorBoundary } from 'solid-js'
import { UserStore } from '../../domain/account/UserStore'
import { Error } from '../../layout/Error'

export const UserStorePage = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <UserStore />
    </ErrorBoundary>
  )
}
