"use client"

import { addToCart } from "@lib/data/cart"
import { getProductReviews } from "@lib/data/products"
import { useIntersection } from "@lib/hooks/use-in-view"
import { useWishlist } from "@lib/context/wishlist-context"
import { HttpTypes } from "@medusajs/types"
import { Button, clx } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"
import { isEqual } from "lodash"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import * as Icon from "@phosphor-icons/react/dist/ssr"
import parse from "html-react-parser"
import { Star, StarSolid } from "@medusajs/icons"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

// export default function ProductActions({
//   product,
//   region,
//   disabled,
// }: ProductActionsProps) {
//   const router = useRouter()
//   const pathname = usePathname()
//   const searchParams = useSearchParams()

//   const [options, setOptions] = useState<Record<string, string | undefined>>({})
//   const [isAdding, setIsAdding] = useState(false)
//   const countryCode = useParams().countryCode as string

//   // If there is only 1 variant, preselect the options
//   useEffect(() => {
//     if (product.variants?.length === 1) {
//       const variantOptions = optionsAsKeymap(product.variants[0].options)
//       setOptions(variantOptions ?? {})
//     }
//   }, [product.variants])

//   const selectedVariant = useMemo(() => {
//     if (!product.variants || product.variants.length === 0) {
//       return
//     }

//     return product.variants.find((v) => {
//       const variantOptions = optionsAsKeymap(v.options)
//       return isEqual(variantOptions, options)
//     })
//   }, [product.variants, options])

//   const wishlistVariantId =
//     selectedVariant?.id ??
//     ((product.variants?.length ?? 0) === 1 ? product.variants?.[0]?.id : undefined)

//   // update the options when a variant is selected
//   const setOptionValue = (optionId: string, value: string) => {
//     setOptions((prev) => ({
//       ...prev,
//       [optionId]: value,
//     }))
//   }

//   //check if the selected options produce a valid variant
//   const isValidVariant = useMemo(() => {
//     return product.variants?.some((v) => {
//       const variantOptions = optionsAsKeymap(v.options)
//       return isEqual(variantOptions, options)
//     })
//   }, [product.variants, options])

//   useEffect(() => {
//     const params = new URLSearchParams(searchParams.toString())
//     const value = isValidVariant ? selectedVariant?.id : null

//     if (params.get("v_id") === value) {
//       return
//     }

//     if (value) {
//       params.set("v_id", value)
//     } else {
//       params.delete("v_id")
//     }

//     router.replace(pathname + "?" + params.toString())
//   }, [selectedVariant, isValidVariant])

//   // check if the selected variant is in stock
//   const inStock = useMemo(() => {
//     // If we don't manage inventory, we can always add to cart
//     if (selectedVariant && !selectedVariant.manage_inventory) {
//       return true
//     }

//     // If we allow back orders on the variant, we can add to cart
//     if (selectedVariant?.allow_backorder) {
//       return true
//     }

//     // If there is inventory available, we can add to cart
//     if (
//       selectedVariant?.manage_inventory &&
//       (selectedVariant?.inventory_quantity || 0) > 0
//     ) {
//       return true
//     }

//     // Otherwise, we can't add to cart
//     return false
//   }, [selectedVariant])

//   const actionsRef = useRef<HTMLDivElement>(null)

//   const inView = useIntersection(actionsRef, "0px")

//   // add the selected variant to the cart
//   const handleAddToCart = async () => {
//     if (!selectedVariant?.id) return null

//     setIsAdding(true)

//     try {
//       await addToCart({
//         variantId: selectedVariant.id,
//         quantity: 1,
//         countryCode,
//       })

//       const gaItem = buildProductAnalyticsItem({
//         product,
//         quantity: 1,
//         variantId: selectedVariant.id,
//       })

//       trackGAEvent("add_to_cart", {
//         currency: region.currency_code?.toUpperCase(),
//         value: gaItem.price,
//         items: [gaItem],
//       })
//     } finally {
//       setIsAdding(false)
//     }
//   }

//   return (
//     <>
//       <div className="flex flex-col gap-y-2" ref={actionsRef}>
//         <div>
//           {(product.variants?.length ?? 0) > 1 && (
//             <div className="flex flex-col gap-y-4">
//               {(product.options || []).map((option) => {
//                 return (
//                   <div key={option.id}>
//                     <OptionSelect
//                       option={option}
//                       current={options[option.id]}
//                       updateOption={setOptionValue}
//                       title={option.title ?? ""}
//                       data-testid="product-options"
//                       disabled={!!disabled || isAdding}
//                     />
//                   </div>
//                 )
//               })}
//               <Divider />
//             </div>
//           )}
//         </div>

