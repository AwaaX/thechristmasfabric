"use client"

import {
  buildLineItemAnalyticsItem,
  getAnalyticsValue,
  trackEcommerceEvent,
} from "@lib/analytics"
import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import * as Icon from "@phosphor-icons/react/dist/ssr"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { Spinner } from "@medusajs/icons"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [isRefreshing, startRefreshTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const t = useTranslations("Cart.Dropdown")
  const router = useRouter()

  // Keep the current cart page quantity limit behavior.
  const maxQuantity = 10
  const isUpdatingQuantity = updating || isRefreshing

  const changeQuantity = async (quantity: number) => {
    const quantityDelta = quantity - item.quantity

    if (
      quantityDelta === 0 ||
      quantity < 1 ||
      isUpdatingQuantity
    ) {
      return
    }

    setError(null)
    setUpdating(true)

    try {
      await updateLineItem({
        lineId: item.id,
        quantity,
      })
      startRefreshTransition(() => {
        router.refresh()
      })

      const analyticsItem = buildLineItemAnalyticsItem({
        item,
        quantity: Math.abs(quantityDelta),
      })

      trackEcommerceEvent(
        quantityDelta > 0 ? "add_to_cart" : "remove_from_cart",
        {
          currency: currencyCode?.toUpperCase(),
          value: getAnalyticsValue([analyticsItem]),
          items: [analyticsItem],
        }
      )
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <Table.Row className="w-full" data-testid="product-row">
      <Table.Cell className="!pl-0 p-4 w-24">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex", {
            "w-16": type === "preview",
            "small:w-24 w-12": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
        >
        <Text
          className="txt-medium-plus text-ui-fg-base"
          data-testid="product-title"
        >
          {item.product_title}
        </Text>
        </LocalizedClientLink>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </Table.Cell>

      {type === "full" && (
        <Table.Cell>
          <div className="flex gap-2 items-center">
            <DeleteButton
              id={item.id}
              item={item}
              currencyCode={currencyCode}
              data-testid="product-delete-button"
            />
            <div
              className="flex items-center gap-2 border border-line px-2 py-1"
              data-testid="product-select-button"
            >
              <button
                type="button"
                className="flex h-5 w-5 items-center justify-center disabled:cursor-not-allowed disabled:opacity-40"
                onClick={() => changeQuantity(item.quantity - 1)}
                disabled={isUpdatingQuantity || item.quantity <= 1}
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
                onClick={() => changeQuantity(item.quantity + 1)}
                disabled={isUpdatingQuantity}
                aria-label={t("increaseQuantity")}
              >
                <Icon.PlusIcon size={20} />
              </button>
            </div>
            {isUpdatingQuantity && <Spinner className="animate-spin" />}
          </div>
          <ErrorMessage error={error} data-testid="product-error-message" />
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden small:table-cell">
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0">
        <span
          className={clx("!pr-0", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          )}
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item
