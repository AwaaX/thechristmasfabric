import { sdk } from "@lib/config"
import { HttpTypes } from "@medusajs/types"
import { getLocale } from "./locale-actions"

export const listCategories = async (query?: Record<string, any>) => {
  const limit = query?.limit || 100

  const locale = await getLocale()

  const customTranslationFields = locale
    ? `*custom_translation.${locale}`
    : "*custom_translation"

  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields: `*category_children, *products, *parent_category, *parent_category.parent_category,*product_category_image,${customTranslationFields}`,
          limit,
          ...query,
        },
        next: {
          revalidate: 5,
        },
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => product_categories)
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  const handle = `${categoryHandle.join("/")}`

  const locale = await getLocale()

  const customTranslationFields = locale
    ? `*custom_translation.${locale}`
    : "*custom_translation"

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: {
          fields: `*category_children, *products,${customTranslationFields}`,
          handle,
        },
        next: { revalidate: 5 },
        cache: "force-cache",
      }
    )
    .then(({ product_categories }) => product_categories[0])
}
