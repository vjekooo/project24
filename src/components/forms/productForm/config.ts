export interface Config {
  label: string
  name: string
  type: string
}

export const productConfig: Config[] = [
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
  {
    label: 'Image',
    name: 'image',
    type: 'text',
  },
]
