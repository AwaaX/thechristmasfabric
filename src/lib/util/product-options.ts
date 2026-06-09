/**
 * Parse size strings like "Baby 3 to 4 Months" or "Kid 6 to 7 years" to short format like "3-4M"
 */
export const formatSizeString = (sizeValue: string): string => {
  // Pattern: "Gender number to number TimeUnit" or "Gender number TimeUnit"
  const match = sizeValue.match(
    /^(Baby|Kid|Women|Men|XS|S|M|L|XL|2XL)\s*(?:(\d+)\s+to\s+(\d+)|(\d+))\s*([a-zA-Z]+)?/i
  )

  if (!match) return sizeValue

  const gender = match[1]
  const startNum = match[2] || match[4]
  const endNum = match[3]
  const unit = match[5]

  if (["XS", "S", "M", "L", "XL", "2XL"].includes(gender.toUpperCase())) {
    return gender.toUpperCase()
  }

  // Format: "3-4M" or "3M"
  if (unit) {
    const unitShort = unit.charAt(0).toUpperCase()
    if (endNum) {
      return `${startNum}-${endNum}${unitShort}`
    }
    return `${startNum}${unitShort}`
  }

  return sizeValue
}

/**
 * Sort gender values in order: Baby, Kid, Women, Men
 */
export const sortGenderValues = (values: string[]): string[] => {
  const genderOrder = ["baby", "kid", "women", "men"]

  const getGenderRank = (value: string) => {
    const normalized = value.trim().toLowerCase()
    const index = genderOrder.indexOf(normalized)
    return index === -1 ? genderOrder.length : index
  }

  return [...values].sort((a, b) => {
    const rankDiff = getGenderRank(a) - getGenderRank(b)

    if (rankDiff !== 0) {
      return rankDiff
    }

    return a.localeCompare(b, undefined, { sensitivity: "base" })
  })
}

/**
 * Sort size values intelligently
 * For numbered sizes (Baby/Kid): numeric then alphabetic
 * For standard sizes: XS, S, M, L, XL, 2XL order
 */
export const sortSizeValues = (values: string[]): string[] => {
  const standardSizeOrder = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "2XL",
    "3XL",
    "4XL",
    "5XL",
    "6XL",
    "7XL",
    "8XL",
    "9XL",
    "10XL",
  ]
  const audienceOrder = ["baby", "kid", "women", "men"]

  const getAudienceRank = (value: string) => {
    const normalized = value.trim().toLowerCase()
    const prefix = normalized.split(/\s+/)[0]
    const index = audienceOrder.indexOf(prefix)
    return index === -1 ? audienceOrder.length : index
  }

  const getStandardSizeRank = (value: string) => {
    const index = standardSizeOrder.indexOf(value.trim().toUpperCase())
    return index === -1 ? null : index
  }

  const getNumericRange = (value: string) => {
    const match = value.match(/(\d+)(?:\s*(?:to|-)\s*(\d+))?/i)
    if (!match) return null

    return {
      start: Number(match[1]),
      end: Number(match[2] ?? match[1]),
    }
  }

  return [...values].sort((a, b) => {
    // Keep Baby -> Kid -> Women -> Men blocks together first.
    const audienceDiff = getAudienceRank(a) - getAudienceRank(b)
    if (audienceDiff !== 0) return audienceDiff

    const aStandardRank = getStandardSizeRank(a)
    const bStandardRank = getStandardSizeRank(b)
    const aIsStandard = aStandardRank !== null
    const bIsStandard = bStandardRank !== null

    if (aIsStandard && bIsStandard) {
      return aStandardRank - bStandardRank
    }

    // Numbered/ranged sizes should come before generic alpha sizes.
    if (aIsStandard) return 1
    if (bIsStandard) return -1

    const aRange = getNumericRange(a)
    const bRange = getNumericRange(b)

    if (aRange && bRange) {
      if (aRange.start !== bRange.start) return aRange.start - bRange.start
      if (aRange.end !== bRange.end) return aRange.end - bRange.end
    }

    if (aRange) return -1
    if (bRange) return 1

    return a.localeCompare(b, undefined, { sensitivity: "base" })
  })
}

/**
 * Get translated option title based on option title and locale
 * Returns the original title if no translation is needed
 */
export const getTranslatedOptionTitle = (
  title: string,
  t: (key: string) => string
): string => {
  const lowerTitle = title.toLowerCase()

  const translationKeys: Record<string, string> = {
    gender: "optionGender",
    size: "optionSize",
    color: "optionColor",
  }

  const key = translationKeys[lowerTitle]
  if (key) {
    return t(key)
  }

  return title
}

export const getTranslatedGenderValue = (
  value: string,
  t: (key: string) => string
): string => {
  const normalizedValue = value.trim().toLowerCase()

  const translationKeys: Record<string, string> = {
    baby: "optionValueBaby",
    kid: "optionValueKid",
    women: "optionValueWomen",
    men: "optionValueMen",
  }

  const key = translationKeys[normalizedValue]
  if (key) {
    return t(key)
  }

  return value
}
