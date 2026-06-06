'use client'
import * as Icon from "@phosphor-icons/react/dist/ssr"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import parse from "html-react-parser"
import { useTranslations } from "next-intl"

const PolicyPage = () => {
  const t = useTranslations("StaticPages.TermsOfDelivery")

  return (
    <>
      <div className="breadcrumb-block style-img">
        <div className="breadcrumb-main  overflow-hidden">
          <div className="container  relative">
            <div className="link flex items-center justify-start gap-2  px-[8px] py-1 flex-wrap">
              <LocalizedClientLink href={"/"}>{t("breadcrumbHome")}</LocalizedClientLink>
              <Icon.CaretRightIcon size={14} className="text-secondary2" />
              <LocalizedClientLink href={"/"}>
                {t("title")}
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:py-20 py-10">
        <div className="container">
          <div className="content-main flex flex-col items-center justify-center">
            <div className="text-[42px] leading-[55px] font-normal text-center pb-10">
              {t("title")}
            </div>
            <div className="christmas-product-description text-[16px] text-[#666666] flex flex-col gap-6 max-w-[1170px] w-[97%] mx-auto">
              {parse(t.raw("body"))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PolicyPage
