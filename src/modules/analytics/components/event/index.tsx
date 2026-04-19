"use client"

import { useEffect, useRef } from "react"

import { trackGAEvent } from "@lib/util/ga4-client"

type AnalyticsEventProps = {
  eventName: string
  params: Record<string, unknown>
  storageKey?: string
}

export default function AnalyticsEvent({
  eventName,
  params,
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

    trackGAEvent(eventName, params)

    if (storageKey) {
      window.sessionStorage.setItem(storageKey, "1")
    }

    hasFiredRef.current = true
  }, [eventName, params, storageKey])

  return null
}
