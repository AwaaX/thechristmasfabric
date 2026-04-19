import { StoreWishlist, StoreWishlistItem } from "types/global"

export const getWishlistVariantId = (item: StoreWishlistItem) => {
  return item.product_variant?.id ?? item.variant_id ?? item.product_variant_id ?? null
}

export const getWishlistItemIdMap = (wishlist?: StoreWishlist | null) => {
  return new Map(
    (wishlist?.items ?? [])
      .map((item) => {
        const variantId = getWishlistVariantId(item)

        if (!variantId) {
          return null
        }

        return [variantId, item.id] as const
      })
      .filter((entry): entry is readonly [string, string] => Boolean(entry))
  )
}

export const getWishlistVariantIds = (wishlist?: StoreWishlist | null) => {
  return Array.from(getWishlistItemIdMap(wishlist).keys())
}
