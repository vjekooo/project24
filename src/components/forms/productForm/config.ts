export interface Config {
  label: string
  name: string
  type: string
  multiple?: boolean
  validation?: Function
}

const exists = ({ value }) => (value ? false : 'Field is required')

export const productConfig: Config[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    validation: exists,
  },
  {
    label: 'Description',
    name: 'description',
    type: 'text',
    validation: exists,
  },
  {
    label: 'Image',
    name: 'image',
    type: 'text',
    multiple: true,
  },
]
