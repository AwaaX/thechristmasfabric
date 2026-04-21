import Image from "next/image"
import { Heading, Text } from "@medusajs/ui"
import timerSectionImg from "@lib/img/x_mas_countdown_banner.jpg.webp"
import { useTranslations } from "next-intl"

const CountDownSection = () => {
  const t = useTranslations("HomePage.Timer")

  return (
    <>
      {/* Timer Section */}
      <div className="h-[214px] md:h-[264px] w-full relative ">
        <Image
          src={timerSectionImg}
          alt={"timer-section-img"}
          className="object-left md:object-center object-cover w-full h-full"
          placeholder="blur"
        />
        <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
          <div className="flex flex-col w-full items-center justify-center">
            <Heading
              level="h2"
              className="text-2xl md:text-[42px] leading-normal  font-normal text-white uppercase "
            >
              {t("heading")}
            </Heading>
            {/* Countdown Clock */}
            <div className="countdown-clock">
              {/* Clock Item Days */}
              <div className="clock-item">
                <span className="clock-item-number">00</span>
                <span className="clock-item-text">{t("days")}</span>
              </div>
              <span className="clock-divider">:</span>
              {/* Clock Item hours */}
              <div className="clock-item">
                <span className="clock-item-number">00</span>
                <span className="clock-item-text">{t("hours")}</span>
              </div>
              <span className="clock-divider">:</span>
              {/* Clock Item minutes */}
              <div className="clock-item">
                <span className="clock-item-number">00</span>
                <span className="clock-item-text">{t("minutes")}</span>
              </div>
              <span className="clock-divider">:</span>
              {/* Clock Item seconds */}
              <div className="clock-item">
                <span className="clock-item-number">00</span>
                <span className="clock-item-text">{t("seconds")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CountDownSection
