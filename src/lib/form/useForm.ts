import { createStore } from 'solid-js/store'

function checkValid({ element, validators = [] }, setErrors, errorClass) {
  return async () => {
    element.setCustomValidity('')
    element.checkValidity()
    let message = element.validationMessage
    if (!message) {
      for (const validator of validators) {
        const text = await validator(element)
        if (text) {
          element.setCustomValidity(text)
          break
        }
      }
      message = element.validationMessage
    }
    if (message) {
      errorClass && element.classList.toggle(errorClass, true)
      setErrors({ [element.name]: message })
    }
  }
}

interface Form<T> {
  validate: any
  formSubmit: any
  errors: T
  updateFormField: (
    fieldName: string,
    multiple?: boolean
  ) => (event: Event) => void
  setDefaultValue: (fieldName: string, value: string) => void
  form: T
  isFormValid: boolean
}

export function useForm<T, R>({ config }: { config: T[] }): Form<R> {
  const errorClass = 'error-input'

  // @ts-ignore
  const state = config.reduce((acc, { name }) => {
    acc[name] = ''
    return acc
  }, {})

  const [form, setForm] = createStore({
    ...state,
  })

  const [errors, setErrors] = createStore({
      ...state,
    }),
    fields = {}

  const validate = (ref: any) => {
    const name = ref.name
    const value = form[name]
    if (!ref.validation) {
      return
    }
    if (ref.validation(value)) {
      setErrors({ [name]: ref.validation(value) })
    }
  }

  const formSubmit = (ref, accessor) => {
    const callback = accessor() || (() => {})
    ref.setAttribute('novalidate', '')
    ref.onsubmit = async (e) => {
      e.preventDefault()
      let errored = false

      for (const k in fields) {
        const field = fields[k]
        await checkValid(field, setErrors, errorClass)()
        if (!errored && field.element.validationMessage) {
          field.element.focus()
          errored = true
        }
      }
      !errored && callback(ref)
    }
  }

  const setDefaultValue = (fieldName: string, value: string) => {
    setForm({
      [fieldName]: value,
    })
  }

  const updateFormField =
    (fieldName: string, multiple?: boolean) => (event: Event) => {
      const inputElement = event.currentTarget as HTMLInputElement
      if (inputElement.type === 'checkbox') {
        setForm({
          [fieldName]: !!inputElement.checked,
        })
      } else {
        if (multiple) {
          setForm({
            [fieldName]: [...state[fieldName], inputElement.value],
          })
        } else {
          setForm({
            [fieldName]: inputElement.value,
          })
        }
      }
    }

  const isFormValid = () => {
    for (const k in errors) {
      const field = errors[k]
      if (field.length > 0) {
        return false
      }
    }
    return true
  }

  return {
    validate,
    formSubmit,
    // @ts-ignore
    errors,
    updateFormField,
    setDefaultValue,
    // @ts-ignore
    form,
    isFormValid: isFormValid(),
  }
}
