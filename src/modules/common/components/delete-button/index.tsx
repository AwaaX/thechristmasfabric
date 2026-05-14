"use client"

import {
  buildLineItemAnalyticsItem,
  getAnalyticsValue,
  trackEcommerceEvent,
} from "@lib/analytics"
import { deleteLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"

const DeleteButton = ({
  id,
  item,
  currencyCode,
  children,
  className,
}: {
  id: string
  item?: HttpTypes.StoreCartLineItem
  currencyCode?: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)

    try {
      await deleteLineItem(id)

      if (item) {
        const analyticsItem = buildLineItemAnalyticsItem({
          item,
        })

        trackEcommerceEvent("remove_from_cart", {
          currency: currencyCode?.toUpperCase(),
          value: getAnalyticsValue([analyticsItem]),
          items: [analyticsItem],
        })
      }
    } catch {
      setIsDeleting(false)
    }
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? <Spinner className="animate-spin" /> : <Trash />}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
