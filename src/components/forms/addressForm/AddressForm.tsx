import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { Address, MessageResponse } from '../../../types'
import { addressConfig } from './config'
import { Toast } from '../../../lib/Toast'

const url = 'address/store'

interface Props {
  onComplete: () => void
}

export const AddressForm = (props: Props) => {
  const { ToastComponent, showToast } = Toast()
  const { validate, formSubmit, errors, updateFormField, form } =
    useForm<Address>({
      config: addressConfig,
    })

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    const { data, error } = await $fetch<Address, MessageResponse>(url).post(
      form
    )
    if (data) {
      showToast('Store created successfully')
      props.onComplete()
    } else {
      showToast(error?.message)
      props.onComplete()
    }
  }

  return (
    <div class="flex justify-center">
      <ToastComponent />
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
