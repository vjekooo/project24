import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'

const cleanFormData = (data: any) => {
  return Object.keys(data).reduce((acc, key) => {
    if (data[key] !== '') {
      acc[key] = data[key]
    }
    return acc
  }, {})
}

function checkValid(
  { element, validators },
  setErrors: (field: any) => void,
  setValid: (valid: boolean) => void,
  errorClass: string
) {
  return async () => {
    element.setCustomValidity('')
    element.checkValidity()
    let message = element.validationMessage
    if (!message) {
      for (const validator of validators.filter(Boolean)) {
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
      setValid(false)
    } else {
      setValid(true)
    }
  }
}

interface Form<T, R> {
  validate: any
  formSubmit: any
  errors: T
  updateFormField: (
    fieldName: string,
    multiple?: boolean
  ) => (event: Event) => void
  form: T
  cleanFormData: (data: R) => R
  isFormValid: () => boolean
}

export function useForm<T, R>({
  config,
  defaultState,
}: {
  config: T[]
  defaultState?: R
}): Form<R> {
  const errorClass = 'error-input'

  const state = config.reduce((acc, { name }: any) => {
    acc[name] = defaultState?.[name] || ''
    return acc
  }, {})

  const [form, setForm] = createStore({
    ...state,
  })

  const [errors, setErrors] = createStore({
      ...state,
    }),
    fields = []

  const [isValid, setIsValid] = createSignal(true)

  const validate = (ref: HTMLInputElement, accessor: () => boolean) => {
    const accessorValue = accessor()
    const validators = Array.isArray(accessorValue) ? accessorValue : []
    let config = { element: ref, validators }
    fields.push(config)
    ref.onblur = checkValid(config, setErrors, setIsValid, errorClass)
    ref.oninput = () => {
      if (!errors[ref.name]) return
      setErrors({ [ref.name]: undefined })
      errorClass && ref.classList.toggle(errorClass, false)
    }
  }

  const formSubmit = (
    ref: HTMLFormElement,
    accessor: () => (ref: HTMLFormElement, state: R) => void
  ) => {
    const callback = accessor() || (() => {})
    ref.setAttribute('novalidate', '')
    ref.onsubmit = async (e) => {
      e.preventDefault()
      let errored = false

      for (const k in fields) {
        const field = fields[k]
        await checkValid(field, setErrors, setIsValid, errorClass)()
        if (!errored && field.element.validationMessage) {
          field.element.focus()
          errored = true
        }
      }
      !errored && callback(ref, form as R)
    }
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

  return {
    validate,
    formSubmit,
    // @ts-ignore
    errors,
    updateFormField,
    // @ts-ignore
    form,
    cleanFormData,
    isFormValid: () => isValid(),
  }
}
