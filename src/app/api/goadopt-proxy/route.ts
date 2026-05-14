export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path") || "iab/vendor-list.json"

  try {
    const response = await fetch(
      `https://disclaimer-api.goadopt.io/api/${path}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    )

    if (!response.ok) {
      return new Response("Error fetching from Go Adopt API", {
        status: response.status,
      })
    }

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    return new Response("Error fetching Go Adopt data", { status: 500 })
  }
}
