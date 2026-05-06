import Spinner from "@modules/common/icons/spinner"

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-[1700] flex items-center justify-center bg-white/70 backdrop-blur-sm">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
        <Spinner size={34} color="#000" />
      </div>
    </div>
  )
}
