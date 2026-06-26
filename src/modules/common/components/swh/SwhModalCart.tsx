"use client"

import { Button } from "@medusajs/ui"
import { useTranslations } from "next-intl"

import { formatAmount } from "@lib/util/prices"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { useModalCartContext } from "@modules/custom/context/ModalCartContext"
import { useCart } from "../context/CartContext"

const SwhModalCart = () =>
  //   {
  //   cart: cartState,
  // }: {
  //   cart?: Omit<Cart, "beforeInsert" | "afterLoad"> | null
  // }
  {
    const { cart: cartState, isLoading: cartIsLoading } = useCart()
    const { isModalOpen, closeModalCart, openModalCart } = useModalCartContext()
    const t = useTranslations("Cart.Dropdown")

    if (cartIsLoading) return

    return (
      <>
        {isModalOpen && (
          <div
            className="hidden small:block absolute top-0 h-[100vh] right-0 bg-white border-x border-b border-gray-200 w-[420px] text-ui-fg-base z-50"
            data-testid="nav-cart-dropdown"
          >
            <div onClick={closeModalCart}>X</div>
            <div className="p-4 flex items-center justify-center">
              <h3 className="text-large-semi">{t("heading")}</h3>
            </div>
            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
                  {cartState.items
                    .sort((a, b) => {
                      return a.created_at > b.created_at ? -1 : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[122px_1fr] gap-x-4"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.variant?.product.handle}`}
                          className="w-24"
                        >
                          <Thumbnail thumbnail={item.thumbnail} size="square" />
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                                <h3 className="text-base-regular overflow-hidden text-ellipsis">
                                  <LocalizedClientLink
                                    href={`/products/${item.variant?.product.handle}`}
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <LineItemOptions
                                  variant={item.variant}
                                  data-testid="cart-item-variant"
                                  data-value={item.variant}
                                />
                                <span
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  {t("quantity")}: {item.quantity}
                                </span>
                              </div>
                              <div className="flex justify-end">
                                <LineItemPrice
                                  region={cartState.region}
                                  item={item}
                                  style="tight"
                                />
                              </div>
                            </div>
                          </div>
                          <DeleteButton
                            id={item.id}
                            className="mt-1"
                            data-testid="cart-item-remove-button"
                          >
                            {t("remove")}
                          </DeleteButton>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-4 flex flex-col gap-y-4 text-small-regular">
                  <div className="flex items-center justify-between">
                    <span className="text-ui-fg-base font-semibold">
                      {t("subtotal")}{" "}
                      <span className="font-normal">{t("excludingTaxes")}</span>
                    </span>
                    <span
                      className="text-large-semi"
                      data-testid="cart-subtotal"
                      data-value={cartState.subtotal || 0}
                    >
                      {formatAmount({
                        amount: cartState.subtotal || 0,
                        region: cartState.region,
                        includeTaxes: false,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="w-full"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      {t("goToCart")}
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div>
                <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
                  <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
                    <span>0</span>
                  </div>
                  <span>{t("empty")}</span>
                  <div>
                    <LocalizedClientLink href="/christmas-pyjamas">
                      <>
                        <span className="sr-only">{t("goToProductsSrOnly")}</span>
                        <Button onClick={close}>{t("explore")}</Button>
                      </>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* {
      !isModalOpen && <div className="absolute w-full h-[100dvh] bg-[rgba(255,255,255,0.7)] backdrop-blur-md text-black z-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center" onClick={openModalCart}>
            <p className="px-3 py-2 border rounded-md cursor-pointer hover:text-white hover:bg-black duration-200 ease-in-out"> Open Cart</p>
      </div>
    } */}
      </>
    )
  }

export default SwhModalCart
