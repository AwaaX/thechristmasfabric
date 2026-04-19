import { HttpTypes, StorePrice } from "@medusajs/types"

export type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

export type VariantPrice = {
  calculated_price_number: number
  calculated_price: string
  original_price_number: number
  original_price: string
  currency_code: string
  price_type: string
  percentage_diff: string
}

export type StoreFreeShippingPrice = StorePrice & {
  target_reached: boolean
  target_remaining: number
  remaining_percentage: number
}

export type StoreProductReview = {
  id: string
  title: string
  rating: number
  content: string
  first_name: string
  last_name: string
}

export type StoreWishlistItem = {
  id: string
  variant_id?: string | null
  product_variant_id?: string | null
  product_variant?: Partial<HttpTypes.StoreProductVariant> & { id: string }
}

export type StoreWishlist = {
  id: string
  items: StoreWishlistItem[]
}
