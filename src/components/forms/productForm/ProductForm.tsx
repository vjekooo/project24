import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import {
  Category,
  MessageResponse,
  Option,
  Product,
  Store,
} from '../../../types'
import { productConfig as config } from './config'
import { Stack } from '../../../ui/Stack'
import { Accessor, For } from 'solid-js'
import { ErrorMessage } from '../../../ui/ErrorMessage'
import { Toast } from '../../../lib/Toast'

const url = 'product'

interface Props {
  store: Store
  product?: Accessor<Product>
  categories: Category[]
  onClose: (message: string) => void
}

const createSubCategories = (categories: Category[]): Option[] => {
  if (!categories) return []
  const subCategories: Category[] = []
  categories.map((category) => {
    subCategories.push(...category.subCategories)
  })
  subCategories.unshift({ id: '0L', name: 'Select category', description: '' })
  return subCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }))
}

export const ProductForm = (props: Props) => {
  const store = props.store
  const product = props.product
  const onClose = props.onClose

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
        <Stack size="md">
          <For each={config}>
            {(item) => {
              if (item.type === 'text') {
                return (
                  <Stack size="md">
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
              } else {
                return (
                  <select
                    name={item.name}
                    class="input"
                    onChange={updateFormField(item.name, item.isArray)}
                    // @ts-ignore
                    use:validate={item.validation}
                  >
                    {createSubCategories(props.categories).map((option) => (
                      <option value={option.value}>{option.label}</option>
                    ))}
                  </select>
                )
              }
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
