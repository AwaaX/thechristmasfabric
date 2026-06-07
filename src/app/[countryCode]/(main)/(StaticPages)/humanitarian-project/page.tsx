"use client"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import logo from "@lib/img/humanitarian-project/logo.webp"
import img1 from "@lib/img/humanitarian-project/img1.jpg"
import img2 from "@lib/img/humanitarian-project/img2.webp"
import img3 from "@lib/img/humanitarian-project/img3.webp"
import img4 from "@lib/img/humanitarian-project/img4.webp"
import { useTranslations } from "next-intl"

const Humanitarian = () => {
  const t = useTranslations("StaticPages.HumanitarianProject")

  return (
    <>
      <div className="flex items-center justify-around py-[35px] christmas-gradient">
        <div className="text-[36px] font-extralight flex-1 text-center">
          {t("title")}
        </div>
        <div className="text-center flex-1">
          <p className="text-[20px] font-extralight">{t("hero.eyebrow")}</p>
          <h1 className="text-[42px] font-normal leading-relaxed">
            {t("hero.heading")}
          </h1>
          <p className="christmas-font mt-6 max-w-[492px] mx-auto">
            {t("hero.description")}
          </p>
          <LocalizedClientLink href="/" className="christmas-font">
            {t("hero.link")}
          </LocalizedClientLink>
        </div>
      </div>

      <div className="flex items-center justify-around py-[35px] ">
        <div className="text-center flex-1">
          <p className="text-[20px] font-extralight">
            {t("association.eyebrow")}
          </p>
          <h1 className="text-[42px] font-normal leading-relaxed">
            {t("association.heading")}
          </h1>
          <p className="christmas-font mt-6 px-[35px]">
            {t("association.description")}
          </p>
        </div>
        <div className="flex-1 ">
          <Image src={logo} alt={t("association.logoAlt")} className="mx-auto" />
        </div>
      </div>

      <div className='grid grid-cols-2 py-[35px] gap-y-8'>
               
                <div className='max-w-[640px] mx-auto'>
                    <Image src={img1} alt={t("gallery.image1Alt")} className=''/>
                </div>
                <div className='max-w-[640px] mx-auto'>
                    <Image src={img2} alt={t("gallery.image2Alt")} className=''/>
                </div>
                <div className='max-w-[640px] mx-auto'>
                    <Image src={img3} alt={t("gallery.image3Alt")} className=''/>
                </div>
                <div className='max-w-[640px] mx-auto'>
                    <Image src={img4} alt={t("gallery.image4Alt")} className=''/>
                </div>
            </div>
    </>
  )
}

export default Humanitarian
