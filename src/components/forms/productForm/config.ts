import { exists } from '../registerForm/validators'

export interface Config {
  label: string
  name: string
  type: string
  multiple?: boolean
  validation?: Function[]
}

export const productConfig: Config[] = [
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
    label: 'Image',
    name: 'image',
    type: 'text',
    multiple: true,
  },
]
