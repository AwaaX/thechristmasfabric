import Image from "next/image"
import { Heading, Text } from "@medusajs/ui"
import productImg1 from "@lib/img/christmas-pyjamas-original2-min-370x500.png"
import productImg2 from "@lib/img/family-original2-min-300x300.png"
import productImg3 from "@lib/img/couples-original-min-300x300.png"
import DescriptionCard from "./DescriptionCard"
import { useTranslations } from "next-intl"

const DiscoverySection = () => {
  const t = useTranslations("HomePage.Discovery")
  const products = [
    {
      heading: t("Item1.heading"),
      brief: t("Item1.brief"),
      title: t("Item1.title"),
      picture: productImg1,
      quantity: "36",
      handle: "/christmas-pyjamas",
      reverse: true,
      special: true,
    },
    {
      heading: t("Item2.heading"),
      brief: t("Item2.brief"),
      title: t("Item2.title"),
      picture: productImg2,
      quantity: "19",
      handle: "/christmas-pyjamas/family",
      reverse: false,
      special: false,
    },
    {
      heading: t("Item3.heading"),
      brief: t("Item3.brief"),
      title: t("Item3.title"),
      picture: productImg3,
      quantity: "27",
      handle: "/christmas-pyjamas/matching-couples",
      reverse: true,
      special: false,
    },
  ]

  return (
    <>
      <div className="w-full relative">
        {/* Inner Container */}
        <div className="max-w-[1200px] w-full mx-auto py-[35px] md:py-[70px] px-3">
          <div className="text-center max-w-[500px] mx-auto">
            <Heading
              level="h2"
              className="text-2xl md:text-[42px] leading-normal  font-normal "
            >
              {t("heading")}
            </Heading>
            <Text className="text-base leading-[28px]  font-normal text-[#666] ">
              {t("description")}
            </Text>
          </div>

          {/* Description Section */}
          <div className="flex flex-col items-center justify-center gap-16 mt-16 ">
            {products.map((product, index) => {
              return (
                <DescriptionCard key={product.title + index} {...product} />
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default DiscoverySection
