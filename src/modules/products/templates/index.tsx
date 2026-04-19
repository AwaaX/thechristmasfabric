import React, { Suspense } from "react"

import AnalyticsEvent from "@modules/analytics/components/event"
import ImageGallery from "@modules/products/components/image-gallery"
import ProductActions from "@modules/products/components/product-actions"
import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
import ProductTabs from "@modules/products/components/product-tabs"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"

import { buildProductAnalyticsItem } from "@lib/util/ga4"
import ProductActionsWrapper from "./product-actions-wrapper"
import ProductReviews from "../components/product-reviews"

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
  images: HttpTypes.StoreProductImage[]
  selectedVariantId?: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
  images,
  selectedVariantId,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const productAnalyticsItem = buildProductAnalyticsItem({
    product,
    variantId: selectedVariantId,
  })

  return (
    <>
      <AnalyticsEvent
        eventName="view_item"
        params={{
          currency: region.currency_code?.toUpperCase(),
          value: productAnalyticsItem.price,
          items: [productAnalyticsItem],
        }}
      />
      <div
        className="content-container  flex flex-col small:flex-row  py-6 relative"
        data-testid="product-container"
      >
        <div className=" w-1/2 relative">
          <ImageGallery images={images} />
        </div>
        <div className="flex flex-col small:sticky small:top-48 small:py-0  w-full py-8 gap-y-6">
          <ProductInfo product={product} />
          <div className="flex flex-col  small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
            <ProductOnboardingCta />
            <Suspense
              fallback={
                <ProductActions
                  disabled={true}
                  product={product}
                  region={region}
                />
              }
            >
              <ProductActionsWrapper id={product.id} region={region} />
            </Suspense>
          </div>
          <ProductTabs product={product} />
        </div>
      </div>
      <div className="mt-20 max-w-4xl mx-auto px-3">
        <h1 className="text-[36px] font-normal text-center capitalize py-6">
          description
        </h1>
        {/* {sanity?.content || parse(localizedProduct.description)} */}
        {
          <div
            dangerouslySetInnerHTML={{
              __html: product.description?.replace(/\\n/g, "") ?? "",
            }}
          />
        }
      </div>
      <div className="content-container my-16 small:my-32">
        <ProductReviews productId={product.id} />
      </div>
      <div
        className="content-container my-16 small:my-32"
        data-testid="related-products-container"
      >
        <Suspense fallback={<SkeletonRelatedProducts />}>
          <RelatedProducts product={product} countryCode={countryCode} />
        </Suspense>
      </div>
    </>
  )
}

export default ProductTemplate
