export interface LoginConfig {
  label: string
  name: string
  type: string
}

export const loginConfig: LoginConfig[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Description',
    name: 'description',
    type: 'text',
  },
]
