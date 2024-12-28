import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { MessageResponse, Product } from '../../../types'
import { productConfig, Config } from './config'

const url = 'store'

export const ProductForm = () => {
  const { validate, formSubmit, errors, updateFormField, form } = useForm<
    Config,
    Product
  >({ config: productConfig })

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    const { data, error } = await $fetch<Product, MessageResponse>(url).post(
      form
    )
    console.log({ data, error })
  }

  return (
    <div class="flex justify-center">
      <div class="flex flex-col gap-2">
        <form onSubmit={handleSubmit}>
          {productConfig.map((field) => {
            return (
              <input
                class="input"
                type={field.type}
                placeholder={field.label}
                onChange={updateFormField(field.name)}
              />
            )
          })}
          <button class="btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
