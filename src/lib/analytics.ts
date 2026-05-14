import { HttpTypes } from "@medusajs/types"

import { getProductPrice } from "@lib/util/get-product-price"
import { getDefaultProductVariant } from "@lib/util/product"

/**
 * Next.js pushes ecommerce events into the browser dataLayer through the Web GTM container.
 * Configure Web GTM to forward these events to your Stape server-side GTM endpoint.
 * The Stape server container can then relay them to GA4, Meta CAPI, Google Ads, and similar destinations.
 */
export type EcommerceEventName =
  | "view_item_list"
  | "view_item"
  | "view_cart"
  | "add_to_cart"
  | "remove_from_cart"
  | "begin_checkout"
  | "add_shipping_info"
  | "add_payment_info"
  | "purchase"

export type AnalyticsItem = {
  item_id: string
  item_name: string
  item_brand?: string
  item_category?: string
  item_list_name?: string
  item_variant?: string
  price?: number
  quantity?: number
  index?: number
}

export type AnalyticsEcommercePayload = {
  currency?: string
  value?: number
  tax?: number
  shipping?: number
  coupon?: string
  transaction_id?: string
  payment_type?: string
  shipping_tier?: string
  item_list_name?: string
  items: AnalyticsItem[]
}

type PromotionLike = {
  code?: string | null
}

const DEFAULT_VARIANT_TITLE = "Default Variant"

const getNormalizedVariantTitle = (title?: string | null) => {
  return title && title !== DEFAULT_VARIANT_TITLE ? title : undefined
}

const getProductCategory = (product?: HttpTypes.StoreProduct | null) => {
  return product?.collection?.title ?? product?.categories?.[0]?.name ?? undefined
}

const getProductBrand = (
  product?:
    | HttpTypes.StoreProduct
    | HttpTypes.StoreCartLineItem["product"]
    | HttpTypes.StoreOrderLineItem["product"]
    | null
) => {
  const metadataBrand = product?.metadata?.brand

  return typeof metadataBrand === "string" ? metadataBrand : undefined
}

const getAppliedCoupon = (
  promotions?: PromotionLike[] | null
) => {
  const codes =
    promotions
      ?.map((promotion) => promotion.code?.trim())
      .filter((code): code is string => Boolean(code)) ?? []

  return codes.length > 0 ? codes.join(",") : undefined
}

const getAnalyticsVariant = ({
  product,
  variantId,
}: {
  product: HttpTypes.StoreProduct
  variantId?: string
}) => {
  if (variantId) {
    return product.variants?.find((variant) => variant.id === variantId)
  }

  return getDefaultProductVariant(product)
}

export const getAnalyticsValue = (items: AnalyticsItem[]) => {
  if (!items.length) {
    return undefined
  }

  return items.reduce((total, item) => {
    return total + (item.price ?? 0) * (item.quantity ?? 1)
  }, 0)
}

export const trackEcommerceEvent = (
  eventName: EcommerceEventName,
  ecommerce: AnalyticsEcommercePayload
) => {
  if (typeof window === "undefined" || !process.env.NEXT_PUBLIC_GTM_ID) {
    return
  }

  void import("@next/third-parties/google")
    .then(({ sendGTMEvent }) => {
      sendGTMEvent({
        event: eventName,
        ecommerce,
      })
    })
    .catch(() => {
      // Ignore analytics transport failures so storefront flows are unaffected.
    })
}

export const buildProductAnalyticsItem = ({
  index,
  listName,
  product,
  quantity = 1,
  variantId,
}: {
  index?: number
  listName?: string
  product: HttpTypes.StoreProduct
  quantity?: number
  variantId?: string
}): AnalyticsItem => {
  const variant = getAnalyticsVariant({ product, variantId })
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })
  const selectedPrice = variantPrice ?? cheapestPrice

  return {
    item_id: variant?.sku ?? variant?.id ?? product.id,
    item_name: product.title,
    item_brand: getProductBrand(product),
    item_category: getProductCategory(product),
    item_list_name: listName,
    item_variant: getNormalizedVariantTitle(variant?.title),
    price: selectedPrice?.calculated_price_number,
    quantity,
    index: typeof index === "number" ? index + 1 : undefined,
  }
}

export const buildLineItemAnalyticsItem = ({
  index,
  item,
  quantity,
}: {
  index?: number
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  quantity?: number
}): AnalyticsItem => {
  return {
    item_id: item.variant?.sku ?? item.variant_id ?? item.product_id ?? item.id,
    item_name: item.product_title ?? item.title ?? "Product",
    item_brand: getProductBrand(item.product),
    item_category:
      item.product?.collection?.title ?? item.product?.categories?.[0]?.name ?? undefined,
    item_variant: getNormalizedVariantTitle(
      item.variant_title ?? item.variant?.title
    ),
    price:
      item.unit_price ??
      (typeof item.total === "number"
        ? item.total / Math.max(item.quantity, 1)
        : undefined),
    quantity: quantity ?? item.quantity,
    index: typeof index === "number" ? index + 1 : undefined,
  }
}

export const buildProductListEcommercePayload = ({
  listName,
  products,
}: {
  listName: string
  products: HttpTypes.StoreProduct[]
}): AnalyticsEcommercePayload => {
  return {
    item_list_name: listName,
    items: products.map((product, index) =>
      buildProductAnalyticsItem({
        index,
        listName,
        product,
      })
    ),
  }
}

export const buildCartEcommercePayload = (
  cart: HttpTypes.StoreCart & {
    promotions?: PromotionLike[]
  },
  overrides: Partial<Omit<AnalyticsEcommercePayload, "items">> = {}
): AnalyticsEcommercePayload => {
  const items =
    cart.items?.map((item, index) =>
      buildLineItemAnalyticsItem({
        index,
        item,
      })
    ) ?? []

  return {
    currency: cart.currency_code?.toUpperCase(),
    value: cart.total ?? getAnalyticsValue(items),
    coupon: getAppliedCoupon(cart.promotions),
    items,
    ...overrides,
  }
}

export const buildOrderEcommercePayload = (
  order: HttpTypes.StoreOrder
): AnalyticsEcommercePayload => {
  const items =
    order.items?.map((item, index) =>
      buildLineItemAnalyticsItem({
        index,
        item,
      })
    ) ?? []

  return {
    currency: order.currency_code?.toUpperCase(),
    value: order.total ?? getAnalyticsValue(items),
    tax: order.tax_total,
    shipping: order.shipping_total,
    coupon: getAppliedCoupon(
      (order as HttpTypes.StoreOrder & {
        promotions?: PromotionLike[]
      }).promotions
    ),
    transaction_id: order.id,
    items,
  }
}
