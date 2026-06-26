import { listProductsWithSort } from "@lib/data/products"
import SwhProductSliderUI from "@modules/layout/components/swh-product-slider-ui"

const SwhProductsSlider = async ({ countryCode }: { countryCode: string }) => {
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

export default SwhProductsSlider
