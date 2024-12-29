export interface User {
  firstName: string
  lastName: string
  email: string
  address?: Address
  stores?: Store[]
  favorites?: FavoriteProduct[]
}

export interface Address {
  street: string
  houseNumber: string
  city: string
  state: string
  postalCode: string
}

interface Media {
  url: string
}

export interface Store {
  id: string
  name: string
  description: string
  userId: string
  media?: Media[]
  products?: Product[]
  address?: Address
}

export interface FavoriteProduct {
  id: string
  productId: string
}

export interface FavoriteStore {
  id: string
  storeId: string
}

export interface Product {
  id: string
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
