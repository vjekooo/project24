import {
  createEffect,
  createResource,
  createSignal,
  useContext,
} from 'solid-js'
import { useForm } from '../../utils/validation'
import { createStore } from 'solid-js/store'
import { AppContext } from '../../index'
import { $fetch } from '../../utils/fetch'

const url = 'http://0.0.0.0:8080/api/auth/login'

const ErrorMessage = ({ error }) => <span class="error-message">{error}</span>

export const LoginForm = () => {
  const { state, setState } = useContext(AppContext)
  const { validate, formSubmit, errors } = useForm({
    errorClass: 'error-input',
  })
  const [fields, setFields] = createStore({
    email: '',
    password: '',
  })

  const fn = (form) => {
    // form.submit()
    $fetch(url, fields)
      .post()
      .then((data) => {
        localStorage.setItem('token', data.token)
        setState({ user: { token: data.token } })
      })
    console.log('Done')
  }

  return (
    <form use:formSubmit={fn}>
      <div class="flex flex-col gap-4">
        <div class="field-block">
          <input
            class="input"
            name="email"
            type="email"
            placeholder="Email"
            required
            onInput={(e) => setFields('email', e.target.value)}
            use:validate
          />
          {errors.email && <ErrorMessage error={errors.email} />}
        </div>
        <div class="field-block">
          <input
            class="input"
            type="password"
            name="password"
            placeholder="Password"
            required
            onInput={(e) => setFields('password', e.target.value)}
            use:validate
          />
          {errors.password && <ErrorMessage error={errors.password} />}
        </div>
        <button class="btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}
