import { getLocale } from "@lib/data/locale-actions"
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  const urlLocale = await requestLocale
  const cookieLocale = await getLocale()

  const localeCandidates = [urlLocale, cookieLocale, routing.defaultLocale]
  const locale =
    localeCandidates.find(
      (candidate): candidate is string =>
        !!candidate && routing.locales.includes(candidate as any)
    ) ?? routing.defaultLocale

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
