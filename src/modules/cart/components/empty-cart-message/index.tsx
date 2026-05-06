import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import emptycart from "@lib/img/cart/empty-cart.png"
import { getTranslations } from "next-intl/server"

const EmptyCartMessage = async () => {
  const t = await getTranslations("Cart.Empty")

  return (
    <div>
    <div className="flex py-16 flex-col gap-y-2 items-center justify-center">

     <div className="w-[250px]">
      <Image src={emptycart} alt={"site-logo"} />
      </div>


      <div className="body1 font-medium">{t("heading")}</div>
      <div className="text-[16px] font-normal text-christmasText text-center px-5">
        {t("description")}
      </div>


    {/* CTA Button */}
      <div>
      <LocalizedClientLink
        href={"/christmas-pyjamas"}
        className="swh-btn bg-black text-white text-[16px] font-normal mt-4"
      >
        {t("cta")}
      </LocalizedClientLink>
      </div>


    </div>
  </div>
  )
}

export default EmptyCartMessage
