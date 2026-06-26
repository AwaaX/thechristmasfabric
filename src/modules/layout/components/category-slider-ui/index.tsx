"use client"
import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css/bundle"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { DynamicImage } from "@modules/common/components/swh/utilities"


const SwhCatSliderUI = ({ categories }) => {
  // console.log(categories)
  return (
    <>
      <div className="trending-block style-six mb-[50px]">
        <div className="container">
          <div className="list-trending section-swiper-navigation style-small-border style-outline  mx-auto">
            <Swiper
              spaceBetween={12}
              slidesPerView={2}
              navigation
              loop={true}
              modules={[Navigation, Autoplay]}
              breakpoints={{
                576: {
                  slidesPerView: 3,
                  spaceBetween: 12,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                992: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1290: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
              className="h-full"
            >
              {categories &&
                categories.length > 0 &&
                categories.map(
                  (c, i) =>
                    !c.parent_category_id && (
                      <SwiperSlide key={`slide_${i}`}>
                        <LocalizedClientLink
                          className="flex flex-col items-center justify-center"
                          href={`/christmas-pyjamas/${c.handle}`}
                        >
                          <div className="bg-white rounded-full w-[140px] h-[140px] overflow-hidden">
                            <DynamicImage
                              url={
                                c?.product_category_image?.[0]?.url &&
                                c?.product_category_image?.[0]?.url !== ""
                                  ? c?.product_category_image?.[0]?.url
                                  : "/images/category/cat.webp"
                              }
                              alt={"item-picture"}
                              className="w-full h-full object-center object-cover "
                            />
                          </div>
                          <div className="trending-name text-center mt-5 duration-500">
                            <div className="text-title">{c.name}</div>
                            <div className="caption2">{c.products?.length ?? 0} items</div>
                          </div>
                        </LocalizedClientLink>
                      </SwiperSlide>
                    )
                )}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}

export default SwhCatSliderUI
