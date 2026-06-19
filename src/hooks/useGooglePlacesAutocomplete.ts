import { useState, useCallback } from "react"

export interface PlacePrediction {
  placeId: string
  text: string
  mainText: string
  secondaryText: string
}

export const useGooglePlacesAutocomplete = () => {
  const [suggestions, setSuggestions] = useState<PlacePrediction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSuggestions = useCallback(
    async (input: string, locationBias?: any) => {
      if (!input || input.length < 2) {
        setSuggestions([])
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch("/api/places/autocomplete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input,
            locationBias,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions")
        }

        const data = await response.json()
        setSuggestions(data.suggestions || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const clearSuggestions = useCallback(() => {
    setSuggestions([])
  }, [])

  return {
    suggestions,
    isLoading,
    error,
    fetchSuggestions,
    clearSuggestions,
  }
}
