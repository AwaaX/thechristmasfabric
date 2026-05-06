import { Metadata } from "next"

import InteractiveLink from "@modules/common/components/interactive-link"
import { getTranslations } from "next-intl/server"
import { getLocalizedMetadata } from "@lib/util/metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedMetadata("Metadata.NotFound")
}

export default async function NotFound() {
  const t = await getTranslations("Cart.NotFound")

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">{t("heading")}</h1>
      <p className="text-small-regular text-ui-fg-base">
        {t("description")}
      </p>
      <InteractiveLink href="/">{t("cta")}</InteractiveLink>
    </div>
  )
}
