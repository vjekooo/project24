import { Accessor } from 'solid-js'
import { createStore } from 'solid-js/store'
import { $fetch } from '../../../utils/fetch'
import { User } from '../../../index'

type FormFields = {
  email: string
  password: string
}

const submit = async (url, form: FormFields) => {
  const dataToSubmit = {
    email: form.email,
    password: form.password,
  }
}

const useForm = () => {
  const [form, setForm] = createStore<FormFields>({
    email: '',
    password: '',
  })

  const clearField = (fieldName: string) => {
    setForm({
      [fieldName]: '',
    })
  }

  const updateFormField = (fieldName: string) => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement
    if (inputElement.type === 'checkbox') {
      setForm({
        [fieldName]: !!inputElement.checked,
      })
    } else {
      setForm({
        [fieldName]: inputElement.value,
      })
    }
  }

  return { form, submit, updateFormField, clearField }
}

export { useForm }
