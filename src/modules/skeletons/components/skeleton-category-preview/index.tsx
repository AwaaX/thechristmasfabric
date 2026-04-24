
import { Container } from "@medusajs/ui"

const SkeletonCategoryPreview = () => {
  return (
    <div className="animate-pulse">
      <Container className="w-[140px] h-[140px] rounded-full bg-gray-100 bg-ui-bg-subtle mx-auto" />
      <div className="flex flex-col items-center justify-center text-center gap-2 text-base-regular mt-5">
        <div className="w-2/5 h-4 bg-gray-100"></div>
        <div className="w-1/5 h-2 bg-gray-100"></div>
      </div>
    </div>
  )
}

export default SkeletonCategoryPreview