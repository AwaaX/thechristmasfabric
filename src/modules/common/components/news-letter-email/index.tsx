"use client"
import { useState } from "react"
import { HiOutlineEnvelope } from "react-icons/hi2"
import { IoMdArrowForward } from "react-icons/io"
import LocalizedClientLink from "../localized-client-link"
import { TailSpin } from "react-loader-spinner"
import { useTranslations } from "next-intl"

const NewsLetterEmail = ({
  placeholder = "",
  className = "",
  isFooter = true,
}) => {
  const [email, setEmail] = useState("")
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const t = useTranslations("Footer.NewsLetter")
  const handleSubscribe = (event: any) => {
    event.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
    }, 2000)
  }

  return (
    <div className="max-w-[300px] md:max-w-[500px] w-full mx-auto ">
      {!submitted && (
        <form onSubmit={handleSubscribe}>
          <div
            className={`bg-white flex items-center  px-3  text-black ${
              isFooter ? "rounded-full py-4" : "rounded-md py-3"
            }`}
          >
            {/* Email Icon */}
            {isFooter && <HiOutlineEnvelope />}
            {/* Input Box */}
            <input
              required
              type="email"
              className="flex-1 text-[15px] placeholder:text-black px-4 outline-none"
              placeholder={placeholder || t("Placeholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Arrow Button */}
            {!sending && (
              <button type="submit">
                {" "}
                <IoMdArrowForward />
              </button>
            )}
            {sending && (
              <TailSpin
                visible={true}
                height="25"
                width="25"
                color="#666"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            )}
          </div>
          <div
            className={`text-white text-[15px] mt-3 items-baseline md:items-center justify-start gap-2 ${
              isFooter ? "hidden" : "flex"
            }`}
          >
            {/* Checkbox */}
            <input type="checkbox" required={!isFooter} />
            {/* Text */}
            <p className="max-md:flex max-md:items-center max-md:justify-start max-md:gap-1 max-md:whitespace-nowrap max-md:flex-wrap">
              {t("txt1")}{" "}
              <LocalizedClientLink
                href="/"
                className="cursor-pointer underline-gap whitespace-nowrap"
              >
                {t("txt2")}
              </LocalizedClientLink>{" "}
              {t("and")}{" "}
              <LocalizedClientLink
                href="/"
                className="cursor-pointer underline-gap whitespace-nowrap"
              >
                {t("txt3")}
              </LocalizedClientLink>
            </p>
          </div>
        </form>
      )}

      {submitted && (
        <div className={`${isFooter ? "text-[#666]" : "text-white"}`}>
          {/* Thank you Message */}
          {t("successMessage")}
        </div>
      )}
    </div>
  )
}

export default NewsLetterEmail
