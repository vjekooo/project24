import { Product } from '../../../types'
import { JSX } from 'solid-js'

interface Props {
  product: Product
  action: JSX.Element
}

export const ProductCard = ({ product, action }: Props) => {
  return (
    <div class="flex flex-col">
      <a href={`/product/${product.id}`}>
        <div class="relative w-full pt-[100%]">
          <img
            class="absolute top-0 left-0 w-full h-full object-cover hover:grow hover:shadow-lg"
            src={product.media[0].imageUrl}
            alt="product image"
          />
        </div>
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
