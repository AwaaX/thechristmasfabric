import { HttpTypes } from "@medusajs/types"

export type ProductGridCardData = HttpTypes.StoreProduct & {
  price?: {
    calculated_price?: string | null
    original_price?: string | null
  } | null
}
