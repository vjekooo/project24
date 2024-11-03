import { useContext } from 'solid-js'

import { AppContext, LoginResponse } from '../../../index'
import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { useNavigate } from '@solidjs/router'

interface LoginForm {
  email: string
  password: string
}

const loginUrl = 'auth/login'

const ErrorMessage = ({ error }) => <span class="error-message">{error}</span>

export const LoginForm = () => {
  const navigate = useNavigate()
  const { setState } = useContext(AppContext)
  const { validate, formSubmit, errors, updateFormField, form } = useForm({
    errorClass: 'error-input',
  })

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    const formData = {
      email: form.email,
      password: form.password,
    }
    await $fetch<LoginForm, LoginResponse>(loginUrl)
      .post(formData)
      .then((data) => {
        localStorage.setItem('token', data.accessToken)
        setState({ token: data.accessToken })
        navigate('/')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div class="flex flex-col gap-4">
        <div class="field-block">
          <input
            class="input"
            name="email"
            type="email"
            placeholder="Email"
            required
            onChange={updateFormField('email')}
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
            onChange={updateFormField('password')}
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
