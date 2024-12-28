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
  name: string
  description: string
  address?: Address
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface MessageResponse {
  message: string
}
