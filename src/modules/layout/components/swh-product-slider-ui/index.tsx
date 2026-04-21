"use client"
import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css/bundle"
import SwhSliderProductPreview from "@modules/common/components/swh/SwhSliderProductPreview"


const SwhProductSliderUI = ({ products }) => {
  return (
    <>
      <div className="trending-block style-six mt-[60px] max-md:mx-4">
        <div className="container">
          <div className="list-trending section-swiper-navigation style-small-border style-outline  mx-auto">
            {products && (
              <Swiper
                spaceBetween={12}
                slidesPerView={1}
                navigation
                loop={true}
                modules={[Navigation, Autoplay]}
                breakpoints={{
                  576: {
                    slidesPerView: 3,
                    // spaceBetween: 12,
                  },
                  768: {
                    slidesPerView: 4,
                    // spaceBetween: 20,
                  },
                  992: {
                    slidesPerView: 4,
                    // spaceBetween: 20,
                  },
                  1290: {
                    slidesPerView: 5,
                    // spaceBetween: 20,
                  },
                }}
                className="h-full"
              >
                {products.length > 0 &&
                  products.map((p, i) => (
                    <SwiperSlide key={p.id}>
                      <SwhSliderProductPreview data={p} type={"grid"} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default SwhProductSliderUI
