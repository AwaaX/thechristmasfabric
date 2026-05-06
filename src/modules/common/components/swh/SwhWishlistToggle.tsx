"use client"

import { useWishlist } from "@lib/context/wishlist-context"
import { usePageLoaderRouter } from "@modules/common/components/swh/ProgressBarProvider"
import { getDefaultProductVariant } from "@lib/util/product"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { useParams } from "next/navigation"
import type { KeyboardEvent, MouseEvent } from "react"

export type SwhProductPreviewData = HttpTypes.StoreProduct & {
  price?: {
    calculated_price?: string | null
    original_price?: string | null
  } | null
}

type SwhWishlistToggleProps = {
  className: string
  iconSize: number
  product: SwhProductPreviewData
  tooltipClassName: string
}

const SwhWishlistToggle = ({
  className,
  iconSize,
  product,
  tooltipClassName,
}: SwhWishlistToggleProps) => {
  const params = useParams()
  const router = usePageLoaderRouter()
  const { hasCustomer, isInWishlist, isPending, toggleWishlist } = useWishlist()

  const defaultVariant = getDefaultProductVariant(product)
  const variantId = defaultVariant?.id
  const isSaved = isInWishlist(variantId)
  const isLoading = isPending(variantId)
  const countryCodeParam = params?.countryCode
  const countryCode =
    typeof countryCodeParam === "string"
      ? countryCodeParam
      : Array.isArray(countryCodeParam)
      ? countryCodeParam[0]
      : null

  const label = hasCustomer
    ? isSaved
      ? "Remove From Wishlist"
      : "Add To Wishlist"
    : "Sign In To Save"

  const handleAction = async () => {
    if (!hasCustomer) {
      router.push(
        countryCode
          ? `/${countryCode}/account/wishlist`
          : "/account/wishlist"
      )
      return
    }

    if (!variantId || isLoading) {
      return
    }

    await toggleWishlist(variantId)
  }

  const handleClick = async (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()

    await handleAction()
  }

  const handleKeyDown = async (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    await handleAction()
  }

  return (
    <div
      aria-label={label}
      aria-pressed={isSaved}
      className={clx(className, {
        active: isSaved,
        "cursor-progress opacity-70": isLoading,
        "cursor-not-allowed opacity-60": hasCustomer && !variantId,
      })}
      data-testid="swh-product-wishlist-toggle"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={tooltipClassName}>{label}</div>
      <Icon.StarIcon
        className={clx({
          "text-white": isSaved,
        })}
        size={iconSize}
        weight={isSaved ? "fill" : "regular"}
      />
    </div>
  )
}

export default SwhWishlistToggle
