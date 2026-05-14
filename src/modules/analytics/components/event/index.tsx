"use client"

import { useEffect, useRef } from "react"

import {
  type AnalyticsEcommercePayload,
  type EcommerceEventName,
  trackEcommerceEvent,
} from "@lib/analytics"

type AnalyticsEventProps = {
  eventName: EcommerceEventName
  ecommerce: AnalyticsEcommercePayload
  storageKey?: string
}

export default function AnalyticsEvent({
  eventName,
  ecommerce,
  storageKey,
}: AnalyticsEventProps) {
  const hasFiredRef = useRef(false)

  useEffect(() => {
    if (hasFiredRef.current) {
      return
    }

    if (storageKey && window.sessionStorage.getItem(storageKey)) {
      hasFiredRef.current = true
      return
    }

    trackEcommerceEvent(eventName, ecommerce)

    if (storageKey) {
      window.sessionStorage.setItem(storageKey, "1")
    }

    hasFiredRef.current = true
  }, [ecommerce, eventName, storageKey])

  return null
}
