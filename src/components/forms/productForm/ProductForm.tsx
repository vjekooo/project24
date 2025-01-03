import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { MessageResponse, Product, Store } from '../../../types'
import { productConfig as config } from './config'
import { Stack } from '../../../ui/Stack'
import { Accessor, For } from 'solid-js'
import { ErrorMessage } from '../../../ui/ErrorMessage'
import { Toast } from '../../../lib/Toast'

const url = 'product'

interface Props {
  store: Store
  product?: Accessor<Product>
  onClose: (message: string) => void
}

export const ProductForm = ({ store, product, onClose }: Props) => {
  const {
    updateFormField,
    errors,
    formSubmit,
    validate,
    cleanFormData,
    isFormValid,
  } = useForm<Product>({
    config,
    defaultState: product(),
  })

  const { ToastComponent, showToast } = Toast()

  const handleSubmit = async (_: HTMLFormElement, data: Product) => {
    const cleanData = cleanFormData(data)

    const newProduct = {
      ...cleanData,
      storeId: store.id,
    }

    if (product && product()?.id) {
      const { data, error } = await $fetch<Product, MessageResponse>(url).put({
        ...newProduct,
        id: product()?.id,
      })
      if (data) {
        onClose(data.message)
      }
      if (error) {
        showToast(error.message)
      }
    } else {
      const { data, error } = await $fetch<Product, MessageResponse>(url).post(
        newProduct
      )
      if (data) {
        onClose(data.message)
      }
      if (error) {
        showToast(error.message)
      }
    }
  }

  return (
    <div class="flex flex-col gap-2">
      <ToastComponent />
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
                    onChange={updateFormField(item.name, item.isArray)}
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
