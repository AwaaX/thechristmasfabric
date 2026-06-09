"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { Fragment, useEffect, useRef, useState, useTransition } from "react"
import { BiShoppingBag } from "react-icons/bi"
import { RxCross2 } from "react-icons/rx"
import Image from "next/image"
import emptycart from "@lib/img/cart/empty-cart.png"
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { getCheckoutStep } from "@modules/cart/templates/summary"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null)
  const [isRefreshing, startRefreshTransition] = useTransition()
  const [activeTab, setActiveTab] = useState<string | undefined>("")
  const handleActiveTab = (tab: string) => {
    setActiveTab(tab)
  }
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false)
  const [couponError, setCouponError] = useState<string | null>(null)
  const [couponSuccess, setCouponSuccess] = useState(false)
  const couponTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const main = useTranslations("NavBar.Main.IconMenu")
  const t = useTranslations("Cart.Dropdown")
  const router = useRouter()

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)
  const isUpdatingCart = updatingItemId !== null || isRefreshing

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const step = cartState ? getCheckoutStep(cartState) : "address"
  const taxTotal = cartState?.tax_total ?? 0
  const total = cartState?.total ?? 0
  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const changeQuantity = async (lineId: string, quantity: number) => {
    if (quantity < 1 || isUpdatingCart) {
      return
    }

    setUpdatingItemId(lineId)

    try {
      await updateLineItem({ lineId, quantity })
      startRefreshTransition(() => {
        router.refresh()
      })
    } finally {
      setUpdatingItemId(null)
    }
  }

  const applyCoupon = async () => {
    // Clear previous messages
    setCouponError(null)
    setCouponSuccess(false)

    // Validate input
    if (!couponCode.trim()) {
      setCouponError(t("couponCodeRequired"))
      return
    }

    setIsApplyingCoupon(true)

    try {
      // TODO: Replace with actual API call to apply coupon
      // For now, simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Simulate success (in real implementation, this would be based on API response)
      setCouponSuccess(true)
      setCouponCode("")

      // Auto-clear success message after 3 seconds
      if (couponTimeoutRef.current) {
        clearTimeout(couponTimeoutRef.current)
      }
      couponTimeoutRef.current = setTimeout(() => {
        setCouponSuccess(false)
      }, 3000)
    } catch (error) {
      setCouponError(t("couponError") || "Failed to apply coupon")
    } finally {
      setIsApplyingCoupon(false)
    }
  }

  const timedOpen = () => {
    open()
  }

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      timedOpen()
    }
    itemRef.current = totalItems
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, totalItems])

  // disable scroll on body when modal is open
  useEffect(() => {
    document.body.style.overflow = cartDropdownOpen ? "hidden" : "auto"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [cartDropdownOpen])

  // cleanup coupon timeout on unmount
  useEffect(() => {
    return () => {
      if (couponTimeoutRef.current) {
        clearTimeout(couponTimeoutRef.current)
      }
    }
  }, [])

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
            {isUpdatingCart && (
              <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center cursor-wait">
                <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
              </div>
            )}
            <div className="heading px-6 py-6 flex items-center justify-between relative ">
              <div className="heading5">{t("shoppingBasket")}</div>
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
                              <LocalizedClientLink
                                href={`/products/${item.product_handle}`}
                                data-testid="product-link"
                              >
                                {item.product_title}
                              </LocalizedClientLink>
                            </h3>
                            <LineItemOptions
                              variant={item.variant}
                              data-testid="cart-item-variant"
                              data-value={item.variant}
                            />
                            <LineItemPrice
                              currencyCode={cartState.currency_code}
                              item={item}
                              style="tight"
                            />
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-2  border border-line px-2 py-1">
                              <button
                                type="button"
                                className="flex h-5 w-5 items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
                                onClick={() =>
                                  changeQuantity(item.id, item.quantity - 1)
                                }
                                disabled={isUpdatingCart || item.quantity <= 1}
                                aria-label={t("decreaseQuantity")}
                              >
                                <Icon.MinusIcon size={20} />
                              </button>
                              <span
                                className="min-w-6 text-center text-[16px] font-medium"
                                data-testid="cart-item-quantity"
                                data-value={item.quantity}
                              >
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                className="flex h-5 w-5 items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
                                onClick={() =>
                                  changeQuantity(item.id, item.quantity + 1)
                                }
                                disabled={isUpdatingCart}
                                aria-label={t("increaseQuantity")}
                              >
                                <Icon.PlusIcon size={20} />
                              </button>
                            </div>
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
                      <div className="text-title">{t("note")}</div>
                    </div>
                    <div
                      className="item flex flex-col justify-center items-center gap-1 cursor-pointer group hover:text-hoverGray duration-300 ease-in-out"
                      onClick={() => handleActiveTab("coupon")}
                    >
                      <Icon.TagIcon className="text-xl" />
                      <div className="text-title">{t("coupon")}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-6 px-6 ">
                    <div className="text-[16px] font-normal text-christmasText ">
                      {t("subtotalExclTax")}
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
                      {t("taxes")}
                    </div>
                    <div className="text-title ">
                      {convertToLocale({
                        amount: taxTotal,
                        currency_code: cartState.currency_code,
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-6 px-6 ">
                    <div className="body1 font-medium">{t("totalInclTax")}</div>
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
                        {t("checkout")}
                      </LocalizedClientLink>
                    </div>
                    <div className="mt-[10px]">
                      <LocalizedClientLink
                        href={"/cart"}
                        className="has-line-before text-[16px] font-normal"
                        onClick={() => setCartDropdownOpen(false)}
                      >
                        {t("viewBasket")}
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
                        <div className="caption1">{t("note")}</div>
                      </div>
                    </div>
                    <div className="form pt-4 px-6">
                      <textarea
                        name="form-note"
                        id="form-note"
                        rows={4}
                        placeholder={t("notePlaceholder")}
                        className="caption1 py-3 px-4 bg-surface border-line rounded-md w-full"
                      ></textarea>
                    </div>
                    <div className="block-button text-center p-6 ">
                      <div
                        className="swh-btn bg-black text-white text-[16px] font-normal"
                        onClick={() => setActiveTab("")}
                      >
                        {t("save")}
                      </div>
                      <div
                        onClick={() => setActiveTab("")}
                        className="hover:text-hoverGray cursor-pointer text-[16px] font-normal mt-[10px]"
                      >
                        {t("cancel")}
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
                        <div className="caption1">{t("addCouponCode")}</div>
                      </div>
                    </div>
                    <div className="form pt-6 px-6">
                      {/* Input and Apply Button Row */}
                      <div className="flex gap-2 mb-4">
                        <input
                          className="flex-1 border-2 border-line px-4 py-3 rounded-lg text-base font-medium transition-colors focus:outline-none focus:border-black disabled:bg-gray-50 disabled:cursor-not-allowed"
                          id="select-discount"
                          type="text"
                          placeholder={t("discountCode")}
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value)
                            setCouponError(null)
                          }}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              applyCoupon()
                            }
                          }}
                          disabled={isApplyingCoupon || couponSuccess}
                        />
                        <button
                          onClick={applyCoupon}
                          disabled={
                            isApplyingCoupon ||
                            couponSuccess ||
                            !couponCode.trim()
                          }
                          className="px-6 py-3 bg-black text-white font-medium rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 flex items-center justify-center min-w-[120px] relative"
                        >
                          {isApplyingCoupon ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : couponSuccess ? (
                            <Icon.CheckCircle size={20} weight="fill" />
                          ) : (
                            t("apply")
                          )}
                        </button>
                      </div>

                      {/* Error Message */}
                      {couponError && (
                        <div className="flex gap-2 items-start mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <Icon.WarningCircle
                            size={18}
                            weight="fill"
                            className="text-red-600 flex-shrink-0 mt-0.5"
                          />
                          <p className="text-sm font-medium text-red-600">
                            {couponError}
                          </p>
                        </div>
                      )}

                      {/* Success Message */}
                      {couponSuccess && (
                        <div className="flex gap-2 items-start mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <Icon.CheckCircle
                            size={18}
                            weight="fill"
                            className="text-green-600 flex-shrink-0 mt-0.5"
                          />
                          <p className="text-sm font-medium text-green-600">
                            {t("couponApplied") ||
                              "Coupon applied successfully!"}
                          </p>
                        </div>
                      )}

                      {/* Helper Text */}
                      {!couponError && !couponSuccess && (
                        <p className="text-xs text-gray-500 mb-4">
                          {t("enterValidCode") ||
                            "Enter your promo code and press Enter or click Apply"}
                        </p>
                      )}
                    </div>

                    <div className="block-button text-center p-6 border-t border-line">
                      <div
                        className="hover:text-hoverGray cursor-pointer text-[16px] font-normal"
                        onClick={() => setActiveTab("")}
                      >
                        {t("close")}
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

                  <div className="body1 font-medium">{t("emptyHeading")}</div>
                  <div className="text-[16px] font-normal text-christmasText text-center px-5">
                    {t("emptyDescription")}
                  </div>

                  {/* CTA Button */}
                  <div>
                    <LocalizedClientLink
                      href={"/christmas-pyjamas"}
                      className="swh-btn bg-black text-white text-[16px] font-normal mt-4"
                      onClick={() => setCartDropdownOpen(false)}
                    >
                      {t("returnToShop")}
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
