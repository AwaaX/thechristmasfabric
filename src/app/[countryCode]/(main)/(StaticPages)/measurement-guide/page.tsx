"use client"
import { useState } from "react"
import Image from "next/image"

import men from "@lib/img/measurement-guide/men.webp"
import women from "@lib/img/measurement-guide/women.webp"
import baby from "@lib/img/measurement-guide/baby.webp"

import { IoIosArrowDown } from "react-icons/io"
import { useTranslations } from "next-intl"

type MeasurementItem = {
  primaryLabel: string
  primaryText: string
  secondaryLabel?: string
  secondaryText?: string
}

const MeasurementGuide = () => {
  const [gender, setGender] = useState("men")
  const t = useTranslations("StaticPages.MeasurementGuide")
  const measurements = t.raw("measurements") as MeasurementItem[]

  return (
    <div className="small-container">
      <div className="py-[35px]">
        <div className="text-[20px] font-light flex-1 ">
          {t("intro.eyebrow")}
        </div>
        <h1 className="text-[42px] font-normal leading-snug">
          {t("intro.title")}
        </h1>
        <p className="christmas-font mt-6 ">
          {t("intro.paragraph1")}
        </p>
        <p className="christmas-font mt-6 ">
          {t("intro.paragraph2")}
        </p>
      </div>
      <div className="py-[35px]">
        <div className="text-[20px] font-light flex-1 ">
          {t("withoutTape.eyebrow")}
        </div>
        <h1 className="text-[42px] font-normal leading-snug">
          {t("withoutTape.title")}
        </h1>
        <p className="christmas-font mt-6 ">
          {t("withoutTape.description")}
        </p>
      </div>
      <div className="py-[35px]">
        <div className="flex items-center justify-start gap-4">
          <h1 className="text-[42px] font-normal leading-snug">
            {t("guideTitle")}
          </h1>
          <div className="flex items-center justify-start gap-2 border-b-2 border-black">
            <select
              className="text-[42px] font-normal leading-snug"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="men" className="px-3">
                {t("options.men")}
              </option>
              <option value="women" className="px-3">
                {t("options.women")}
              </option>
              <option value="child" className="px-3">
                {t("options.child")}
              </option>
              <option value="baby" className="px-3">
                {t("options.baby")}
              </option>
            </select>
            <IoIosArrowDown className="text-[28px] font-normal leading-snug" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <ul className="pl-10">
            {measurements.map((item) => (
              <li className="christmas-font mt-6" key={item.primaryLabel}>
                <span className="font-bold">{item.primaryLabel}</span>{" "}
                {item.primaryText}
                {item.secondaryLabel && item.secondaryText && (
                  <>
                    <br />
                    <span className="font-bold">{item.secondaryLabel}</span>{" "}
                    {item.secondaryText}
                  </>
                )}
              </li>
            ))}
          </ul>
          {gender === "men" && <Image src={men} alt={t("imageAlt")} />}
          {gender === "women" && <Image src={women} alt={t("imageAlt")} />}
          {gender === "child" && <Image src={men} alt={t("imageAlt")} />}
          {gender === "baby" && <Image src={baby} alt={t("imageAlt")} />}
        </div>
      </div>
    </div>
  )
}

export default MeasurementGuide
