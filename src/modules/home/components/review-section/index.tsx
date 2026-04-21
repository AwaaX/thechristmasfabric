import Image from "next/image"
import { Heading, Text } from "@medusajs/ui"
import reviews from "@lib/data/reviews.json"

import { useTranslations } from "next-intl"
import Testimonial from "@modules/layout/components/testimonial"
const ReviewSection = () => {
  const t = useTranslations("HomePage.Reviews")
  return (
    <>
      <div className="w-full relative bg-[#F5F5F5]">
        {/* Inner Container */}
        <div className="max-w-[1200px] w-full mx-auto py-[70px]">
          <div className="text-center">
            <Heading
              level="h2"
              className="text-[24px] md:text-[42px] leading-normal  font-normal "
            >
              {t("text1")}
            </Heading>
            <Text className="text-base leading-[28px]  font-normal text-[#666] ">
              {t("text2")}
            </Text>
          </div>

          {/* Review Slider */}
          <div className="md:h-[400px] w-full">
            <Testimonial data={reviews} limit={6} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewSection
