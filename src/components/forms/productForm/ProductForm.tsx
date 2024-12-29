import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { MessageResponse, Product, Store } from '../../../types'
import { productConfig as config, Config } from './config'
import { Stack } from '../../../ui/Stack'
import { Accessor } from 'solid-js'

const url = 'product'

interface Props {
  store: Store
  product?: Accessor<Product>
  onClose: () => void
}

export const ProductForm = ({ store, product, onClose }: Props) => {
  const { updateFormField, setDefaultValue, form } = useForm<Config, Product>({
    config,
  })

  const handleSubmit = async (event: Event) => {
    event.preventDefault()

    const newProduct = {
      ...form,
      storeId: store.id,
    }

    if (product()?.id) {
      const { data } = await $fetch<Product, MessageResponse>(url).put({
        ...newProduct,
        id: product()?.id,
      })
      if (data) {
        onClose()
      }
    } else {
      const { data } = await $fetch<Product, MessageResponse>(url).post(
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
          {config.map((field) => {
            if (product()) {
              setDefaultValue(field.name, product()?.[field.name])
            }
            return (
              <input
                class="input"
                type={field.type}
                placeholder={field.label}
                onChange={updateFormField(field.name, field.multiple)}
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
