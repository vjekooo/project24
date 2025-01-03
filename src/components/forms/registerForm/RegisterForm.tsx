import { $fetch } from '../../../utils/fetch'
import { useForm } from '../../../lib/form/useForm'
import { registerConfig } from './config'
import { ErrorMessage } from '../../../ui/ErrorMessage'
import { Stack } from '../../../ui/Stack'

interface Props {
  formSwitcher: (value: string) => void
}

interface RegisterForm {
  email: string
  password: string
}

const url = 'auth/register'

export const RegisterForm = ({ formSwitcher }: Props) => {
  const { errors, validate, formSubmit, updateFormField, isFormValid } =
    useForm<RegisterForm>({
      config: registerConfig,
    })

  const handleSubmit = async (_: Event, form: RegisterForm) => {
    await $fetch<RegisterForm, null>(url)
      .post(form)
      .then((data) => {
        // do nothing
      })
  }

  return (
    <div class="flex justify-center">
      <div class="flex flex-col gap-2">
        {/*@ts-ignore*/}
        <form use:formSubmit={handleSubmit}>
          <div class="flex flex-col gap-6">
            {registerConfig.map((field) => {
              return (
                <Stack gap={2}>
                  <input
                    // @ts-ignore
                    use:validate={field.validation}
                    class="input"
                    type={field.type}
                    placeholder={field.placeholder}
                    onChange={updateFormField(field.name)}
                  />
                  {errors[field.name] && (
                    <ErrorMessage error={errors[field.name]} />
                  )}
                </Stack>
              )
            })}
            <button class="btn-primary" type="submit" disabled={!isFormValid()}>
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
