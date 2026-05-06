"use client"

import { useWishlist } from "@lib/context/wishlist-context"
import { usePageLoaderRouter } from "@modules/common/components/swh/ProgressBarProvider"
import { Heart } from "@medusajs/icons"
import { Button, clx } from "@medusajs/ui"

type WishlistButtonProps = {
  className?: string
  disabled?: boolean
  mode?: "icon" | "full"
  refreshOnToggle?: boolean
  unavailableLabel?: string
  variantId?: string
}

export default function WishlistButton({
  className,
  disabled = false,
  mode = "full",
  refreshOnToggle = false,
  unavailableLabel = "Select a variant to save",
  variantId,
}: WishlistButtonProps) {
  const router = usePageLoaderRouter()
  const { hasCustomer, isInWishlist, isPending, toggleWishlist } = useWishlist()

  if (!hasCustomer) {
    return null
  }

  const isSaved = isInWishlist(variantId)
  const isLoading = isPending(variantId)
  const isUnavailable = !variantId
  const isDisabled = disabled || isLoading

  const handleClick = async () => {
    if (!variantId) {
      return
    }

    const changed = await toggleWishlist(variantId)

    if (changed && refreshOnToggle) {
      router.refresh()
    }
  }

  if (mode === "icon") {
    if (isUnavailable) {
      return null
    }

    return (
      <button
        type="button"
        aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        className={clx(
          "inline-flex h-10 w-10 items-center justify-center rounded-full border border-ui-border-base bg-white/90 text-ui-fg-base shadow-elevation-card-rest transition-colors hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-60",
          {
            "border-rose-200 bg-rose-50 text-rose-600 hover:text-rose-600":
              isSaved,
          },
          className
        )}
        disabled={isDisabled}
        onClick={handleClick}
        data-testid="product-card-wishlist-button"
      >
        <Heart />
      </button>
    )
  }

  return (
    <Button
      type="button"
      variant="secondary"
      className={clx("w-full h-10", className, {
        "border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-50": isSaved,
      })}
      disabled={isDisabled || isUnavailable}
      isLoading={isLoading}
      onClick={handleClick}
      data-testid="product-wishlist-button"
    >
      <span className="flex items-center gap-x-2">
        <Heart />
        <span>
          {isSaved
            ? "Remove from wishlist"
            : variantId
            ? "Add to wishlist"
            : unavailableLabel}
        </span>
      </span>
    </Button>
  )
}
