import { locales } from "i18n/routing"

export const localeByCountryCode = locales.reduce<Record<string, string>>(
  (acc, locale) => {
    const [, region] = locale.split("-")

    if (region) {
      acc[region] = locale
    }

    return acc
  },
  {}
)
