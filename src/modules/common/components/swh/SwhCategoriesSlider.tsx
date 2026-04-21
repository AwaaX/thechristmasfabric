import { getCategoriesList } from "@lib/data"
import SwhCatSliderUI from "@modules/layout/components/swh-cat-slider-ui"

const fetchCategories = async () => {
  try {
    const { product_categories } = await getCategoriesList()
    if (product_categories && product_categories.length > 0) {
      return product_categories.filter(
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
