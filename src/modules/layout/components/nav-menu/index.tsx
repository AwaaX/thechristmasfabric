import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"
import { useTranslations } from "next-intl"
import CategoryDropdown from "../category-dropdown"
// import { useToggleState } from '@medusajs/ui';

const NavMenu = () => {
  const main = useTranslations("NavBar.Main.NavMenu")
  // const toggleState=useToggleState();

  const navlinks = [
    {
      name: "Matching pyjamas",
      handle: "/christmas-pyjamas/matching-couples",
    },
    {
      name: "Family pyjamas",
      handle: "/christmas-pyjamas/family",
    },
    {
      name: "Customer service",
      handle: "/customer-service",
    },
  ]

  return (
    <div className=" h-full">
      <ul className="w-full flex items-center justify-between text-[16px] text-black  h-full">
        <li className="relative h-full">
          <CategoryDropdown />
        </li>

        {navlinks.map((item, index) => (
          <li key={item.name + index} className="navmenulink relative">
            <LocalizedClientLink href={item.handle}>
              {main(item.name)}
            </LocalizedClientLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NavMenu
