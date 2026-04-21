

import { listRegions } from "@lib/data/regions"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { getTranslations } from "next-intl/server"
import { TbTruckDelivery } from "react-icons/tb"
import { MdOutlinePayment } from "react-icons/md"
import { FaRotateLeft, FaInstagram, FaTiktok } from "react-icons/fa6"
import { BiSupport } from "react-icons/bi"
import fbbImg from "@lib/img/payment-1.png.webp"
import Image from "next/image"
import Link from "next/link"
import NewsLetterEmail from "@modules/common/components/news-letter-email"


export default async function Footer() {
  
  const regions = await listRegions().then((regions) => regions)
  const t = await getTranslations("Footer")
  const usefulLinks = [
    {
      name: t("Main.Col2.link1"),
      path: "/wishlist",
    },
    {
      name: t("Main.Col2.link2"),
      path: "/cart",
    },
    {
      name: t("Main.Col2.link3"),
      path: "/cart",
    },
    {
      name: t("Main.Col2.link4"),
      path: "/account",
    },
    {
      name: t("Main.Col2.link5"),
      path: "/account",
    },
  ]
  
  const InfoLinks = [
    {
      name: t("Main.Col3.link1"),
      path: "/track-my-order",
    },
    {
      name: t("Main.Col3.link2"),
      path: "/terms-of-delivery",
    },
    {
      name: t("Main.Col3.link3"),
      path: "/return-and-refund",
    },
    {
      name: t("Main.Col3.link4"),
      path: "/legal-notice",
    },
    {
      name: t("Main.Col3.link5"),
      path: "/legal-notice",
    },
    {
      name: t("Main.Col3.link6"),
      path: "/privacy-policy",
    },
  ]


  return (
    // Footer outer container
    <footer className="w-full bg-[#f5f5f5]">
      {/* Footer top Bar */}
      <div className="w-full  py-9 ">
        <div className="content-container flex max-md:flex-col md:items-center md:justify-between">
          <div className="flex-1">
            <div className="relative flex max-md:flex-col items-center gap-x-6 h-full flex-1 basis-0 justify-start">
              <p>{t("Top.SwitchText")}</p>
              {/* <SwhRegionSelect regions={regions} />
              <SwhCurrencySelect regions={regions} /> */}
            </div>
          </div>
          <div className="flex-1 text-center max-md:border-t border-black">
            <LocalizedClientLink
              href="/customer-service"
              className="hover:text-hoverGray cursor-pointer duration-300 md:underline-gap whitespace-nowrap"
              data-testid="nav-store-link"
            >
              {t("Top.Link1")}
            </LocalizedClientLink>
          </div>
          <div className="flex-1 text-end max-md:text-center">
            <LocalizedClientLink
              href="/humanitarian-project"
              className="hover:text-hoverGray cursor-pointer duration-300  whitespace-nowrap"
              data-testid="nav-store-link"
            >
              {t("Top.Link2")}
            </LocalizedClientLink>
          </div>
        </div>
      </div>

      {/* Footer second Bar */}
      <div className="w-full  py-6 border-t border-black">
        <div className="content-container grid grid-cols-2 md:grid-cols-4 md:gap-x-16">
          <div className=" font-normal flex items-center justify-center gap-[10px] group  md:border border-gray-400 p-5 md:px-7 rounded-full">
            <BiSupport className="text-2xl" />
            <p>{t("Middle.text1")}</p>
          </div>
          <div className=" font-normal flex items-center justify-center gap-[10px] group  md:border border-gray-400 p-5 md:px-7 rounded-full">
            <TbTruckDelivery className="text-2xl" />
            <p>{t("Middle.text2")}</p>
          </div>
          <div className=" font-normal flex items-center justify-center gap-[10px] group  md:border border-gray-400 p-5 md:px-7 rounded-full">
            <FaRotateLeft className="text-2xl" />
            <p>{t("Middle.text3")}</p>
          </div>
          <div className=" font-normal flex items-center justify-center gap-[10px] group  md:border border-gray-400 p-5 md:px-7 rounded-full">
            <MdOutlinePayment className="text-2xl" />
            <p>{t("Middle.text4")}</p>
          </div>
        </div>
      </div>

      {/* footer body */}
      <div className=" w-full py-16 border-t border-black">
        <div className="content-container flex justify-between items-start gap-4 content-container flex-col md:flex-row">
          {/* Column 1 */}
          <div className="flex-1  flex flex-col items-start justify-start gap-5">
            <div className="font-medium capitalize ">
              {t("Main.Col1.text1")}
            </div>
            <div className="text-[#666]">
              <p className="mb-1">{t("Main.Col1.text2")}</p>
              <LocalizedClientLink
                href={"/customer-service"}
                className="underline-gap hover:text-black duration-300 ease-in-out "
              >
                {t("Main.Col1.text3")}
              </LocalizedClientLink>
            </div>
            <div className="text-[#666]">
              <p className="mb-1">{t("Main.Col1.text4")}</p>
              <a
                href="mailto: customer@thechristmasfabric.com"
                className="text-black hover:text-hoverGray duration-300 ease-in-out"
              >
                {" "}
                customer@thechristmasfabric.com
              </a>
            </div>
          </div>
          {/* Column 2 */}
          <ul className="flex-1  flex flex-col items-start justify-start gap-3">
            <li className="font-medium capitalize mb-4">
              {t("Main.Col2.text1")}
            </li>
            {usefulLinks.map((item, index) => {
              return (
                <li
                  key={item.name + index}
                  className="text-[#666666] hover:text-black cursor-pointer capitalize"
                >
                  <LocalizedClientLink href={item.path}>
                    {item.name}
                  </LocalizedClientLink>
                </li>
              )
            })}
          </ul>
          {/* Column 3 */}
          <ul className="flex-1  flex flex-col items-start justify-start gap-3">
            <li className="font-medium capitalize mb-4">
              {t("Main.Col3.text1")}
            </li>
            {InfoLinks.map((item, index) => {
              return (
                <li
                  key={item.name + index}
                  className="text-[#666666] hover:text-black cursor-pointer capitalize"
                >
                  <LocalizedClientLink href={item.path}>
                    {item.name}
                  </LocalizedClientLink>
                </li>
              )
            })}
          </ul>
          {/* Column 4 */}
          <div className="flex-1  flex flex-col justify-start gap-5">
            <div className="font-medium capitalize">{t("Main.Col4.text1")}</div>
            <div className="text-[#666] mb-2">{t("Main.Col4.text2")}</div>
            <div className="text-[#666]">
              <NewsLetterEmail />
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom Bar */}
      <div className="w-full  py-7 border-t border-black">
        <div className="content-container flex max-md:flex-col items-center justify-between max-md:gap-8  md:items-start md:justify-between ">
          <div className="flex-1 ">
            <Image
              src={fbbImg}
              alt="payments-gatway-img"
              className="max-w-full object-contain object-center"
            />
          </div>
          <div className="flex-1 text-center text-[14px] tracking-[0.7px]">
            2024 &copy; {t("Bottom.text1")}
            <br /> {t("Bottom.text2")}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-end gap-4">
              <Link
                href={"https://www.tiktok.com/@thechristmasfabric"}
                target="_blank"
                className=" font-normal flex items-center justify-center gap-[10px] group  hover:text-hoverGray cursor-pointer duration-300"
              >
                <FaTiktok className="text-base" />
              </Link>
              <Link
                href={"https://www.instagram.com/thechristmasfabric/"}
                target="_blank"
                className=" font-normal flex items-center justify-center gap-[10px] group  hover:text-hoverGray cursor-pointer duration-300"
              >
                <FaInstagram className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
