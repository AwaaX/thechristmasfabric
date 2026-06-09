"use client"

import { Badge, Heading, Input, Label, Text } from "@medusajs/ui"
import React from "react"

import { applyPromotions } from "@lib/data/cart"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import Trash from "@modules/common/icons/trash"
import ErrorMessage from "../error-message"
import { SubmitButton } from "../submit-button"
import { useTranslations } from "next-intl"
import * as Icon from "@phosphor-icons/react/dist/ssr"

type DiscountCodeProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

const DiscountCode: React.FC<DiscountCodeProps> = ({ cart }) => {
  const t = useTranslations("Checkout.DiscountCode")
  const [isOpen, setIsOpen] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [isApplying, setIsApplying] = React.useState(false)
  const [isRemoving, setIsRemoving] = React.useState<string | null>(null)
  const [successMessage, setSuccessMessage] = React.useState("")
  const successTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const { promotions = [] } = cart

  const removePromotionCode = async (code: string) => {
    setIsRemoving(code)
    setErrorMessage("")

    try {
      const validPromotions = promotions.filter(
        (promotion) => promotion?.code !== code
      )

      await applyPromotions(
        validPromotions.filter((p) => p.code !== undefined).map((p) => p.code!)
      )

      setSuccessMessage("Coupon removed successfully")
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current)
      }
      successTimeoutRef.current = setTimeout(() => {
        setSuccessMessage("")
      }, 2000)
    } catch (e: any) {
      setErrorMessage(e.message)
    } finally {
      setIsRemoving(null)
    }
  }

  const addPromotionCode = async (formData: FormData) => {
    setErrorMessage("")
    setSuccessMessage("")

    const code = formData.get("code")
    if (!code) {
      setErrorMessage("Please enter a coupon code")
      return
    }

    setIsApplying(true)

    try {
      const input = document.getElementById(
        "promotion-input"
      ) as HTMLInputElement
      const codes = promotions
        .filter((p) => p.code !== undefined)
        .map((p) => p.code!)
      codes.push(code.toString())

      await applyPromotions(codes)

      setSuccessMessage("Coupon applied successfully!")
      if (input) {
        input.value = ""
      }

      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current)
      }
      successTimeoutRef.current = setTimeout(() => {
        setSuccessMessage("")
      }, 3000)
    } catch (e: any) {
      setErrorMessage(e.message)
    } finally {
      setIsApplying(false)
    }
  }

  React.useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="w-full bg-white flex flex-col gap-y-6">
      {/* Add Discount Button */}
      <div className="flex flex-col gap-y-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="flex items-center gap-2 txt-medium text-ui-fg-interactive hover:text-ui-fg-interactive-hover transition-colors"
          data-testid="add-discount-button"
        >
          <Icon.Tag size={18} weight="bold" />
          {t("addPromotionCodes")}
        </button>

        {/* Input Section */}
        {isOpen && (
          <form action={(a) => addPromotionCode(a)} className="w-full">
            <div className="flex w-full gap-x-2 mb-3">
              <div className="flex-1">
                <Input
                  className="size-full h-[37px]"
                  id="promotion-input"
                  name="code"
                  type="text"
                  placeholder="Enter coupon code"
                  autoFocus={true}
                  disabled={isApplying}
                  data-testid="discount-input"
                />
              </div>
              <SubmitButton
                variant="secondary"
                data-testid="discount-apply-button"
                className="min-w-[120px]"
              >
                {isApplying ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  t("apply")
                )}
              </SubmitButton>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex gap-2 items-start p-3 bg-red-50 border border-red-200 rounded-lg mb-3">
                <Icon.WarningCircle
                  size={18}
                  weight="fill"
                  className="text-red-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm font-medium text-red-600">
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="flex gap-2 items-start p-3 bg-green-50 border border-green-200 rounded-lg mb-3">
                <Icon.CheckCircle
                  size={18}
                  weight="fill"
                  className="text-green-600 flex-shrink-0 mt-0.5"
                />
                <p className="text-sm font-medium text-green-600">
                  {successMessage}
                </p>
              </div>
            )}
          </form>
        )}
      </div>

      {/* Applied Promotions Section */}
      {promotions.length > 0 && (
        <div className="w-full flex flex-col gap-y-3 border-t border-ui-border-base pt-6">
          <Heading className="txt-medium">{t("promotionsApplied")}</Heading>

          <div className="flex flex-col gap-y-2">
            {promotions.map((promotion) => {
              return (
                <div
                  key={promotion?.id}
                  className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg border border-ui-border-base hover:bg-gray-100 transition-colors"
                  data-testid="discount-row"
                >
                  <div className="flex gap-x-2 items-baseline flex-1 pr-2">
                    <Badge
                      color={promotion?.is_automatic ? "green" : "blue"}
                      size="small"
                      data-testid="discount-code"
                    >
                      {promotion?.code}
                    </Badge>
                    <span className="text-sm text-ui-fg-subtle">
                      {promotion?.application_method?.value !== undefined &&
                        promotion?.application_method.currency_code !==
                          undefined && (
                          <>
                            {promotion?.application_method.type === "percentage"
                              ? `${promotion?.application_method.value}%`
                              : convertToLocale({
                                  amount: +promotion?.application_method.value,
                                  currency_code:
                                    promotion?.application_method.currency_code,
                                })}
                          </>
                        )}
                    </span>
                    {promotion?.is_automatic && (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                        Auto
                      </span>
                    )}
                  </div>

                  {/* Remove Button */}
                  {!promotion?.is_automatic && (
                    <button
                      onClick={() => {
                        if (!promotion?.code) {
                          return
                        }
                        removePromotionCode(promotion?.code)
                      }}
                      disabled={isRemoving === promotion?.code}
                      className="flex items-center justify-center h-8 w-8 text-ui-fg-muted hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      data-testid="remove-discount-button"
                      aria-label={t("removeDiscount")}
                    >
                      {isRemoving === promotion?.code ? (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Icon.Trash size={16} weight="bold" />
                      )}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default DiscountCode
