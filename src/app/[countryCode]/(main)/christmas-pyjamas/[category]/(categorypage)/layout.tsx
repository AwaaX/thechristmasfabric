import BreadcrumbsNavigation from "@modules/common/components/swh/BreadcrumbsNavigation"
import ProductFiltersPanel from "@modules/common/components/swh/ProductFiltersPanel"
import React from "react"



const layout = ({ children ,params}) => {
  return (
    <>
      {/* Bread Crumb */}
      <BreadcrumbsNavigation title={"shop"} path={"christmas-pyjamas"} params={params}/>

      <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                <div className="container">
                    <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">         
                        <ProductFiltersPanel params={params}/>
                        <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3">{children}</div>
                     </div>
               </div>
        </div>
    </>
  )
}

export default layout
