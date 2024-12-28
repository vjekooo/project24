import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { Address, LoginResponse, MessageResponse } from '../../../types'
import { addressConfig, AddressConfig } from './config'

const url = 'address'

export const AddressForm = () => {
  const { validate, formSubmit, errors, updateFormField, form } = useForm<
    AddressConfig,
    Address
  >({
    config: addressConfig,
  })

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    const { data, error } = await $fetch<Address, MessageResponse>(url).post(
      form
    )
    console.log({ data, error: error.message })
  }

  return (
    <div class="flex justify-center">
      <form onSubmit={handleSubmit}>
        <div class="flex flex-col gap-2">
          {addressConfig.map((field) => {
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
        </div>
      </form>
    </div>
  )
}
