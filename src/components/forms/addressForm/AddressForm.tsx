import { createResource, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { $fetch } from '../../../utils/fetch'

const url = 'address'

const createAddress = async (formData) => {
  return $fetch(url).post(formData)
}

export const AddressForm = () => {
  const [fields, setFields] = createStore({
    street: '',
    houseNumber: '',
    city: '',
    postalCode: '',
  })

  const [isValid, setIsValid] = createSignal(false)

  const [data] = createResource(isValid, () => createAddress(fields))

  return (
    <div class="flex justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setIsValid(true)
        }}
      >
        <div class="flex flex-col gap-2">
          <input
            class="input"
            type="text"
            name="street"
            placeholder="Street"
            onInput={(e) => setFields('street', e.target.value)}
          />
          <input
            class="input"
            type="text"
            name="houseNumber"
            placeholder="Number"
            onInput={(e) => setFields('houseNumber', e.target.value)}
          />
          <input
            class="input"
            type="text"
            name="city"
            placeholder="City"
            onInput={(e) => setFields('city', e.target.value)}
          />
          <input
            class="input"
            type="text"
            name="postalCode"
            placeholder="ZipCode"
            onInput={(e) => setFields('postalCode', e.target.value)}
          />
          <button class="btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
