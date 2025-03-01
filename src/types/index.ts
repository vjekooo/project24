export interface User {
  firstName: string
  lastName: string
  email: string
  address?: Address
  stores?: Store[]
  favorites?: FavoriteProduct[]
}

export interface Category {
  id: string
  name: string
  description: string
  subCategories?: Category[]
}

export interface Address {
  street: string
  houseNumber: string
  city: string
  state: string
  postalCode: string
}

interface Media {
  id: string
  imageUrl: string
}

export interface Store {
  id: string
  name: string
  description: string
  userId: string
  media?: Media[]
  products?: Product[]
  address?: Address
  categories: Category[]
}

export interface StoreRequest {
  name: string
  description: string
  existingImages?: string[]
  newImages?: File[]
  category: string[]
}

export interface FavoriteProduct {
  id: string
  productId: string
}

export interface FavoriteStore {
  id: string
  storeId: string
}

export interface Category {
  id: string
  name: string
}

export interface Product {
  id: string
  name: string
  description: string
  media?: Media[]
  categories: Category[]
  storeId?: string
  price: number
  discount: number
}

export interface ProductRequest {
  name: string
  description: string
  existingImages: string[]
  newImages?: File[]
  price: number
  storeId?: string
  productId?: string
  category: string[]
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface MessageResponse {
  message: string
}

export interface Option {
  value: string
  label: string
}

export interface SearchResponse {
  products: Product[]
  stores: Store[]
}
