import Image from "next/image"
import { Heading, Text } from "@medusajs/ui"
import sitelogo from "@lib/img/sitelogo.svg"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ServiceCard from "./ServiceCard"
import serviceIcon1 from "@lib/img/x_mas_box_01b.jpg.webp"
import serviceIcon2 from "@lib/img/x_mas_box_02.jpg.webp"
import serviceIcon3 from "@lib/img/x_mas_box_03.jpg.webp"
import { useTranslations } from "next-intl"

const ServicesSection = () => {
  const t = useTranslations("HomePage.Services")

  const services = [
    {
      icon: serviceIcon1,
      title: t("card1.heading"),
      brief: t("card1.brief"),
      pop: false,
    },
    {
      icon: serviceIcon2,
      title: t("card2.heading"),
      brief: t("card2.brief"),
      pop: true,
    },
    {
      icon: serviceIcon3,
      title: t("card3.heading"),
      brief: t("card3.brief"),
      pop: false,
    },
  ]

  return (
    <>
      <div className="w-full relative bg-[#eaf3ef]">
        {/* Inner Container */}
        <div className="w-[97%] mx-auto py-[35px] md:py-[70px] ">
          <div className="flex items-center w-[300px] md:w-[500px] mx-auto">
            <Image src={sitelogo} alt={"site-logo"} />
          </div>

          <div className="text-center max-w-[700px] mx-auto mt-6">
            <Text className="text-[16px] md:text-base md:leading-[28px]  font-normal text-[#666] ">
              {t("description")}
            </Text>
          </div>

          {/* Review Slider */}
          <div className="py-16 w-full flex items-center justify-center gap-x-12 gap-y-8 flex-wrap md:flex-nowrap max-md:flex-col max-md:px-3">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center max-w-[700px] mx-auto">
            <Text className="text-base leading-[28px]  font-normal text-[#666] ">
              {t("query")}{" "}
              <LocalizedClientLink
                href="/humanitarian-project"
                className="cursor-pointer underline-gap whitespace-nowrap text-black hover:text-hoverGray duration-300 ease-in-out"
              >
                {t("link")}
              </LocalizedClientLink>
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}

export default ServicesSection
