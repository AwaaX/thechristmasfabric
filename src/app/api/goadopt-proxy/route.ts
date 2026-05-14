async function handleProxy(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path") || "iab/vendor-list.json"
  const method = request.method

  const apiUrl = `https://disclaimer-api.goadopt.io/api/${path}`
  const headers = { ...Object.fromEntries(request.headers.entries()) }
  // Remove host header to avoid issues
  delete headers["host"]

  let fetchOptions: RequestInit = {
    method,
    headers,
  }

  if (method !== "GET" && method !== "HEAD") {
    fetchOptions.body = await request.text()
  }

  try {
    const response = await fetch(apiUrl, fetchOptions)
    const contentType =
      response.headers.get("content-type") || "application/json"
    const body = await response.text()

    return new Response(body, {
      status: response.status,
      headers: {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    return new Response("Error proxying Go Adopt data", { status: 500 })
  }
}

export async function GET(request: Request) {
  return handleProxy(request)
}

export async function POST(request: Request) {
  return handleProxy(request)
}
