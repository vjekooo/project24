import { eMailValidator } from './validators'

export interface RegisterConfig {
  name: string
  type: string
  placeholder?: string
  validation?: (value: string) => string
}

export const registerConfig: RegisterConfig[] = [
  {
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name',
  },
  {
    name: 'lastName',
    type: 'text',
    placeholder: 'Last Name',
  },
  {
    name: 'email',
    type: 'text',
    placeholder: 'Email',
    validation: eMailValidator,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
  },
  {
    name: 'confirm password',
    type: 'password',
    placeholder: 'Confirm Password',
  },
]
