import { exists } from '../registerForm/validators'
import { FormConfig } from '../../../lib/form/useForm'

export const productConfig: FormConfig[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    validation: [exists],
  },
  {
    label: 'Description',
    name: 'description',
    type: 'text',
    validation: [exists],
  },
  {
    label: 'Price',
    name: 'price',
    type: 'text',
    validation: [],
  },
]
