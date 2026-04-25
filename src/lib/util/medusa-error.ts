type MedusaErrorLike = {
  config?: {
    baseURL?: string
    url?: string
  }
  message?: string
  request?: unknown
  response?: {
    data?: { message?: unknown } | string
    headers?: unknown
    status?: number
  }
}

export const getMedusaErrorMessage = (error: unknown): string => {
  if (!error || typeof error !== "object") {
    return ""
  }

  const medusaError = error as MedusaErrorLike
  const responseData = medusaError.response?.data

  if (typeof responseData === "string") {
    return responseData
  }

  if (
    responseData &&
    typeof responseData === "object" &&
    "message" in responseData &&
    typeof responseData.message === "string"
  ) {
    return responseData.message
  }

  if (typeof medusaError.message === "string") {
    return medusaError.message
  }

  return ""
}

export const isMedusaEntityNotFoundError = (
  error: unknown,
  entity: "cart" | "customer"
) => {
  const message = getMedusaErrorMessage(error)

  return new RegExp(`${entity} with id:\\s*.+\\s+was not found`, "i").test(
    message
  )
}

function medusaErrorHandler(error: any): never {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    if (error.config?.url) {
      try {
        const u = new URL(error.config.url, error.config.baseURL)
        console.error("Resource:", u.toString())
      } catch {}
    }

    console.error("Response data:", error.response.data)
    console.error("Status code:", error.response.status)
    console.error("Headers:", error.response.headers)

    // Extracting the error message from the response data
    const message = getMedusaErrorMessage(error) || "Unknown error"
    const normalizedMessage = `${message.charAt(0).toUpperCase()}${message.slice(
      1
    )}`.replace(/\.+$/, "")

    throw new Error(`${normalizedMessage}.`)
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error("No response received: " + error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error("Error setting up the request: " + error.message)
  }
}

export const throwNormalizedMedusaError = (error: unknown): never => {
  if (error && typeof error === "object") {
    const medusaError = error as MedusaErrorLike

    if (medusaError.response || medusaError.request) {
      return medusaErrorHandler(error)
    }
  }

  if (error instanceof Error) {
    throw error
  }

  throw new Error("An unexpected error occurred.")
}

export default medusaErrorHandler
