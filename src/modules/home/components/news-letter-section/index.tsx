import Image from "next/image"
import { Heading, Text } from "@medusajs/ui"
import newsLetterImg from "@lib/img/x_mas_newsletter_bg.jpg.webp"

import { useTranslations } from "next-intl"
import NewsLetterEmail from "@modules/common/components/news-letter-email"

const NewsLetterSection = () => {
  const t = useTranslations("HomePage.NewsLetter")
  return (
    <>
      {/* NewsLetter Section */}
      <div className="h-[360px] w-full relative ">
        <Image
          src={newsLetterImg}
          alt={"newsletter-section-img"}
          className="object-left md:object-center object-cover w-full h-full"
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-center text-center gap-8">
          <div className="text-white">
            <Heading
              level="h2"
              className="text-[24px] md:text-[42px] leading-none font-normal  "
            >
              {t("text1")}
            </Heading>
            <Text className="text-[16px] mt-2">{t("text2")}</Text>
          </div>
          <NewsLetterEmail isFooter={false} />
        </div>
      </div>
    </>
  )
}

export default NewsLetterSection
