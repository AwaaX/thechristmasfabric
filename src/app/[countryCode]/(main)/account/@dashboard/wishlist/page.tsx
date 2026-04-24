import { Metadata } from "next"

import { retrieveCustomer } from "@lib/data/customer"
import {
  getWishlistDisplayItems,
  retrieveWishlist,
} from "@lib/data/wishlist"
import WishlistShareButton from "@modules/wishlist/components/share-button"
import WishlistItemsGrid from "@modules/wishlist/components/items-grid"

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Products saved to your wishlist.",
}

export default async function AccountWishlistPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const customer = await retrieveCustomer().catch(() => null)

  if (!customer) {
    return null
  }

  const wishlist = await retrieveWishlist()
  const items = await getWishlistDisplayItems({
    countryCode,
    wishlist,
  })

  return (
    <div className="flex flex-col gap-y-8" data-testid="account-wishlist-page">
      <div className="flex flex-col gap-y-4 small:flex-row small:items-start small:justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl-semi">Wishlist</h1>
          <p className="text-base-regular text-ui-fg-subtle">
            Review saved products, remove items, or share your wishlist.
          </p>
        </div>
        <WishlistShareButton
          countryCode={countryCode}
          disabled={!items.length}
        />
      </div>
      <WishlistItemsGrid
        countryCode={countryCode}
        emptyMessage="You have not added any products to your wishlist yet."
        interactive
        items={items}
      />
    </div>
  )
}
