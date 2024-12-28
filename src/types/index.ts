export interface User {
  firstName: string
  lastName: string
  email: string
  address?: Address
  store?: Store[]
}

export interface Address {
  street: string
  houseNumber: string
  city: string
  state: string
  postalCode: string
}

export interface Store {
  id: string
  name: string
  description: string
  userId: string
  media?: string[]
  product?: Product[]
  address?: Address
}

export interface Product {
  name: string
  description: string
  image: string[]
  storeId?: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface MessageResponse {
  message: string
}
