import { eMailValidator, exists } from './validators'

export interface RegisterConfig {
  name: string
  type: string
  placeholder?: string
  validation?: Function[]
}

export const registerConfig: RegisterConfig[] = [
  {
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name',
    validation: [exists],
  },
  {
    name: 'lastName',
    type: 'text',
    placeholder: 'Last Name',
    validation: [exists],
  },
  {
    name: 'email',
    type: 'text',
    placeholder: 'Email',
    validation: [eMailValidator, exists],
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    validation: [exists],
  },
  {
    name: 'confirm password',
    type: 'password',
    placeholder: 'Confirm Password',
    validation: [exists],
  },
]