//         <ProductPrice product={product} variant={selectedVariant} />

//         <Button
//           onClick={handleAddToCart}
//           disabled={
//             !inStock ||
//             !selectedVariant ||
//             !!disabled ||
//             isAdding ||
//             !isValidVariant
//           }
//           variant="primary"
//           className="w-full h-10"
//           isLoading={isAdding}
//           data-testid="add-product-button"
//         >
//           {!selectedVariant && !options
//             ? "Select variant"
//             : !inStock || !isValidVariant
//             ? "Out of stock"
//             : "Add to cart"}
//         </Button>
//         <WishlistButton
//           disabled={!!disabled}
//           variantId={wishlistVariantId}
//           unavailableLabel="Select a variant to save"
//         />
//         <MobileActions
//           product={product}
//           variant={selectedVariant}
//           options={options}
//           updateOptions={setOptionValue}
//           inStock={inStock}
//           handleAddToCart={handleAddToCart}
//           isAdding={isAdding}
//           show={!inView}
//           optionsDisabled={!!disabled || isAdding}
//         />
//       </div>
//     </>
//   )
// }

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewCount, setReviewCount] = useState(0)
  const [quantity, setQuantity] = useState(1) // State to manage the quantity
  const [showAlert, setShowAlert] = useState(false) // State to manage alert visibility
  // State to track if the user manually changed the gender
  const [isManualGenderSelection, setManualGenderSelection] = useState(false)

  const router = useRouter()
  const { hasCustomer, isInWishlist, isPending, toggleWishlist } = useWishlist()
  const countryCode = useParams().countryCode as string

  const variants = product.variants ?? []

  useEffect(() => {
    if (!product?.id) {
      setReviewRating(0)
      setReviewCount(0)
      return
    }

    getProductReviews({
      productId: product.id,
      limit: 1,
      offset: 0,
    })
      .then(({ average_rating, count }) => {
        setReviewRating(Math.round(average_rating || 0))
        setReviewCount(count || 0)
      })
      .catch(() => {
        setReviewRating(0)
        setReviewCount(0)
      })
  }, [product?.id])

  // initialize the option state
  useEffect(() => {
    const optionObj: Record<string, string> = {}

    for (const option of product.options || []) {
      Object.assign(optionObj, { [option.id]: undefined })
    }

    setOptions(optionObj)
  }, [product])

  // memoized record of the product's variants
  const variantRecord = useMemo(() => {
    const map: Record<string, Record<string, string>> = {}

    for (const variant of variants) {
      if (!variant?.options || !variant?.id) continue

      const temp: Record<string, string> = {}

      for (const option of variant?.options) {
        // console.log("option", option)
        temp[option.option_id] = option.value
      }
      // console.log("temp", temp)
      map[variant?.id] = temp
    }
    // console.log("variantRecord", map)
    return map
  }, [variants])

  // memoized function to check if the current options are a valid variant
  const variant = useMemo(() => {
    let variantId: string | undefined = undefined

    for (const key of Object.keys(variantRecord)) {
      if (isEqual(variantRecord[key], options)) {
        variantId = key
      }
    }

    // return variants[0]
    return variants.find((v) => v.id === variantId)
  }, [options, variantRecord, variants])

  // if product only has one variant, then select it
  useEffect(() => {
    if (variants.length === 1 && variants[0].id) {
      setOptions(variantRecord[variants[0].id])
    }
  }, [variants, variantRecord])

  // update the options when a variant is selected
  const updateOptions = (update: Record<string, string>) => {
    // setOptions({ ...options, ...update })
    setOptions((prevOptions) => {
      // Check if gender is being updated in the provided options
      if (update[selectedGenderId]) {
        setManualGenderSelection(true) // Mark as manually selected
      }
      return { ...prevOptions, ...update } // Update options
    })
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (variant && !variant?.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (variant && variant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (variant?.inventory_quantity && variant?.inventory_quantity > 0) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [variant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!variant?.id || quantity <= 0) return null

    setIsAdding(true)

    try {
      await addToCart({
        variantId: variant.id,
        quantity,
        countryCode,
      })
    } finally {
      setIsAdding(false)
    }
  }

  // Memoize the selected gender option ID
  const selectedGenderId = useMemo(() => {
    const genderOption = product.options.find(
      (option) => option.title.toLowerCase() === "gender"
    )
    return genderOption ? genderOption.id : null
  }, [product.options])

  // Memoize the selected gender option ID
  const selectedSizeId = useMemo(() => {
    const sizeOption = product.options.find(
      (option) => option.title.toLowerCase() === "size"
    )
    return sizeOption ? sizeOption.id : null
  }, [product.options])

  // Memoize the selected gender based on the selectedGenderId
  const selectedGender = useMemo(() => {
    // Ensure selectedGenderId exists in the options object
    if (!selectedGenderId) return null

    // Retrieve the gender value(s) from the options state by selectedGenderId
    const genderValue = options[selectedGenderId]

    // If genderValue is a string (single value), wrap it in an array; otherwise return null
    return genderValue ? genderValue : null
  }, [selectedGenderId, options])

  // Memoize the available variants based on the selected gender ID
  const availableVariants = useMemo(() => {
    return Object.values(variantRecord).filter(
      (variant) => variant[selectedGenderId] === selectedGender
    )
  }, [selectedGenderId, variantRecord, selectedGender])

  // Memoize the unique sizes from the available variants
  const uniqueSizes = useMemo(() => {
    return new Set(availableVariants.map((variant) => variant[selectedSizeId]))
  }, [availableVariants, selectedSizeId])

  // Memoize the selected size based on the selectedSizeId
  const selectedSize = useMemo(() => {
    if (!selectedSizeId) return null
    return options[selectedSizeId] || null
  }, [selectedSizeId, options])

  // Update available genders when a size is selected
  const availableGenders = useMemo(() => {
    return Object.values(variantRecord).filter(
      (variant) => variant[selectedSizeId] === selectedSize
    )
  }, [selectedSizeId, selectedSize, variantRecord])

  // Automatically select gender if only one valid option exists for the size
  useEffect(() => {
    if (!isManualGenderSelection && availableGenders.length === 1) {
      const singleGender = availableGenders[0][selectedGenderId]
      if (singleGender && singleGender !== selectedGender) {
        updateOptions({ [selectedGenderId]: singleGender })
      }
    }
  }, [availableGenders, selectedGenderId, selectedGender])

  // console.log("selectedSizeId", selectedSizeId)
  // console.log("selectedGenderId", selectedGenderId)
  // console.log("selectedGender", selectedGender)
  // console.log("selections", options)
  // console.log("availableVariants", availableVariants)
  // console.log("uniqueSizes", uniqueSizes)

  // Function to handle increasing the quantity
  const handleIncreaseQuantity = () => {
    if (variant) {
      // If inventory is managed and quantity is less than available inventory, increment
      if (variant?.manage_inventory) {
        if (quantity < variant?.inventory_quantity) {
          setQuantity((prevQuantity) => prevQuantity + 1)
        }
      } else {
        // If inventory is not managed, allow unlimited increase
        setQuantity((prevQuantity) => prevQuantity + 1)
      }
    }
  }

  // Function to handle decreasing the quantity
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1) // Decrement only if greater than 1
    }
  }

  // Watch for quantity changes to show alert if it equals inventory_quantity
  useEffect(() => {
    if (variant && quantity === variant?.inventory_quantity) {
      setShowAlert(true) // Show alert when quantity equals inventory
    } else {
      setShowAlert(false) // Hide alert in other cases
    }
  }, [quantity, variant])

  const wishlistVariantId =
    variant?.id ??
    (variants.length === 1 && variants[0]?.id ? variants[0].id : undefined)

  const isWishlistSaved = isInWishlist(wishlistVariantId)
  const isWishlistLoading = isPending(wishlistVariantId)
  const wishlistLabel = !hasCustomer
    ? "Sign In To Save"
    : !wishlistVariantId
    ? "Select Variant To Save"
    : isWishlistSaved
    ? "Remove From Wishlist"
    : "Add To Wishlist"

  const handleWishlistToggle = async () => {
    if (!hasCustomer) {
      router.push(`/${countryCode}/account/wishlist`)
      return
    }

    if (!wishlistVariantId || isWishlistLoading) {
      return
    }

    await toggleWishlist(wishlistVariantId)
  }

  return (
    <>
      <div id="product-info">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center justify-between">
            <h2
              className="text-3xl leading-[46px] font-normal capitalize"
              data-testid="product-title"
            >
              {product.title}
            </h2>
            {/* Add to WishList */}
            <div className="">
              <div
                aria-label={wishlistLabel}
                aria-pressed={isWishlistSaved}
                className={clx(
                  "add-wishlist-btn tag-action-ctrl w-[42px] h-[42px] flex items-center justify-center rounded-full border bg-white hover:bg-black hover:text-white hover:border-black duration-300 relative ease-out hover:shadow-[0_0_0_0.2rem_rgba(0,0,0,1)]",
                  {
                    active: isWishlistSaved,
                    "cursor-progress opacity-70": isWishlistLoading,
                    "cursor-not-allowed opacity-60":
                      hasCustomer && !wishlistVariantId,
                  }
                )}
                data-testid="product-actions-wishlist-toggle"
                onClick={handleWishlistToggle}
                onKeyDown={async (event) => {
                  if (event.key !== "Enter" && event.key !== " ") {
                    return
                  }

                  event.preventDefault()
                  await handleWishlistToggle()
                }}
                role="button"
                tabIndex={0}
              >
                <div className="tag-action-swh bg-black text-white caption2 ">
                  {wishlistLabel}
                </div>
                <Icon.StarIcon
                  className={clx({
                    "text-white": isWishlistSaved,
                  })}
                  size={24}
                  weight={isWishlistSaved ? "fill" : "regular"}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <ProductPrice product={product} variant={variant} region={region} />
            <div className="flex items-center gap-x-2">
              <div className="flex gap-x-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index}>
                    {index < reviewRating ? (
                      <StarSolid className="text-ui-tag-orange-icon" />
                    ) : (
                      <Star />
                    )}
                  </span>
                ))}
              </div>
              <span className="text-sm text-ui-fg-subtle">({reviewCount})</span>
            </div>
          </div>
          <div
            className="text-[16px] font-normal text-christmasText"
            data-testid="product-description"
          >
            {product.subtitle && parse(product.subtitle)}
            {/* {localizedProduct.shortDescription} */}
            {/* {parse(localizedProduct?.subTitle)} */}
            {/* {parse(product.metadata?.["en-us_short_description"] as string)} */}
            {/* <ShowMoreText
              lines={3}
              more={"showmore"}
              less={"showless"}
              className=""
              anchorClass="text-[#FF8C52] cursor-pointer text-[16px]"
              expanded={false}
              truncatedEndingComponent={" ... "}
            >
              {parse(product.metadata?.["en-us_short_description"] as string)}
            </ShowMoreText> */}
            {/* A beautiful set of red, grey and black checked Christmas pajamas for
            the whole family, couples, kids and babies. You will find on this
            model bears, fir trees and caribou patterns for Christmas and animal
            lovers. */}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-4" ref={actionsRef}>
        <div>
          {variants.length > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      toShowValues={Array.from(uniqueSizes)}
                      current={options[option.id]}
                      updateOption={updateOptions}
                      title={option.title}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              {/* <Divider /> */}
            </div>
          )}
        </div>

        <div className="text-[16px] font-medium">Quantity:</div>
        <div className="choose-quantity flex items-center lg:justify-between gap-5 gap-y-3 mb-6">
          <div className="quantity-block md:p-3 max-md:py-1.5 max-md:px-3 flex items-center justify-between rounded-lg  sm:w-[180px] w-[120px] flex-shrink-0 bg-christmasBgGray">
            <Icon.MinusIcon
              size={20}
              onClick={handleDecreaseQuantity}
              className={`cursor-pointer`}
            />
            <div className="body1 font-semibold">{quantity}</div>
            <Icon.PlusIcon
              size={20}
              onClick={handleIncreaseQuantity}
              className="cursor-pointer"
            />
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!inStock || !variant || !!disabled || isAdding}
            variant="primary"
            className=" w-full text-center bg-black text-white border border-black swh-btn"
            isLoading={isAdding}
            data-testid="add-product-button"
          >
            {!variant
              ? "Select variant"
              : !inStock
              ? "Out of stock"
              : "Add to cart"}
          </Button>
        </div>
        {!variant && (
          <p className="text-red">* Please select some variant to proceed</p>
        )}
        {showAlert && (
          <div className="bg-red text-white p-4 rounded-md mb-4">
            Curently Only {variant?.inventory_quantity} quantity available!
          </div>
        )}
        <Divider />

        <div>
          <span className="text-[18px] font-medium">Estimated Delivery:</span>
          <span className="text-[16px] font-normal text-christmasText ml-3">
            Your package will arrive in 3-5 business days at your pick up
            location or in the comfort of your home.
          </span>
        </div>

        {/* <MobileActions
          product={product}
          variant={variant}
          region={region}
          options={options}
          updateOptions={updateOptions}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        /> */}
      </div>
    </>
  )
}
