"use client"
import { Popover, Transition } from "@headlessui/react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React, { Fragment, useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"
import { useToggleState } from "@medusajs/ui"
import { useTranslations } from "next-intl"

const CategoryDropdown = () => {
  const main = useTranslations("NavBar.Main.NavMenu")

  const subMenuLinks = [
    {
      name: "baby",
      handle: "baby",
    },
    {
      name: "kid",
      handle: "kid-girl-boy",
    },
    {
      name: "women",
      handle: "women-lady",
    },
    {
      name: "men",
      handle: "mens",
    },
  ]
  const toggleState = useToggleState()

  return (
    <div
      onMouseEnter={toggleState.open}
      onMouseLeave={toggleState.close}
      className="relative  z-50 flex items-center justify-center h-full"
    >
      <Popover className=" text-[16px]">
        <Popover.Button
          className={`capitalize relative navmenulink ${
            toggleState.state && "open"
          } h-full`}
        >
          <LocalizedClientLink
            className="flex items-center justify-center gap-2 "
            onClick={toggleState.close}
            href="/christmas-pyjamas"
            data-testid="nav-cart-link"
          >
            {main("all pyjamas")}
            <MdKeyboardArrowDown />
          </LocalizedClientLink>
        </Popover.Button>
        <Transition
          show={toggleState.state}
          as={Fragment}
          enter="transition ease-in duration-150"
          enterFrom="opacity-0 translate-y-10"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-10"
        >
          <Popover.Panel
            onMouseLeave={toggleState.close}
            static
            className="absolute top-[100%] -left-8 z-10 bg-white w-[240px] shadow-[0_0_30px_0_rgba(0,0,0,0.06)]"
          >
            <div className="px-4 py-5 flex flex-col items-center justify-center">
              {
               
                subMenuLinks.map((c, index) => (
                  <LocalizedClientLink
                    key={"category" + index}
                    onClick={toggleState.close}
                    href={`/christmas-pyjamas/${c.handle}`}
                    className="w-full py-2 px-3 hover:bg-[#eee] text-[#aaa] hover:text-black text-[16px] duration-200 ease-linear capitalize"
                  >
                    {main(c.name)}
                  </LocalizedClientLink>
                ))
              }
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CategoryDropdown
