import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations } from "next-intl/server"

import {
  getWishlistDisplayItems,
  retrieveSharedWishlist,
} from "@lib/data/wishlist"
import WishlistItemsGrid from "@modules/wishlist/components/items-grid"
import { getLocalizedMetadata } from "@lib/util/metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedMetadata("Metadata.Wishlist.Shared")
}

export default async function SharedWishlistPage({
  params,
}: {
  params: Promise<{ countryCode: string; token: string }>
}) {
  const { countryCode, token } = await params
  const t = await getTranslations("Wishlist.SharedPage")
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
          <h1 className="text-3xl-semi">{t("heading")}</h1>
          <p className="text-base-regular text-ui-fg-subtle">
            {t("description")}
          </p>
        </div>
        <WishlistItemsGrid
          countryCode={countryCode}
          emptyMessage={t("emptyMessage")}
          items={items}
        />
      </div>
    </div>
  )
}
