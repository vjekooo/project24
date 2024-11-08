export interface AddressConfig {
  label: string
  name: string
  type: string
}

export const addressConfig: AddressConfig[] = [
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
