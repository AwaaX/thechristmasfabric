"use client"

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css/bundle"
import TestimonialItem from "./TestimonialItem"
import { TestimonialType } from "types/global"


interface Props {
  data: Array<TestimonialType>
  limit: number
}

const Testimonial: React.FC<Props> = ({ data, limit }) => {
  return (
    <>
      {/* <div className="testimonial-block">
        <div className="container">
          <div className="list-testimonial pagination-mt40 md:mt-10 mt-6"> */}
      <div className="trending-block style-six mt-[60px] max-md:mx-4">
        <div className="container">
          <div className="list-trending section-swiper-navigation style-small-border style-outline  mx-auto">
            <Swiper
              spaceBetween={12}
              slidesPerView={1}
              // pagination={{ clickable: true }}
              navigation
              loop={true}
              modules={[ Autoplay]}
              breakpoints={{
                680: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
            >
              {data.slice(0, limit).map((prd, index) => (
                <SwiperSlide key={index}>
                  <TestimonialItem data={prd} type="style-one" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  )
}

export default Testimonial
