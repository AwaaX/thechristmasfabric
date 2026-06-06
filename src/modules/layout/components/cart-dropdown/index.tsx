"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"
import { BiShoppingBag } from "react-icons/bi"
import { RxCross2 } from "react-icons/rx"
import Image from "next/image"
import { head } from "lodash"
import emptycart from "@lib/img/cart/empty-cart.png"
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { getCheckoutStep } from "@modules/cart/templates/summary"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [activeTab, setActiveTab] = useState<string | undefined>("")
  const handleActiveTab = (tab: string) => {
    setActiveTab(tab)
  }
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)
  const main = useTranslations("NavBar.Main.IconMenu")
  const t = useTranslations("Cart.Dropdown")

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const step = cartState ? getCheckoutStep(cartState) : "address"

    console.log(cartState)
    const taxTotal=cartState?.tax_total ?? 0
    const total = cartState?.total ?? 0
  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  // disable scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = cartDropdownOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [cartDropdownOpen])

  // on escape key press, close modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close()
      }
    }
    window.addEventListener("keydown", handleEsc)

    // cleanup
    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="h-full z-50">
      <div
        onClick={() => setCartDropdownOpen(false)}
        className={`fixed top-0 left-0 h-[100dvh] w-screen bg-[rgba(0,0,0,0.5)] text-ui-fg-base ${
          cartDropdownOpen
            ? "opacity-100 duration-500 ease-in-out"
            : "hidden opacity-0"
        } cursor-[url('/images/cursor/close.png'),_pointer]`}
      ></div>
      <Popover className="relative h-full">
        {/* <PopoverButton className="h-full">
          <LocalizedClientLink
            className="hover:text-ui-fg-base"
            href="/cart"
            data-testid="nav-cart-link"
          >{`Cart (${totalItems})`}</LocalizedClientLink>
        </PopoverButton> */}

        <PopoverButton
          onClick={() => setCartDropdownOpen(true)}
          className="h-full outline-none "
        >
          <div className="hover:text-hoverGray text-black font-medium duration-300 ease-in-out relative  text-[20px] md:text-[24px] tag-action-ctrl">
            <BiShoppingBag />
            <span className="w-5 h-5 rounded-full bg-christmas text-white font-bold text-xs flex items-center justify-center absolute -top-3 -right-3">
              {totalItems}
            </span>
            <div className="tag-action-swh bg-black text-white caption2 ">
              {main("Cart")}
            </div>
          </div>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          // enter="transition ease-out duration-200"
          // enterFrom="opacity-0 translate-y-1"
          // enterTo="opacity-100 translate-y-0"
          // leave="transition ease-in duration-150"
          // leaveFrom="opacity-100 translate-y-0"
          // leaveTo="opacity-0 translate-y-1"
          enter="transition ease-out duration-500"
          enterFrom="opacity-0 translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="transition ease-in duration-300"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 translate-x-full"
        >
          <PopoverPanel
            static
            className={
              "bg-white border-x border-b border-gray-200 w-[250px] md:w-[450px] h-[100dvh] top-0 right-0 fixed flex flex-col "
            }
            // className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-gray-200 w-[420px] text-ui-fg-base"
            data-testid="nav-cart-dropdown"
          >
            <div className="heading px-6 py-6 flex items-center justify-between relative ">
              <div className="heading5">Shopping Basket</div>
              <RxCross2
                className="text-[24px] font-normal hover:text-hoverGray duration-300 ease-in-out cursor-pointer"
                onClick={() => setCartDropdownOpen(false)}
              />
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll px-4 flex flex-col gap-y-8 no-scrollbar p-[20px]  flex-1">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      // <div
                      //   className="grid grid-cols-[122px_1fr] gap-x-4"
                      //   key={item.id}
                      //   data-testid="cart-item"
                      // >
                      //   <LocalizedClientLink
                      //     href={`/products/${item.product_handle}`}
                      //     className="w-24"
                      //   >
                      //     <Thumbnail
                      //       thumbnail={item.thumbnail}
                      //       images={item.variant?.product?.images}
                      //       size="square"
                      //     />
                      //   </LocalizedClientLink>
                      //   <div className="flex flex-col justify-between flex-1">
                      //     <div className="flex flex-col flex-1">
                      //       <div className="flex items-start justify-between">
                      //         <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                      //           <h3 className="text-base-regular overflow-hidden text-ellipsis">
                      //             <LocalizedClientLink
                      //               href={`/products/${item.product_handle}`}
                      //               data-testid="product-link"
                      //             >
                      //               {item.title}
                      //             </LocalizedClientLink>
                      //           </h3>
                      //           <LineItemOptions
                      //             variant={item.variant}
                      //             data-testid="cart-item-variant"
                      //             data-value={item.variant}
                      //           />
                      //           <span
                      //             data-testid="cart-item-quantity"
                      //             data-value={item.quantity}
                      //           >
                      //             {t("quantity")}: {item.quantity}
                      //           </span>
                      //         </div>
                      //         <div className="flex justify-end">
                      //           <LineItemPrice
                      //             item={item}
                      //             style="tight"
                      //             currencyCode={cartState.currency_code}
                      //           />
                      //         </div>
                      //       </div>
                      //     </div>
                      //     <DeleteButton
                      //       id={item.id}
                      //       className="mt-1"
                      //       data-testid="cart-item-remove-button"
                      //     >
                      //       {t("remove")}
                      //     </DeleteButton>
                      //   </div>
                      // </div>

                      <div
                        className="flex  gap-x-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="flex-1 w-24 shrink-0 min-w-24"
                        >
                          <div className="product-thumb bg-white border shadow-[0_0_30px_0_rgba(0,0,0,.05)] relative overflow-hidden rounded-2xl w-full  ">
                            <div className="product-img w-full aspect-[3/4] rounded-2xl overflow-hidden flex items-center justify-center">
                              {item.thumbnail && (
                                <Image
                                  src={item.thumbnail}
                                  width={500}
                                  height={500}
                                  priority={true}
                                  alt={item.product_handle ?? "product image"}
                                  className="w-full  duration-700"
                                />
                              )}
                            </div>
                          </div>
                        </LocalizedClientLink>
                        <div className="flex flex-col items-start justify-start flex-4">
                          <div className="flex flex-col items-start justify-start mr-4 max-w-[300px]">
                            <h3 className=" overflow-hidden text-ellipsis">
                              {/* <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                              > */}
                              {item.title}
                              {/* </LocalizedClientLink> */}
                            </h3>
                            {/* <LineItemOptions
                              variant={item.variant}
                              data-testid="cart-item-variant"
                              data-value={item.variant}
                            /> */}
                            <LineItemPrice
                              currencyCode={cartState.currency_code}
                              item={item}
                              style="tight"
                            />
                          </div>
                          <div>
                            <span
                              data-testid="cart-item-quantity"
                              data-value={item.quantity}
                            >
                              Quantity: {item.quantity}
                            </span>
                            <DeleteButton
                              id={item.id}
                              className="mt-1"
                              data-testid="cart-item-remove-button"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="footer-modal bg-christmasBg  bottom-0 left-0 w-full ">
                  <div className="flex items-center justify-around lg:gap-14 gap-8 px-6 py-4 border-b border-line">
                    <div
                      className="item flex flex-col justify-center items-center gap-1 cursor-pointer group hover:text-hoverGray duration-300 ease-in-out"
                      onClick={() => handleActiveTab("note")}
                    >
                      <Icon.NotePencilIcon className="text-xl" />
                      <div className="text-title">Note</div>
                    </div>
                    <div
                      className="item flex flex-col justify-center items-center gap-1 cursor-pointer group hover:text-hoverGray duration-300 ease-in-out"
                      onClick={() => handleActiveTab("coupon")}
                    >
                      <Icon.TagIcon className="text-xl" />
                      <div className="text-title">Coupon</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-6 px-6 ">
                    <div className="text-[16px] font-normal text-christmasText ">
                      Subtotal (excl. tax)
                    </div>
                    <div className="text-title ">
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between  px-6 ">
                    <div className="text-[16px] font-normal text-christmasText">
                      Taxes
                    </div>
                    <div className="text-title ">
                      {convertToLocale({
                        amount: taxTotal,
                        currency_code: cartState.currency_code,
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-6 px-6 ">
                    <div className="body1 font-medium">Total (Incl. tax)</div>
                    <div className="body1 font-medium">
                      {convertToLocale({
                        amount: total,
                        currency_code: cartState.currency_code,
                      })}
                    </div>
                  </div>
                  <div className="block-button text-center p-6">
                    <div>
                      <LocalizedClientLink
                        href={"/checkout?step=" + step}
                        className="swh-btn bg-black text-white text-[16px] font-normal"
                        onClick={() => setCartDropdownOpen(false)}
                      >
                        Checkout
                      </LocalizedClientLink>
                    </div>
                    <div className="mt-[10px]">
                      <LocalizedClientLink
                        href={"/cart"}
                        className="has-line-before text-[16px] font-normal"
                        onClick={() => setCartDropdownOpen(false)}
                      >
                        View Basket
                      </LocalizedClientLink>
                    </div>
                  </div>

                  <div
                    className={`tab-item note-block ${
                      activeTab === "note" ? "active" : ""
                    }`}
                  >
                    <div className="px-6 py-4 border-b border-line">
                      <div className="item flex items-center gap-3 cursor-pointer">
                        <Icon.NotePencil className="text-xl" />
                        <div className="caption1">Note</div>
                      </div>
                    </div>
                    <div className="form pt-4 px-6">
                      <textarea
                        name="form-note"
                        id="form-note"
                        rows={4}
                        placeholder="Add special instructions for your order..."
                        className="caption1 py-3 px-4 bg-surface border-line rounded-md w-full"
                      ></textarea>
                    </div>
                    <div className="block-button text-center p-6 ">
                      <div
                        className="swh-btn bg-black text-white text-[16px] font-normal"
                        onClick={() => setActiveTab("")}
                      >
                        Save
                      </div>
                      <div
                        onClick={() => setActiveTab("")}
                        className="hover:text-hoverGray cursor-pointer text-[16px] font-normal mt-[10px]"
                      >
                        Cancel
                      </div>
                    </div>
                  </div>

                  <div
                    className={`tab-item note-block ${
                      activeTab === "coupon" ? "active" : ""
                    }`}
                  >
                    <div className="px-6 py-4 border-b border-line">
                      <div className="item flex items-center gap-3 cursor-pointer">
                        <Icon.Tag className="text-xl" />
                        <div className="caption1">Add A Coupon Code</div>
                      </div>
                    </div>
                    <div className="form pt-4 px-6">
                      <div className="">
                        <label
                          htmlFor="select-discount"
                          className="caption1 text-secondary"
                        >
                          Enter Code
                        </label>
                        <input
                          className="border-line px-5 py-3 w-full rounded-xl mt-3"
                          id="select-discount"
                          type="text"
                          placeholder="Discount code"
                        />
                      </div>
                    </div>
                    <div className="block-button text-center p-6">
                      <div
                        className="swh-btn bg-black text-white text-[16px] font-normal"
                        onClick={() => setActiveTab("")}
                      >
                        Apply
                      </div>
                      <div
                        onClick={() => setActiveTab("")}
                        className="hover:text-hoverGray cursor-pointer text-[16px] font-normal mt-[10px]"
                      >
                        Cancel
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-2 items-center justify-center">
                  <div className="w-[250px]">
                    <Image src={emptycart} alt={"site-logo"} />
                  </div>

                  <div className="body1 font-medium">
                    Your basket is currently empty
                  </div>
                  <div className="text-[16px] font-normal text-christmasText text-center px-5">
                    You may check out all the available products and buy some in
                    the shop.
                  </div>

                  {/* CTA Button */}
                  <div>
                    <LocalizedClientLink
                      href={"/christmas-pyjamas"}
                      className="swh-btn bg-black text-white text-[16px] font-normal mt-4"
                      onClick={() => setCartDropdownOpen(false)}
                    >
                      Return to Shop
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown
