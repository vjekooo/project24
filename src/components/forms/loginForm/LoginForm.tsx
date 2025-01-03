import { useContext } from 'solid-js'
import { useNavigate } from '@solidjs/router'

import { AppContext } from '../../../index'
import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { LoginResponse } from '../../../types'
import { loginConfig } from './config'
import { ErrorMessage } from '../../../ui/ErrorMessage'

interface Props {
  formSwitcher: (value: string) => void
  onComplete: () => void
}

interface LoginForm {
  email: string
  password: string
}

const loginUrl = 'auth/login'

export const LoginForm = ({ formSwitcher, onComplete }: Props) => {
  const navigate = useNavigate()
  const { state, setState } = useContext(AppContext)
  const { formSubmit, errors, updateFormField } = useForm<LoginForm>({
    config: loginConfig,
  })

  const handleSubmit = async (_: Event, form: LoginForm) => {
    const { data } = await $fetch<LoginForm, LoginResponse>(loginUrl).post(form)

    if (data?.accessToken) {
      localStorage.setItem('token', data?.accessToken)
      setState({ ...state, token: data?.accessToken })
      navigate('/')
      onComplete()
    }
  }

  return (
    // @ts-ignore
    <form use:formSubmit={handleSubmit}>
      <div class="flex flex-col gap-6 mt-5">
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
          Sign In
        </button>
        <div class="flex justify-center">or</div>
        <button
          class="btn-primary-inverse"
          type="submit"
          onClick={() => formSwitcher('register')}
        >
          Create Account
        </button>
      </div>
    </form>
  )
}
