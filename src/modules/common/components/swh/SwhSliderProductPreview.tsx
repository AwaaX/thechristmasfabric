"use client"

import React from "react"
import * as Icon from "@phosphor-icons/react/dist/ssr"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DynamicImage from "./DynamicImage"


const SwhSliderProductPreview = ({ data, type }) => {
  const OriginalPrice = data.price
    ? parseFloat(data.price.original_price.replace(/,/g, "").substring(1))
    : null
  const SalePrice = data.price
    ? parseFloat(data.price.calculated_price.replace(/,/g, "").substring(1))
    : null

  let percentSale =
    OriginalPrice && SalePrice
      ? Math.floor(100 - (SalePrice / OriginalPrice) * 100)
      : null

  let categorytitle =
    data?.categories?.length > 0
      ? data.categories[0].handle || "category"
      : "category"
  return (
    <>
      <LocalizedClientLink
        href={`/products/${data.handle}`}
        className="group"
      >
        {type === "grid" ? (
          <div className="product-item grid-type hover:border duration-500 ease-in-out border border-transparent hover:border-black rounded-md px-2  group">
            <div className="product-main cursor-pointer block">
              <div className="product-thumb bg-white relative overflow-hidden rounded-2xl">
                {/* Add to WishList */}
                <div className="list-action-right absolute top-3 right-3 max-lg:hidden">
                  <div
                    className={`add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative `}
                  >
                    <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">
                      Add To Wishlist
                    </div>
                    <Icon.StarIcon size={18} />
                  </div>
                </div>

                {/* Thumb Image */}
                <div className="product-img w-full h-full aspect-[3/4]">
                  <>
                    {data.thumbnail && (
                      // <Image
                      //   src={data.thumbnail}
                      //   width={500}
                      //   height={500}
                      //   priority={true}
                      //   alt={data.title}
                      //   className="w-full h-full object-cover duration-700"
                      // />
                      <DynamicImage
                        url={data.thumbnail}
                        alt={data.title}
                        className="w-full aspect-[3/4] object-cover "
                      />
                    )}
                  </>
                </div>
              </div>
              <div className="mt-4 lg:mb-7">
                <div className="christmas-font-head">{data.title}</div>
                <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]  ">
                  <div className="product-price christmas-font text-black">
                    {data.price?.calculated_price}
                  </div>
                  {percentSale > 0 && (
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
                <div className="caption1 text-[#356941] flex gap-2 items-center">
                  <div className="w-[6px] h-[6px] rounded-full bg-[#356941]"></div>{" "}
                  In Stock
                </div>
                {/* Select Option */}
                <div className="w-full mt-4 opacity-0 group-hover:opacity-100 duration-500 ease-in-out">
                  <div
                    className="w-full text-[16px] swh-btn text-black border-black"
                    onClick={(e) => {
                      e.stopPropagation()
                    }}
                  >
                    Select Option
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="product-item list-type">
              <div className="product-main cursor-pointer flex lg:items-center sm:justify-between gap-7 max-lg:gap-5">
                {/* thumb Image */}
                <div className="product-thumb bg-white relative overflow-hidden rounded-2xl block max-sm:w-1/2 w-1/4 ">
                  <div className="product-img w-full aspect-[3/4] rounded-2xl overflow-hidden">
                    {data.thumbnail && (
                      // <Image
                      //   src={data.thumbnail}
                      //   width={500}
                      //   height={500}
                      //   priority={true}
                      //   alt={data.name}
                      //   className="w-full h-full object-cover duration-700"
                      // />
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
                  <div className="product-name heading6 inline-block duration-300 max-md:!text-sm">
                    {data.title}
                  </div>

                  <div className="product-price-block flex items-center gap-2 flex-wrap mt-1 duration-300 relative z-[1]">
                    <div className="product-price text-title">
                      {data.price?.calculated_price}
                    </div>
                    {percentSale > 0 && (
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
                    Here are the Merry Grinchmas pajamas, a fun Christmas pajama
                    idea to celebrate your Grinchmas alone or with others.
                    Suitable for families, couples, children, and…
                  </div>

                  <div className="flex items-center justify-start gap-8 mt-8">
                    {/* Select Option */}

                    <div
                      className="quick-view-btn w-full text-[16px] bg-white swh-btn "
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    >
                      Select Option
                    </div>

                    {/* Add to WishList */}
                    <div className="">
                      <div
                        className={`add-wishlist-btn tag-action-ctrl w-[42px] h-[42px] flex items-center justify-center rounded-full bg-white duration-300 relative  ease-out hover:shadow-[0_0_0_0.2rem_rgba(0,0,0,1)]`}
                      >
                        <div className="tag-action-swh bg-black text-white caption2 ">
                          Add To Wishlist
                        </div>
                        <Icon.Star size={24} />
                      </div>
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

export default SwhSliderProductPreview
