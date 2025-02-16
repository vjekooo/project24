import { Product } from '../../../types'
import { JSX } from 'solid-js'

interface Props {
  product: Product
  action: JSX.Element
}

export const ProductCard = (props: Props) => {
  return (
    <div class="flex flex-col">
      <a href={`/product/${props.product.id}`}>
        <div class="relative w-full pt-[100%]">
          <img
            class="absolute top-0 left-0 w-full h-full object-cover hover:grow hover:shadow-lg"
            src={
              props.product.media.length > 0
                ? props.product.media[0].imageUrl
                : ''
            }
            alt="product image"
          />
        </div>
      </a>
      <div class="pt-3 flex items-center justify-between">
        <p class="">{props.product.name}</p>
        <div>{props.action || ''}</div>
      </div>
      <p class="pt-1 text-gray-900">
        {props.product.price > 0 ? props.product.price : 'Free'}
      </p>
    </div>
  )
}
