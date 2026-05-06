import { Metadata } from "next"
import { getLocalizedMetadata } from "@lib/util/metadata"

import Hero from "@modules/home/components/hero"
import CountDownSection from "@modules/home/components/countdown-section"
import DiscoverySection from "@modules/home/components/discovery-section"
import ServicesSection from "@modules/home/components/services-section"
import ReviewSection from "@modules/home/components/review-section"
import NewsLetterSection from "@modules/home/components/news-letter-section"
import QuickLookSection from "@modules/home/components/quick-look-section"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedMetadata("Metadata.Home")
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      {/* CountDown Section */}
      <CountDownSection />
      {/* Discover Section */}
      <DiscoverySection />
      {/* Qucik Look Section */}
      <QuickLookSection countryCode={countryCode} />
      {/* Services Section */}
      <ServicesSection />
      {/* Review Section */}
      <ReviewSection />
      {/* NewsLetter Section */}
      <NewsLetterSection />
    </>
  )
}
