import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { retrieveCustomer } from "@lib/data/customer"
import {
  getWishlistDisplayItems,
  retrieveWishlist,
} from "@lib/data/wishlist"
import WishlistShareButton from "@modules/wishlist/components/share-button"
import WishlistItemsGrid from "@modules/wishlist/components/items-grid"
import { getLocalizedMetadata } from "@lib/util/metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedMetadata("Metadata.Account.Wishlist")
}

export default async function AccountWishlistPage({
  params,
}: {
  params: Promise<{ countryCode: string }>
}) {
  const { countryCode } = await params
  const t = await getTranslations("Account.Pages.Wishlist")
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
          <h1 className="text-2xl-semi">{t("heading")}</h1>
          <p className="text-base-regular text-ui-fg-subtle">
            {t("description")}
          </p>
        </div>
        <WishlistShareButton
          countryCode={countryCode}
          disabled={!items.length}
        />
      </div>
      <WishlistItemsGrid
        countryCode={countryCode}
        emptyMessage={t("emptyMessage")}
        interactive
        items={items}
      />
    </div>
  )
}
