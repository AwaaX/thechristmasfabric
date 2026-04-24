"use client"
import React, { Suspense, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore from "swiper/core"
import { Navigation, Thumbs, Scrollbar } from "swiper/modules"
import "swiper/css/bundle"
import Image from "next/image"
import * as Icon from "@phosphor-icons/react/dist/ssr"
import DynamicImage from "./DynamicImage"

SwiperCore.use([Navigation, Thumbs])

const SwhProductDetails = ({ data: productMain, region }) => {
  const swiperRef: any = useRef()
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null)
  const [openPopupImg, setOpenPopupImg] = useState(false)

  const handleSwiper = (swiper: SwiperCore) => {
    // Do something with the thumbsSwiper instance
    setThumbsSwiper(swiper)
  }

  const OriginalPrice = productMain.price
    ? parseFloat(
        productMain.price.original_price.replace(/,/g, "").substring(1)
      )
    : null
  const SalePrice = productMain.price
    ? parseFloat(
        productMain.price.calculated_price.replace(/,/g, "").substring(1)
      )
    : null

  let percentSale =
    OriginalPrice && SalePrice
      ? Math.floor(100 - (SalePrice / OriginalPrice) * 100)
      : null

  return (
    <>
      <div className="list-img md:w-1/2 md:pr-[45px] w-full">
        <div className="flex">
          <Swiper
            onSwiper={(swiper) => {
              handleSwiper(swiper)
            }}
            spaceBetween={8}
            direction="vertical"
            slidesPerView={5}
            // freeMode={true}
            watchSlidesProgress={true}
            modules={[Navigation, Thumbs]}
            className="mySwiper mt-6  christmas-gallery  flex-[1] max-md:!hidden"
            style={{
              height: "500px", // Adjust height to control visible area
              // overflow: "hidden", // Ensure overflow is hidden
            }}
          >
            {productMain.images.map((item, index) => (
              <SwiperSlide key={index} className="">
                {/* <Image
                  src={item.url}
                  width={1000}
                  height={1000}
                  alt="prd-img"
                  className="w-full aspect-[3/4] object-contain  "
                /> */}
                <DynamicImage
                  url={item.url}
                  alt="prd-img"
                  className="w-full aspect-[3/4] object-contain "
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            slidesPerView={1}
            spaceBetween={0}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[Thumbs]}
            className="mySwiper2     flex-[3]"
          >
            {productMain.images.map((item, index) => (
              <SwiperSlide
                key={index}
                onClick={() => {
                  swiperRef.current?.slideTo(index)
                  setOpenPopupImg(true)
                }}
              >
                {/* <Image
                  src={item.url}
                  width={1000}
                  height={1000}
                  alt="prd-img"
                  className="w-full  object-cover aspect-[3/4]  "
                /> */}
                <DynamicImage
                  url={item.url}
                  alt="prd-img"
                  className="w-full  object-cover aspect-[3/4]  "
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={`popup-img ${openPopupImg ? "open " : ""}`}>
          <span
            className="close-popup-btn absolute top-4 right-4 z-[2] cursor-pointer"
            onClick={() => {
              setOpenPopupImg(false)
            }}
          >
            <Icon.X className="text-3xl text-black" />
          </span>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            modules={[Navigation, Thumbs]}
            navigation={true}
            loop={true}
            className="popupSwiper overflow-hidden "
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
          >
            {productMain.images.map((item, index) => (
              <SwiperSlide
                key={index}
                onClick={() => {
                  setOpenPopupImg(false)
                }}
              >
                <Image
                  src={item.url}
                  width={1000}
                  height={1000}
                  alt="prd-img"
                  className="w-full  rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation() // prevent
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  )
}

export default SwhProductDetails
