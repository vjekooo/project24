import { ErrorBoundary } from 'solid-js'
import { Product } from '../domain/Product'
import { Error } from '../layout/Error'

export const ProductPage = () => {
  return (
    <ErrorBoundary fallback={<Error />}>
      <Product />
    </ErrorBoundary>
  )
}
