export interface StoreConfig {
  label: string
  name: string
  type: string
}

export const storeConfig: StoreConfig[] = [
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
