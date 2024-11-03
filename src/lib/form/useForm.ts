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

interface Form {
  validate: any
  formSubmit: any
  errors: {
    email: string
    password: string
  }
  updateFormField: (fieldName: string) => (event: Event) => void
  form: {
    email: string
    password: string
  }
}

export function useForm({ errorClass }): Form {
  const [form, setForm] = createStore({
    email: '',
    password: '',
  })

  const [errors, setErrors] = createStore({
      email: '',
      password: '',
    }),
    fields = {}

  const validate = (ref) => {
    const validators = []
    let config
    fields[ref.name] = config = { element: ref, validators }
    ref.onblur = checkValid(config, setErrors, errorClass)
    ref.oninput = () => {
      if (!errors[ref.name]) return
      setErrors({ [ref.name]: undefined })
      errorClass && ref.classList.toggle(errorClass, false)
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

  return { validate, formSubmit, errors, updateFormField, form }
}
