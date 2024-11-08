export interface LoginConfig {
  label: string
  name: string
  type: string
}

export const loginConfig: LoginConfig[] = [
  {
    label: 'Email',
    name: 'email',
    type: 'text',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
  },
]
