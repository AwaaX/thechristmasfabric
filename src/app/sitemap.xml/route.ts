import { NextRequest } from "next/server"
import { sdk } from "@lib/config"
import { listCollections } from "@lib/data/collections"
import { listCategories } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"

const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us"

async function getAllProductHandles(): Promise<string[]> {
  const limit = 100
  let offset = 0
  const handles: string[] = []

  while (true) {
    const { products } = await sdk.client.fetch<{
      products: { handle: string }[]
    }>("/store/products", {
      query: { fields: "handle", limit, offset },
      next: { revalidate: 3600 },
      cache: "force-cache",
    })

    if (!products.length) break

    handles.push(...products.map((p) => p.handle))
    if (products.length < limit) break
    offset += limit
  }

  return handles
}

function buildUrl(base: string, path: string): string {
  return `https://${base}/${path}`
}

function urlEntry(loc: string, priority = "0.7"): string {
  return `
  <url>
    <loc>${loc}</loc>
    <priority>${priority}</priority>
  </url>`
}

export async function GET(request: NextRequest) {
  const host = request.headers.get("host") ?? ""

  const regions = await listRegions()
  const countryCodes: string[] =
    regions?.flatMap((r) => r.countries?.map((c) => c.iso_2 ?? "") ?? []) ?? []

  const primaryCountry =
    countryCodes.find((c) => c === DEFAULT_REGION) ||
    countryCodes[0] ||
    DEFAULT_REGION

  const [productHandles, { collections }, categories] = await Promise.all([
    getAllProductHandles(),
    listCollections(),
    listCategories(),
  ])

  const entries: string[] = []

  entries.push(urlEntry(buildUrl(host, primaryCountry), "1.0"))

  for (const handle of productHandles) {
    entries.push(urlEntry(buildUrl(host, `${primaryCountry}/products/${handle}`)))
  }

  for (const collection of collections) {
    if (collection.handle) {
      entries.push(
        urlEntry(buildUrl(host, `${primaryCountry}/collections/${collection.handle}`))
      )
    }
  }

  for (const category of categories) {
    if (category.handle) {
      entries.push(
        urlEntry(
          buildUrl(host, `${primaryCountry}/categories/${category.handle}`),
          "0.6"
        )
      )
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join("")}
</urlset>`

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
