"use client"

import { generateWishlistShareUrl } from "@lib/data/wishlist"
import { Link } from "@medusajs/icons"
import { Button, Input, Label, toast } from "@medusajs/ui"
import { useState } from "react"
import { useTranslations } from "next-intl"

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
  const t = useTranslations("Wishlist.ShareButton")

  const handleShare = async () => {
    setIsLoading(true)

    try {
      const nextShareUrl = await generateWishlistShareUrl(countryCode)

      setShareUrl(nextShareUrl)

      await navigator.clipboard.writeText(nextShareUrl)

      toast.success(t("successTitle"), {
        description: t("successDescription"),
      })
    } catch (error) {
      toast.error(t("errorTitle"), {
        description:
          error instanceof Error
            ? error.message
            : t("errorDescription"),
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
          <span>{t("button")}</span>
        </span>
      </Button>
      {shareUrl && (
        <div className="flex flex-col gap-y-2">
          <Label htmlFor="wishlist-share-url">{t("label")}</Label>
          <Input id="wishlist-share-url" readOnly value={shareUrl} />
        </div>
      )}
    </div>
  )
}
