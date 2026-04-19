"use client"

import { generateWishlistShareUrl } from "@lib/data/wishlist"
import { Link } from "@medusajs/icons"
import { Button, Input, Label, toast } from "@medusajs/ui"
import { useState } from "react"

type WishlistShareButtonProps = {
  countryCode: string
  disabled?: boolean
}

export default function WishlistShareButton({
  countryCode,
  disabled = false,
}: WishlistShareButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  const handleShare = async () => {
    setIsLoading(true)

    try {
      const nextShareUrl = await generateWishlistShareUrl(countryCode)

      setShareUrl(nextShareUrl)

      await navigator.clipboard.writeText(nextShareUrl)

      toast.success("Share link copied", {
        description: "Anyone with this link can view your wishlist.",
      })
    } catch (error) {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "Unable to generate a share link right now.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-y-3">
      <Button
        type="button"
        variant="secondary"
        onClick={handleShare}
        disabled={disabled}
        isLoading={isLoading}
        className="w-full small:w-auto"
      >
        <span className="flex items-center gap-x-2">
          <Link />
          <span>Share wishlist</span>
        </span>
      </Button>
      {shareUrl && (
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="wishlist-share-url">Share link</Label>
          <Input id="wishlist-share-url" readOnly value={shareUrl} />
        </div>
      )}
    </div>
  )
}
