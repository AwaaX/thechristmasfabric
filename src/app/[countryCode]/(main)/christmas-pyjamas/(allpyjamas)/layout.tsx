import SwhBreadCrumbs from "@modules/common/components/swh/SwhBreadCrumbs"
import SwhCategoriesSlider from "@modules/common/components/swh/SwhCategoriesSlider"
import SwhFilters from "@modules/common/components/swh/SwhFilters"
import SkeletonCategoriesSlider from "@modules/skeletons/templates/skeleton-categories-slider"
import { Suspense } from "react"

const AllPyjamasLayout = ({ children,params }) => {
  return (
    <>
      {/* Bread Crumb */}
      <SwhBreadCrumbs title={"Christmas Pyjamas"} path={"christmas-pyjamas"} params={params}/>

      <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                <div className="container">
                    <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">         
                        <SwhFilters params={params}/>
                        <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3">
                        <Suspense fallback={<SkeletonCategoriesSlider/>}><SwhCategoriesSlider/></Suspense>
                        {children}
                        </div>
                     </div>
               </div>
        </div>
    </>
  )
}

export default AllPyjamasLayout