import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export const locales = [
  "es-ES", // Spanish (Spain)
  "de-DE", // German (Germany)
  "it-IT", // Italian (Italy)
  "nl-NL", // Dutch (Netherlands)
  "sv-SE", // Swedish (Sweden)
  "en-US", // English (United States)
  "en-CA", // English (Canada)
  "en-AU", // English (Australia)
  "en-IE", // English (Ireland)
  "en-GB", // English (United Kingdom)
  "fr-FR", // French (France)
] as const

export const defaultLocale = "en-GB"

export const pathnames = {
    // If all locales use the same pathname, a single
    // external path can be used for all locales
    "/": "/",
    "/checkout": "/checkout",
    "/order/confirmed/[id]": "/order/confirmed/[id]",
    "/christmas-pyjamas/[category]/[handle]/[pid]": {
      "es-ES": "/pijamas-de-navidad/[category]/[handle]/[pid]", // Spanish (Spain)
      "de-DE": "/weihnachtspyjamas/[category]/[handle]/[pid]", // German (Germany)
      "it-IT": "/pigiama-di-natale/[category]/[handle]/[pid]", // Italian (Italy)
      "nl-NL": "/kerst-pyjama's/[category]/[handle]/[pid]", // Dutch (Netherlands)
      "sv-SE": "/julpyjamas/[category]/[handle]/[pid]", // Swedish (Sweden)
      "en-US": "/christmas-pyjamas/[category]/[handle]/[pid]", // English (United States)
      "en-CA": "/christmas-pyjamas/[category]/[handle]/[pid]", // English (Canada)
      "en-AU": "/christmas-pyjamas/[category]/[handle]/[pid]", // English (Australia)
      "en-IE": "/christmas-pyjamas/[category]/[handle]/[pid]", // English (Ireland)
      "en-GB": "/christmas-pyjamas/[category]/[handle]/[pid]", // English (United Kingdom)
      "fr-FR": "/pyjamas-de-noel/[category]/[handle]/[pid]", // French (France)
    },
    "/results/[query]": {
      "es-ES": "/resultados/[query]", // Spanish (Spain)
      "de-DE": "/ergebnisse/[query]", // German (Germany)
      "it-IT": "/risultati/[query]", // Italian (Italy)
      "nl-NL": "/resultaten/[query]", // Dutch (Netherlands)
      "sv-SE": "/resultat/[query]", // Swedish (Sweden)
      "en-US": "/results/[query]", // English (United States)
      "en-CA": "/results/[query]", // English (Canada)
      "en-AU": "/results/[query]", // English (Australia)
      "en-IE": "/results/[query]", // English (Ireland)
      "en-GB": "/results/[query]", // English (United Kingdom)
      "fr-FR": "/resultats/[query]", // French (France)
    },
    "/search": {
      "es-ES": "/buscar", // Spanish (Spain)
      "de-DE": "/suche", // German (Germany)
      "it-IT": "/ricerca", // Italian (Italy)
      "nl-NL": "/zoeken", // Dutch (Netherlands)
      "sv-SE": "/sok", // Swedish (Sweden)
      "en-US": "/search", // English (United States)
      "en-CA": "/search", // English (Canada)
      "en-AU": "/search", // English (Australia)
      "en-IE": "/search", // English (Ireland)
      "en-GB": "/search", // English (United Kingdom)
    },
    "/christmas-pyjamas": {
      "es-ES": "/pijamas-de-navidad", // Spanish (Spain)
      "de-DE": "/weihnachtspyjamas", // German (Germany)
      "it-IT": "/pigiama-di-natale", // Italian (Italy)
      "nl-NL": "/kerst-pyjama's", // Dutch (Netherlands)
      "sv-SE": "/julpyjamas", // Swedish (Sweden)
      "en-US": "/christmas-pyjamas", // English (United States)
      "en-CA": "/christmas-pyjamas", // English (Canada)
      "en-AU": "/christmas-pyjamas", // English (Australia)
      "en-IE": "/christmas-pyjamas", // English (Ireland)
      "en-GB": "/christmas-pyjamas", // English (United Kingdom)
    },
    // "/christmas-pyjamas": {
    //   "es-ES": "/tienda", // Spanish (Spain)
    //   "de-DE": "/christmas-pyjamas", // German (Germany)
    //   "it-IT": "/negozio", // Italian (Italy)
    //   "nl-NL": "/winkel", // Dutch (Netherlands)
    //   "sv-SE": "/butik", // Swedish (Sweden)
    //   "en-US": "/christmas-pyjamas", // English (United States)
    //   "en-CA": "/christmas-pyjamas", // English (Canada)
    //   "en-AU": "/christmas-pyjamas", // English (Australia)
    //   "en-IE": "/christmas-pyjamas", // English (Ireland)
    //   "en-GB": "/christmas-pyjamas", // English (United Kingdom)
    // },
}

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [...locales],

  // Used when no locale matches
  defaultLocale,

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames,
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createNavigation(routing)
