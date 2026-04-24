"use client"

import React from "react"
import * as Icon from "@phosphor-icons/react/dist/ssr"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DynamicImage from "./DynamicImage"



const SwhProductPreview = ({ data, type }) => {
  // const { addToWishlist, removeFromWishlist, wishlistState } = useWishlist();
  // const { openModalWishlist } = useModalWishlistContext();

  // const handleAddToWishlist = () => {
  //     // if product existed in wishlit, remove from wishlist and set state to false
  //     if (wishlistState.wishlistArray.some(item => item.id === data.id)) {
  //         removeFromWishlist(data.id);
  //     } else {
  //         // else, add to wishlist and set state to true
  //         addToWishlist(data);
  //     }
  //     openModalWishlist();
  // };

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

  let categorytitle=data?.categories?.length>0?data.categories[0].handle || "category":"category"


  return (
    <>
      <LocalizedClientLink
        // href={`/christmas-pyjamas/${categorytitle}/${data.handle}/${data.id}`}
        href={`/products/${data.handle}`}
        className="group"
      >
        {type === "grid" ? (
          <div className="product-item grid-type">
            <div className="product-main cursor-pointer block ">
              <div className="product-thumb   relative overflow-hidden ">
                {/* Add to WishList */}
                <div className="list-action-right absolute top-3 right-3 max-lg:hidden">
                  <div
                    // className={`add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative
                    //     ${
                    //   wishlistState.wishlistArray.some(
                    //     (item) => item.id === data.id
                    //   )
                    //     ? "active"
                    //     : ""
                    // }

                    // `}
                    className={`add-wishlist-btn w-[32px] h-[32px] flex items-center justify-center rounded-full bg-white duration-300 relative `}
                    // onClick={(e) => {
                    //     e.stopPropagation()
                    //     handleAddToWishlist()
                    // }}
                  >
                    {/* {wishlistState.wishlistArray.some(item => item.id === data.id) ? (
                                        <>
                                        <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">Remove From Wishlist</div>
                                            <Icon.Star size={18} weight='fill' className='text-white' />
                                        </>
                                    ) : (
                                        <> */}
                    <div className="tag-action bg-black text-white caption2 px-1.5 py-0.5 rounded-sm">
                      Add To Wishlist
                    </div>
                    <Icon.Star size={18} />
                  </div>
                </div>

                {/* Thumb Image */}
                <div className="product-img w-full h-full aspect-[3/4] flex items-center justify-center">
                  <>
                    {data.thumbnail && (
                      // <Image
                      //   src={data.thumbnail}
                      //   width={500}
                      //   height={500}
                      //   priority={true}
                      //   alt={data.title}
                      //   className="w-full  duration-700 "
                      // />
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
                    Select Option
                  </div>
                </div>
              </div>

              <div className=" mt-4 lg:mb-7">
                <div className="product-name text-title duration-300">
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
                      // <Image
                      //   src={data.thumbnail}
                      //   width={500}
                      //   height={500}
                      //   priority={true}
                      //   alt={data.name}
                      //   className="w-full  duration-700"
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
                  <div className="product-name heading6 inline-block duration-300">
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
                    {/* {parse(data?.metadata?.["en-gb_short_description"]) ||
                      "No Description Found"} */}
                      {data.description}
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

export default SwhProductPreview
