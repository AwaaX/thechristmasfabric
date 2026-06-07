import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"
import { buildHreflangAlternates, getLocalizedMetadata } from "@lib/util/metadata"
import { pathnames } from "i18n/routing"

export async function generateMetadata(): Promise<Metadata> {
  const alternates = await buildHreflangAlternates((locale) => {
    const route = pathnames["/christmas-pyjamas"] as
      | string
      | Record<string, string>
    const [, localizedCountryCode] = locale.split("-")

    if (typeof route === "string") {
      return `/${localizedCountryCode}/${route}`
    }

    const localizedPath = route[locale as keyof typeof route] ?? route["en-GB"]

    return localizedPath ? `/${localizedCountryCode}/${localizedPath}` : null
  })

  return getLocalizedMetadata("Metadata.AllPyjamas", undefined, alternates)
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
