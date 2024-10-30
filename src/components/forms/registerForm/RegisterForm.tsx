import { createResource, createSignal } from 'solid-js'
import { $fetch } from '../../../utils/fetch'
import { createStore } from 'solid-js/store'

const url = 'auth/register'

const registerUser = async (formData) => {
  return $fetch(url).post(formData)
}

export const RegisterForm = () => {
  const [fields, setFields] = createStore({
    email: '',
    password: '',
    repeatPassword: '',
  })
  const [validatedFields, setValidatedFields] = createSignal(false)

  createResource(validatedFields, registerUser)

  return (
    <div class="flex justify-center">
      <div class="flex flex-col gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <input
            class="input"
            type="email"
            placeholder="Email"
            onInput={(e) => setFields('email', e.target.value)}
          />
          <input
            class="input"
            type="password"
            placeholder="Password"
            onInput={(e) => setFields('password', e.target.value)}
          />
          <input
            class="input"
            type="reapeatPassword"
            placeholder="Repeat Password"
            onInput={(e) => setFields('repeatPassword', e.target.value)}
          />
          <button class="btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
