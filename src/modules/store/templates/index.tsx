import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { clx } from "@medusajs/ui"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
  productCategories,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  productCategories?: {
    id: string
    name: string
    handle: string
    thumbnail: string
  }
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <RefinementList sortBy={sort} />
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">All Categories</h1>
        </div>

          {productCategories && productCategories?.length > 0 && (
            <div className="flex flex-col gap-y-2">
              <ul
                className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2"
     
              >
                {productCategories?.slice(0, 6).map((c) => {
                  if (c.parent_category) {
                    return
                  }

                  const children =
                    c.category_children?.map((child) => ({
                      name: child.name,
                      handle: child.handle,
                      id: child.id,
                    })) || null

                  return (
                    <li
                      className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
                      key={c.id}
                    >
                      <LocalizedClientLink
                        className={clx(
                          "hover:text-ui-fg-base border rounded-md p-2",
                          children && "txt-small-plus"
                        )}
                        href={`/categories/${c.handle}`}
                      >
                        <img
                          src={c?.product_category_image?.[0]?.url}
                          alt={c.name}
                          className="w-full h-32 object-cover mb-2 rounded-mdd"
                        />
                        {c.name}
                      </LocalizedClientLink>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">All products</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
