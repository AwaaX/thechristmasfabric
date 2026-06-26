
import { listCategories } from "@lib/data/categories"
import SwhCatSliderUI from "@modules/layout/components/category-slider-ui"

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

const CategoriesHorizontalSlider = async () => {
  const categories = await fetchCategories()

  if (!categories) {
    return null
  }

  return <SwhCatSliderUI categories={categories} />
}

export default CategoriesHorizontalSlider
