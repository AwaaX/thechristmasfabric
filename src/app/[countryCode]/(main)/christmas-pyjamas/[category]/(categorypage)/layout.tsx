import SwhBreadCrumbs from "@modules/common/components/swh/SwhBreadCrumbs"
import SwhFilters from "@modules/common/components/swh/SwhFilters"
import React from "react"



const layout = ({ children ,params}) => {
  return (
    <>
      {/* Bread Crumb */}
      <SwhBreadCrumbs title={"shop"} path={"christmas-pyjamas"} params={params}/>

      <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                <div className="container">
                    <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">         
                        <SwhFilters params={params}/>
                        <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3">{children}</div>
                     </div>
               </div>
        </div>
    </>
  )
}

export default layout
