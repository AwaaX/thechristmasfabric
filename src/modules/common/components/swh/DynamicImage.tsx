"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { replaceLocalhostUrl } from "@lib/util/replaceLocalhostUrl"

const DynamicImage = ({ url, alt, className }) => {
  const [imageData, setImageData] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const updatedUrl=replaceLocalhostUrl(url)

  // console.log("OldURL",url)
  // console.log("updatedUrl",updatedUrl)

  // useEffect(() => {
  //   const fetchImageData = async () => {
  //     const data = await getImage(url)
  //     setImageData(data)
  //   }

  //   fetchImageData()
  // }, [url])

  //   if (!imageData) {
  //     return (
  //       <div className="animate-pulse">
  //         <div className={`${className} bg-slate-200`} />
  //       </div>
  //     )
  //   }
  const handleImageLoad = () => {
    setIsLoaded(true)
    console.log("loaded")
  }

  //   const { base64, img } = imageData

  return (
    // <Image
    //   {...img}
    //   alt={alt || "not-specified"}
    //   placeholder="blur"
    //   blurDataURL={base64}
    //   className={`${className}  duration-500  ${
    //     isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
    //   }`}
    //   onLoadingComplete={handleImageLoad}
    // />
    <div className="relative w-full ">
      {/* Loading animation overlay */}
      {!isLoaded && (
        <div className="animate-pulse absolute inset-0 flex items-center justify-center">
          <div className={`${className} bg-slate-200`} />
        </div>
      )}
      {/* Image with fade-in and scale animation */}
      <Image
        // {...img}
        src={url}
        height={1000}
        width={1000}
        alt={alt || "not-specified"}
        // placeholder="blur"
        // blurDataURL={base64}
        className={`${className} duration-500  ${
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
        }`}
        onLoad={handleImageLoad}
      />
    </div>
  )
}

export default DynamicImage
