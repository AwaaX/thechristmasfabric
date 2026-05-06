"use client"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import { useTranslations } from "next-intl"

type LineItemUnitPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem
  style?: "default" | "tight"
  currencyCode: string
}

const LineItemUnitPrice = ({
  item,
  style = "default",
  currencyCode,
}: LineItemUnitPriceProps) => {
  const t = useTranslations("Common.Price")
  const { total, original_total } = item
  const currentTotal = total ?? 0
  const originalTotal = original_total ?? 0
  const hasReducedPrice = currentTotal < originalTotal

  const percentage_diff = Math.round(
    originalTotal > 0 ? ((originalTotal - currentTotal) / originalTotal) * 100 : 0
  )

  return (
    <div className="flex flex-col text-ui-fg-muted justify-center h-full">
      {hasReducedPrice && (
        <>
          <p>
            {style === "default" && (
              <span className="text-ui-fg-muted">{t("original")} </span>
            )}
            <span
              className="line-through"
              data-testid="product-unit-original-price"
            >
              {convertToLocale({
                amount: originalTotal / item.quantity,
                currency_code: currencyCode,
              })}
            </span>
          </p>
          {style === "default" && (
            <span className="text-ui-fg-interactive">-{percentage_diff}%</span>
          )}
        </>
      )}
      <span
        className={clx("text-base-regular", {
          "text-ui-fg-interactive": hasReducedPrice,
        })}
        data-testid="product-unit-price"
      >
        {convertToLocale({
          amount: currentTotal / item.quantity,
          currency_code: currencyCode,
        })}
      </span>
    </div>
  )
}

export default LineItemUnitPrice
