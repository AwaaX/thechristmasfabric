import { HttpTypes } from "@medusajs/types"

import { getProductPrice } from "./get-product-price"
import { getDefaultProductVariant } from "./product"

export type GA4Item = {
  item_id: string
  item_name: string
  item_category?: string
  item_list_name?: string
  item_variant?: string
  price?: number
  quantity?: number
  index?: number
}

const DEFAULT_VARIANT_TITLE = "Default Variant"

const getNormalizedVariantTitle = (title?: string | null) => {
  return title && title !== DEFAULT_VARIANT_TITLE ? title : undefined
}

const getProductCategory = (product?: HttpTypes.StoreProduct | null) => {
  return product?.collection?.title ?? product?.categories?.[0]?.name ?? undefined
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
}): GA4Item => {
  const variant = getAnalyticsVariant({ product, variantId })
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })
  const selectedPrice = variantPrice ?? cheapestPrice

  return {
    item_id: variant?.sku ?? variant?.id ?? product.id,
    item_name: product.title,
    item_category: getProductCategory(product),
    item_list_name: listName,
    item_variant: getNormalizedVariantTitle(variant?.title),
    price: selectedPrice?.calculated_price_number,
    quantity,
    index: typeof index === "number" ? index + 1 : undefined,
  }
}

const buildLineItemAnalyticsItem = ({
  index,
  item,
}: {
  index?: number
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
}): GA4Item => {
  return {
    item_id: item.variant?.sku ?? item.variant_id ?? item.product_id ?? item.id,
    item_name: item.product_title ?? item.title ?? "Product",
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
    quantity: item.quantity,
    index: typeof index === "number" ? index + 1 : undefined,
  }
}

export const buildProductListAnalyticsItems = ({
  listName,
  products,
}: {
  listName: string
  products: HttpTypes.StoreProduct[]
}) => {
  return products.map((product, index) =>
    buildProductAnalyticsItem({
      index,
      listName,
      product,
    })
  )
}

export const buildCartAnalyticsPayload = (cart: HttpTypes.StoreCart) => {
  const items =
    cart.items?.map((item, index) =>
      buildLineItemAnalyticsItem({
        index,
        item,
      })
    ) ?? []

  return {
    currency: cart.currency_code?.toUpperCase(),
    value: cart.total,
    items,
  }
}

export const buildOrderAnalyticsPayload = (order: HttpTypes.StoreOrder) => {
  const items =
    order.items?.map((item, index) =>
      buildLineItemAnalyticsItem({
        index,
        item,
      })
    ) ?? []

  return {
    currency: order.currency_code?.toUpperCase(),
    value: order.total,
    tax: order.tax_total,
    shipping: order.shipping_total,
    transaction_id: order.id,
    items,
  }
}
