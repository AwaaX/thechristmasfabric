"use client"

import { WishlistDisplayItem } from "@lib/data/wishlist"
import Link from "next/link"
import { Button } from "@medusajs/ui"
import Thumbnail from "@modules/products/components/thumbnail"
import ProductPrice from "@modules/products/components/product-price"
import WishlistButton from "@modules/products/components/wishlist-button"
import { ProductGridCard } from "@modules/common/components/swh/product-previews"
import { useTranslations } from "next-intl"

type WishlistItemsGridProps = {
  countryCode: string
  emptyMessage: string
  interactive?: boolean
  items: WishlistDisplayItem[]
}

const getProductHref = (
  countryCode: string,
  item: WishlistDisplayItem
) => {
  if (!item.product?.handle) {
    return null
  }

  const search = item.variantId ? `?v_id=${item.variantId}` : ""

  return `/${countryCode}/products/${item.product.handle}${search}`
}

export default function WishlistItemsGrid({
  countryCode,
  emptyMessage,
  interactive = false,
  items,
}: WishlistItemsGridProps) {
  const t = useTranslations("Wishlist.ItemsGrid")

  if (!items.length) {
    return (
      <div className="border border-gray-200 rounded-2xl px-6 py-12 text-center text-ui-fg-subtle">
        {emptyMessage}
      </div>
    )
  }

  return (
    <ul className="grid grid-cols-1 small:grid-cols-3 gap-6" data-testid="wishlist-items-grid">
      {items.map((item) => {
        const href = getProductHref(countryCode, item)
        const variantTitle =
          item.variantTitle && item.variantTitle !== "Default Variant"
            ? item.variantTitle
            : null

        return (
          <li
            key={item.itemId}
            className="rounded-2xl border border-gray-200 p-4 small:p-6 bg-white"
          >
            {/* <div className="flex flex-col gap-y-4">
              {href ? (
                <Link href={href} className="block">
                  <Thumbnail
                    thumbnail={item.product?.thumbnail}
                    images={item.product?.images}
                    size="full"
                  />
                </Link>
              ) : (
                <Thumbnail
                  thumbnail={item.product?.thumbnail}
                  images={item.product?.images}
                  size="full"
                />
              )}

              <div className="flex flex-col gap-y-2">
                {href ? (
                  <Link href={href} className="text-xl-semi text-ui-fg-base">
                    {item.productTitle}
                  </Link>
                ) : (
                  <h2 className="text-xl-semi text-ui-fg-base">{item.productTitle}</h2>
                )}

                {variantTitle && (
                  <p className="text-small-regular text-ui-fg-subtle">
                    Variant: {variantTitle}
                  </p>
                )}

                {item.product && item.variant ? (
                  <ProductPrice product={item.product} variant={item.variant} />
                ) : (
                  <p className="text-small-regular text-ui-fg-subtle">
                    Pricing unavailable
                  </p>
                )}
              </div>

              <div className="flex flex-col small:flex-row gap-3">
                {href && (
                  <Link href={href} className="small:flex-1">
                    <Button variant="secondary" className="w-full">
                      View product
                    </Button>
                  </Link>
                )}
                {interactive && item.variantId && (
                  <div className="small:flex-1">
                    <WishlistButton
                      variantId={item.variantId}
                      refreshOnToggle
                    />
                  </div>
                )}
              </div>
            </div> */}
             <ProductGridCard data={item.product} type="grid" />
                     {variantTitle && (
                  <p className="text-small-regular text-ui-fg-subtle">
                    {t("variant")}: {variantTitle}
                  </p>
                )}
          </li>
        )
      })}
    </ul>
  )
}
