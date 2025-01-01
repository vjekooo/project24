import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { MessageResponse, Product, Store } from '../../../types'
import { productConfig as config, Config } from './config'
import { Stack } from '../../../ui/Stack'
import { Accessor, For } from 'solid-js'
import { ErrorMessage } from '../../../ui/ErrorMessage'

const url = 'product'

interface Props {
  store: Store
  product?: Accessor<Product>
  onClose: () => void
}

export const ProductForm = ({ store, product, onClose }: Props) => {
  const {
    updateFormField,
    errors,
    formSubmit,
    validate,
    cleanFormData,
    isFormValid,
  } = useForm<Config, Product>({
    config,
    defaultState: product(),
  })

  const handleSubmit = async (_: HTMLFormElement, data: Product) => {
    const cleanData = cleanFormData(data)

    const newProduct = {
      ...cleanData,
      storeId: store.id,
    }

    if (product && product()?.id) {
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
      {/*@ts-ignore*/}
      <form use:formSubmit={handleSubmit}>
        <Stack gap={6}>
          <For each={config}>
            {(item) => {
              return (
                <Stack gap={2}>
                  <input
                    // @ts-ignore
                    use:validate={item.validation}
                    class="input"
                    name={item.name}
                    type={item.type}
                    placeholder={item.label}
                    onChange={updateFormField(item.name, item.multiple)}
                    value={product()?.[item.name] || ''}
                  />
                  {errors[item.name] && (
                    <ErrorMessage error={errors[item.name]} />
                  )}
                </Stack>
              )
            }}
          </For>

          <button class="btn-primary" type="submit" disabled={!isFormValid()}>
            Submit
          </button>
        </Stack>
      </form>
    </div>
  )
}
