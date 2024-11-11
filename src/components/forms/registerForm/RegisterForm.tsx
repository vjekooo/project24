import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { registerConfig, RegisterConfig } from './config'

interface Props {
  formSwitcher: (value: string) => void
}

interface RegisterForm {
  email: string
  password: string
}

const url = 'auth/register'

const ErrorMessage = ({ error }) => <span class="error-message">{error}</span>

export const RegisterForm = ({ formSwitcher }: Props) => {
  const { form, errors, validate, updateFormField, isFormValid } = useForm<
    RegisterConfig,
    RegisterForm
  >({
    config: registerConfig,
  })

  const handleSubmit = async (event: Event) => {
    event.preventDefault()
    await $fetch<RegisterForm, null>(url)
      .post(form)
      .then((data) => {
        // do nothing
      })
  }

  return (
    <div class="flex justify-center">
      <div class="flex flex-col gap-2">
        <form onSubmit={handleSubmit}>
          <div class="flex flex-col gap-6">
            {registerConfig.map((field) => {
              return (
                <div class="field-block ">
                  <input
                    {...validate(field)}
                    class="input"
                    type={field.type}
                    placeholder={field.placeholder}
                    onChange={updateFormField(field.name)}
                  />
                  {errors[field.name] && (
                    <ErrorMessage error={errors[field.name]} />
                  )}
                </div>
              )
            })}
            <button class="btn-primary" type="submit" disabled={!isFormValid}>
              Submit
            </button>
            <div class="flex justify-center">or</div>
            <button
              class="btn-primary-inverse"
              type="submit"
              onClick={() => formSwitcher('login')}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
