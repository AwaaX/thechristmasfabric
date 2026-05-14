"use client"

import { useState } from "react"

import { useEffect } from "react"
import { retrieveCustomer } from "../../../../lib/data/customer"
import { HttpTypes } from "@medusajs/types"
import { Button, Input, Label, Textarea, toast, Toaster } from "@medusajs/ui"
import { Star, StarSolid } from "@medusajs/icons"
import { addProductReview } from "../../../../lib/data/products"
import { useTranslations } from "next-intl"

type ProductReviewsFormProps = {
  productId: string
}

export default function ProductReviewsForm({ productId }: ProductReviewsFormProps) {
  const t = useTranslations("Product.Reviews")
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(0)

  useEffect(() => {
    if (customer) {
      return
    }

    retrieveCustomer().then(setCustomer)
  }, [])

  if (!customer) {
    return <></>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!content || !rating) {
      toast.error(t("errorTitle"), {
        description: t("requiredFields"),
      })
      return
    }

    e.preventDefault()
    setIsLoading(true)
    addProductReview({
      title,
      content,
      rating,
      first_name: customer.first_name || "",
      last_name: customer.last_name || "",
      product_id: productId,
    }).then(() => {
      setShowForm(false)
      setTitle("")
      setContent("")
      setRating(0)
      toast.success(t("successTitle"), {
        description: t("successDescription"),
      })
    }).catch(() => {
      toast.error(t("errorTitle"), {
        description: t("submitError"),
      })
    }).finally(() => {
      setIsLoading(false)
    })
  }

 return (
  <div className="product-page-constraint mt-8">
    {!showForm && (
      <div className="flex justify-center">
        <Button variant="secondary" onClick={() => setShowForm(true)}>{t("addReview")}</Button>
      </div>
    )}
    {showForm && (
      <div className="flex flex-col gap-y-4">
        <div className="flex flex-col gap-y-2">
          <span className="text-xl-regular text-ui-fg-base">
            {t("addReview")}
          </span>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>{t("title")}</Label>
            <Input name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t("title")} />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>{t("content")}</Label>
            <Textarea name="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder={t("content")} />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>{t("rating")}</Label>
            <div className="flex gap-x-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Button key={index} variant="transparent" onClick={(e) => {
                  e.preventDefault()
                  setRating(index + 1)
                }} className="p-0">
                  {rating >= index + 1 ? <StarSolid className="text-ui-tag-orange-icon" /> : <Star />}
                </Button>
              ))}
            </div>
          </div>
          <Button type="submit" disabled={isLoading} variant="primary">{t("submit")}</Button>
        </form>
        </div>
      </div>
    )}
    <Toaster />
  </div>
)
}
