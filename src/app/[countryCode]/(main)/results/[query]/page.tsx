import { Metadata } from "next"
import {
  buildHreflangAlternates,
  getLocalizedMetadata,
} from "@lib/util/metadata"
import { pathnames } from "i18n/routing"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { search } from "@modules/search/actions"
import SearchResultsTemplate from "@modules/search/templates/search-results-template"

type Params = {
  params: { query: string; countryCode: string }
  searchParams: {
    sortBy?: SortOptions
    page?: string
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const query = decodeURIComponent(params.query)
  const alternates = await buildHreflangAlternates((locale) => {
    const route = pathnames["/results/[query]"] as
      | string
      | Record<string, string>
    const [, localizedCountryCode] = locale.split("-")

    if (typeof route === "string") {
      return `/${localizedCountryCode}/${route.replace(
        "[query]",
        encodeURIComponent(query)
      )}`
    }

    const localizedPath = route[locale as keyof typeof route] ?? route["en-gb"]

    return localizedPath
      ? `/${localizedCountryCode}/${localizedPath.replace(
          "[query]",
          encodeURIComponent(query)
        )}`
      : null
  })

  return getLocalizedMetadata(
    "Metadata.SearchResults",
    {
      query,
    },
    alternates
  )
}

export default async function SearchResults({ params, searchParams }: Params) {
  const { query } = params
  const { sortBy, page } = searchParams

  const hits = await search(query).then((data) => data)

  const ids = hits
    .map((h) => h.objectID || h.id)
    .filter((id): id is string => {
      return typeof id === "string"
    })

  return (
    <SearchResultsTemplate
      query={query}
      ids={ids}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
