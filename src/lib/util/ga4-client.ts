"use client"

import { sendGAEvent } from "@next/third-parties/google"

export const trackGAEvent = (
  eventName: string,
  params: Record<string, unknown> = {}
) => {
  if (!process.env.NEXT_PUBLIC_GA_ID || typeof window === "undefined") {
    return
  }

  sendGAEvent("event", eventName, params)
}
