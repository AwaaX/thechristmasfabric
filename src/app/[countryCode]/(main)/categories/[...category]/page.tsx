import { Metadata } from "next"
import { notFound } from "next/navigation"

import { getCategoryByHandle, listCategories } from "@lib/data/categories"
import { getLocalizedCategoryHandle } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import CategoryTemplate from "@modules/categories/templates"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { buildHreflangAlternates } from "@lib/util/metadata"

type Props = {
  params: Promise<{ category: string[]; countryCode: string }>
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
}

export async function generateStaticParams() {
  const product_categories = await listCategories()

  if (!product_categories) {
    return []
  }

  const countryCodes = await listRegions().then((regions: StoreRegion[]) =>
    regions?.map((r) => r.countries?.map((c) => c.iso_2)).flat()
  )

  const categoryHandles = product_categories.map(
    (category: any) => category.handle
  )

  const staticParams = countryCodes
    ?.map((countryCode: string | undefined) =>
      categoryHandles.map((handle: any) => ({
        countryCode,
        category: [handle],
      }))
    )
    .flat()

  return staticParams
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  try {
    const productCategory = await getCategoryByHandle(params.category)

    const title = productCategory.name + " | Medusa Store"

    const description = productCategory.description ?? `${title} category.`

    const currentHandle = params.category.join("/")
    const alternates = await buildHreflangAlternates(
      async (locale, countryCode) => {
        const localizedHandle =
          locale === "en-GB"
            ? currentHandle
            : await getLocalizedCategoryHandle({
                currentHandle,
                locale,
                targetCountryCode: countryCode,
              })

        return localizedHandle
          ? `/${countryCode}/categories/${localizedHandle}`
          : null
      }
    )

    return {
      title: `${title} | Medusa Store`,
      description,
      alternates: {
        canonical: `${params.category.join("/")}`,
        languages: alternates.languages,
      },
    }
  } catch (error) {
    notFound()
  }
}

export default async function CategoryPage(props: Props) {
  const searchParams = await props.searchParams
  const params = await props.params
  const { sortBy, page } = searchParams

  const productCategory = await getCategoryByHandle(params.category)

  if (!productCategory) {
    notFound()
  }

  return (
    <CategoryTemplate
      category={productCategory}
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
    />
  )
}
