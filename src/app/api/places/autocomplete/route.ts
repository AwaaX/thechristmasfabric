import { NextRequest, NextResponse } from "next/server"

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY

interface AutocompleteRequest {
  input: string
  locationBias?: {
    circle?: {
      center: { latitude: number; longitude: number }
      radius: number
    }
    rectangle?: {
      low: { latitude: number; longitude: number }
      high: { latitude: number; longitude: number }
    }
  }
  includedRegionCodes?: string[]
  languageCode?: string
}

interface PlacePredictionResponse {
  placeId: string
  text: string
  mainText: string
  secondaryText: string
  city?: string
  postal_code?: string
  province?: string
  country_code?: string
}

export async function POST(request: NextRequest) {
  if (!GOOGLE_PLACES_API_KEY) {
    return NextResponse.json(
      { error: "Google Places API key is not configured" },
      { status: 500 }
    )
  }

  try {
    const body: AutocompleteRequest = await request.json()
    const { input, locationBias, includedRegionCodes, languageCode = "en" } =
      body

    if (!input || input.length < 2) {
      return NextResponse.json({ suggestions: [] })
    }

    const requestBody = {
      input,
      languageCode,
      locationBias,
      includedRegionCodes,
    }

    const response = await fetch(
      "https://places.googleapis.com/v1/places:autocomplete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,
        },
        body: JSON.stringify(requestBody),
      }
    )

    if (!response.ok) {
      console.error("Google Places API error:", response.statusText)
      return NextResponse.json(
        { error: "Failed to fetch suggestions from Google Places" },
        { status: response.status }
      )
    }

    const data = await response.json()

    const suggestions: PlacePredictionResponse[] = (
      data.suggestions || []
    ).map((suggestion: any) => ({
      placeId: suggestion.placePrediction?.placeId || "",
      text:
        suggestion.placePrediction?.text?.text ||
        suggestion.queryPrediction?.text?.text ||
        "",
      mainText:
        suggestion.placePrediction?.text?.text?.split(",")[0] || "Unknown",
      secondaryText:
        suggestion.placePrediction?.text?.text?.split(",").slice(1).join(",") ||
        "",
    }))

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("Autocomplete API error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
