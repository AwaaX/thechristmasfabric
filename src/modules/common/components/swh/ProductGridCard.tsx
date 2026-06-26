"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DynamicImage from "./DynamicImage"
import WishlistButton, {
  type ProductGridCardData,
} from "./WishlistButton"
import parse from "html-react-parser"
import PreviewPrice from "@modules/products/components/product-preview/price"
import { getProductPrice } from "@lib/util/get-product-price"
import { useTranslations } from "next-intl"

type ProductGridCardProps = {
  data: ProductGridCardData
  type: "grid" | "list"
}

const ProductGridCard = ({ data, type }: ProductGridCardProps) => {
  const t = useTranslations("Product.Preview")
    const { cheapestPrice,highestPrice } = getProductPrice({
      product: data,
    })
  const originalPriceText = data.price?.original_price
  const salePriceText = data.price?.calculated_price
  const originalPrice = originalPriceText
    ? parseFloat(originalPriceText.replace(/,/g, "").substring(1))
    : null
  const salePrice = salePriceText
    ? parseFloat(salePriceText.replace(/,/g, "").substring(1))
    : null

  const percentSale =
    originalPrice !== null && salePrice !== null
      ? Math.floor(100 - (salePrice / originalPrice) * 100)
      : null

  return (
    <>
      <LocalizedClientLink
        href={`/products/${data.handle}`}
        className="group"
      >
        {type === "grid" ? (
          <div className="product-item grid-type">
            <div className="product-main cursor-pointer block ">
              <div className="product-thumb   relative overflow-hidden ">
                {/* Add to WishList */}
                <div className="list-action-right absolute top-3 right-3 max-lg:hidden">
                  <WishlistButton
                    className="add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative"
                    iconSize={18}
                    product={data}
                    tooltipClassName="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm"
                  />
                </div>

                {/* Thumb Image */}
                <div className="product-img w-full h-full aspect-[3/4] flex items-center justify-center">
                  <>
                    {data.thumbnail && (
                      <DynamicImage
                        url={data.thumbnail}
                        alt={data.title}
                        className="w-full aspect-[3/4] object-contain "
                      />
                    )}
                  </>
                </div>

                {/* Select Option */}
                <div className="list-action px-5 absolute w-full bottom-5 ">
                  <div
                    className="quick-view-btn w-full text-[16px] bg-white swh-btn "
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    {t("selectOption")}
                  </div>
                </div>
              </div>

              <div className=" mt-4 lg:mb-7">
                <div className="product-name text-title duration-300">
                  {data.title}
                </div>
                <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                  <div className="product-price text-title">
                    {cheapestPrice && <PreviewPrice price={cheapestPrice} highestPrice={highestPrice} />}
                  </div>
                  {typeof percentSale === "number" && percentSale > 0 && (
                    <>
                      <div className="product-origin-price caption1 text-secondary2">
                        <del>{data.price?.original_price}</del>
                      </div>
                      <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                        -{percentSale}%
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="product-item list-type">
              <div className="product-main cursor-pointer flex lg:items-center sm:justify-between gap-7 max-lg:gap-5">
                {/* thumb Image */}
                <div className="product-thumb  relative overflow-hidden  block max-sm:w-1/2 w-1/4 ">
                  <div className="product-img w-full aspect-[3/4] bg-slate-200 overflow-hidden flex items-center justify-center">
                    {data.thumbnail && (
                      <DynamicImage
                        url={data.thumbnail}
                        alt={data.title}
                        className="w-full aspect-[3/4] object-cover "
                      />
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col items-start justify-center  w-3/4">
                  <div className="product-name heading6 inline-block duration-300">
                    {data.title}
                  </div>

                  <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                    <div className="product-price text-title">
                      {cheapestPrice && <PreviewPrice price={cheapestPrice} highestPrice={highestPrice} />}
                    </div>
                    {typeof percentSale === "number" && percentSale > 0 && (
                      <>
                        <div className="product-origin-price caption1 text-secondary2">
                          <del>{data.price?.original_price}</del>
                        </div>
                        <div className="product-sale caption1 font-medium bg-green px-3 py-0.5 inline-block rounded-full">
                          -{percentSale}%
                        </div>
                      </>
                    )}
                  </div>

                  <div className="text-secondary desc mt-5 max-sm:hidden">
                    {parse(data.subtitle)}
                  </div>

                  <div className="flex items-center justify-start gap-8 mt-8">
                    {/* Select Option */}

                    <div
                      className="quick-view-btn w-full text-[16px] bg-white swh-btn "
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      {t("selectOption")}
                    </div>

                    {/* Add to WishList */}
                    <div className="">
                      <WishlistButton
                        className="add-wishlist-btn tag-action-ctrl w-[42px] h-[42px] flex items-center justify-center rounded-full bg-white duration-300 relative ease-out hover:shadow-[0_0_0_0.2rem_rgba(0,0,0,1)]"
                        iconSize={24}
                        product={data}
                        tooltipClassName="tag-action-swh bg-black text-white caption2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </LocalizedClientLink>
    </>
  )
}

export default ProductGridCard
