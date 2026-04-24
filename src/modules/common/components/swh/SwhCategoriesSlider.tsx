
import { listCategories } from "@lib/data/categories"
import SwhCatSliderUI from "@modules/layout/components/swh-cat-slider-ui"

const fetchCategories = async () => {
  try {
    const productCategories = await listCategories()
    if (productCategories && productCategories.length > 0) {
      return productCategories.filter(
        (category) => category.parent_category === null
      )
    } else {
      return []
    }
  } catch (error) {
    console.error("Error fetching categories:", error)
    throw error // Ensure errors are propagated correctly
  }
}

const SwhCategoriesSlider = async () => {
  const categories = await fetchCategories()

  if (!categories) {
    return null
  }

  return <SwhCatSliderUI categories={categories} />
}

export default SwhCategoriesSlider
