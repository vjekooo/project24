import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { MessageResponse, Product, Store } from '../../../types'
import { productConfig, Config } from './config'
import { Stack } from '../../../ui/Stack'
import { Accessor } from 'solid-js'

const url = 'product'

interface Props {
  store: Store
  product?: Accessor<Product>
  onClose: () => void
}

export const ProductForm = ({ store, product, onClose }: Props) => {
  const { validate, formSubmit, errors, updateFormField, form } = useForm<
    Config,
    Product
  >({ config: productConfig })

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    const newProduct = {
      ...form,
      image: [form.image],
      storeId: store.id,
    }
    if (product()?.id) {
      const { data } = await $fetch<Product, MessageResponse>(url).put(
        // @ts-ignore
        {
          ...newProduct,
          id: product()?.id,
        }
      )
      if (data) {
        onClose()
      }
    } else {
      const { data } = await $fetch<Product, MessageResponse>(url).post(
        // @ts-ignore
        newProduct
      )
      if (data) {
        onClose()
      }
    }
  }

  return (
    <div class="flex flex-col gap-2">
      <form onSubmit={handleSubmit}>
        <Stack gap={6}>
          {productConfig.map((field) => {
            return (
              <input
                class="input"
                type={field.type}
                placeholder={field.label}
                onChange={updateFormField(field.name)}
                value={product()?.[field.name] || ''}
              />
            )
          })}
          <button class="btn-primary" type="submit">
            Submit
          </button>
        </Stack>
      </form>
    </div>
  )
}
