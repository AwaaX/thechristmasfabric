"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import logo from "@lib/img/humanitarian-project/logo.webp"
import img1 from "@lib/img/humanitarian-project/img1.jpg"
import img2 from "@lib/img/humanitarian-project/img2.webp"
import img3 from "@lib/img/humanitarian-project/img3.webp"
import img4 from "@lib/img/humanitarian-project/img4.webp"

const Humanitarian = () => {
  const [activeQuestion, setActiveQuestion] = useState<string | undefined>("")

  const handleActiveQuestion = (question: string) => {
    setActiveQuestion((prevQuestion) =>
      prevQuestion === question ? undefined : question
    )
  }

  return (
    <>
      <div className="flex items-center justify-around py-[35px] christmas-gradient">
        <div className="text-[36px] font-extralight flex-1 text-center">
          Humanitarian project
        </div>
        <div className="text-center flex-1">
          <p className="text-[20px] font-extralight">With your orders</p>
          <h1 className="text-[42px] font-normal leading-relaxed">
            5% donated
          </h1>
          <p className="christmas-font mt-6 max-w-[492px] mx-auto">
            5% of profits will be donated to the AHPA association, with the aim
            of building at least 1 educational garden in Kpomassè, Benin. Thanks
            to your order, you&apos;ll be able to follow the progress of this
            initiative, which is also supported by our French website
          </p>
          <LocalizedClientLink href="/" className="christmas-font">
            {" "}
            Noël Shop{" "}
          </LocalizedClientLink>
        </div>
      </div>

      <div className="flex items-center justify-around py-[35px] ">
        <div className="text-center flex-1">
          <p className="text-[20px] font-extralight">The association</p>
          <h1 className="text-[42px] font-normal leading-relaxed">AHPA</h1>
          <p className="christmas-font mt-6 px-[35px]">
            Association Humanitaire pour l&apos;Afrique (AHPA) is an
            international solidarity association that supports development
            projects in Benin in the fields of education, sustainable
            agriculture, environmental protection and fair tourism. Working with
            local associative partners, AHPA supports income-generating
            micro-projects for young people in environmental education.
          </p>
        </div>
        <div className="flex-1 ">
          <Image src={logo} alt="logo" className="mx-auto" />
        </div>
      </div>

      <div className='grid grid-cols-2 py-[35px] gap-y-8'>
               
                <div className='max-w-[640px] mx-auto'>
                    <Image src={img1} alt='img1' className=''/>
                </div>
                <div className='max-w-[640px] mx-auto'>
                    <Image src={img2} alt='img2' className=''/>
                </div>
                <div className='max-w-[640px] mx-auto'>
                    <Image src={img3} alt='img3' className=''/>
                </div>
                <div className='max-w-[640px] mx-auto'>
                    <Image src={img4} alt='img4' className=''/>
                </div>
            </div>
    </>
  )
}

export default Humanitarian
