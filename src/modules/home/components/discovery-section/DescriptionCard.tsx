import LocalizedClientLink from "@modules/common/components/localized-client-link"
import DynamicImage from "@modules/common/components/swh/DynamicImage"

import Image from "next/image"
import React from "react"

const DescriptionCard = ({
  heading,
  brief,
  title,
  picture,
  quantity,
  handle,
  reverse,
  special,
}: {
  heading: any
  brief: any
  title: any
  picture: any
  quantity: any
  handle: any
  reverse: any
  special: any
}) => {
  return (
    <div
      className={`flex items-center md:items-start justify-center max-md:flex-col-reverse ${
        reverse ? "md:flex-row-reverse" : ""
      }  md:gap-[70px] gap-8`}
    >
      {/* Description */}
      <div className="flex-1">
        <div className="flex flex-col items-center justify-start text-center">
          <h2 className="text-[24px] md:text-[36px] leading-normal ">
            {heading}
          </h2>
          <p className="text-[16px] leading-[28px] text-[#666]">{brief}</p>
        </div>
      </div>

      {/* Image + Title + Items Quantity */}
      <div className="flex-1">
        <div
          className={`flex flex-col items-center justify-center gap-4 ${
            special ? " flex-col-reverse relative" : ""
          }`}
        >
          {!special && (
            <div className="rounded-full overflow-hidden w-[160px] h-[160px] ">
              {/* <Image
                src={picture}
                alt={"item picture"}
                className="w-full h-full object-center object-cover"
              /> */}
               <DynamicImage
                url={picture}
                alt={"item-picture"}
                className="w-full h-full object-center object-cover "
              />
            </div>
          )}
          {special && (
            <div className="max-md:max-w-[300px] w-full ">
              {/* <Image
                src={picture}
                alt={"item picture"}
                className="w-full h-full object-center object-cover"
              /> */}
              <DynamicImage
                url={picture}
                alt={"item-picture"}
                className="w-full h-full object-center object-cover "
              />
            </div>
          )}
          <div className={`${special ? "absolute left-8 top-0" : ""}`}>
            <LocalizedClientLink
              href={handle}
              className={`  ${
                special
                  ? " text-[22px] font-bold"
                  : "text-[20px] font-normal max-md:text-center max-md:inline-block"
              }`}
            >
              {title}
            </LocalizedClientLink>
            <div
              className={` ${
                special ? "text-base font-medium " : "text-[#666] text-center"
              } `}
            >
              {quantity} items
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DescriptionCard
