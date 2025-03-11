import { exists } from '../registerForm/validators'
import { FormConfig } from '../../../lib/form/useForm'

export const storeConfig: FormConfig[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    validation: [exists],
  },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
    validation: [exists],
  },
]
