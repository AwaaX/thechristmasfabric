import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { useTranslations } from "next-intl"

/** Props for ProductPageBreadcrumbs component */
interface ProductPageBreadcrumbsProps {
  /** Product title */
  title?: string
  /** URL path segment */
  path?: string
  /** Route parameters including category and handle */
  params?: { category?: string; handle?: string }
  /** Localized product title */
  localizedTitle?: string
}

/**
 * Product page breadcrumb navigation
 * Displays breadcrumb trail specific to product pages
 */
const ProductPageBreadcrumbs = ({ title, path, params, localizedTitle }: ProductPageBreadcrumbsProps) => {
  const t = useTranslations("Common.Breadcrumbs")
  const path_title = path?.replace(/-/g, " ")
  const formatted_title = params?.category
    ? decodeURIComponent(params.category).replace(/-/g, " ")
    : title
  const formatted_handle = params?.handle
    ? decodeURIComponent(params.handle).replace(/-/g, " ")
    : title
  return (
    <div className="breadcrumb-block style-img">
      <div className="breadcrumb-main  overflow-hidden">
        <div className="container  relative">
          <div className="link flex items-center justify-center gap-2 py-[7px] flex-wrap">
            <LocalizedClientLink href={"/"}>{t("home")}</LocalizedClientLink>
            <Icon.CaretRightIcon size={14} className="text-secondary2" />
            <LocalizedClientLink href={"/"}>{t("products")}</LocalizedClientLink>
            {path && (
              <>
                <Icon.CaretRightIcon size={14} className="text-secondary2" />
                <LocalizedClientLink href={`/${path}`} className="capitalize">
                  {path_title}
                </LocalizedClientLink>
              </>
            )}
            {params?.category && (
              <>
                <Icon.CaretRightIcon size={14} className="text-secondary2" />
                <div className="text-secondary2 capitalize">
                  {formatted_title}
                </div>
              </>
            )}
            {params?.handle && (
              <>
                <Icon.CaretRightIcon size={14} className="text-secondary2" />
                <div className="text-secondary2 capitalize">
                  {/* {formatted_handle} */}
                  {localizedTitle}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPageBreadcrumbs
