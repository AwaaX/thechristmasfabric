import { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { locales, defaultLocale } from "i18n/routing"

type MetadataValues = Record<string, string | number>

type HreflangAlternates = NonNullable<Metadata["alternates"]>

const getCountryCodeFromLocale = (locale: string) => {
  const [, countryCode] = locale.split("-")
  return countryCode?.toLowerCase() ?? locale.toLowerCase()
}

export async function getLocalizedMetadata(
  namespace: string,
  values?: MetadataValues,
  alternates?: HreflangAlternates
): Promise<Metadata> {
  const t = await getTranslations(namespace)

  return {
    title: t("title", values),
    description: t("description", values),
    alternates,
  }
}

export async function buildHreflangAlternates(
  getPathForLocale: (
    locale: string,
    countryCode: string
  ) => Promise<string | null> | string | null,
  canonicalLocale: string = defaultLocale
): Promise<HreflangAlternates> {
  const languages = await locales.reduce<Promise<Record<string, string>>>(
    async (accPromise, locale) => {
      const acc = await accPromise
      const countryCode = getCountryCodeFromLocale(locale)
      const path = await getPathForLocale(locale, countryCode)

      if (path) {
        acc[locale] = path
      }

      return acc
    },
    Promise.resolve({})
  )

  return {
    canonical: languages[canonicalLocale] ?? undefined,
    languages,
  }
}
