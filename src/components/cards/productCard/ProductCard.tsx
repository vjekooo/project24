import { Product } from '../../../types'
import { JSX } from 'solid-js'

interface Props {
  product: Product
  action: JSX.Element
}

export const ProductCard = ({ product, action }: Props) => {
  return (
    <div class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col">
      <a href={`/product/${product.id}`}>
        <img
          class="hover:grow hover:shadow-lg"
          src={product.media[0].imageUrl}
          alt="product image"
        />
      </a>
      <div class="pt-3 flex items-center justify-between">
        <p class="">{product.name}</p>
        {action && <div>{action}</div>}
      </div>
      <p class="pt-1 text-gray-900">
        {product.price > 0 ? product.price : 'Free'}
      </p>
    </div>
  )
}
