import { Product } from '../../../types'
import { JSX } from 'solid-js'

interface Props {
  product: Product
  action: JSX.Element
}

const calculatePrice = (price: number, discount: number) => {
  const discountedPrice = discount ? price - (price * discount) / 100 : null
  return (
    <div>
      € <span class={discount ? 'line-through' : ''}>{price}</span>{' '}
      {discountedPrice}
    </div>
  )
}

export const ProductCard = (props: Props) => {
  const product = props.product

  return (
    <div class="flex flex-col">
      <a href={`/product/${product.id}`}>
        <div class="w-full">
          <img
            class="w-full aspect-square object-cover hover:grow hover:shadow-lg"
            src={product.media.length > 0 ? product.media[0].imageUrl : ''}
            alt="Product image"
          />
        </div>
      </a>
      <div class="pt-3 flex items-center justify-between">
        <p class="">{product.name}</p>
        <div>{props.action || ''}</div>
      </div>
      <p class="pt-1 text-gray-900">
        {product.price > 0
          ? calculatePrice(product.price, product.discount)
          : 'Free'}
      </p>
    </div>
  )
}
