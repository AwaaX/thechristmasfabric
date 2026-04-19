"use server"

import { sdk } from "@lib/config"
import { getBaseURL } from "@lib/util/env"
import medusaError from "@lib/util/medusa-error"
import { HttpTypes } from "@medusajs/types"
import { StoreWishlist, StoreWishlistItem } from "types/global"
import { getAuthHeaders } from "./cookies"
import { listProducts } from "./products"
import { getWishlistVariantId } from "@lib/util/wishlist"

type WishlistShareResponse = {
  token?: string
  url?: string
  share_url?: string
  shareable_link?: string
}

export type WishlistDisplayItem = {
  item: StoreWishlistItem
  itemId: string
  product: HttpTypes.StoreProduct | null
  productId: string | null
  productTitle: string
  variant: HttpTypes.StoreProductVariant | null
  variantId: string | null
  variantTitle: string | null
}

export const retrieveWishlist = async (): Promise<StoreWishlist | null> => {
  const authHeaders = await getAuthHeaders()

  if (!("authorization" in authHeaders)) {
    return null
  }

  return sdk.client
    .fetch<{ wishlist: StoreWishlist }>(`/store/customers/me/wishlists`, {
      method: "GET",
      headers: authHeaders,
      cache: "no-store",
    })
    .then(({ wishlist }) => wishlist)
    .catch(() => null)
}

export const addWishlistItem = async (variantId: string): Promise<StoreWishlist> => {
  const authHeaders = await getAuthHeaders()

  if (!("authorization" in authHeaders)) {
    throw new Error("You must be logged in to use the wishlist.")
  }

  return sdk.client
    .fetch<{ wishlist: StoreWishlist }>(`/store/customers/me/wishlists/items`, {
      method: "POST",
      headers: authHeaders,
      body: {
        variant_id: variantId,
      },
      cache: "no-store",
    })
    .then(({ wishlist }) => wishlist)
    .catch(medusaError)
}

export const removeWishlistItem = async (itemId: string): Promise<StoreWishlist> => {
  const authHeaders = await getAuthHeaders()

  if (!("authorization" in authHeaders)) {
    throw new Error("You must be logged in to use the wishlist.")
  }

  await sdk.client
    .fetch(`/store/customers/me/wishlists/items/${itemId}`, {
      method: "DELETE",
      headers: authHeaders,
      cache: "no-store",
    })
    .catch(medusaError)

  const wishlist = await retrieveWishlist()

  if (!wishlist) {
    throw new Error("Unable to refresh the wishlist after removing the item.")
  }

  return wishlist
}

export const createWishlistShareLink = async (): Promise<WishlistShareResponse> => {
  const authHeaders = await getAuthHeaders()

  if (!("authorization" in authHeaders)) {
    throw new Error("You must be logged in to share the wishlist.")
  }

  return sdk.client
    .fetch<WishlistShareResponse>(`/store/customers/me/wishlists/share`, {
      method: "POST",
      headers: authHeaders,
      cache: "no-store",
    })
    .catch(medusaError)
}

export const retrieveSharedWishlist = async (
  token: string
): Promise<StoreWishlist | null> => {
  return sdk.client
    .fetch<{ wishlist: StoreWishlist }>(`/store/wishlists/${token}`, {
      method: "GET",
      cache: "no-store",
    })
    .then(({ wishlist }) => wishlist)
    .catch(() => null)
}

const extractShareToken = (response: WishlistShareResponse) => {
  if (response.token) {
    return response.token
  }

  const candidate =
    response.shareable_link ?? response.share_url ?? response.url ?? null

  if (!candidate) {
    return null
  }

  try {
    const parsed = new URL(candidate, getBaseURL())
    const token = parsed.pathname.split("/").filter(Boolean).at(-1)

    return token ?? null
  } catch {
    return candidate.split("/").filter(Boolean).at(-1) ?? null
  }
}

export const generateWishlistShareUrl = async (countryCode: string) => {
  const response = await createWishlistShareLink()
  const token = extractShareToken(response)

  if (!token) {
    throw new Error("No share token was returned for this wishlist.")
  }

  return `${getBaseURL()}/${countryCode}/wishlist/${encodeURIComponent(token)}`
}

export const getWishlistDisplayItems = async ({
  countryCode,
  wishlist,
}: {
  countryCode: string
  wishlist: StoreWishlist | null
}): Promise<WishlistDisplayItem[]> => {
  const productIds = Array.from(
    new Set(
      (wishlist?.items ?? [])
        .map((item) => item.product_variant?.product_id)
        .filter((productId): productId is string => Boolean(productId))
    )
  )

  const productsById = new Map<string, HttpTypes.StoreProduct>()

  if (productIds.length) {
    const { response } = await listProducts({
      countryCode,
      queryParams: {
        id: productIds,
        limit: productIds.length,
      },
    })

    response.products.forEach((product) => {
      productsById.set(product.id, product)
    })
  }

  return (wishlist?.items ?? []).map((item) => {
    const variantId = getWishlistVariantId(item)
    const productId =
      item.product_variant?.product_id ??
      item.product_variant?.product?.id ??
      null
    const product =
      (productId ? productsById.get(productId) : null) ??
      item.product_variant?.product ??
      null
    const variant = variantId
      ? product?.variants?.find((productVariant) => productVariant.id === variantId) ??
        null
      : null

    return {
      item,
      itemId: item.id,
      product,
      productId,
      productTitle: product?.title ?? item.product_variant?.product?.title ?? "Saved item",
      variant,
      variantId,
      variantTitle: variant?.title ?? item.product_variant?.title ?? null,
    }
  })
}
