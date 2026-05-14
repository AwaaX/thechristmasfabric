import { Metadata } from "next"
import { getLocalizedMetadata } from "@lib/util/metadata"

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
  return getLocalizedMetadata("Metadata.SearchResults", {
    query: decodeURIComponent(params.query),
  })
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
