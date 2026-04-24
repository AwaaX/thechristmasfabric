import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { listLocales } from "@lib/data/locales"
import { getLocale } from "@lib/data/locale-actions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"
import WishlistNavLink from "@modules/layout/components/wishlist-nav-link"
import SearchModal from "@modules/search/components/modal"
import { getTranslations } from "next-intl/server"
import Link from "next/link"
import { FaInstagram, FaRegUser, FaTiktok } from "react-icons/fa"
import { IoSearch } from "react-icons/io5"
import Image from "next/image"
import sitelogo from "@lib/img/sitelogo.svg"
import NavMenu from "@modules/layout/components/nav-menu"
import MobileMenu from "./MobileMenu"
import CountrySelect from "@modules/layout/components/country-select"
import { ArrowRightMini } from "@medusajs/icons"
import SwhRegionSelect from "@modules/common/components/swh/SwhRegionSelect"

export default async function Nav() {
  const top = await getTranslations("NavBar.Top")
  const middle = await getTranslations("NavBar.Middle")
  const main = await getTranslations("NavBar.Main.IconMenu")
  const [regions, locales, currentLocale] = await Promise.all([
    listRegions().then((regions: StoreRegion[]) => regions),
    listLocales(),
    getLocale(),
  ])

  return (
    <>
      {/* Top Banner */}
      <div className="relative h-[40px] mx-auto  duration-200 bg-christmas">
        <div className="content-container text-[12px] md:text-[15px] flex items-center justify-center h-full text-white font-medium">
          {top("alert")}
        </div>
      </div>
      {/* Middle Header */}
      <div className="max-md:hidden relative h-[40px] mx-auto  duration-200 bg-white border-b border-b-gray-200 text-[15px]">
        <div className="content-container flex items-center justify-between h-full">
          <div className="flex-1 h-full flex items-center">
            <div className="flex items-center justify-start gap-6">
              <Link
                href={"https://www.instagram.com/thechristmasfabric/"}
                target="_blank"
                className=" font-normal flex items-center justify-center gap-[10px] group  hover:text-hoverGray cursor-pointer duration-300"
              >
                <FaInstagram className="text-base" />
                <p> {middle("Instagram")}</p>
              </Link>
              <Link
                href={"https://www.tiktok.com/@thechristmasfabric"}
                target="_blank"
                className=" font-normal flex items-center justify-center gap-[10px] group  hover:text-hoverGray cursor-pointer duration-300"
              >
                <FaTiktok className="text-base" />
                <p> {middle("Tiktok")}</p>
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            <LocalizedClientLink
              href="/christmas-pyjamas"
              className="hover:text-hoverGray cursor-pointer duration-300 underline-gap whitespace-nowrap"
              data-testid="nav-store-link"
            >
              {middle("alert")}
            </LocalizedClientLink>
          </div>
          {/* Region Selection */}
          <div className="relative flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            {/* <div className=" font-normal flex items-center justify-center gap-[10px] group  hover:text-hoverGray cursor-pointer duration-300">
             <p>USA</p> <FaGlobe className="text-base" />
           </div> */}
            {/* <SwhRegionSelect regions={regions} /> */}
          </div>
        </div>
      </div>
      {/* Main Navigation */}
      <header id="header" className="top-0 inset-x-0 z-50 group duration-500">
        <div className="h-[50px] md:h-[70px] mx-auto  duration-200 bg-white ">
          <nav className="content-container flex items-center justify-between h-full ">
            {/* Logo */}
            <div className="flex-1 flex items-center justify-start gap-x-2">
              {/* Mobile Menu Icon */}
              <MobileMenu />
              <div className="w-[150px] md:w-[250px]">
                <LocalizedClientLink
                  href="/"
                  className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
                  data-testid="nav-store-link"
                >
                  <Image src={sitelogo} alt={"site-logo"} />
                </LocalizedClientLink>
              </div>
            </div>

            {/* Custom NavLinks */}
            <div className="max-lg:hidden flex-1 h-full">
              <NavMenu />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-x-2 md:gap-x-6 h-full flex-1 basis-0 justify-end">
              {/* Account */}
              <LocalizedClientLink
                className="hover:text-hoverGray text-black font-medium duration-300 ease-in-out text-[24px] relative tag-action-ctrl max-md:hidden"
                href="/account"
                data-testid="nav-account-link"
              >
                <FaRegUser />
                <div className="tag-action-swh bg-black text-white caption2 ">
                  {main("Account")}
                </div>
              </LocalizedClientLink>

              {/* Search */}
              {process.env.FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="hover:text-hoverGray text-black font-medium duration-300 ease-in-out text-[20px] md:text-[24px]  relative tag-action-ctrl"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  <IoSearch />
                  <div className="tag-action-swh bg-black text-white caption2 ">
                    {main("Search")}
                  </div>
                </LocalizedClientLink>
              )}

              {/* WishList */}
              <WishlistNavLink label={main("Wishlist")} />

              {/* Cart */}
              <CartButton />
            </div>
          </nav>
        </div>
      </header>
    </>
  )

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu
                regions={regions}
                locales={locales}
                currentLocale={currentLocale}
              />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
              data-testid="nav-store-link"
            >
              Medusa Store
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <SearchModal />
            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-ui-fg-base flex gap-2"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
