import repeat from "@lib/util/repeat"
import SkeletonCategoryPreview from "@modules/skeletons/components/skeleton-category-preview"


const SkeletonCategoriesSlider = () => {
  return (
    <div className="product-page-constraint">
      <ul className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8 flex-1">
        {repeat(4).map((index) => (
          <li key={index}>
            <SkeletonCategoryPreview />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SkeletonCategoriesSlider
