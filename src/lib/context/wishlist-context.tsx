"use client"

import { addWishlistItem, removeWishlistItem } from "@lib/data/wishlist"
import { getWishlistItemIdMap } from "@lib/util/wishlist"
import { Toaster, toast } from "@medusajs/ui"
import React, { createContext, useContext, useEffect, useState } from "react"
import { StoreWishlist } from "types/global"

type WishlistContextValue = {
  addToWishlist: (variantId: string) => Promise<boolean>
  hasCustomer: boolean
  isInWishlist: (variantId?: string | null) => boolean
  isPending: (variantId?: string | null) => boolean
  removeFromWishlist: (variantId: string) => Promise<boolean>
  toggleWishlist: (variantId: string) => Promise<boolean>
}

type WishlistProviderProps = {
  children: React.ReactNode
  initialHasCustomer: boolean
  initialWishlist: StoreWishlist | null
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export const WishlistProvider = ({
  children,
  initialHasCustomer,
  initialWishlist,
}: WishlistProviderProps) => {
  const [wishlistItemIdsByVariantId, setWishlistItemIdsByVariantId] = useState(
    () => getWishlistItemIdMap(initialWishlist)
  )
  const [pendingVariantIds, setPendingVariantIds] = useState<Set<string>>(
    () => new Set()
  )

  useEffect(() => {
    setWishlistItemIdsByVariantId(getWishlistItemIdMap(initialWishlist))
    setPendingVariantIds(new Set())
  }, [initialHasCustomer, initialWishlist])

  const syncWishlist = (wishlist: StoreWishlist | null) => {
    setWishlistItemIdsByVariantId(getWishlistItemIdMap(wishlist))
  }

  const addToWishlist = async (variantId: string) => {
    if (
      !initialHasCustomer ||
      wishlistItemIdsByVariantId.has(variantId) ||
      pendingVariantIds.has(variantId)
    ) {
      return false
    }

    setPendingVariantIds((current) => {
      const next = new Set(current)
      next.add(variantId)
      return next
    })

    try {
      const wishlist = await addWishlistItem(variantId)

      syncWishlist(wishlist)

      toast.success("Saved", {
        description: "Item added to your wishlist.",
      })

      return true
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while updating your wishlist.",
      })

      return false
    } finally {
      setPendingVariantIds((current) => {
        const next = new Set(current)
        next.delete(variantId)
        return next
      })
    }
  }

  const removeFromWishlist = async (variantId: string) => {
    const itemId = wishlistItemIdsByVariantId.get(variantId)

    if (!initialHasCustomer || !itemId || pendingVariantIds.has(variantId)) {
      return false
    }

    setPendingVariantIds((current) => {
      const next = new Set(current)
      next.add(variantId)
      return next
    })

    try {
      const wishlist = await removeWishlistItem(itemId)

      syncWishlist(wishlist)

      toast.success("Removed", {
        description: "Item removed from your wishlist.",
      })

      return true
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while updating your wishlist.",
      })

      return false
    } finally {
      setPendingVariantIds((current) => {
        const next = new Set(current)
        next.delete(variantId)
        return next
      })
    }
  }

  const toggleWishlist = async (variantId: string) => {
    if (wishlistItemIdsByVariantId.has(variantId)) {
      return removeFromWishlist(variantId)
    }

    return addToWishlist(variantId)
  }

  return (
    <WishlistContext.Provider
      value={{
        addToWishlist,
        hasCustomer: initialHasCustomer,
        isInWishlist: (variantId) =>
          Boolean(variantId && wishlistItemIdsByVariantId.has(variantId)),
        isPending: (variantId) =>
          Boolean(variantId && pendingVariantIds.has(variantId)),
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
      <Toaster />
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)

  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }

  return context
}
