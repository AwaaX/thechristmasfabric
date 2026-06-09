"use server"

const MEDUSA_BACKEND_URL =
  process.env.MEDUSA_BACKEND_URL || "http://localhost:9000"
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ""

export type TrackingAddress = {
  country: string | null
  state: string | null
  city: string | null
  street: string | null
  postal_code: string | null
  coordinates: { longitude: number | null; latitude: number | null }
}

export type TrackingEvent = {
  time_iso: string | null
  time_utc: string | null
  time_raw: {
    date: string | null
    time: string | null
    timezone: string | null
  }
  description: string
  location: string | null
  stage: string | null
  sub_status: string | null
  address: TrackingAddress
}

export type TrackingMilestone = {
  key_stage: string
  time_iso: string | null
  time_utc: string | null
  time_raw: {
    date: string | null
    time: string | null
    timezone: string | null
  }
}

export type TrackingResult = {
  tracking_number: string
  shipping_info: {
    shipper_address: TrackingAddress
    recipient_address: TrackingAddress
  }
  latest_status: {
    status: string
    sub_status: string | null
    sub_status_descr: string | null
  }
  latest_event: TrackingEvent
  time_metrics: {
    days_after_order: number | null
    days_of_transit: number | null
    days_of_transit_done: number | null
    days_after_last_update: number | null
    estimated_delivery_date: {
      source: string | null
      from: string | null
      to: string | null
    }
  }
  milestone: TrackingMilestone[]
  tracking: {
    providers: {
      provider: {
        key: number
        name: string
        alias: string
        homepage: string
        country: string
      }
      latest_sync_status: string
      latest_sync_time: string
      events: TrackingEvent[]
    }[]
  }
}

export type OrderInfo = {
  id: string
  display_id: string
  custom_display_id: string | null
}

export type OrderTrackingResponse =
  | {
      success: true
      trackings: TrackingResult[]
      tracking: TrackingResult | null
      tracking_info_available: boolean
      count: number
      order: OrderInfo
    }
  | { success: false; error: string }

export type TrackingResponse =
  | { success: true; data: TrackingResult; tracking_info_available: boolean }
  | { success: false; error: string }

export async function fetchTracking(
  trackingNumber: string
): Promise<TrackingResponse> {
  if (!trackingNumber?.trim()) {
    return { success: false, error: "Please enter a tracking number." }
  }

  try {
    const res = await fetch(
      `${MEDUSA_BACKEND_URL}/store/trackings/${encodeURIComponent(
        trackingNumber.trim()
      )}`,
      {
        method: "GET",
        headers: {
          "x-publishable-api-key": PUBLISHABLE_API_KEY,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    )

    if (!res.ok) {
      if (res.status === 404) {
        return { success: false, error: "Tracking number not found." }
      }
      return { success: false, error: `Server error: ${res.status}` }
    }

    const json = await res.json()

    if (!json.tracking_info_available || !json.tracking) {
      return {
        success: false,
        error:
          "No tracking information available for this number. Please check and try again.",
      }
    }

    return {
      success: true,
      data: json.tracking as TrackingResult,
      tracking_info_available: json.tracking_info_available,
    }
  } catch {
    return {
      success: false,
      error: "Failed to reach the tracking service. Please try again.",
    }
  }
}

export async function fetchTrackingByOrder(
  orderId: string,
  email: string
): Promise<OrderTrackingResponse> {
  if (!orderId?.trim() || !email?.trim()) {
    return {
      success: false,
      error: "Please enter both Order Number and email.",
    }
  }

  try {
    const params = new URLSearchParams({
      display_id: orderId.trim(),
      email: email.trim(),
    })

    const res = await fetch(
      `${MEDUSA_BACKEND_URL}/store/trackings?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "x-publishable-api-key": PUBLISHABLE_API_KEY,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    )

    if (!res.ok) {
      if (res.status === 404) {
        return {
          success: false,
          error: "Order not found. Please check your Order Number and email.",
        }
      }
      return { success: false, error: `Server error: ${res.status}` }
    }

    const json = await res.json()

    if (!json.order) {
      return {
        success: false,
        error: "Order not found. Please check your Order Number and email.",
      }
    }

    return {
      success: true,
      trackings: (json.trackings ?? []) as TrackingResult[],
      tracking: json.tracking ?? null,
      tracking_info_available: json.tracking_info_available ?? false,
      count: json.count ?? 0,
      order: json.order as OrderInfo,
    }
  } catch {
    return {
      success: false,
      error: "Failed to reach the tracking service. Please try again.",
    }
  }
}
