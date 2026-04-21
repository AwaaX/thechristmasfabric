import { defineRouting } from "next-intl/routing"
import { createNavigation } from "next-intl/navigation"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    "es-es", // Spanish (Spain)
    "de-de", // German (Germany)
    "it-it", // Italian (Italy)
    "nl-nl", // Dutch (Netherlands)
    "sv-se", // Swedish (Sweden)
    "en-us", // English (United States)
    "en-ca", // English (Canada)
    "en-au", // English (Australia)
    "en-ie", // English (Ireland)
    "en-gb", // English (United Kingdom)
  ],

  // Used when no locale matches
  defaultLocale: "en-gb",

  // The `pathnames` object holds pairs of internal and
  // external paths. Based on the locale, the external
  // paths are rewritten to the shared, internal ones.
  pathnames: {
    // If all locales use the same pathname, a single
    // external path can be used for all locales
    "/": "/",
    "/checkout":"/checkout",
    "/order/confirmed/[id]":"/order/confirmed/[id]",
    "/christmas-pyjamas": {
      "es-es": "/pijamas-de-navidad", // Spanish (Spain)
      "de-de": "/weihnachtspyjamas", // German (Germany)
      "it-it": "/pigiama-di-natale", // Italian (Italy)
      "nl-nl": "/kerst-pyjama's", // Dutch (Netherlands)
      "sv-se": "/julpyjamas", // Swedish (Sweden)
      "en-us": "/christmas-pyjamas", // English (United States)
      "en-ca": "/christmas-pyjamas", // English (Canada)
      "en-au": "/christmas-pyjamas", // English (Australia)
      "en-ie": "/christmas-pyjamas", // English (Ireland)
      "en-gb": "/christmas-pyjamas", // English (United Kingdom)
    },
    "/christmas-pyjamas/[category]/[handle]/[pid]": {
      "es-es": "/pijamas-de-navidad/[category]/[handle]/[pid]", // Spanish (Spain)
      "de-de": "/weihnachtspyjamas/[category]/[handle]/[pid]", // German (Germany)
      "it-it": "/pigiama-di-natale/[category]/[handle]/[pid]", // Italian (Italy)
      "nl-nl": "/kerst-pyjama's/[category]/[handle]/[pid]", // Dutch (Netherlands)
      "sv-se": "/julpyjamas/[category]/[handle]/[pid]", // Swedish (Sweden)
      "en-us": "/christmas-pyjamas/[category]/[handle]/[pid]", // English (United States)
      "en-ca": "/christmas-pyjamas/[category]/[handle]/[pid]", // English (Canada)
      "en-au": "/christmas-pyjamas/[category]/[handle]/[pid]", // English (Australia)
      "en-ie": "/christmas-pyjamas/[category]/[handle]/[pid]", // English (Ireland)
      "en-gb": "/christmas-pyjamas/[category]/[handle]/[pid]", // English (United Kingdom)
    },
    "/results/[query]": {
      "es-es": "/resultados/[query]", // Spanish (Spain)
      "de-de": "/ergebnisse/[query]", // German (Germany)
      "it-it": "/risultati/[query]", // Italian (Italy)
      "nl-nl": "/resultaten/[query]", // Dutch (Netherlands)
      "sv-se": "/resultat/[query]", // Swedish (Sweden)
      "en-us": "/results/[query]", // English (United States)
      "en-ca": "/results/[query]", // English (Canada)
      "en-au": "/results/[query]", // English (Australia)
      "en-ie": "/results/[query]", // English (Ireland)
      "en-gb": "/results/[query]", // English (United Kingdom)
    },
    "/search": {
      "es-es": "/buscar", // Spanish (Spain)
      "de-de": "/suche", // German (Germany)
      "it-it": "/ricerca", // Italian (Italy)
      "nl-nl": "/zoeken", // Dutch (Netherlands)
      "sv-se": "/sok", // Swedish (Sweden)
      "en-us": "/search", // English (United States)
      "en-ca": "/search", // English (Canada)
      "en-au": "/search", // English (Australia)
      "en-ie": "/search", // English (Ireland)
      "en-gb": "/search", // English (United Kingdom)
    },
    "/shop": {
      "es-es": "/tienda", // Spanish (Spain)
      "de-de": "/shop", // German (Germany)
      "it-it": "/negozio", // Italian (Italy)
      "nl-nl": "/winkel", // Dutch (Netherlands)
      "sv-se": "/butik", // Swedish (Sweden)
      "en-us": "/shop", // English (United States)
      "en-ca": "/shop", // English (Canada)
      "en-au": "/shop", // English (Australia)
      "en-ie": "/shop", // English (Ireland)
      "en-gb": "/shop", // English (United Kingdom)
    },
  },
})

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, permanentRedirect } =
  createNavigation(routing)
