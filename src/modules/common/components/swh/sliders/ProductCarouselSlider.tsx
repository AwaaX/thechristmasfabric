
import { listProductsWithSort } from "@lib/data/products"
import SwhProductSliderUI from "@modules/layout/components/product-slider-ui"

/** Props for ProductCarouselSlider component */
interface ProductCarouselSliderProps {
  /** Country/region code for locale-specific product data */
  countryCode: string
}

/**
 * Product carousel slider (Server Component)
 * Fetches and displays featured products in a carousel layout
 */
const ProductCarouselSlider = async ({ countryCode }: ProductCarouselSliderProps) => {
  const queryParams = {
    limit: 12,
  }

  const {
    response: { products, count },
  } = await listProductsWithSort({ page: 1, queryParams, countryCode })

  if (!products) {
    return null
  }

  return <SwhProductSliderUI products={products} />
}

export default ProductCarouselSlider
