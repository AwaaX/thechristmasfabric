import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const host = request.headers.get("host") ?? ""

  const content = `User-agent: *
Allow: /
Disallow: /checkout
Disallow: /account/
Sitemap: https://${host}/sitemap.xml
`

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
