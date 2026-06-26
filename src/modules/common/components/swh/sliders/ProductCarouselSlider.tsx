
import { listProductsWithSort } from "@lib/data/products"
import SwhProductSliderUI from "@modules/layout/components/product-slider-ui"

const ProductCarouselSlider = async ({ countryCode }) => {
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
