import { eMailValidator, exists } from './validators'
import { FormConfig } from '../../../lib/form/useForm'

export const registerConfig: FormConfig[] = [
  {
    name: 'firstName',
    type: 'text',
    label: 'First Name',
    placeholder: 'First Name',
    validation: [exists],
  },
  {
    name: 'lastName',
    type: 'text',
    label: 'Last Name',
    placeholder: 'Last Name',
    validation: [exists],
  },
  {
    name: 'email',
    type: 'text',
    label: 'Email',
    placeholder: 'Email',
    validation: [eMailValidator, exists],
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
    validation: [exists],
  },
  {
    name: 'confirm password',
    type: 'password',
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
    validation: [exists],
  },
]
