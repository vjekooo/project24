import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { loginConfig, LoginConfig } from '../loginForm/config'
import { Address, LoginResponse } from '../../../types'
import { AddressConfig } from './config'

const url = 'address'

export const AddressForm = () => {
  const { validate, formSubmit, errors, updateFormField, form } = useForm<
    AddressConfig,
    Address
  >({
    config: loginConfig,
  })

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    await $fetch<Address, LoginResponse>(url)
      .post(form)
      .then((data) => {
        localStorage.setItem('token', data.accessToken)
      })
  }

  return (
    <div class="flex justify-center">
      <form onSubmit={handleSubmit}>
        <div class="flex flex-col gap-2">
          {loginConfig.map((field) => {
            return (
              <input
                class="input"
                type={field.type}
                placeholder={field.name}
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
