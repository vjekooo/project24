import { ErrorBoundary } from 'solid-js'
import { Account } from '../../domain/account/Account'
import { Error } from '../../layout/Error'

export const AccountPage = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Account />
    </ErrorBoundary>
  )
}
