import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getWishlistDisplayItems,
  retrieveSharedWishlist,
} from "@lib/data/wishlist"
import WishlistItemsGrid from "@modules/wishlist/components/items-grid"

export const metadata: Metadata = {
  title: "Shared Wishlist",
  description: "A wishlist shared with you.",
}

export default async function SharedWishlistPage({
  params,
}: {
  params: Promise<{ countryCode: string; token: string }>
}) {
  const { countryCode, token } = await params
  const wishlist = await retrieveSharedWishlist(token)

  if (!wishlist) {
    notFound()
  }

  const items = await getWishlistDisplayItems({
    countryCode,
    wishlist,
  })

  return (
    <div className="content-container py-12 small:py-16">
      <div className="mx-auto max-w-5xl flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2 text-center">
          <h1 className="text-3xl-semi">Shared wishlist</h1>
          <p className="text-base-regular text-ui-fg-subtle">
            Browse the products saved in this shared wishlist.
          </p>
        </div>
        <WishlistItemsGrid
          countryCode={countryCode}
          emptyMessage="This wishlist does not have any saved products."
          items={items}
        />
      </div>
    </div>
  )
}
