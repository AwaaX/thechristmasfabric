"use client"

import { useState, useEffect, Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { RxCross2 } from "react-icons/rx"
import { HiBars3 } from "react-icons/hi2"
import { FaRegStar, FaRegUser } from "react-icons/fa"
import NavMenu from "@modules/layout/components/nav-menu"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { IoChevronDown, IoChevronUp } from "react-icons/io5"
const MobileMenu = () => {
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

  const subMenuLinks = [
    {
      name: "baby size available",
      handle: "baby",
    },
    {
      name: "kid size available",
      handle: "kid-girl-boy",
    },
    {
      name: "women size available",
      handle: "women-lady",
    },
    {
      name: "men size available",
      handle: "mens",
    },
  ]

  const [menuOpen, setMenuOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)
  const toggleSubmenu = () => setSubmenuOpen(!submenuOpen)

  // Disable scroll on body when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [menuOpen])

  // Close menu on escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu()
      }
    }
    window.addEventListener("keydown", handleEsc)
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [])

  return (
    <div className="relative z-50">
      <div
        onClick={closeMenu}
        className={`fixed top-0 left-0 h-[100dvh] w-screen bg-[rgba(0,0,0,0.5)] text-ui-fg-base ${
          menuOpen ? "opacity-100 duration-500 ease-in-out" : "hidden opacity-0"
        } cursor-[url('/images/cursor/close.png'),_pointer]`}
      ></div>
      <Popover className=" h-full">
        <Popover.Button
          onClick={openMenu}
          className="p-2 hover:text-hoverGray text-black  duration-300 ease-in-out text-[20px] md:text-[32px] cursor-pointer  relative tag-action-ctrl lg:hidden"
        >
          <HiBars3 />
        </Popover.Button>

        <Transition
          show={menuOpen}
          as={Fragment}
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 -translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="transition ease-in duration-300"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 -translate-x-full"
        >
          <Popover.Panel
            static
            className="fixed top-0 left-0 w-64 h-[100dvh] bg-white shadow-lg border-r border-gray-200 flex flex-col"
          >
            <div className="flex justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Menu</h3>
              <RxCross2
                className="text-2xl cursor-pointer"
                onClick={closeMenu}
              />
            </div>

            <ul className="w-full text-[16px] text-black  flex-1 p-4">
              <li className="py-2 border-b flex items-center justify-between">
                <LocalizedClientLink
                  href="/christmas-pyjamas"
                  onClick={closeMenu}
                  className=" text-[16px] text-black"
                >
                  All Pyjamas
                </LocalizedClientLink>
                <button onClick={toggleSubmenu} className="text-xl">
                  {submenuOpen ? <IoChevronUp /> : <IoChevronDown />}
                </button>
              </li>

              {/* Submenu */}
              {submenuOpen && (
                <ul className="pl-4 mt-2 space-y-2">
                  {subMenuLinks.map((c, index) => (
                    <li className="py-1" key={"category" + index}>
                      <LocalizedClientLink
                        onClick={closeMenu}
                        href={`/christmas-pyjamas/${c.handle}`}
                        className="w-full py-2 px-3 hover:bg-[#eee] text-[#aaa] hover:text-black text-[16px] duration-200 ease-linear capitalize"
                      >
                        {c.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              )}

              {navlinks.map((item, index) => (
                <li
                  key={item.name + index}
                  className="navmenulink relative py-2 border-b"
                >
                  <LocalizedClientLink href={item.handle} onClick={closeMenu}>
                    {item.name}
                  </LocalizedClientLink>
                </li>
              ))}
            </ul>

            <LocalizedClientLink
              href="/wishlist"
              onClick={closeMenu}
              className="flex justify-start gap-2 p-4 border-b border-gray-200"
            >
              <FaRegStar className="text-2xl cursor-pointer" />
              <h3 className="text-lg font-semibold">Wishlist</h3>
            </LocalizedClientLink>
            <LocalizedClientLink
              href="/account"
              onClick={closeMenu}
              className="flex justify-start gap-2 p-4 "
            >
              <FaRegUser className="text-2xl cursor-pointer" />
              <h3 className="text-lg font-semibold">Account</h3>
            </LocalizedClientLink>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default MobileMenu
