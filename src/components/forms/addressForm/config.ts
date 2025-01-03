import { FormConfig } from '../../../lib/form/useForm'

export const addressConfig: FormConfig[] = [
  {
    label: 'Street',
    name: 'street',
    type: 'text',
  },
  {
    label: 'House Number',
    name: 'houseNumber',
    type: 'text',
  },
  {
    label: 'City',
    name: 'city',
    type: 'text',
  },
  {
    label: 'Postal Code',
    name: 'postalCode',
    type: 'text',
  },
]
