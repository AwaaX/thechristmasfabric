import Image from "next/image"
import { Heading, Text } from "@medusajs/ui"

import { useTranslations } from "next-intl"
import { ProductCarouselSlider } from "@modules/common/components/swh/sliders"

const QuickLookSection = ({ countryCode }) => {
  const t = useTranslations("HomePage.QuickLook")
  return (
    <>
      {/* Timer Section */}
      <div className="pt-12 md:pt-24 w-full relative ">
        {/* Inner Container */}
        <div className="max-w-[1200px] w-full mx-auto py-[35px] md:py-[70px]">
          <div className="text-center">
            <Heading
              level="h2"
              className="text-[24px] md:text-[42px] leading-normal  font-normal "
            >
              {t("heading")}
            </Heading>
            <p className="christmas-font ">{t("description")}</p>
          </div>
          <ProductCarouselSlider countryCode={countryCode} />
        </div>
      </div>
    </>
  )
}

export default QuickLookSection
