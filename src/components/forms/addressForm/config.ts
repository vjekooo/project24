export interface AddressConfig {
  label: string
  name: string
  type: string
}

export const addressConfig: AddressConfig[] = [
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
