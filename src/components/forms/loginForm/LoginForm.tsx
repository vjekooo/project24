import { useContext } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import { AppContext } from '../../../index'
import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { LoginResponse } from '../../../types'
import { LoginConfig, loginConfig } from './config'

interface LoginForm {
  email: string
  password: string
}

const loginUrl = 'auth/login'

const ErrorMessage = ({ error }) => <span class="error-message">{error}</span>

export const LoginForm = () => {
  const navigate = useNavigate()
  const { setState } = useContext(AppContext)
  const { validate, formSubmit, errors, updateFormField, form } = useForm<
    LoginConfig,
    LoginForm
  >({
    config: loginConfig,
  })

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    await $fetch<LoginForm, LoginResponse>(loginUrl)
      .post(form)
      .then((data) => {
        localStorage.setItem('token', data.accessToken)
        setState({ token: data.accessToken })
        navigate('/')
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div class="flex flex-col gap-4">
        {loginConfig.map((field) => {
          return (
            <div class="field-block">
              <input
                class="input"
                type={field.type}
                placeholder={field.name}
                onChange={updateFormField(field.name)}
              />
              {errors[field.name] && (
                <ErrorMessage error={errors[field.name]} />
              )}
            </div>
          )
        })}
        <button class="btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  )
}
