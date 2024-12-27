import { $fetch } from '../../../utils/fetch'
import { StoreConfig, storeConfig } from './config'
import { useForm } from '../../../lib/form/useForm'
import { MessageResponse, Store } from '../../../types'

const url = 'store'

export const StoreForm = () => {
  const { validate, formSubmit, errors, updateFormField, form } = useForm<
    StoreConfig,
    Store
  >({ config: storeConfig })

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    console.log(errors)
    await $fetch<Store, MessageResponse>(url)
      .post(form)
      .then((data) => {
        console.log(data.message)
      })
  }

  return (
    <div class="flex justify-center">
      <div class="flex flex-col gap-2">
        <form onSubmit={handleSubmit}>
          {storeConfig.map((field) => {
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
