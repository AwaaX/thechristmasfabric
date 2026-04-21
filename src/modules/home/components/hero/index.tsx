import { Github } from "@medusajs/icons"
import { Button, Heading, Text } from "@medusajs/ui"
import heroImg from "@lib/img/slide01.webp"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const Hero = async () => {
    const t = await getTranslations("HomePage.Hero")
  return (
    <>
        {/* Hero Section */}
      <div className="h-[554px] md:h-[710px] w-full relative ">
        <Image
          src={heroImg}
          alt={"hero-img"}
          className=" object-left md:object-center object-cover w-full h-full"
          placeholder="blur"
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6 px-2">
          <span className="flex flex-col max-w-[500px] w-full items-center justify-center gap-5">
            <Heading
              level="h3"
              className="text-[18px] tracking-[2px] leading-normal  font-medium text-[#C02C30] uppercase "
            >
              {t("title")}
            </Heading>
            <Heading
              level="h1"
              className="text-[65px] leading-normal  font-normal"
            >
              {t("heading")}
            </Heading>
            <Text className="text-[16px] leading-[28px]  font-normal max-w-[350px] text-[#666]">
              {t("shortdescription")}
            </Text>
          </span>
          <LocalizedClientLink
            href="/shop"
            className="border border-black px-[25px] min-h-[45px] rounded-[5px] flex items-center justify-center text-hoverGray hover:bg-black hover:text-white duration-300 ease-out hover:shadow-[0_0_0_0.2rem_rgba(0,0,0,1)] capitalize"
          >
            {t("button")}
          </LocalizedClientLink>
        </div>
      </div></>
  )
}

export default Hero
