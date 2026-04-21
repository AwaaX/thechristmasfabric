import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import * as Icon from "@phosphor-icons/react/dist/ssr"

const SwhBreadCrumbsProductPage = ({ title, path, params, localizedTitle }) => {
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
            <LocalizedClientLink href={"/"}>Home</LocalizedClientLink>
            <Icon.CaretRight size={14} className="text-secondary2" />
            <LocalizedClientLink href={"/"}>Products</LocalizedClientLink>
            {path && (
              <>
                <Icon.CaretRight size={14} className="text-secondary2" />
                <LocalizedClientLink href={`/${path}`} className="capitalize">
                  {path_title}
                </LocalizedClientLink>
              </>
            )}
            {params?.category && (
              <>
                <Icon.CaretRight size={14} className="text-secondary2" />
                <div className="text-secondary2 capitalize">
                  {formatted_title}
                </div>
              </>
            )}
            {params?.handle && (
              <>
                <Icon.CaretRight size={14} className="text-secondary2" />
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

export default SwhBreadCrumbsProductPage
